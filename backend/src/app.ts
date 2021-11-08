import express from "express";

import flowController from "./controller/flowController";


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("hello express\n");
});

app.use("/flows", flowController);

export default app;
