import "dotenv/config";

import { initServer } from "@/server/initServer";
import config from "@/constants/config";

initServer()
  .then(({ server }) => {
    server.listen({ port: config.SERVER.PORT }, () => {
      console.log(`🚀 Server is running on PORT ${config.SERVER.PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error("Server ERROR", error.stack);
  });
