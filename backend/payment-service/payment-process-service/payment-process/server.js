'use strict'
const express = require('express');
const cors = require('cors');
const config=require('./dbconfig');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

const CryptoJS = require('crypto-js');
const moment = require('moment');
const axios = require('axios');

app.use("/api",paymentRoutes.routes)

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

//========ZALOPAY========//

//App Info
const configs = {
  app_id: "2554",
  key1: "sdngKKJmqEMzvh5QQcdD2A9XBSKUNaYn",
  key2: "trMrHtvjo6myautxDUiAcYsVtaeQ8nhf",
  endpoint: "https://sb-openapi.zalopay.vn/v2/create"
};
const embed_data = {
  redirecturl: "https://www.neohome.vn/"
};
app.post('/payment', async(req, res)=> {
  const items = [{}];
  const transId = Math.floor(Math.random() * 1000000);
  const order = {
      app_id: configs.app_id,
      app_trans_id: `${moment().format('YYMMDD')}_${transId}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
      app_user: "user123",
      app_time: Date.now(), // miliseconds
      item: JSON.stringify(items),
      embed_data: JSON.stringify(embed_data),
      amount: 500000,
      description: `Lazada - Payment for the order #${transId}`,
      bank_code: "",
      callbackurl: " https://2cc7-14-248-115-218.ngrok-free.app/callback"
  };
  
  // appid|app_trans_id|appuser|amount|apptime|embeddata|item
  const data = configs.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
  order.mac = CryptoJS.HmacSHA256(data, configs.key1).toString();
  
  try {
    const result = await axios.post(configs.endpoint, null, { params: order })
    
    return res.status(200).json(result.data);
  } catch (error) {
    console.log(error.message);
  }
})

app.get('/callback', async(req, res)=> {
  let result = {};

  try {
    let dataStr = req.body.data;
    let reqMac = req.body.mac;

    let mac = CryptoJS.HmacSHA256(dataStr, configs.key2).toString();
    console.log("mac =", mac);


    // kiểm tra callback hợp lệ (đến từ ZaloPay server)
    if (reqMac !== mac) {
      // callback không hợp lệ
      result.return_code = -1;
      result.return_message = "mac not equal";
    }
    else {
      // thanh toán thành công
      // merchant cập nhật trạng thái cho đơn hàng
      let dataJson = JSON.parse(dataStr, configs.key2);
      console.log("update order's status = success where app_payment_id =", dataJson["app_trans_id"]);

      result.return_code = 1;
      result.return_message = "success";
    }
  } catch (ex) {
    result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
    result.return_message = ex.message;
  }

  // thông báo kết quả cho ZaloPay server
  res.json(result);
})

app.post('/order-status',async(req, res)=>{
  const app_trans_id = req.params.app_trans_id;
  let postData = {
    app_id: configs.app_id,
    app_trans_id: app_trans_id, 
}

let data = postData.app_id + "|" + postData.app_trans_id + "|" + configs.key1;
postData.mac = CryptoJS.HmacSHA256(data, configs.key1).toString();


let postConfig = {
    method: 'post',
    url: configs.endpoint,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(postData)
};

try {
  const result = await axios(postConfig)
  return res.status(200).json(result.data)
} catch (error) {
  console.log(error.message)
}
})


// starts a simple http server locally on port 8080
app.listen(config.port, () => {
  console.log(`App iss listening on http://localhost:`+config.port);
});




