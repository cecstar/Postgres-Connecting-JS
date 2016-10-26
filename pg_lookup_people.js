//Script for Postgres SQL 'famous_people' lookup.

const inputs = process.argv[2];
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(`SELECT * FROM famous_people WHERE first_name=$1 OR last_name = $1;`, [inputs], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    var results = result.rows[0];
    console.log(`Found 1 person(s) by the name: '${inputs}': - ${results.id}: ${results.first_name} ${results.last_name}, born '${results.birthdate.toDateString()}'`);
    client.end();
  });
});
