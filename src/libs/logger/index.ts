import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

const consoleLog = new winston.transports.Console();
const fileLog = new winston.transports.File({ filename: 'error.log' });

const createRequestLogger = (transports: Array<winston.transport>) => {
  const requestLogger = winston.createLogger({
    format: getRequestLogFormatter(),
    transports: transports,
  });

  return (req: Request, res: Response, next: NextFunction) => {
    requestLogger.info({ req, res });
    next();
  };
};

function createErrorLogger(transports: Array<winston.transport>) {
  const errLogger = winston.createLogger({
    level: 'error',
    transports: transports,
  });

  return function logError(err: Error, req: Request, res: Response, next: NextFunction) {
    errLogger.error({ err, req: req.url, res });
    next();
  };
}

function getRequestLogFormatter() {
  const { combine, timestamp, printf } = winston.format;

  return combine(
    timestamp(),
    printf((info) => {
      const { req } = info.message as any;
      return `${req.method} ${info.timestamp} ${info.level}: ${req.hostname}${req.port || ''}${
        req.originalUrl
      }`;
    }),
  );
}

export const requestLogger = createRequestLogger([consoleLog]);
export const errorLogger = createErrorLogger([consoleLog, fileLog]);
