const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = 3000;

//body-parser ek middleware hai jo request ko read aur samjhne layak format me convert karta hai
//taaki aap us data ko server side me easily access kar pao
//Express applications me jab bhi koi request aati hai, us request ka body data (jo form-data, JSON ya URL-encoded ho sakta hai) raw format me hota hai. 
//Body-parser middleware us raw data ko parse karke req.body property me store karta hai, jisse hum as a JavaScript object directly access kar sakte hain.
app.use(bodyParser.json());//app.use uske under middleware ko global processing stack me daal deta hai jisse wo har request ke liye chalega


mongoose
  .connect(`${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));



//Jab hum app.get('/foo', mw, function (req, res) { ... }) likhte hain, tab hum middleware ko sirf GET /foo request ke liye add karte hain.
//Iska matlab yeh middleware sirf us specific route par chalaya jayega.
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/order");

app.use("/auth", authRoutes);
app.use("/menu", menuRoutes);
app.use("/", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});