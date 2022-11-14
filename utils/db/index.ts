import { MongoClient } from 'mongodb';

export const BaseCollectionNames = {
  VERBS_GROUPS: 'verbs-groups-',
  PRONOUNS: 'pronouns-',
  VERBS: 'verbs-',
};

export async function connectToDatabase(): Promise<MongoClient> {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.egvlynj.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
  );

  return client;
}

export const getFindByUser = (userId: string | string[] | undefined): { userId: number } => {
  return { userId: parseInt(String(userId), 10) };
};
