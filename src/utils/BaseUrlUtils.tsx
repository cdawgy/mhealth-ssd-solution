export const getBaseUrl = () => {
  const currentEnv: string =
    process.env.REACT_APP_ENV === undefined
      ? "local"
      : process.env.REACT_APP_ENV;

  return baseUrls[currentEnv as keyof BaseUrls];
};

const baseUrls = {
  local: "http://localhost:8080",
  dev: "https://m-health-backend.politetree-6caa3509.uksouth.azurecontainerapps.io/",
};

type BaseUrls = {
  local: string;
  dev: string;
};
