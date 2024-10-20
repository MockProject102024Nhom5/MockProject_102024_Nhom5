import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from 'body-parser';
import connection from './config/connectDB';
import initApiRoutes from "./routes/api";
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8386

configViewEngine(app);

//config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
connection();

initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log('>>> JWT BackEnd is running on the port = ' + PORT);
})