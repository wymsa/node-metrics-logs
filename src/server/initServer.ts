import { createServer, Server } from "http";
import express, { Request, Response } from "express";
import helmet from "helmet";
import { initMetrics } from "./initMetrics";

interface IServer {
  server: Server;
}

export const initServer = async (): Promise<IServer> => {
  const expressApp = express();
  const { register } = await initMetrics();

  // middlewares
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));
  expressApp.use(helmet());

  // health check
  expressApp.get("/health", (_req: Request, res: Response) => {
    res.sendStatus(200);
  });

  // prometheus metrics
  expressApp.get("/metrics", async (_req: Request, res: Response) => {
    const metrics = await register.metrics();

    res.setHeader("Content-Type", register.contentType);
    res.send(metrics);
  })

  const server = createServer(expressApp);

  process.on("SIGTERM", () => {
    server.close(() => {
      console.log("Process terminated");
    });
  });

  process.on("SIGINT", () => {
    server.close(() => {
      console.log("Process interrupted");
    });
  });

  return {
    server,
  };
};
