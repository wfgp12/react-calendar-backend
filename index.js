const express = require("express")
require("dotenv").config();
const { dbConnection } = require('./database/config');

const app = express();
dbConnection();

app.use(express.static("public"));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})