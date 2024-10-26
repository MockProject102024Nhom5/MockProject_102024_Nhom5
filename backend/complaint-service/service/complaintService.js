const connection = require('../config/connectDatabase');
const sql = require('mssql')



const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
class ComplaintService {
        async createComplaint(req, res,{residentId, requestTypeId, complaintDescription}) {
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
        console.log('Tài liệu đã được thêm thành công:', result);
         res.status(200).json(
            {
                 requestId : result.recordset[0].id,
                "residentId":residentId, 
                "requestTypeId": requestTypeId,
                "complaintDescription": complaintDescription, 
                "submissionDate": currentTime, 
                "employeeId":null,
                "receivedDate": null,
                "processingResult": null, 
                "deflag": 1
             }
         )
       } catch (error) {
         console.error('Lỗi khi thêm tài liệu:', error);
         res.status(400).json({
          "error" : "Invalid request",
          "message": "Missing required fields"
         })
      }
    }
}

module.exports = new ComplaintService();