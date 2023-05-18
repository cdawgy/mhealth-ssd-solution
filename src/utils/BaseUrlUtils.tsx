export const getBaseUrl = () => {
  const currentEnv: string =
    process.env.REACT_APP_ENV === undefined
      ? "local"
      : process.env.REACT_APP_ENV;

  return baseUrls[currentEnv as keyof BaseUrls];
};

const baseUrls = {
  local: "localhost:8080",
  dev: "tdb",
};

type BaseUrls = {
  local: string;
  dev: string;
};
