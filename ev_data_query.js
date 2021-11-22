const evDataSrvc = require('./lib/ev_data_srvc');
// set base dir to the root.
global.__basedir = __dirname;

async function main({ inPath, query, param }) {
  switch(query) {
    case 'charged_above':
      const carsCount = await evDataSrvc.chargedAbove(inPath, param);
      console.log(`Found ${carsCount} vehicles`);
      break;
    case 'average_daily_miles':
      const avgMillage = await evDataSrvc.avgDailyMiles(inPath, param);
      console.log(`"${param}" average daily miles: ${avgMillage}`);
      break;
    default:
      console.log(`
The provided query is not curretly supported

Valid queries:
  - charged_above: Returns the number of vehicles that reported at least one charge above the provided value.
  - average_daily_miles: Returns the average daily miles driven by the requested vehicle.

Example:
  $ node ev_data_query /path/to/data charged_above 0.33
  $ node ev_data_query /path/to/data average_daily_miles cat-car
      `);
  };
};

// Remove node and the name of the script to only get the args we need to
// execute the queris.
const args = process.argv.slice(2);
main({ inPath: args[0], query: args[1], param: args[2] });
