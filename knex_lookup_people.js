//Script for KNEX SQL 'famous_people' lookup.

let input = process.argv[2];

const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    ssl  : true,
    port : settings.port,
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.select().from('famous_people').where(function (){
  this.where(
    'first_name', 'like', input, '%'
  ).orWhere(
    'last_name', 'like', input, '%'
  )
}).timeout(1000).asCallback(function (err, result){
  if(err){ throw err; }
  console.log("Searching...");
  console.log(`Found 1 person(s) by the name '${input}':`);
  var result = result[0];
  console.log(`- ${result.id}: ${result.first_name} ${result.last_name}, born ${result.birthdate.toDateString()}`);
}).finally(function(){
  knex.destroy();
});