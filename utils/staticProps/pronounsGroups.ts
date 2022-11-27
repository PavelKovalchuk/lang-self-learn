import { BaseCollectionNames, connectToDatabase, getFindByUser } from 'utils/db';
import { IPronounDataDocument, ModifiedObjectId } from 'types';

export async function getPronounsGroupsStaticProps(
  userId: string,
  language: string
): Promise<IPronounDataDocument[]> {
  const client = await connectToDatabase();
  const db = client.db();

  let payload: IPronounDataDocument[] = [];

  try {
    const result = await db
      .collection<ModifiedObjectId<IPronounDataDocument>>(
        `${BaseCollectionNames.PRONOUNS}${language}`
      )
      .find(getFindByUser(userId))
      .toArray();

    payload = result.map((item) => ({ ...item, _id: item._id.toString() }));
  } catch (error) {
    client.close();
  }

  return payload;
}
