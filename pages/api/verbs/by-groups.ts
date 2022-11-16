// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { WithId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { IBaseApiResponse, IVerbsDataDocument } from 'types';
import {
  BaseCollectionNames,
  connectToDatabase,
  convertStringToArray,
  getFindByUser,
} from 'utils/db';

const handleGet = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { language, userId, selectedVerbsGroupsIds } = req.query;
  const client = await connectToDatabase();
  const db = client.db();
  let payload: WithId<IVerbsDataDocument>[] = [];

  try {
    const result = await db
      .collection<IVerbsDataDocument>(`${BaseCollectionNames.VERBS}${language}`)
      .find({
        ...getFindByUser(userId),
        selectedVerbsGroupsIds: { $in: convertStringToArray(selectedVerbsGroupsIds) },
      })
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
