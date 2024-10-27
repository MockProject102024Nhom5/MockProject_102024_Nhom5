var express = require("express");
var Router = express.Router();
var complaintController = require("../controller/complaintController");

Router.post("/complaints/create",complaintController.createComplaint);
Router.put("/complaints/:requestId/update", complaintController.updateComplaint);
Router.get("/complaints/:requestId",complaintController.getComplaintById);
Router.get("/complaints", complaintController.getAllComplaint);
Router.get("/complaints/:requestId/delete", complaintController.deleteComplaint);






// billRouter.get("/:id", billCtrl.getBillById);
// billRouter.get("/", billCtrl.index);
// billRouter.post("/create", billCtrl.create);
// billRouter.put("/update", billCtrl.update);
// billRouter.delete("/delete/:id", billCtrl.delete);//
module.exports = Router