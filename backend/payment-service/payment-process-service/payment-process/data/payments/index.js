'use strict';
const utils=require('../utils');
const dbconfig=require('../../dbconfig');
const sql=require('mssql');

const getPayments = async()=>{
    try {
        let pool = await sql.connect(dbconfig.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const list = await pool.request().query(sqlQueries.paymentList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async(paymentId) =>{
    try {
        let pool = await sql.connect(dbconfig.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const onePayment = await pool.request()
                                    .input('paymentId',sql.Int, paymentId)
                                    .query(sqlQueries.paymentById)

    return onePayment.recordset;
    } catch (error) {
        
    }
}

const createPayment = async(paymentData)=>{
    try {
        let pool = await sql.connect(dbconfig.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const insertPayment = await pool.request()
                                    .input('residentId', sql.Int, paymentData.residentId)
                                    .input('paymentDate', sql.Date, paymentData.paymentDate)
                                    .input('paymentTypeId', sql.Int, paymentData.paymentTypeId)
                                    .input('amount', sql.Decimal(10,2), paymentData.amount)
                                    .input('paymentMethod', sql.VarChar(50), paymentData.PaymentMethod)
                                    .input('deflag', sql.Int, paymentData.deflag)
                                    .query(sqlQueries.createPayment)
                                
            return insertPayment.recordset;
    } catch (error) {
        return error.message;
    }
}

const updatePayment = async(paymentData)=>{
try {
    let pool = await sql.connect(dbconfig.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const updatePayment = await pool.request()
                            .input('paymentId', sql.Int, paymentData.paymentId)
                            .input('residentId', sql.Int, paymentData.residentId)
                            .input('paymentDate', sql.Date, paymentData.paymentDate)
                            .input('paymentTypeId', sql.Int, paymentData.paymentTypeId)
                            .input('amount', sql.Decimal(10,2), paymentData.amount)
                            .input('paymentMethod', sql.VarChar(50), paymentData.PaymentMethod)
                            .input('deflag', sql.Int, paymentData.deflag)
                            .query(sqlQueries.updatePayment)
            return updatePayment.recordset;           
} catch (error) {
    return error.message;
} 
}

const deletePayment = async(paymentId) =>{
try {
    let pool = await sql.connect(dbconfig.sql);
        const sqlQueries = await utils.loadSqlQueries('payments');
        const deletePayment = await pool.request()
                            .input('paymentId', sql.Int,paymentId)
                            .query(sqlQueries.deletePayment)

    return deletePayment.recordset;
} catch (error) {
    return error.message;
}
}

module.exports = {
    getPayments,
    getById,
    createPayment,
    updatePayment,
    deletePayment
}
