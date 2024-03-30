const app = require("./app");

const port = process.env.PORT || 8000;
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = server;
