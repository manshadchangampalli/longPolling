import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
  import.meta?.url
);
let data = "Initial Data";
const responseForGetData = [];
const __dirname = dirname(__filename);
const app = express();

app.get("/", (req, res) => {
  res.sendFile(
    __dirname + "/index.html"
  );
});

app.get("/getData", (req, res) => {
  if (data !== req.query.data) {
    res.json({ data });
  } else {
    responseForGetData.push(res);
  }
});

app.get("/updateData", (req, res) => {
  data = req.query.data;
  while (
    responseForGetData.length > 0
  ) {
    const response =
      responseForGetData.pop();
    response.json({ data });
  }
  res.json({ success: "updated" });
});

const server = app.listen(8080, () => {
  console.log(
    "Server is running on port 8080"
  );
});
server.timeout = 50000;
