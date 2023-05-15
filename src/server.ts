import express, { Application } from "express";
import morgan from "morgan";
import spinGameRouter from "./spin_game/routers";
import swaggerUi from "swagger-ui-express";
import connection from "./config/connection";

export function createApp(): Application {
  try {
    const app: Application = express();

    app.use(express.json());
    app.use(morgan("tiny"));
    app.use(express.static("public"));
    app.use(spinGameRouter);

    return app;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
async function startServer(): Promise<void> {
  try {
    const app = createApp();
    const PORT = process.env.PORT || 8000;
    await connection.sync();
    app.listen(PORT, () => {
      console.log("Server is running on port", PORT);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

void startServer();
