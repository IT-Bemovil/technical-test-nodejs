require("dotenv").config();

const app = require("./app");
const { conn } = require("../src/config/db") ;


const PORT = process.env.PORT ;


conn.sync({ force: false }).then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`%s listening at ${PORT}`);
    });
});