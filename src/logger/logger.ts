import winston, { format } from 'winston';
import 'dotenv/config';

const isDevMode = process.env.ENV === 'development';

const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        myFormat
    ),
    transports: [isDevMode ? new winston.transports.Console() : new winston.transports.File({ filename: 'errors.log' })]
});

export default logger;
