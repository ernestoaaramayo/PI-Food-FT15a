/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');
const agent = session(app);
var supertest = require('supertest-as-promised')(require('../../src/app'));

const recipe = {
  title: "pollo con papas", 
  summary: "pollo con papas y salsa", 
  spoonacularScore: "4", 
  healthScore: "10", 
  stepByStep: "lleva mucho tiempo"
}

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', () =>
      agent.get('/recipes').expect(200)
      .timeout(4000)
    );
  });
});

describe('Diet routes', () => {
  it('GET responde con un array con los nombres de todas las dietas', () => {
    return supertest
    .get('/diets')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect(function(res) {
      expect(res.body).to.have.lengthOf(10);
    });
  });
});