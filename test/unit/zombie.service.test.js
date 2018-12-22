const chai = require('chai');
const sinon = require('sinon');
require('sinon-mongoose');

const ZombieModel = require('../../lambda/zombies/model');
const ZombieSvc = require('../../lambda/zombies/service');
const { newZombie, createdZombie, updatedZombie } = require('../fixtures');
const zombieList = [createdZombie, createdZombie];

chai.should();

let ZombieModelMock = sinon.mock(ZombieModel);

describe('zombie service', () => {
  it('should list zombies', () => {
    ZombieModelMock.expects('find')
      .withArgs({})
      .chain('exec')
      .resolves(zombieList);
    return ZombieSvc.getAllZombies().then(data => {
      ZombieModelMock.verify();
      data.should.deep.equal(zombieList);
    });
  });
  it('should create zombie', () => {
    ZombieModelMock.expects('create')
      .withArgs(newZombie)
      .resolves(createdZombie);
    return ZombieSvc.createZombie(newZombie).then(data => {
      ZombieModelMock.verify();
      data.should.deep.equal(createdZombie);
    });
  });
  it('should get zombie', () => {
    ZombieModelMock.expects('findById')
      .withArgs(createdZombie.id)
      .chain('exec')
      .resolves(createdZombie);
    return ZombieSvc.getOneZombie(createdZombie.id).then(data => {
      ZombieModelMock.verify();
      data.should.deep.equal(createdZombie);
    });
  });
  it('should update zombie', () => {
    ZombieModelMock.expects('findByIdAndUpdate')
      .withArgs(createdZombie.id, createdZombie)
      .chain('exec')
      .resolves(updatedZombie);
    return ZombieSvc.updateZombie(createdZombie.id, createdZombie).then(data => {
      ZombieModelMock.verify();
      data.should.deep.equal(updatedZombie);
    });
  });
  it('should delete zombie', () => {
    ZombieModelMock.expects('findByIdAndDelete')
      .withArgs(createdZombie.id)
      .chain('exec')
      .resolves(createdZombie);
    return ZombieSvc.deleteZombie(createdZombie.id).then(data => {
      ZombieModelMock.verify();
      data.should.deep.equal(createdZombie);
    });
  });
});
