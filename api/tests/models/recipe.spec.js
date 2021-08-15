const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');
const { db } = require('../models');
const { Page } = require('../models');
const expect = require('chai').expect;

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Recipe.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });
    });
  });
});


// describe('Model Testing', function() {
//   afterAll(async function() {
//     await db.sync({ force: true });
//     db.close();
//   })
//   describe('Page model', function () {
//     beforeEach(async function() {
//       await Page.sync({ force: true });
//     });
//     describe('Validations', function () {
//       it('error sin title', function(done) {
//          Page.create({
//           content: 'Hola',
//          })
//           .then(() => done('No debería haberse creado'))
//           .catch(() => done());
//       });
//       it('error sin content', function(done) {
//         Page.create({
//           title: 'hola',
//         })
//         .then(() => done('No deberia haberse creado'))
//         .catch(() => done());
//       });
//       it('error con un status invalido', function(done) {
//         Page.create({
//           title: 'hola',
//           content: 'hola',
//           status: 'esto no es un status valido'
//         })
//           .then(() => done('No debería haberse creado'))
//           .catch(() => done());
//       });
//     });
//     describe('Virtuals', function () {
//       let page;
//       // before(function(){
//         page = Page.build({
//           title: 'hola',
//           content: 'hola **chau**',
//           urlTitle: 'hola',
//         });
//       // })
//       describe('route', function () {
//         it('devuelve el url_name anexado a "/pages/"', function (){
//           expect(page.route).to.equal('/pages/'+page.urlTitle);
//         });
//       });
//     });

//     describe('Hooks', function () {
//       it('setea urlTitle basado en title antes de validar ', function() {
//         return Page.create({
//           title: 'hola chau',
//           content: 'hola',
//         })
//           .then(page => {
//             expect(page.urlTitle).to.equal('hola_chau');
//           })
//       });
//     });
//   });
// });