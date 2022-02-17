const Passenger = require("./models/passenger");
const Driver = require("./models/driver");
const passengerDatabase = require("./database/passenger-database");
const driverDatabase = require("./database/driver-database");

const printBookingHistory = require("./lib/print-booking-history");

const armagan = Passenger.create({ name: "Armagan", location: "Kreuzberg" });
const mert = Passenger.create({ name: "Mert", location: "Mitte" });
const stefan = Driver.create({ name: "Stefan", location: "Treptower Park" });

armagan.book(stefan, "Kreuzberg", "Neukolln");
armagan.book(stefan, "Neukolln", "Mitte");
armagan.book(stefan, "Mitte", "Kreuzberg");
armagan.book(stefan, "Kreuzberg", "SXF");
mert.book(stefan, "Mitte", "Kreuzberg");

/* console.log("write dbs");

passengerDatabase.save([armagan, mert]).then(() => {
  console.log("wrote passenger");

  driverDatabase.save([stefan]).then(() => {
    console.log("done");

    const betul = Passenger.create({ name: "Betul", location: "Tegel" });

    passengerDatabase
      .insert(betul)
      .then(() => passengerDatabase.load())
      .then((passengers) => {
        passengers.forEach(printBookingHistory);
      });
  });
}); */

async function main() {
  try {
    await passengerDatabase.save([armagan, mert]);
    await driverDatabase.save([stefan]);
    const betul = Passenger.create({ name: "Betul", location: "Tegel" });
    await passengerDatabase.insert(betul);
    const passengers = await passengerDatabase.load();
    passengers.forEach(printBookingHistory);
  } catch (err) {
    console.log(err)
  }

}

main()

/* passengerDatabase.save([armagan, mert], () => {
  console.log("wrote passenger");
  driverDatabase.save([stefan], () => {
    console.log("done");
    const betul = Passenger.create({ name: "Betul", location: "Tegel" });
    passengerDatabase.insert(betul,() => {
      passengerDatabase.load((err,passengers) => {
        passengers.forEach(printBookingHistory);
      });
      
    });    
  });
}); */

// const ucak='hey'
