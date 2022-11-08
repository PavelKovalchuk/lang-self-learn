// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IBaseApiResponse } from 'types';
import { connectToDatabase } from 'utils/db';

const handlePost = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { params, data } = req.body;
  console.log('data', data);

  const client = await connectToDatabase();

  const db = client.db();
  const dataResponse = { result: '' };

  try {
    const result = await db.collection(`pronouns-${params.language}`).insertOne(data);
    dataResponse.result = result.insertedId.toString();
    console.log('result', result);
  } catch (error) {
    client.close();
    res.status(500).json({ result: 'error', message: 'Storing message failed!' });
    return;
  }

  client.close();

  res.status(201).json({ result: 'ok', message: 'Success' });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) {
  if (req.method === 'POST') {
    await handlePost(req, res);
    return;
  }

  res.status(500).json({ result: 'error', message: 'No data processed' });
}
