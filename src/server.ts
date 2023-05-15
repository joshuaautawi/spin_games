import express, { Application } from "express";
import morgan from "morgan";
import spinGameRouter from "./spin_game/routers";
import swaggerUi from "swagger-ui-express";
import connection from "./config/connection";
const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(spinGameRouter);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);
async function start(): Promise<void> {
  try {
    await connection.sync();
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
void start();
