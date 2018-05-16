import Raven from "raven-js";

export const handleError = (error, errorInfo) => {
  console.error(error);
  Raven.captureException(error, { extra: errorInfo });
};
