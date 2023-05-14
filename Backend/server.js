const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));

//multer
app.use('/images', express.static(path.join(__dirname, 'images')));

// parse requests of content-type - application/json
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    next();
});



// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to Grupomania application." });
});







require("./app/routes/post.routes")(app);
require("./app/routes/turorial.routes")(app);
require("./app/routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});