const express = require("express");
const bodyParser = require("body-parser");
const PassengerRouter = require("./routes/passengers");
const indexRouter=require('./routes/index')
require('./mongo-connection')

const app = express();
app.use(bodyParser.json());

app.set("view engine", "pug");

app.use('/passengers',PassengerRouter)
app.use('/',indexRouter)



app.listen(3000, () => {
  console.log("started listening on 3000");
});
