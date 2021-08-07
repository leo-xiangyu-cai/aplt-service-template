import supertest from 'supertest';
import KoaApp from '../../../src/KoaApp';
import { Mode } from '../../../src/Constants';
import { HealthEntity } from '../../../src/entity/Health';

const koaApp = new KoaApp(Mode.UnitTest);
const testServer = koaApp.start();

beforeEach(async () => {
});

afterEach(async () => {
  await HealthEntity.collection.drop();
});

afterAll((done) => {
  koaApp.stop();
  done();
});

describe('https://127.0.0.1/health-check', () => {
  it('health check should return OK', async () => {
    const message = 'test message';
    const response = await supertest(testServer)
      .post('/health-check')
      .send({
        message,
      });
    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body.message).toEqual('OK');
    expect(response.body.data.mode).toEqual('UnitTest');
    expect(response.body.data.database).toEqual('healthy');
  });
});
