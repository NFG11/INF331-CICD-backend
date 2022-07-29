let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8081';

describe('API para obtener todos los contactos: ', () => {
    it('Debe obtener todos los contactos', (done) => {
        chai.request(url)
            .get('/api/contacts')
            .end(function (err, res) {
                console.log("Resultado: ", res.body.contacts);
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('API para obtener contacto con id especifico: ', () => {
    context('Con id de un contacto existente: ', () => {
        it('Debe obtener el contacto solicitado', (done) => {
            let id = 1;
            chai.request(url)
                .get('/api/contact/' + id)
                .end(function (err, res) {
                    console.log("Resultado: ", res.body.contact);
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    context('Con id de un contacto que no existe: ', () => {
        it('Debe obtener mensaje de error indicando que no existe el contacto', (done) => {
            let id = 999999;
            chai.request(url)
                .get('/api/contact/' + id)
                .end(function (err, res) {
                    console.log("Resultado: ", res.body.error);
                    expect(res).to.have.status(404);
                    done();
                });
        });
    });
});