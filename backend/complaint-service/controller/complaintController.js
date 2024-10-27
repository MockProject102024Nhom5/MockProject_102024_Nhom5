const complaintService = require('../service/complaintService')

class ComplaintController {
    createComplaint(req,res) {
        const {residentId, requestTypeId, complaintDescription} = req.body ?? {}
        if(typeof residentId !== 'number' || typeof requestTypeId !== 'number' || typeof complaintDescription !== 'string'){
            return res.status(400).json({
                "error": "Invalid request",
                "message": "check request."              
            });
        }
        complaintService.createComplaint(req,res)
    }


    updateComplaint(req,res) {
        const requestId = +req.params.requestId; // Lấy requestId từ URL
        const{requestTypeId,complaintDescription,receivedDate, employeeId,processingResult, deflag} = req.body??{};
          
        if(isNaN(requestId) || typeof requestTypeId !=='number' || typeof complaintDescription !== 'string'|| 
            typeof receivedDate !== 'string' || typeof employeeId !== 'number' || typeof processingResult !=='string' || typeof deflag !== 'number'){
            return res.status(400).json({
                    "error": "Invalid request",
                    "message": "check request."              
            });
        }
        complaintService.updateComplaint(req,res,requestId)
    }
    getComplaintById(req,res) {
        const requestId = +req.params.requestId // chuyển sang number
        if(isNaN(requestId)){
            return res.status(400).json({
                "error": "Invalid request",
                "message": "check request."              
            });
        }       
        complaintService.getComplaintById(req,res,requestId)
    } 

    getAllComplaint(req,res) {
        complaintService.getAllComplaint(req,res)
    }

    deleteComplaint(req,res) {
        const requestId = +req.params.requestId; // Lấy requestId từ URL
        const{deflag} = req.body ?? {};   // ? trả về bên phải nếu vế trái null || undefined
        if(isNaN(requestId) || typeof deflag !== 'number' || deflag !== 0){
            return res.status(400).json({
                "error": "Invalid request",
                "message": "check request."              
            });
          } 
        complaintService.deleteComplaint(res,requestId)
    }
    
}

module.exports = new ComplaintController();