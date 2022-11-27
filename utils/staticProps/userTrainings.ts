import { BaseCollectionNames, connectToDatabase, getFindByUserAndLanguage } from 'utils/db';
import { IUserTrainingDocument, ModifiedObjectId } from 'types';

export async function getUserTrainingsStaticProps(
  userId: string,
  language: string
): Promise<IUserTrainingDocument> {
  const client = await connectToDatabase();
  const db = client.db();

  let userTrainingPayload: IUserTrainingDocument[] = [];

  try {
    const result = await db
      .collection<ModifiedObjectId<IUserTrainingDocument>>(`${BaseCollectionNames.USER_TRAININGS}`)
      .find(getFindByUserAndLanguage(userId, language))
      .toArray();

    userTrainingPayload = result.map((item) => ({
      ...item,
      _id: item._id.toString(),
      lastUpdated: item.lastUpdated.toString(),
      trainings: item.trainings.map((training) => ({
        ...training,
        date: training.date.toString(),
      })),
    }));
  } catch (error) {
    client.close();
  }

  return userTrainingPayload?.[0];
}
