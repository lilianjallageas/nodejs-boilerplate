# NodeJS Backend Boilerplate

The goal of this repository is to provide a template for NodeJS 'REST API' backend.
This backend is:
- Written in NodeJS
- Exposes REST API
- Stores the data in MongoDB

# Requirements

- npm [https://www.npmjs.com/]
- MongoDB [https://www.mongodb.org/], and RoboMongo [http://robomongo.org/] to visualize the database.
- NodeJS [nodejs.org]
- supervisor (only for dev, used to automatically restart the server when changes are made in the source code). To install it, `npm install supervisor -g`


# How to install it?

Once you checked out the code, cd into the root folder of the app.
Then execute `npm install`. This will install of the dependencies (NodeJS modules) declared in the package.json file.
Now, start MongoDB, open MongoDB (using RoboMongo), and create a connection to the localhost DB.

# How to run it?

For production: 

- Run `NODE_ENV=prod node server.js`.

For development: 

- Start MongoDB: `mongod`.
- Load the fake data in the Database: `NODE_ENV=dev node ./test/load_fixtures.js`.(Use `SET NODE_ENV=dev` on Windows)
- Start the server: `NODE_ENV=dev supervisor server.js`. 
Supervisor will relaunch the app each time a change is made to the source code.


# How to debug?

- Install node-inspector: `npm install -g node-inspector`
- Run the server in 'debug' mode: `NODE_ENV=dev node-debug server.js`


# How to run the tests?
First, you need to have mocha globally installed. To do so, run `npm install -g mocha`.
Then, reload the fixtures (see previous point) because the assumptions in the tests are based on the fixtures. The fixtures need to be reloaded EVERYTIME before running the test suite.
Now, run the tests: 
`NODE_ENV=dev mocha ./test/userRoutesSpec.js`, 

... To be completed ...


# How to deploy on Heroku

... To be completed ...

