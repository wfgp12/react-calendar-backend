const express = require("express")
require("dotenv").config();
const cors = require("cors");

const { dbConnection } = require('./database/config');

const app = express();
dbConnection();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})