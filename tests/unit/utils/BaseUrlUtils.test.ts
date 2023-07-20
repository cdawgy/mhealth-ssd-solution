jest.unmock("../../../src/utils/BaseUrlUtils");

import { getBaseUrl } from "../../../src/utils/BaseUrlUtils";

describe("BaseUrlUtils", () => {
  it.each([
    [undefined, "http://192.168.0.19:8081"],
    [
      "dev",
      "https://m-health-backend.politetree-6caa3509.uksouth.azurecontainerapps.io/",
    ],
  ])(
    "Return base url depending on app environment",
    (env: string | undefined, expectedUrl: string) => {
      process.env.REACT_APP_ENV = env;
      const url = getBaseUrl();
      expect(url).toEqual(expectedUrl);
    }
  );
});
