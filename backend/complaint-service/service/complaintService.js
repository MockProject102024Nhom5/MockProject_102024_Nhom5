const connection = require('../config/connectDatabase');
const sql = require('mssql');
const { deleteComplaint } = require('../controller/complaintController');



const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
//
  
class ComplaintService {
        async createComplaint(req, res,) {
        const {residentId, requestTypeId, complaintDescription} = req.body

        console.log(`value ${residentId} ${requestTypeId} ${complaintDescription}`)
        let currentPool = await connection();
        const request = currentPool.request();
        const query = `INSERT INTO residentRequests (residentId, requestTypeId, complaintDescription,submissionDate,employeeId,receivedDate,processingResult,deflag)
        OUTPUT INSERTED.requestId
        VALUES (@residentId, @requestTypeId, @complaintDescription,@submissionDate,null,null,null,1)`;
        request.input('residentId', sql.Int,residentId);
        request.input('requestTypeId', sql.Int,requestTypeId);
        request.input('complaintDescription', sql.Text,complaintDescription);
        const currentTime = formatDate(new Date());
        request.input('submissionDate', sql.Date,currentTime);
       try {
        const result = await request.query(query);
        console.log('Tài liệu đã được thêm thành công:', result.recordset[0]);
         res.status(201).json(
              result.recordset[0]
         )
       } catch (error) {
         res.status(404).json({
          "error": "Not Found", 
          "message": "Rental record not found."        
         })
      }
    }


    async updateComplaint (req,res,requestId){
      const{requestTypeId,complaintDescription,receivedDate, employeeId,processingResult, deflag} = req.body;
      const pool = await connection();    
      try{
      const result = await pool.request()
          .input('requestId',sql.Int,requestId)
          .input('requestTypeId', sql.Int, requestTypeId)        // Tham số đầu vào id
          .input('complaintDescription', sql.Text, complaintDescription) 
          .input('receivedDate', sql.Date, receivedDate) // Tham số đầu vào name
          .input('employeeId', sql.Int, employeeId)
          .input('processingResult', sql.Text, processingResult)
          .input('deflag',sql.Int,deflag)
          .query(`UPDATE residentRequests 
                  SET requestTypeId = @requestTypeId, complaintDescription = @complaintDescription,
                  employeeId =@employeeId,processingResult = @processingResult,deflag = @deflag 
                  OUTPUT INSERTED.* 
                  WHERE requestId = @requestId`);
          console.log("update thanh cong");
          res.status(200).json(    
                result.recordset[0]
         )
          }catch(error){
            res.status(404).json({
              "error": "Not Found", 
              "message": "Rental record not found."            
            })
          }
    }


      async getComplaintById(req,res,requestId){
        let currentPool = await connection();
        const request = currentPool.request();
        const query = `select * from residentRequests where requestId = @requestId`;
        request.input('requestId', sql.Int,requestId);
        const result = await request.query(query);
         //
        if(result.recordset[0] === undefined) return res.status(200).json({});
        res.status(200).json(
            result.recordset[0]
       )
        }catch(error){
          res.status(404).json({
            "error": error, 
            "message": "Rental record not found."            
          })
        }

        async getAllComplaint(req,res){
          let currentPool = await connection();
          const request = currentPool.request();
          const query = `select * from residentRequests`;
          const result = await request.query(query);
           //
          if(result.recordset[0] === undefined) return res.status(200).json({});
          res.status(200).json(
            {
              data :  result.recordset
            }   
         )
          }catch(error){
        }

        async deleteComplaint (res,requestId){
          const pool = await connection();    
          try{
          const result = await pool.request()
              .input('requestId',sql.Int,requestId)
              .query(`UPDATE residentRequests 
                      SET deflag = 0 
                      OUTPUT INSERTED.* 
                      WHERE requestId = @requestId`);
              res.status(200).json(    
                    result.recordset[0]
             )
              }catch(error){
                res.status(404).json({
                  "error": "Not Found", 
                  "message": "Rental record not found."            
                })
              }
        }
}

// const parts = receivedDate.split('-');
// if(!parts[0] || !parts[1] || parts[2]){
//   return res.status(400).send('request không hợp lệ hoặc không phải JSON')
// }
// const year = parseInt(parts[0]);
// const month = parseInt(parts[1]);
// const day = parseInt(parts[2]);
// if(isNaN(year) || isNaN(month) || isNaN(day)){
//   return res.status(400).send('request không hợp lệ hoặc không phải JSON')
// }
// if(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(receivedDate) == false){
//   return res.status(400).send('request không hợp lệ hoặc không phải JSON')
// }
// const inputDate = new Date(receivedDate);
// const currentDate = new Date();
// if(inputDate > currentDate){
// return res.status(400).send('request không hợp lệ hoặc không phải JSON')
// }


module.exports = new ComplaintService();