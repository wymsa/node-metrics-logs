import promClient from "prom-client";

interface IMetrics {
  register: promClient.Registry;
}

export const initMetrics = async (): Promise<IMetrics> => {
  const register = new promClient.Registry();
  register.setDefaultLabels({ app: "nodejs-metrics" });
  promClient.collectDefaultMetrics({ register });

  return { register };
};
