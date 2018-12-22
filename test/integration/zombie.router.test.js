process.env.NODE_ENV = 'test';
const HttpStatus = require('http-status-codes');
const chai = require('chai');
const chaiHttp = require('chai-http');
const nock = require('nock');
const { itemExchangeReply, currencyExchangeReply } = require('../fixtures');
const { app } = require('../../lambda/zombies');
const { port, apiPrefix, currencyExchangeURL } = require('../../config');

chai.should();
chai.use(chaiHttp);

const server = app.listen(port, () => console.log(`Zombie API listening on port ${port}!`));

nock(/localhost:9000|.*\.netlify.com/)
  .log(console.log)
  .persist()
  .get('/.netlify/functions/itemExchange')
  .reply(200, itemExchangeReply);

nock(currencyExchangeURL)
  .log(console.log)
  .persist()
  .get('')
  .reply(200, currencyExchangeReply);

let zombieId1, zombieId2;

describe('zombies', () => {
  it('should create zombie 1', done => {
    chai
      .request(server)
      .post(apiPrefix)
      .send({ name: 'zombie1' })
      .end((err, res) => {
        zombieId1 = res.body.id;
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a('object');
        res.body.should.have.property('name').equal('zombie1');
        return done();
      });
  });

  it('should create zombie 2', done => {
    chai
      .request(server)
      .post(apiPrefix)
      .send({ name: 'zombie2' })
      .end((err, res) => {
        zombieId2 = res.body.id;
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a('object');
        res.body.should.have.property('name').equal('zombie2');
        return done();
      });
  });

  it('should get zombie 1', done => {
    chai
      .request(server)
      .get(`${apiPrefix}/${zombieId1}`)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a('object');
        res.body.should.have.property('name').equal('zombie1');
        return done();
      });
  });

  it('should get all zombies', done => {
    chai
      .request(server)
      .get(apiPrefix)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a('array');
        return done();
      });
  });

  it('should update zombie 1', done => {
    chai
      .request(server)
      .put(`${apiPrefix}/${zombieId1}`)
      .send({ name: 'new zombie name' })
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a('object');
        res.body.should.have.property('name').equal('new zombie name');
        return done();
      });
  });

  it('should delete zombie 2', done => {
    chai
      .request(server)
      .delete(`${apiPrefix}/${zombieId2}`)
      .send()
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        return done();
      });
  });
});

describe('zombie items', () => {
  it('should add item 1 to zombie 1', done => {
    chai
      .request(server)
      .post(`${apiPrefix}/${zombieId1}/items/1`)
      .send()
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        return done();
      });
  });

  it('should add item 2 to zombie 1', done => {
    chai
      .request(server)
      .post(`${apiPrefix}/${zombieId1}/items/2`)
      .send()
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        return done();
      });
  });

  it('should add item 3 to zombie 1', done => {
    chai
      .request(server)
      .post(`${apiPrefix}/${zombieId1}/items/3`)
      .send()
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        return done();
      });
  });

  it('should add item 4 to zombie 1', done => {
    chai
      .request(server)
      .post(`${apiPrefix}/${zombieId1}/items/4`)
      .send()
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        return done();
      });
  });

  it('should add item 5 to zombie 1', done => {
    chai
      .request(server)
      .post(`${apiPrefix}/${zombieId1}/items/5`)
      .send()
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        return done();
      });
  });

  it('should fail when adding sixth item to zombie 1', done => {
    chai
      .request(server)
      .post(`${apiPrefix}/${zombieId1}/items/6`)
      .send()
      .end((err, res) => {
        res.should.have.status(HttpStatus.BAD_REQUEST);
        res.body.should.have.property('message').equal('The zombie already has maximum 5 items');
        return done();
      });
  });

  it('should get zombie 1', done => {
    chai
      .request(server)
      .get(`${apiPrefix}/${zombieId1}`)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a('object');
        res.body.items.should.be.a('array');
        res.body.items.length.should.be.equal(5);
        (res.body.totalItemWorth.pln > res.body.totalItemWorth.usd).should.be.true;
        (res.body.totalItemWorth.usd > res.body.totalItemWorth.eur).should.be.true;
        return done();
      });
  });

  it('should delete item 1 from zombie 1', done => {
    chai
      .request(server)
      .delete(`${apiPrefix}/${zombieId1}/items/1`)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        return done();
      });
  });

  it('should get zombie 1 items', done => {
    chai
      .request(server)
      .get(`${apiPrefix}/${zombieId1}/items`)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        res.body.should.be.a('array');
        return done();
      });
  });

  it('should delete zombie 1', done => {
    chai
      .request(server)
      .delete(`${apiPrefix}/${zombieId1}`)
      .end((err, res) => {
        res.should.have.status(HttpStatus.OK);
        return done();
      });
  });
});
