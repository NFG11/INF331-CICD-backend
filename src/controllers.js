var db = require("./database");
const { isEmailValid, isPhoneValid } = require("./utils");

// Obtener todos los contactos
const getContacts = (req, res, next) => {
    var sql = "SELECT * FROM Contacto";
    var params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ 
                "message": "error",
                "error": err.message
             });
            return;
        }
        res.json({
            "message": "success",
            "contacts": rows
        });
    });
}

// Obtener el contacto con el id especifico
const getContact = (req, res, next) => {
    var sql = "SELECT * FROM Contacto WHERE id = ?";
    var params = [req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ 
                "message": "error",
                "error": err.message
            });
            return;
        }

        if (!row) {
            res.status(404).json({
                "message": "error",
                "error": "no contact"
            });
            return;
        }

        res.json({
            "message": "success",
            "contact": row
        });
    });
}

// Crear un contacto
const newContact = (req, res, next) => {
    var existErrors = false;
    var errors = {
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        email: "",
        telefono: ""
    };

    if (!req.body.nombre) {
        errors.nombre = "Debe ingresar un nombre";
        existErrors = true;
    }
    if (!req.body.primerApellido) {
        errors.primerApellido = "Debe ingresar un primer apellido";
        existErrors = true;
    }
    if (!req.body.segundoApellido) {
        errors.segundoApellido = "Debe ingresar un segundo apellido";
        existErrors = true;
    }
    if (!isEmailValid(req.body.email)) {
        errors.email = "Debe ingresar un email valido";
        existErrors = true;
    }
    if (!isPhoneValid(req.body.telefono)) {
        errors.telefono = "Debe ingresar un telefono valido";
        existErrors = true;
    }

    if (existErrors) {
        res.status(400).json({
            "message": "error",
            "error": errors
        });
        return;
    }

    var data = {
        nombre: req.body.nombre.slice(0, 50),
        primerApellido: req.body.primerApellido.slice(0, 50),
        segundoApellido: req.body.segundoApellido.slice(0, 50),
        email: req.body.email.slice(0, 254),
        telefono: req.body.telefono.slice(0, 9)
    };

    var sql = "INSERT INTO Contacto (nombre, primerApellido, segundoApellido, email, telefono) VALUES (?,?,?,?,?)";
    var params = [data.nombre, data.primerApellido, data.segundoApellido, data.email, data.telefono];
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ 
                "message": "db error",
                "error": err.message 
            })
            return;
        }
        res.json({
            "message": "success",
            "contact": data,
        });
    });
}

// Actualiza un contacto
const updateContact = (req, res, next) => {
    var existErrors = false;
    var errors = {
        nombre: "",
        primerApellido: "",
        segundoApellido: "",
        email: "",
        telefono: ""
    };

    if (!req.body.nombre) {
        errors.nombre = "Debe ingresar un nombre";
        existErrors = true;
    }
    if (!req.body.primerApellido) {
        errors.primerApellido = "Debe ingresar un primer apellido";
        existErrors = true;
    }
    if (!req.body.segundoApellido) {
        errors.segundoApellido = "Debe ingresar un segundo apellido";
        existErrors = true;
    }
    if (!isEmailValid(req.body.email)) {
        errors.email = "Debe ingresar un email valido";
        existErrors = true;
    }
    if (!isPhoneValid(req.body.telefono)) {
        errors.telefono = "Debe ingresar un telefono valido";
        existErrors = true;
    }

    if (existErrors) {
        res.status(400).json({
            "message": "error",
            "error": errors
        });
        return;
    }

    var data = {
        nombre: req.body.nombre.slice(0, 50),
        primerApellido: req.body.primerApellido.slice(0, 50),
        segundoApellido: req.body.segundoApellido.slice(0, 50),
        email: req.body.email.slice(0, 254),
        telefono: req.body.telefono.slice(0, 9)
    };

    var sql = `UPDATE Contacto SET 
        nombre=COALESCE(?,nombre), 
        primerApellido=COALESCE(?,primerApellido), 
        segundoApellido=COALESCE(?,segundoApellido),
        email=COALESCE(?,email),
        telefono=COALESCE(?,telefono)
        WHERE id = ?`
    var params = [data.nombre, data.primerApellido, data.segundoApellido, data.email, data.telefono, req.params.id];

    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ 
                "message": "error",
                "error": err.message
            })
            return;
        }
        res.json({
            "message": "success",
            "contact": data
        });
    });
}

// Elimina un contacto
const deleteContact = (req, res, next) => {
    var sql = "DELETE FROM Contacto WHERE id = ?";
    var params = [req.params.id];
    db.run(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ 
                "message": "error",
                "error": err.message
             })
            return;
        }

        res.json({
            "message": "success"
        });
    });
}

module.exports = {
    getContacts,
    getContact,
    newContact,
    updateContact,
    deleteContact
}