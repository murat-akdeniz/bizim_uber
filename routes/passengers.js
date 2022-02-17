const router=require('express').Router()


const flatted = require("flatted");
const { passengerDatabase, driverDatabase } = require("../database");

router.get("/", async (req, res) => {
  const passengers = await passengerDatabase.load();

  res.render("passengers", { passengers });
});

router.get("/:passengerId", async (req, res) => {
  const passenger = await passengerDatabase.find(req.params.passengerId);

  if (!passenger) return res.status(404).send("Cannot find passenger");

  res.render("passenger", { passenger });
});

router.post("/", async (req, res) => {
  const passenger = await passengerDatabase.insert(req.body);

  res.send(passenger);
});

router.post("/:passengerId/bookings", async (req, res) => {
  const { passengerId } = req.params;
  const { driverId, origin, destination } = req.body;

  const passenger = await passengerDatabase.find(passengerId);

  const driver = await driverDatabase.find(driverId);

  passenger.book(driver, origin, destination);

  await passengerDatabase.update(passenger);

  res.send(flatted.stringify(passenger));
});

router.delete("/:passengerId", async (req, res) => {
  await passengerDatabase.removeBy("_id", req.params.passengerId);
  res.send("OK");
});

router.get("/drivers/:driverId", async (req, res) => {
  const driver = await driverDatabase.find(req.params.driverId);

  if (!driver) return res.status(404).send("Cannot find driver");

  res.render("driver", { driver });
});

router.get("/drivers", async (req, res) => {
  const drivers = await driverDatabase.load();

  res.render("drivers", { drivers });
});

router.patch('/:passengerId',async(req,res) => {
  const {name}=req.body
  const {passengerId}=req.params

  await passengerDatabase.update(passengerId,{name})
})

module.exports=router
