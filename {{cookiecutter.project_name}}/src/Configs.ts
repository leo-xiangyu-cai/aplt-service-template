export interface Config {
  env: string,
  dbConn: string,
}

interface Configs {
  [env: string]: Config
}

const configs: Configs = {
  dev: {
    env: 'dev',
    dbConn: 'mongodb://test:test@localhost:27017/',
  },
  test: {
    env: 'test',
    dbConn: 'mongodb+srv://mongo_atlas_admin:vryNyZ2zZgPQcDu3@aplt-template.jm6sg.mongodb.net/aplt-template?retryWrites=true&w=majority',
  },
  uat: {
    env: 'uat',
    dbConn: 'https://uat.aplt.com.au',
  },
  prod: {
    env: 'prod',
    dbConn: 'https://prod.aplt.com.au',
  },
};

export const getConfig = (): Config => {
  const env = process.env.ENVIRONMENT || 'dev';
  return configs[env];
};
