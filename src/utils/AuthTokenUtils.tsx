export const isTokenExpired = (tokenExpiryTime: number): boolean => {
  const expiryTime = new Date(tokenExpiryTime * 1000);
  const currentTime = new Date();
  return currentTime >= expiryTime;
};
