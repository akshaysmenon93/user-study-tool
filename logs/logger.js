const {transports, createLogger, format} = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

module.exports = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'log-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
})