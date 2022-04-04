import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import compression from 'compression';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';
import config from './libs/config';
import runMongoose from './libs/mongoose';
import passport from 'passport';
import { requestLogger, errorLogger } from './libs/logger';
const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
//app.use(cors(config.corsOptions));
app.use(cors());
app.use(passport.initialize());
app.use(requestLogger);

// Routing
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use('/api/v1', routes);

app.get('/status', (req, res) => {
  res.sendStatus(200);
});

// Error handlers
// app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
//   errorLogger(err, req, res, next);
// });
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  // Handle 401 thrown by express-jwt library
  if (err.name === 'UnauthorizedError') {
    return res.status(err.status).json({ message: err.message }).end();
  }

  return next(err);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);
  res.json({ errors: err, message: err.message });
});

(async function start() {
  try {
    await runMongoose();
    app.listen(config.port, () => {
      console.log(`Server started http://localhost:${config.port}/status`);
    });
  } catch (error) {
    console.error(error);
  }
})();

export default app;
