import { DEBUG, INFO, WARN, ERROR } from 'bunyan'
import path from 'path'
import _ from 'lodash'

const SYSTEM_PATH = process.cwd()
const env = (process.env.NODE_ENV && (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production')) ? process.env.NODE_ENV : 'development'

const baseConfig = {
  app: {
    env
  }
}

const platformConfig = {
  development: {
    logger: {
      stdoutLevel: DEBUG
    },
    app: {
      port: 7777,
      host: process.env.HOST || 'localhost',
      root: SYSTEM_PATH + '/src'
    },
    db: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'dev'
    }
  },

  test: {
    logger: {
      stdoutLevel: DEBUG
    },
    app: {
      port: 7777,
      host: process.env.HOST || 'localhost',
      root: SYSTEM_PATH
    },
    db: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'dev'
    }
  },

  production: {
    logger: {
      stdoutLevel: INFO
    },
    app: {
      port: 7777,
      host: process.env.HOST || 'localhost',
      root: SYSTEM_PATH
    },
    db: {
      host: 'localhost',
      port: 3306,
      user: 'test',
      password: 'test',
      database: 'dev'
    }
  }
}

// override the base configuration with the platform specific values
const config = _.merge(baseConfig, platformConfig[baseConfig.app.env])
export default config
