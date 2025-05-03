import promClient from "prom-client";

interface IMetrics {
  register: promClient.Registry;
  requestCounter: promClient.Counter;
}

export const initMetrics = async (): Promise<IMetrics> => {
  const register = new promClient.Registry();
  register.setDefaultLabels({ app: "nodejs-metrics" });
  promClient.collectDefaultMetrics({ register });

  const requestCounter = new promClient.Counter({
    name: "http_request_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "status", "path"],
    registers: [register],
  });

  return { register, requestCounter };
};
