import type { NextApiRequest, NextApiResponse } from 'next';

import { IBaseApiResponse, IPronounDataDocument, ModifiedObjectId } from 'types';
import { BaseCollectionNames, connectToDatabase, getFindByUser } from 'utils/db';

const handlePost = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { params, data } = req.body;
  const client = await connectToDatabase();
  const db = client.db();
  const payload = { result: '' };

  try {
    const result = await db
      .collection<ModifiedObjectId<IPronounDataDocument>>(
        `${BaseCollectionNames.PRONOUNS}${params.language}`
      )
      .insertOne(data);
    payload.result = result.insertedId.toString();
  } catch (error) {
    client.close();
    res.status(500).json({ result: 'error', message: 'Storing data failed!' });
    return;
  }

  client.close();
  res.status(201).json({ result: 'ok', message: 'Success' });
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { language, userId } = req.query;
  const client = await connectToDatabase();
  const db = client.db();

  let payload: ModifiedObjectId<IPronounDataDocument>[] = [];

  try {
    const result = await db
      .collection<ModifiedObjectId<IPronounDataDocument>>(
        `${BaseCollectionNames.PRONOUNS}${language}`
      )
      .find(getFindByUser(userId))
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
  if (req.method === 'POST') {
    await handlePost(req, res);
    return;
  }

  if (req.method === 'GET') {
    await handleGet(req, res);
    return;
  }

  res.status(500).json({ result: 'error', message: 'No data processed' });
}
