let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8081';

describe('API para agregar un nuevo contacto: ', () => {
    context('Agregar un contacto con información valida: ', () => {
        it('Debe agregar el nuevo contacto', (done) => {
            chai.request(url)
                .post('/api/contact')
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

    context('Agregar un contacto sin ingresar el nombre: ', () => {
        it('Debe obtener mensaje de error indicando que falta el nombre', (done) => {
            chai.request(url)
                .post('/api/contact')
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

    context('Agregar un contacto sin ingresar el primer apellido: ', () => {
        it('Debe obtener mensaje de error indicando que falta el primer apellido', (done) => {
            chai.request(url)
                .post('/api/contact')
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

    context('Agregar un contacto sin ingresar el segundo apellido: ', () => {
        it('Debe obtener mensaje de error indicando que falta el segundo apellido', (done) => {
            chai.request(url)
                .post('/api/contact')
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

    context('Agregar un contacto ingresando un email con formato invalido: ', () => {
        it('Debe obtener mensaje de error indicando que debe ingresar un email valido', (done) => {
            chai.request(url)
                .post('/api/contact')
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

    context('Agregar un contacto ingresando un telefono con formato invalido: ', () => {
        it('Debe obtener mensaje de error indicando que debe ingresar un telefono valido', (done) => {
            chai.request(url)
                .post('/api/contact')
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