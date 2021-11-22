const path = require('path');
const evDataSrvc = require('./ev_data_srvc');

describe('charged_above query', () => {
  beforeAll(() => {
    global.__basedir = __dirname;
  });

  test(
    'Returns the number of vehicles that reported a charge above the provided value.',
    async () => {
      const test1 = await evDataSrvc.chargedAbove(
        path.resolve(__dirname, 'ev_data.csv'),
        .33
      );
      const test2 = await evDataSrvc.chargedAbove(
        path.resolve(__dirname, 'ev_data.csv'),
        .99
      );
      expect(test1).toBe(5);
      expect(test2).toBe(4);
    }
  );

  test(
    'It fails if charge percent is not a number.',
    async () => {
      try {
        const test1 = await evDataSrvc.chargedAbove(
          path.resolve(__dirname, 'ev_data.csv'),
          'bbbw'
        );
      } catch(err) {
        expect(err.toString()).toMatch('Error');
      }
    }
  );
});

describe('average_daily_miles query', () => {
  beforeAll(() => {
    global.__basedir = __dirname;
  });

  test(
    'Returns the average daily millage for the requested vehicle.',
    async () => {
      const test1 = await evDataSrvc.avgDailyMiles(
        path.resolve(__dirname, 'ev_data.csv'),
        'cat-car'
      );
      const test2 = await evDataSrvc.avgDailyMiles(
        path.resolve(__dirname, 'ev_data.csv'),
        'hamster-car'
      );
      expect(test1).toBe(9.38);
      expect(test2).toBe(1.46);
    }
  );

  test(
    'It fails if vehicle name is not included.',
    async () => {
      try {
        const test1 = await evDataSrvc.avgDailyMiles(
          path.resolve(__dirname, 'ev_data.csv')
        );
      } catch(err) {
        expect(err.toString()).toMatch('Error');
      }
    }
  );
});
