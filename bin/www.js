const app = require("../app");
const db = require("../db/models");
const PORT = process.env.PORT || 3000;

db.dbConnect();
app.listen(PORT, () => {
    console.log("SERVER IS RUNNING ON THE PORT " + PORT);
})