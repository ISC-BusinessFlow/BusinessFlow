import express from "express";

import flowController from "./controller/flowController";


const app = express();
app.use(express.json());

app.use("/flows", flowController);

export default app;
