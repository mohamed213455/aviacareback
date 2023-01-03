const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const connectDB = require('./Database/Connection')
const cors = require('cors');


const cloudinary = require("./config/cloudinary");
const uploader = require("./config/multer");


const app = express();

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('dev'));
app.options('*', cors());
app.use(cors());
//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.post("/upload", uploader.single("image"), async (req, res) => {
    const upload = await cloudinary.v2.uploader.upload(req.file.path);
    return res.json({
      success: true,
      file: upload.secure_url,
    });
  });

//load routers
app.use("/User", require('./Routes/UserRouter'));
app.use("/Appointment", require('./Routes/AppointmentRouter'));


app.listen(PORT, () => { console.log(`server is running on http://localhost:${PORT}`) }); 