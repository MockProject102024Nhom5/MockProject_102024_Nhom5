import express from "express";
import homeController from '../controller/homeController';

const router = express.Router();

const initApiRoutes = (app) => {
    router.get("/", homeController.testConnection);
    router.get("/apartments/equipment", homeController.getListApartmentAndAmenities);
    router.get("/apartments/equipment/:assetId", homeController.getApartmentAndAmenitiesById);
    router.post("/apartments/equipment/create", homeController.createNewApartmentAmenity);
    router.put("/apartments/equipment/:assetId/update", homeController.updateApartmentAmenityById);
    router.patch("/apartments/equipment/:assetId/delete", homeController.deleteApartmentAmenityById);
    router.get("/apartments/:buildingId/equipment", homeController.getEquipmentAndAmenitiesByBuilding);

    return app.use("/api/", router);
}

export default initApiRoutes