import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { router as newsRoutes } from './routes/news.route';
import { router as UserRoutes } from './routes/user.route';
import { router as TagsRoutes } from './routes/tags.route';
import errorHandler from './middleware/errorHandler';
import { NODE_ENV, REDISHOST, REDISPASSWORD, REDISPORT, SESSION_SECRET } from './config/dotenv';
import  './config/passport';
import passport from 'passport';

const app = express();

// Middleware
app.use(express.json());

// Redis store setup
const RedisStore = connectRedis(session);

const redis = new Redis({
  host: REDISHOST,
  port: Number(REDISPORT),
  password: REDISPASSWORD,
});

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

app.use(
  cors({
    origin: 'http://localhost:5174',
    credentials: true,
  })
);

// Session setup with Redis
app.use(
  session({
    name: 'musahibe.az%%ssid',
    store: new RedisStore({
      client: redis,
      disableTouch: true, // Redis'te session zaman aşımını engeller
    }),
    secret: SESSION_SECRET as string,
    resave: false, 
    saveUninitialized: false,
    cookie: {
      secure: NODE_ENV === 'production', // HTTPS ile çalışıyorsa true yapın
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 gün
    },
  })
);

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());
app.get("/protected", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: "This is a protected route" });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});
// Routes
app.use('/api', newsRoutes);
app.use('/user', UserRoutes);
app.use('/tags', TagsRoutes);

export default app;

