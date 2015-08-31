import bunyan from 'bunyan'
import config from './config'

export default bunyan.createLogger({
	name: 'Project',
	streams: [
		{
			level: config.logger.stdoutLevel,
			stream: process.stdout
		}
	]
})

