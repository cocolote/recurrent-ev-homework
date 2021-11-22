# recurrent-ev-homework
Recurrent homework assignment. This script allows the user to execute predefined queries from the command line to get some insights of the state of the vehicles we are tracking.

Submission by Ezequiel Lopez 11/21/2021

**Dependencies**

* node v16.13

**Installation**

Clone repo, navigate into the root directory and then execute

* `yarn` _to install packages_

**Run a query**

Within the root directory of the script run the following

```
$ yarn query /path/to/csv <query_name> param
```

or you can also execute it like

```
$ node ev_data_query.js /path/to/csv <query_name> param
```

The two supported queries at the moment are

* `charged_above`: Returns the number of vehicles that reported at least on charge above the provided param. The param has to be a number between 0 and 1
* `average_daily_miles`: Returns the average daily miles driven by the requested vehicle. The param has to be a vehicle id (string).

**Run test**

Whitin the root directory of the script run `yarn test` to run all tests suites.

**Pending to implement**

As a user
I would like to see the number of vehicles that haven't been driven in an specific date
So I can create metricts for our insurance partners.

_New query description:_

* Name: `drove_nowhere`
* Param will be a date in the following format `yyyy-mm-dd`

_How it will be use_

```
$ yarn query /path/to/csv drove_nowhere 2021-11-20
```

_Suggested implementation:_

Find per vehicle a read created on the requested date and the closes previous on. Calculate the delta between the odometer values of both records and if it is equal to 0 then add the vehicle to the count.


**Extra notes**

When I started to implement the script I wanted to designed in a way that can be expandable. The main script takes care mostly of reading the input from the command line and getting the arguments. I separated the logic to get the data into a service, with the idea that in the future it would be necessary to get the data from a different source, maybe an API so then the main logic wouldn't have to change.

One thing that would like to improve would be to move from positional arguments to flag type. This makes the script easier to use and also it could provide better error messages if a required argument is missing.
