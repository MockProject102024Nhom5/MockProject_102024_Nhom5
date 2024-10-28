var DataTypes = require("sequelize").DataTypes;
var _admins = require("./admins");
var _apartmentRentals = require("./apartmentRentals");
var _assetInspections = require("./assetInspections");
var _assets = require("./assets");
var _buildingDocuments = require("./buildingDocuments");
var _buildings = require("./buildings");
var _candidates = require("./candidates");
var _employeeContracts = require("./employeeContracts");
var _employeeDetails = require("./employeeDetails");
var _employeeLeave = require("./employeeLeave");
var _employeePerformance = require("./employeePerformance");
var _employees = require("./employees");
var _i9Forms = require("./i9Forms");
var _maintenance = require("./maintenance");
var _maintenanceDetail = require("./maintenanceDetail");
var _paymentTypes = require("./paymentTypes");
var _payments = require("./payments");
var _positions = require("./positions");
var _providers = require("./providers");
var _requestTypes = require("./requestTypes");
var _residentRequests = require("./residentRequests");
var _residents = require("./residents");
var _serviceContracts = require("./serviceContracts");
var _timekeeping = require("./timekeeping");
var _trainingSchedules = require("./trainingSchedules");
var _users = require("./users");
var _utilityContracts = require("./utilityContracts");
var _w4Forms = require("./w4Forms");

function initModels(sequelize) {
  var admins = _admins(sequelize, DataTypes);
  var apartmentRentals = _apartmentRentals(sequelize, DataTypes);
  var assetInspections = _assetInspections(sequelize, DataTypes);
  var assets = _assets(sequelize, DataTypes);
  var buildingDocuments = _buildingDocuments(sequelize, DataTypes);
  var buildings = _buildings(sequelize, DataTypes);
  var candidates = _candidates(sequelize, DataTypes);
  var employeeContracts = _employeeContracts(sequelize, DataTypes);
  var employeeDetails = _employeeDetails(sequelize, DataTypes);
  var employeeLeave = _employeeLeave(sequelize, DataTypes);
  var employeePerformance = _employeePerformance(sequelize, DataTypes);
  var employees = _employees(sequelize, DataTypes);
  var i9Forms = _i9Forms(sequelize, DataTypes);
  var maintenance = _maintenance(sequelize, DataTypes);
  var maintenanceDetail = _maintenanceDetail(sequelize, DataTypes);
  var paymentTypes = _paymentTypes(sequelize, DataTypes);
  var payments = _payments(sequelize, DataTypes);
  var positions = _positions(sequelize, DataTypes);
  var providers = _providers(sequelize, DataTypes);
  var requestTypes = _requestTypes(sequelize, DataTypes);
  var residentRequests = _residentRequests(sequelize, DataTypes);
  var residents = _residents(sequelize, DataTypes);
  var serviceContracts = _serviceContracts(sequelize, DataTypes);
  var timekeeping = _timekeeping(sequelize, DataTypes);
  var trainingSchedules = _trainingSchedules(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var utilityContracts = _utilityContracts(sequelize, DataTypes);
  var w4Forms = _w4Forms(sequelize, DataTypes);

  employees.belongsToMany(maintenance, { as: 'maintenanceId_maintenances', through: maintenanceDetail, foreignKey: "employeeId", otherKey: "maintenanceId" });
  maintenance.belongsToMany(employees, { as: 'employeeId_employees', through: maintenanceDetail, foreignKey: "maintenanceId", otherKey: "employeeId" });
  assetInspections.belongsTo(assets, { as: "asset", foreignKey: "assetId"});
  assets.hasMany(assetInspections, { as: "assetInspections", foreignKey: "assetId"});
  apartmentRentals.belongsTo(buildings, { as: "building", foreignKey: "buildingId"});
  buildings.hasMany(apartmentRentals, { as: "apartmentRentals", foreignKey: "buildingId"});
  assets.belongsTo(buildings, { as: "building", foreignKey: "buildingId"});
  buildings.hasMany(assets, { as: "assets", foreignKey: "buildingId"});
  buildingDocuments.belongsTo(buildings, { as: "building", foreignKey: "buildingId"});
  buildings.hasMany(buildingDocuments, { as: "buildingDocuments", foreignKey: "buildingId"});
  maintenance.belongsTo(buildings, { as: "building", foreignKey: "buildingId"});
  buildings.hasMany(maintenance, { as: "maintenances", foreignKey: "buildingId"});
  assetInspections.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(assetInspections, { as: "assetInspections", foreignKey: "employeeId"});
  employeeContracts.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(employeeContracts, { as: "employeeContracts", foreignKey: "employeeId"});
  employeeDetails.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(employeeDetails, { as: "employeeDetails", foreignKey: "employeeId"});
  employeeLeave.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(employeeLeave, { as: "employeeLeaves", foreignKey: "employeeId"});
  employeePerformance.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(employeePerformance, { as: "employeePerformances", foreignKey: "employeeId"});
  i9Forms.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(i9Forms, { as: "i9Forms", foreignKey: "employeeId"});
  maintenanceDetail.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(maintenanceDetail, { as: "maintenanceDetails", foreignKey: "employeeId"});
  residentRequests.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(residentRequests, { as: "residentRequests", foreignKey: "employeeId"});
  timekeeping.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(timekeeping, { as: "timekeepings", foreignKey: "employeeId"});
  trainingSchedules.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(trainingSchedules, { as: "trainingSchedules", foreignKey: "employeeId"});
  w4Forms.belongsTo(employees, { as: "employee", foreignKey: "employeeId"});
  employees.hasMany(w4Forms, { as: "w4Forms", foreignKey: "employeeId"});
  maintenanceDetail.belongsTo(maintenance, { as: "maintenance", foreignKey: "maintenanceId"});
  maintenance.hasMany(maintenanceDetail, { as: "maintenanceDetails", foreignKey: "maintenanceId"});
  payments.belongsTo(paymentTypes, { as: "paymentType", foreignKey: "paymentTypeId"});
  paymentTypes.hasMany(payments, { as: "payments", foreignKey: "paymentTypeId"});
  candidates.belongsTo(positions, { as: "position", foreignKey: "positionId"});
  positions.hasMany(candidates, { as: "candidates", foreignKey: "positionId"});
  employees.belongsTo(positions, { as: "position", foreignKey: "positionId"});
  positions.hasMany(employees, { as: "employees", foreignKey: "positionId"});
  serviceContracts.belongsTo(providers, { as: "provider", foreignKey: "providerId"});
  providers.hasMany(serviceContracts, { as: "serviceContracts", foreignKey: "providerId"});
  residentRequests.belongsTo(requestTypes, { as: "requestType", foreignKey: "requestTypeId"});
  requestTypes.hasMany(residentRequests, { as: "residentRequests", foreignKey: "requestTypeId"});
  apartmentRentals.belongsTo(residents, { as: "resident", foreignKey: "residentId"});
  residents.hasMany(apartmentRentals, { as: "apartmentRentals", foreignKey: "residentId"});
  payments.belongsTo(residents, { as: "resident", foreignKey: "residentId"});
  residents.hasMany(payments, { as: "payments", foreignKey: "residentId"});
  residentRequests.belongsTo(residents, { as: "resident", foreignKey: "residentId"});
  residents.hasMany(residentRequests, { as: "residentRequests", foreignKey: "residentId"});
  admins.belongsTo(users, { as: "admin", foreignKey: "adminId"});
  users.hasOne(admins, { as: "admin", foreignKey: "adminId"});
  employees.belongsTo(users, { as: "employee", foreignKey: "employeeId"});
  users.hasOne(employees, { as: "employee", foreignKey: "employeeId"});
  residents.belongsTo(users, { as: "resident", foreignKey: "residentId"});
  users.hasOne(residents, { as: "resident", foreignKey: "residentId"});

  return {
    admins,
    apartmentRentals,
    assetInspections,
    assets,
    buildingDocuments,
    buildings,
    candidates,
    employeeContracts,
    employeeDetails,
    employeeLeave,
    employeePerformance,
    employees,
    i9Forms,
    maintenance,
    maintenanceDetail,
    paymentTypes,
    payments,
    positions,
    providers,
    requestTypes,
    residentRequests,
    residents,
    serviceContracts,
    timekeeping,
    trainingSchedules,
    users,
    utilityContracts,
    w4Forms,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
