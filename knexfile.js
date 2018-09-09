// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/virus'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/test-virus'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
