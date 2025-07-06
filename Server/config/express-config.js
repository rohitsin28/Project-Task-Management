import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60000,
  limit: 100,
  message: {
    success: false,
    msg: "Too many requests, please try again later.",
  },
});

const configureExpress = (app, express) => {
  app.use(express.json());
  app.use(helmet());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(bodyParser.json());
  app.use(limiter);
};

export default configureExpress;