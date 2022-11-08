// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IBaseApiResponse, IPronounData } from 'types';
import { connectToDatabase } from 'utils/db';

const handlePost = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { params, data } = req.body;
  const client = await connectToDatabase();
  const db = client.db();
  const payload = { result: '' };

  try {
    const result = await db.collection(`pronouns-${params.language}`).insertOne(data);
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

  const payload: { pronouns: IPronounData[] } = { pronouns: [] };

  try {
    const result = await db
      .collection(`pronouns-${language}`)
      .find({ userId: parseInt(String(userId)) })
      .toArray();

    payload.pronouns = result[0].pronouns;
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
