import express from "express";
import equipmentController from '../controller/equipmentController';

const router = express.Router();

const initApiRoutes = (app) => {
    router.get("/", equipmentController.testConnection);
    router.get("/apartments/equipment", equipmentController.getListApartmentAndAmenities);
    router.get("/apartments/equipment/:assetId", equipmentController.getApartmentAndAmenitiesById);
    router.post("/apartments/equipment/create", equipmentController.createNewApartmentAmenity);
    router.put("/apartments/equipment/:assetId/update", equipmentController.updateApartmentAmenityById);
    router.patch("/apartments/equipment/:assetId/delete", equipmentController.deleteApartmentAmenityById);
    router.get("/apartments/:buildingId/equipment", equipmentController.getEquipmentAndAmenitiesByBuilding);

    return app.use("/api/", router);
}

export default initApiRoutes