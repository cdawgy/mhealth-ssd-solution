jest.unmock("../../../src/utils/ResourceUtils");

const mockedGet = jest.fn();

jest.mock("axios", () => {
  return {
    get: mockedGet,
  };
});

import { Resource } from "../../../src/types/Resource";
import {
  fetchAllResources,
  fetchResource,
} from "../../../src/utils/ResourceUtils";

describe("ResourceUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("WHEN fetching all resources, THEN return list of resource objects", async () => {
    const resource: Resource = {
      id: 1,
      title: "someTitle",
      content: "someContent",
    };
    mockedGet.mockReturnValue({ data: [resource] });
    const resources = await fetchAllResources();
    expect(resources.length).toBe(1);
    expect(resources[0]).toEqual(resource);
  });

  it("WHEN fetching a resources, THEN return a resource", async () => {
    const resource: Resource = {
      id: 1,
      title: "someTitle",
      content: "someContent",
    };
    mockedGet.mockReturnValue({ data: resource });
    const resourceResp = await fetchResource(1);
    expect(resourceResp).toEqual(resource);
  });
});
