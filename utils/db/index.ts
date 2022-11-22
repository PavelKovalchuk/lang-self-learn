import { MongoClient } from 'mongodb';

export const BaseCollectionNames = {
  VERBS_GROUPS: 'verbs-groups-',
  PRONOUNS: 'pronouns-',
  VERBS: 'verbs-',
  USER_TRAININGS: 'user-trainings',
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

export const getFindByUserAndLanguage = (
  userId: string | string[] | undefined,
  language: string | string[] | undefined
): { userId: number; language: string } => {
  return { userId: parseInt(String(userId), 10), language: String(language) };
};

export const convertStringToArray = (str: string | string[] | undefined): string[] => {
  return String(str).split(',');
};
