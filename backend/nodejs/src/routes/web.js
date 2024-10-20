import express from "express";
import homeController from '../controller/homeController';

const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/", homeController.testConnection);
    router.get("/api/apartments/equipment", homeController.getListApartmentAndAmenities);
    router.get("/api/apartments/equipment/:assetId", homeController.getApartmentAndAmenitiesById);
    router.post("/api/apartments/equipment/create", homeController.createNewApartmentAmenity);
    router.put("/api/apartments/equipment/:assetId/update", homeController.updateApartmentAmenityById);
    router.patch("/api/apartments/equipment/:assetId/delete", homeController.deleteApartmentAmenityById);
    router.get("/api/apartments/:buildingId/equipment", homeController.getEquipmentAndAmenitiesByBuilding);

    return app.use("/", router);
}

export default initWebRoutes