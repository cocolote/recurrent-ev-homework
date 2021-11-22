/**
 * Service to read EV data. At this time is just getting the data from a csv
 * file but maybe in the future it will have to change to a database or an
 * API.
 */
const fs = require('fs');
const path = require('path');
const csv = require('csvtojson');

const getAll = async filePath => {
  const evData = await csv().fromFile(filePath);
};

const __getFilePath = inPath => {
  // Resolve and validate the provided path
  const filePath = path.resolve(__basedir, inPath);
  // Check if file exists
  if (!fs.existsSync(filePath))
    throw new Error('File not found');

  return filePath;
};


const chargedAbove = async (inPath, percent) => {
  const filePath = __getFilePath(inPath);
  // param should be a number between 0 and 1.
  if (isNaN(+percent) || +percent > 1)
    throw new Error('Charge value has to be a number between 0 and 1');

  const evData = await csv().fromFile(filePath);
  // get a list of vehicles ids that have a charge reading above the requested
  // value.
  const vehiclesSet = new Set();
  evData.forEach(vehicle => {
    if (+vehicle.charge_reading > +percent) {
      vehiclesSet.add(vehicle.vehicle_id);
    }
  });
  return vehiclesSet.size;
};

const avgDailyMiles = async (inPath, vehicleId) => {
  const filePath = __getFilePath(inPath);
  // vehicleId is required
  if (!vehicleId) throw new Error('Missing vehicle id');

  const evData = await csv().fromFile(filePath);
  let minMiles = 0;
  let maxMiles = 0;
  let rowCount = 0;

  evData.forEach(veh => {
    if (veh.vehicle_id === vehicleId) {
      if (!minMiles || veh.odometer < minMiles) minMiles = veh.odometer;
      if (veh.odometer > maxMiles) maxMiles = veh.odometer;
      rowCount++;
    }
  });

  if (rowCount === 0) return 0;

  return +((maxMiles - minMiles) / rowCount).toFixed(2);
};

module.exports = {
  getAll,
  chargedAbove,
  avgDailyMiles,
};
