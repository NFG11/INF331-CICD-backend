let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:8081';

describe('API para eliminar un contacto: ', () => {
    it('Debe eliminar el contacto solicitado', (done) => {
        chai.request(url)
        .get('/api/contacts')
        .end(function (err, res) {
            console.log(...res.body.contacts.map(c => c.id));
            expect(res).to.have.status(200);

            let id = 28;
            chai.request(url)
            .del('/api/contact/' + id)
            .end(function (err, res) {
                expect(res).to.have.status(200);
                
                chai.request(url)
                .get('/api/contacts')
                .end(function (err, res) {
                    console.log(...res.body.contacts.map(c => c.id));
                    expect(res).to.have.status(200);
                    done();
                });
            });
        });
    });
});