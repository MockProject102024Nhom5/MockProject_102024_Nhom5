const connection = require('../config/connectDatabase');
const sql = require('mssql')



const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
//
  
class ComplaintService {
        async createComplaint(req, res,) {
        console.log("controller create service")
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
         console.error('Lỗi khi thêm tài liệu:', error);
         res.status(404).json({
          "error": "Not Found", 
          "message": "Rental record not found."        
         })
      }
    }


    async updateComplaint (req,res,requestId){
      const{requestTypeId,complaintDescription,submissionDate, employeeId,processingResult, deflag} = req.body;
      console.log(`value ${requestTypeId} ${complaintDescription}`)

      const pool = await connection();    
      try{
        console.log(`date ${submissionDate}`)
      const result = await pool.request()
          .input('requestId',sql.Int,requestId)
          .input('requestTypeId', sql.Int, requestTypeId)        // Tham số đầu vào id
          .input('complaintDescription', sql.Text, complaintDescription) 
          .input('submissionDate', sql.Date, submissionDate) // Tham số đầu vào name
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
            console.error('Lỗi khi updata tài liệu:', error);
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
      console.log("get data thanh cong");
      if(result.recordset[0] === undefined) return res.status(200).json({});
      res.status(200).json(
          result.recordset[0]
     )
      }catch(error){
        console.error('Lỗi khi updata tài liệu:', error);
        res.status(404).json({
          "error": error, 
          "message": "Rental record not found."            
        })
      }


}

module.exports = new ComplaintService();