
exports.up = function(knex, Promise) {
    return knex.schema.createTable('virus_families', (table) =>{
        table.increments();
        table.text('name');
        table.text('genome_type');
        table.text('genome_length');
        table.text('enveloped');
        table.text('host');
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('virus_families')
};