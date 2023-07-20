jest.unmock("../../../src/utils/MessageUtils");

const mockedLocalStorageStore = jest.fn();
const mockedLocalStorageGet = jest.fn();
jest.mock("../../../src/utils/LocalStorageUtils", () => {
  return {
    localStorageStore: mockedLocalStorageStore,
    localStorageGet: mockedLocalStorageGet,
  };
});

const mockedGet = jest.fn();
const mockedPost = jest.fn();
jest.mock("axios", () => {
  return {
    get: mockedGet,
    post: mockedPost,
  };
});

const mockedFetchAllResources = jest.fn();
jest.mock("../../../src/utils/ResourceUtils", () => {
  return {
    fetchAllResources: mockedFetchAllResources,
  };
});

import exp from "constants";
import { MessageForm } from "../../../src/types/MessageForm";
import { MessageType } from "../../../src/types/MessageType";
import { Parent } from "../../../src/types/Parent";
import { Resource } from "../../../src/types/Resource";
import {
  createParentNameSelectOptions,
  createResourceSelectOptions,
  fetchMessageById,
  getAllMessagesForUser,
  postMessageToServer,
  setMessageReadStatus,
} from "../../../src/utils/MessageUtils";

describe("MessageUtils", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it("WHEN creating parent name options, THEN return list of parent options", async () => {
    const parent: Parent = {
      childId: 1,
      firstName: "someFirstName",
      googleId: "123",
      id: 1,
      surname: "someSurname",
      therapistId: 1,
    };
    mockedPost.mockReturnValue({ data: [parent] });
    const options = await createParentNameSelectOptions();
    expect(options.length).toBe(1);
    expect(options[0].value).toBe("1");
    expect(options[0].label).toBe("someFirstName someSurname");
  });

  it("WHEN getting resource options, THEN return resource options", async () => {
    const resource: Resource = {
      id: 1,
      title: "someTitle",
      content: "someContent",
    };
    mockedFetchAllResources.mockReturnValue([resource]);
    const options = await createResourceSelectOptions();
    expect(options.length).toBe(1);
    expect(options[0].value).toBe("1");
    expect(options[0].label).toBe("someTitle");
  });

  it("WHEN posting a message to server, THEN return axios response", async () => {
    const message: MessageForm = {
      selectedParent: "",
      selectedResource: "",
      messageBody: "",
    };
    mockedPost.mockReturnValue({ data: "someMessageResponse" });
    const resp = await postMessageToServer(message);
    expect(resp).toEqual({ data: "someMessageResponse" });
  });

  it("WHEN getting all users messages, THEN return array of messages", async () => {
    const messageType: MessageType = {
      id: 0,
      parentId: 0,
      resourceId: 0,
      messageBody: "",
      readState: "",
    };
    mockedGet.mockReturnValue({ data: [messageType] });
    const messages = await getAllMessagesForUser();
    expect(messages.length).toBe(1);
    expect(messages[0]).toBe(messageType);
  });

  it("WHEN setting message read status, THEN set message with given ID status to read", async () => {
    setMessageReadStatus(1);
    expect(mockedGet).toBeCalled();
  });

  it("WHEN fetching message, THEN given id return message", async () => {
    const messageType: MessageType = {
      id: 0,
      parentId: 0,
      resourceId: 0,
      messageBody: "",
      readState: "",
    };
    mockedGet.mockReturnValue({ data: messageType });
    const message = await fetchMessageById("1");
    expect(message).toEqual(messageType);
  });
});
