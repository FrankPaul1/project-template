/**
 * Created by acezou on 15/7/20.
 */
import knex from 'knex'
import { config } from './config'

const db = knex({
  client: 'mysql',
  connection: config.db,
  pool: {
    min: 2,
    max: 10
  }
})

export default db
