import { ResourceTopic } from "./ResourceTopic";

export type Resource = {
  id: number;
  title: string;
  topicList: ResourceTopic[];
};
