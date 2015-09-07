import bunyan from 'bunyan'
import config from './config'
import { DEBUG, INFO, WARN, ERROR } from 'bunyan'

const levelMap = {
	DEBUG, INFO, WARN, ERROR,
}

export default bunyan.createLogger({
	name: 'Project',
	streams: [
		{
			level: levelMap[config.logger.stdoutLevel],
			stream: process.stdout
		}
	]
})

