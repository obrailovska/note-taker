const express = require("express");

const PORT = process.env.PORT || 8080;
const app = express();
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// lets us use all css and js files in folder public
app.use(express.static("public"));

// parse incoming JSON data
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
