let inFirstName = process.argv[2];
let inLastName = process.argv[3];
let inBirthdate = process.argv[4];


const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    ssl  : true,
    port : settings.port,
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
      acquireConnectionTimeout: 1000
  }
});

knex.insert({
  first_name: `${inFirstName}`,
  last_name: `${inLastName}`,
  birthdate: `${inBirthdate}`
}).into('famous_people').then(function (success) {
  console.log("Successfully added to table")
}).finally(function() {
  knex.destroy();
});
