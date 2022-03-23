import Router from 'koa-router';
import BaseService from '../service/BaseService';
import { HealthEntity } from '../entity/Health';
import { getConfig } from '../Configs';
import { Environment } from '../Constants';

const router = new Router();
const service = new BaseService();

router.get('/connection-check', async (ctx) => {
  const healthEntity = new HealthEntity({
    message: 'connection check test',
  });
  try {
    await healthEntity.save();
    const insertedHealthEntity = await HealthEntity.findOne({ id: healthEntity.id }).exec();
    const data = {
      serviceName: getConfig().serviceName,
      environment: getConfig().env,
      versionNumber: getConfig().versionNumber,
      versionCode: getConfig().versionCode,
      db: '',
      dbStatus: insertedHealthEntity ? 'connected' : 'disconnected',
    };
    if (getConfig().env !== Environment.UNIT_TEST_DOCKER
      && getConfig().env !== Environment.UNIT_TEST) {
      const dbConnection = process.env.DB_CONNECTION as string;
      data.db = dbConnection.substr(dbConnection.indexOf('@') + 1);
    }
    service.generate200Ok(ctx, data);
  } catch (e) {
    service.generate200Ok(ctx, {
      serviceName: getConfig().serviceName,
      environment: getConfig().env,
      versionNumber: getConfig().versionNumber,
      versionCode: getConfig().versionCode,
      dbStatus: e,
    });
  }
});

export default router;
