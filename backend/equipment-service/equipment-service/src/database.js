const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize('mysql://localhost:3306/MockProject_102024_Nhom5', {});

// Import các mô hình
const Asset = require(path.join(__dirname, 'models', 'assets'))(sequelize, Sequelize.DataTypes);
const AssetInspection = require(path.join(__dirname, 'models', 'assetInspections'))(sequelize, Sequelize.DataTypes);
const Employee = require(path.join(__dirname, 'models', 'employees'))(sequelize, Sequelize.DataTypes);
const Building = require(path.join(__dirname, 'models', 'buildings'))(sequelize, Sequelize.DataTypes);
const BuildingDocument = require(path.join(__dirname, 'models', 'buildingDocuments'))(sequelize, Sequelize.DataTypes);

Asset.hasMany(AssetInspection, {
    foreignKey: 'assetId',
    sourceKey: 'assetId',
    as: 'assetInspections',
});

AssetInspection.belongsTo(Asset, {
    foreignKey: 'assetId',
    targetKey: 'assetId',
    as: 'asset',
});

Employee.hasMany(AssetInspection, {
    foreignKey: 'employeeId',
    sourceKey: 'employeeId',
    as: 'assetInspections',
});

AssetInspection.belongsTo(Employee, {
    foreignKey: 'employeeId',
    targetKey: 'employeeId',
    as: 'employee',
});

Building.hasMany(Asset, {
    foreignKey: 'buildingId',
    sourceKey: 'buildingId',
    as: 'assets',
});

Asset.belongsTo(Building, {
    foreignKey: 'buildingId',
    targetKey: 'buildingId',
    as: 'building',
});

Building.hasMany(BuildingDocument, {
    foreignKey: 'buildingId',
    sourceKey: 'buildingId',
    as: 'buildingDocuments',
});

BuildingDocument.belongsTo(Building, {
    foreignKey: 'buildingId',
    targetKey: 'buildingId',
    as: 'building',
});

module.exports = {
    sequelize,
    Asset,
    AssetInspection,
    Employee,
    Building,
    BuildingDocument,
};
