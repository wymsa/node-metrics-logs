import path from "node:path";
import fs from "node:fs";

import { transports, format, loggers } from "winston";
import config from "@/constants/config";

const { combine, timestamp, json, errors, prettyPrint } = format;
const logsFolderPath = path.join(require.main?.path || "", "..", config.LOGS_FOLDER);
const defaultLoggerTransports = [];
const isProduction = config.NODE_ENV === "production";

if (!fs.existsSync(logsFolderPath)) {
  fs.mkdirSync(logsFolderPath, { recursive: true });
}

// production file logger transport
if (isProduction) {
  defaultLoggerTransports.push(
    new transports.File({ dirname: logsFolderPath, filename: "default.log", level: "error" })
  );
}

loggers.add("DefaultLogger", {
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new transports.Console({ format: prettyPrint() }),
    new transports.File({ dirname: logsFolderPath, filename: "develop.log", level: "error" }),
    ...defaultLoggerTransports,
  ],
  defaultMeta: { scope: "DefaultLogger" },
});
