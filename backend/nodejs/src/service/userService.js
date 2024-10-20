
const { Asset, AssetInspection, Building, BuildingDocument } = require('../database');

let getListApartmentAndAmenities = async () => {
    try {
        let listAsset = await Asset.findAll({
            raw: true,
            attributes: ['buildingId', 'assetId', 'assetName', 'assetType'],
            include: [{
                model: AssetInspection,
                as: 'assetInspections',
                attributes: ['statusDescription'] // Lấy thuộc tính statusDescription từ AssetInspection
            }]
        });

        if (!listAsset.length) {
            return null; // Trả về null nếu không tìm thấy tài sản
        }
        // Điều chỉnh dữ liệu để khớp với định dạng yêu cầu
        const formattedListAsset = listAsset.map(asset => ({
            buildingId: asset.buildingId,
            assetId: asset.assetId,
            assetName: asset.assetName,
            assetType: asset.assetType,
            statusDescription: asset['assetInspections.statusDescription']
        }));

        return { equipment: formattedListAsset };
    } catch (e) {
        console.log(e);
        throw e;
    }
}

let getApartmentAndAmenitiesById = async (id) => {
    try {
        let asset = await Asset.findOne({
            where: { assetId: id },
            attributes: ['assetId', 'buildingId', 'assetName', 'assetType'], // Lấy các thuộc tính cần thiết
            include: [{
                model: AssetInspection,
                as: 'assetInspections',
                attributes: ['inspectionDate', 'statusDescription'] // Thêm các thuộc tính của bản ghi kiểm tra
            }],
            nest: true,
        });
        if (!asset) {
            return null; // Trả về null nếu không tìm thấy tài sản
        }
        // Điều chỉnh dữ liệu để khớp với định dạng yêu cầu
        const formattedAsset = {
            assetId: asset.assetId,
            buildingId: asset.buildingId,
            assetName: asset.assetName,
            assetType: asset.assetType,
            statusDescription: asset['assetInspections.statusDescription'],
            inspectionRecords: asset['assetInspections'] ? asset['assetInspections'].map(record => ({
                inspectionDate: record.inspectionDate,
                status: record.statusDescription,
            })) : []
        };

        return formattedAsset;
    } catch (e) {
        console.log(e);
        throw e;
    }
}
let createNewApartmentAmenity = async (data) => {
    try {
        // Kiểm tra các trường bắt buộc
        if (!data.buildingId || !data.assetName || !data.assetType) {
            return { error: true, message: 'Missing required fields.' };
        }

        // Tạo mới asset
        let newAsset = await Asset.create({
            buildingId: data.buildingId,
            assetName: data.assetName,
            assetType: data.assetType,
        });

        // Nếu có inspectionRecords thì thêm vào bảng AssetInspection
        if (data.inspectionRecords && data.inspectionRecords.length > 0) {
            let inspections = data.inspectionRecords.map(record => ({
                assetId: newAsset.assetId, // Liên kết với asset vừa tạo
                inspectionDate: record.inspectionDate,
                statusDescription: record.statusDescription,
                employeeId: record.employeeId
            }));
            await AssetInspection.bulkCreate(inspections); // Thêm nhiều bản ghi kiểm tra
        }

        return {
            message: 'Equipment and amenity record created successfully.',
            equipmentDetails: {
                assetId: newAsset.assetId,
                buildingId: newAsset.buildingId,
                assetName: newAsset.assetName,
                assetType: newAsset.assetType,
                statusDescription: newAsset.statusDescription,
                inspectionRecords: data.inspectionRecords || []
            }
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
};

let updateApartmentAmenityById = async (id, data) => {
    try {
        // Kiểm tra xem có trường nào để cập nhật không
        if (!data.assetName && !data.assetType && !data.statusDescription) {
            return null;
        }

        // Tìm kiếm tài sản theo assetId
        let asset = await Asset.findOne({ where: { assetId: id } });
        if (!asset) {
            return null;
        }
        await asset.update({
            assetName: data.assetName || asset.assetName,
            assetType: data.assetType || asset.assetType,
        });

        // Cập nhật các trường hợp có trong yêu cầu
        let updatedInspectionRecords = null;
        if (data.inspectionRecords && data.inspectionRecords.statusDescription) {
            await AssetInspection.update({
                statusDescription: data.inspectionRecords.statusDescription
            }, {
                where: { assetId: id }
            });

            updatedInspectionRecords = await AssetInspection.findOne({
                where: { assetId: id },
                attributes: ['statusDescription']
            });
        }

        return {
            message: "Equipment and amenity record updated successfully.",
            updatedDetails: {
                assetId: asset.assetId,
                assetName: asset.assetName,
                assetType: asset.assetType,
                inspectionRecords: updatedInspectionRecords
                    ? {
                        statusDescription: updatedInspectionRecords.statusDescription
                    }
                    : {}
            }
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
}
let deleteApartmentAmenity = async (id) => {
    try {
        // Tìm kiếm tài sản theo assetId
        let asset = await Asset.findOne({ where: { assetId: id } });
        if (!asset) {
            return {
                status: 404,
                message: 'Asset not found!'
            };
        }

        // Kiểm tra nếu tài sản đã bị soft delete
        if (asset.deflag === 0) {
            return {
                status: 400,
                message: 'Asset is already soft deleted!' // Thông báo nếu tài sản đã bị xóa trước đó
            };
        }

        // Cập nhật trường deflag thành 0 để soft delete tài sản
        await Asset.update(
            { deflag: 0 },
            { where: { assetId: id } }
        );

        return {
            status: 200,
            message: 'Asset soft deleted successfully!',
            deletedDetails: {
                assetId: asset.assetId,
                deflag: 0
            }
        };
    } catch (e) {
        console.log(e);
        throw e;
    }
};
let getEquipmentAndAmenitiesByBuilding = async (buildingId) => {
    try {
        // Tìm tất cả các thiết bị liên quan đến buildingId, bao gồm thông tin AssetInspection
        let listAsset = await Asset.findAll({
            where: { buildingId: buildingId },
            include: [
                {
                    model: AssetInspection,
                    as: 'assetInspections',
                    attributes: ['statusDescription']
                }
            ],
            raw: true
        });

        return listAsset;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
module.exports = {
    getListApartmentAndAmenities, getApartmentAndAmenitiesById,
    createNewApartmentAmenity, updateApartmentAmenityById,
    deleteApartmentAmenity, getEquipmentAndAmenitiesByBuilding
};
