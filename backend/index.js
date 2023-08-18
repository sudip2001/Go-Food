const express = require("express");
const app = express();
const port = 5000;
const mongoURI = require("./db");
const mongoose = require("mongoose");
const path = require("path");
const apiHandeler = require("./Routes/CreateUser");
// const display = require("./Routes/DisplayData");
// const order=require("./Routes/Orderdata")

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      const FoodItem = mongoose.connection.db.collection("food_items");
      const data = await FoodItem.find({}).toArray();

      const foodCategory = await mongoose.connection.db.collection(
        "foodCategory"
      );
      const catData = await foodCategory.find({}).toArray();

      global.food_items = data;
      global.foodCategory = catData;
      // console.log("Data fetched successfully:", global.food_items, global.foodCategory);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  })
  .catch((err) => {
    console.log(`Unable to connect to MongoDB: ${err}`);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", apiHandeler);
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/Orderdata"));
// app.use("/api", order);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
