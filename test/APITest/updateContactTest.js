let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8081';

describe('API para actualizar un contacto con id especifico: ', () => {
    context('Actualizar todos los campos de un contacto con información valida: ', () => {
        it('Debe actualizar el contacto con la informacion proporcionada', (done) => {
            let id = 27;
            chai.request(url)
                .patch('/api/contact/' + id)
                .send({
                    nombre: "Test",
                    primerApellido: "Testing",
                    segundoApellido: "Testeo",
                    email: "testing@testing.com",
                    telefono: "911112222"
                })
                .end(function (err, res) {
                    console.log("Resultado: ", res.body.contact);
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    context('Actualizar un contacto sin ingresar el nombre: ', () => {
        it('Debe obtener mensaje de error indicando que falta el nombre', (done) => {
            let id = 27;
            chai.request(url)
                .patch('/api/contact/' + id)
                .send({
                    nombre: "",
                    primerApellido: "Testing",
                    segundoApellido: "Testeo",
                    email: "testing@testing.com",
                    telefono: "911112222"
                })
                .end(function (err, res) {
                    console.log("Resultado: ", res.body.error);
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    context('Actualizar un contacto sin ingresar el primer apellido: ', () => {
        it('Debe obtener mensaje de error indicando que falta el primer apellido', (done) => {
            let id = 27;
            chai.request(url)
                .patch('/api/contact/' + id)
                .send({
                    nombre: "Test",
                    primerApellido: "",
                    segundoApellido: "Testeo",
                    email: "testing@testing.com",
                    telefono: "911112222"
                })
                .end(function (err, res) {
                    console.log("Resultado: ", res.body.error);
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    context('Actualizar un contacto sin ingresar el segundo apellido: ', () => {
        it('Debe obtener mensaje de error indicando que falta el segundo apellido', (done) => {
            let id = 27;
            chai.request(url)
                .patch('/api/contact/' + id)
                .send({
                    nombre: "Test",
                    primerApellido: "Testing",
                    segundoApellido: "",
                    email: "testing@testing.com",
                    telefono: "911112222"
                })
                .end(function (err, res) {
                    console.log("Resultado: ", res.body.error);
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    context('Actualizar un contacto ingresando un email con formato invalido: ', () => {
        it('Debe obtener mensaje de error indicando que debe ingresar un email valido', (done) => {
            let id = 27;
            chai.request(url)
                .patch('/api/contact/' + id)
                .send({
                    nombre: "Test",
                    primerApellido: "Testing",
                    segundoApellido: "Testeo",
                    email: "INCORRECTO",
                    telefono: "911112222"
                })
                .end(function (err, res) {
                    console.log("Resultado: ", res.body.error);
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });

    context('Actualizar un contacto ingresando un telefono con formato invalido: ', () => {
        it('Debe obtener mensaje de error indicando que debe ingresar un telefono valido', (done) => {
            let id = 27;
            chai.request(url)
                .patch('/api/contact/' + id)
                .send({
                    nombre: "Test",
                    primerApellido: "Testing",
                    segundoApellido: "Testeo",
                    email: "testing@testing.com",
                    telefono: "INCORRECTO"
                })
                .end(function (err, res) {
                    console.log("Resultado: ", res.body.error);
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
});