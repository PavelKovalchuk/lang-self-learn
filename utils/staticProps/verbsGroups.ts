import { BaseCollectionNames, connectToDatabase, getFindByUser } from 'utils/db';
import { IGroupsDataDocument, ModifiedObjectId } from 'types';

export async function getVerbsGroupsStaticProps(
  userId: string,
  language: string
): Promise<IGroupsDataDocument[]> {
  const client = await connectToDatabase();
  const db = client.db();

  let verbsGroupsPayload: IGroupsDataDocument[] = [];

  try {
    const result = await db
      .collection<ModifiedObjectId<IGroupsDataDocument>>(
        `${BaseCollectionNames.VERBS_GROUPS}${language}`
      )
      .find(getFindByUser(userId))
      .toArray();

    verbsGroupsPayload = result.map((item) => ({ ...item, _id: item._id.toString() }));
  } catch (error) {
    client.close();
  }

  return verbsGroupsPayload;
}
