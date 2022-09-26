module.exports = {
  "development": {
    "storage": 'city_archive.sqlite',
    "dialect": "sqlite"
  },
  "test": {
    "storage": 'city_archive.test.sqlite',
    "dialect": "sqlite"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
