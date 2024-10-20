import userService from '../service/userService';

const testConnection = (req, res) => {
    return res.send("Connection is successful!");
};

const getListApartmentAndAmenities = async (req, res) => {
    try {
        let response = await userService.getListApartmentAndAmenities();

        if (!response) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'No equipment found for the specified building.'
            });
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const getApartmentAndAmenitiesById = async (req, res) => {
    try {
        let assetId = req.params.assetId;
        if (!assetId) {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'Missing assetId parameter'
            });
        }

        let response = await userService.getApartmentAndAmenitiesById(assetId);
        if (!response) {
            return res.status(404).json({
                error: 'Not Found',
                message: 'Equipment or amenity not found.'
            });
        }

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const createNewApartmentAmenity = async (req, res) => {
    // data test
    // let data ={
    //     buildingId: 2,
    //     assetName: "Gym Equipment",
    //     assetType: "Amenities",
    //     statusDescription: "Available",
    //     inspectionRecords: [
    //       {
    //         inspectionDate: "2024-09-15",
    //         statusDescription: "Passed",
    //         employeeId:2
    //       }
    //     ]
    //   }

    try {
        let data = req.body;

        let response = await userService.createNewApartmentAmenity(data);

        if (response.error) {
            return res.status(400).json({
                error: "Invalid request",
                message: response.message
            });
        }

        return res.status(201).json({
            message: response.message,
            equipmentDetails: response.equipmentDetails
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

const updateApartmentAmenityById = async (req, res) => {
    // data test
    // let data = {
    //     assetName: "Gym Equipment Edit",
    //     assetType: "Amenities edit",
    //     inspectionRecords: {
    //       statusDescription: "Fully operational edit"
    //     }
    //   };
    try {
        let assetId = req.params.assetId;
        let data = req.body;

        let response = await userService.updateApartmentAmenityById(assetId, data);

        if (!response) {
            return res.status(404).json({ error: "Not Found", message: "Equipment or amenity record not found." });
        }

        console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

const deleteApartmentAmenityById = async (req, res) => {
    let assetId = req.params.assetId;
    try {
        const response = await userService.deleteApartmentAmenity(assetId);

        if (response.status === 404) {
            return res.status(404).json({ message: response.message });
        } else if (response.status === 400) {
            return res.status(400).json({ message: response.message });
        }

        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({ error: 'An error occurred while deleting the asset.' });
    }
};

const getEquipmentAndAmenitiesByBuilding = async (req, res) => {
    try {
        let buildingId = req.params.buildingId;

        if (!buildingId) {
            return res.status(400).json({ message: 'Missing buildingId parameter' });
        }

        let response = await userService.getEquipmentAndAmenitiesByBuilding(buildingId);

        // Nếu không tìm thấy thiết bị hoặc tiện ích
        if (!response || response.length === 0) {
            return res.status(404).json({ message: 'No equipment or amenities found for the specified building.' });
        }

        // Trả về danh sách thiết bị và tiện ích
        return res.status(200).json({
            statusCode: '200 OK',
            buildingId: buildingId,
            equipment: response.map(asset => ({
                assetId: asset.assetId,
                assetName: asset.assetName,
                assetType: asset.assetType,
                statusDescription: asset['assetInspections.statusDescription'] || 'No status available'
            }))
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
module.exports = {
    testConnection,
    getListApartmentAndAmenities,
    getApartmentAndAmenitiesById,
    createNewApartmentAmenity,
    updateApartmentAmenityById,
    deleteApartmentAmenityById,
    getEquipmentAndAmenitiesByBuilding
};
