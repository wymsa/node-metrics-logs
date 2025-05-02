import "dotenv/config";
import config from "@/constants/config";

import { initServer } from "@/server/initServer";
import { defaultLogger } from "@/utils/logger";

initServer()
  .then(({ server }) => {
    server.listen({ port: config.SERVER.PORT }, () => {
      defaultLogger.info(`🚀 Server is running on PORT ${config.SERVER.PORT}`);
    });
  })
  .catch((error: Error) => {
    defaultLogger.error(`Server error: ${error.stack}`);
  });
