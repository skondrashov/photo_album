const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("*subject", function (_req, res) {
  res.sendFile("./public/index.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
