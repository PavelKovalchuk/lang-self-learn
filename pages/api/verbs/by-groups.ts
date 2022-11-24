import { SortDirection } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { IBaseApiResponse, IVerbsDataDocument, ModifiedObjectId } from 'types';
import {
  BaseCollectionNames,
  connectToDatabase,
  convertStringToArray,
  getFindByUser,
} from 'utils/db';
import { CUSTOM_VERBS_CATEGORIES_MAP } from 'variables';

const getSortingOptions = (customGroupsIds: string[]): { [key: string]: SortDirection } | null => {
  const result: { [key: string]: SortDirection } = {};
  customGroupsIds.forEach((item) => {
    if (CUSTOM_VERBS_CATEGORIES_MAP[item]) {
      result['marks.pronounToVerb'] = 1;
    }
  });

  return Object.keys(result).length ? result : null;
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { language, userId, selectedVerbsGroupsIds, customGroupsIds } = req.query;
  const client = await connectToDatabase();
  const db = client.db();
  let payload: ModifiedObjectId<IVerbsDataDocument>[] = [];

  const sortOptions = getSortingOptions(convertStringToArray(customGroupsIds));

  try {
    const result = await db
      .collection<ModifiedObjectId<IVerbsDataDocument>>(`${BaseCollectionNames.VERBS}${language}`)
      .find({
        ...getFindByUser(userId),
        ...(selectedVerbsGroupsIds
          ? { selectedVerbsGroupsIds: { $in: convertStringToArray(selectedVerbsGroupsIds) } }
          : {}),
      })
      .sort(sortOptions || {})
      .limit(3)
      .toArray();

    payload = result;
  } catch (error) {
    client.close();
    res.status(500).json({ result: 'error', message: 'Retrieving data failed!' });
    return;
  }

  client.close();
  res.status(200).json({ result: 'ok', message: 'Success', payload });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) {
  if (req.method === 'GET') {
    await handleGet(req, res);
    return;
  }

  res.status(500).json({ result: 'error', message: 'No data processed' });
}
