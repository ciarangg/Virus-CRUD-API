const database = require("./database-connection")

module.exports = {
    getAll() {
        return database('virus_families');
    },

    getOne(id) {
        return database('virus_families').where('id', id).first();
    },
    create(virusFamilyPost) {
        return database('virus_families').insert(virusFamilyPost).returning('*').then(record => record[0]);
    },
    update(id, virusFamily) {
        return database('virus_families').where('id', id).update(virusFamily, '*');
    },
    delete(id) {
        return database('virus_families').where('id', id).del();
    }
}