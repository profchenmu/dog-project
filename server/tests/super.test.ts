// tslint:disable-next-line: no-implicit-dependencies
import { expect } from 'chai';
// tslint:disable-next-line: no-implicit-dependencies
import request from 'supertest';
import {app} from '../src/index';
describe('GET /api/dog/breeds', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/api/dog/breeds')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        // tslint:disable-next-line: no-console
        console.log(res.body);
        expect(res.body[99].subbreed).to.be.equal('blenheim');
        expect(res.body.length).to.be.equal(133);
        return done();
      });
  });
});

describe('GET /api/dog/images/breed/chesapeake', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/api/dog/images/retriever/chesapeake')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.body.length).to.be.equal(167);
        expect(res.body[1]).to.be.equal('https://images.dog.ceo/breeds/retriever-chesapeake/n02099849_1050.jpg');
        return done();
      });
  });
});

describe('GET /api/dog/images/hound', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/api/dog/images/hound')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err: any, res: any) => {
        if (err) {
          return done(err);
        }
        expect(res.body.length).to.be.equal(1000);
        expect(res.body[2]).to.be.equal('https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg');
        return done();
      });
  });
});
