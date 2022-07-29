var sqlite3 = require('sqlite3').verbose();

const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database.');

        var createTableQuery = `CREATE TABLE Contacto (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre text,
            primerApellido text,
            segundoApellido text,
            email text,
            telefono text
            )`

        db.run(createTableQuery, (err) => {
            if (err) {
                // La tabla de contactos ya existe.
            }
        });
    }
});

module.exports = db;