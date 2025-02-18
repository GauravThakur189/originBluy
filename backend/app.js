const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const port = 1000;
const cors = require("cors")
const UserApi = require('./routes/user')
const MediaRoutes = require('./routes/media')
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://rajanthakur1818:9eSSLxb52RAQ1fPy@cluster0.nceyh.mongodb.net/originBluy?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));


app.use('/api/v1',UserApi)
app.use('/api/v1',UserApi)
app.use("/api/v2", MediaRoutes);



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})