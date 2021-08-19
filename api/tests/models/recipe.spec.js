const { Recipe, conn } = require('../../src/db.js');
const { expect } = require('chai');

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
        Recipe.create({title: 'Milanesa a la napolitana'});
      });
    });
    describe('spoonacularScore', () => {
      it('should throw an error if score is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid score')))
          .catch(() => done());
      });
      it('should work when its a valid score', () => {
        Recipe.create({spoonacularScore: '54'});
      });
    });
    describe('healthScore', () => {
      it('should throw an error if score is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid score')))
          .catch(() => done());
      });
      it('should work when its a valid score', () => {
        Recipe.create({healthScore: '97'});
      });
    });
    describe('summary', () => {
      it('should throw an error if is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid summary')))
          .catch(() => done());
      });
      it('should work when its a valid summary', () => {
        Recipe.create({description: 'This recipe is about ...'});
      });
    });
    describe('Step By Step', () => {
      it('should throw an error if is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires valid steps')))
          .catch(() => done());
      });
      it('should work when its valid steps', () => {
        Recipe.create({platforms: ['cut', 'cook', 'eat']});
      });
    });
  });
  
});