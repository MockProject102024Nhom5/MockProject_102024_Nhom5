const complaintService = require('../service/complaintService')

class ComplaintController {
    createComplaint(req,res) {
        console.log("controller create")
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).send('request không hợp lệ hoặc không phải JSON');
        }
        console.log("controller create2222")

        const {residentId, requestTypeId, complaintDescription} = req.body
        if(typeof residentId !== 'number' || typeof requestTypeId !== 'number' || typeof complaintDescription !== 'string'){
          console.log("controller create3333")
          return res.status(400).send('request không hợp lệ hoặc không phải JSON');
        }

        complaintService.createComplaint(req,res)
    }


    updateComplaint(req,res) {
        console.log("controller update")
        if (!req.body || typeof req.body !== 'object'){
            return res.status(400).send('request không hợp lệ hoặc không phải JSON');
          }

          const requestId = +req.params.requestId; // Lấy requestId từ URL
          const{requestTypeId,complaintDescription,receivedDate, employeeId,processingResult, deflag} = req.body;
          
          if(isNaN(requestId) || typeof requestTypeId !=='number' || typeof complaintDescription !== 'string'|| 
            typeof receivedDate !== 'string' || typeof employeeId !== 'number' || typeof processingResult !=='string' || typeof deflag !== 'number'){
            return res.status(400).send('request không hợp lệ hoặc không phải JSON');
          }

        complaintService.updateComplaint(req,res,requestId)
    }
    getComplaintById(req,res) {
        console.log("controller update3")
        const requestId = +req.params.requestId // chuyển sang number
        if(isNaN(requestId)){
            return res.status(400).send('request không hợp lệ hoặc không phải JSON')
        }       
        complaintService.getComplaintById(req,res,requestId)
    } 

    getAllComplaint(req,res) {
        complaintService.getAllComplaint(req,res)
    }
    

    // getBillByUserEmail(req, res) {
    //     const email = req.params.email
    //     billModel.find({email: email})
    //     .then(bills => res.json(bills))
    //     .catch(err => res.status(500).json({msg: "Failed to fetch!"}))
    // }

    // getBillById(req, res) {
    //     const id = req.params.id;

    //     billModel
    //         .findById(id)
    //         .then((bill) => res.json({ bill: bill, ok: true }))
    //         .catch((err) => res.status(401).json({ msg: "Error: " + err }));
    // }

    // create(req, res) {
    //     var billPayload = req.body;

    //     billModel
    //         .create(billPayload)
    //         .then((bill) => {
    //             res.json(bill);
    //         })
    //         .catch((err) => res.status(401).json({ msg: "Error: " + err }));
    // }

    // update(req, res) {
    //     var billPayload = req.body;

    //     billModel
    //         .findByIdAndUpdate(billPayload._id, billPayload)
    //         .then(() => {
    //             res.json({ ok: true });
    //         })
    //         .catch((err) => res.status(401).json({ msg: "Error: " + err }));
    // }

    // delete(req, res) {
    //     var id = req.params.id;
    //     billModel
    //         .findByIdAndDelete(id)
    //         .then(() => res.json({ ok: true }))
    //         .catch((err) => res.status(401).json({ msg: "Error: " + err }));
    // }
}

module.exports = new ComplaintController();