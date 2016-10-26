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

knex.schema.createTable('albums', function (table) {

  table.increments('id');
  table.string('title', 50).notNullable();
  table.integer('year').notNullable();
  table.integer('artist_id').references('artists.id').onDelete('cascade');
  table.timestamps();

});

