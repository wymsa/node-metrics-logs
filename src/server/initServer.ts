import { createServer, Server } from "http";
import express, { Request, Response } from "express";
import helmet from "helmet";

interface IServer {
  server: Server;
}

export const initServer = async (): Promise<IServer> => {
  const expressApp = express();

  // middlewares
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: false }));
  expressApp.use(helmet());

  expressApp.get("/health", (_req: Request, res: Response) => {
    res.sendStatus(200);
  });

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
