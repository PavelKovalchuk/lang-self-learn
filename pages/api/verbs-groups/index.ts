// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { WithId, Document } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';
import { IBaseApiResponse, IGroupsDataDocument } from 'types';
import { BaseCollectionNames, connectToDatabase } from 'utils/db';

const handlePost = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { params, data } = req.body;
  const client = await connectToDatabase();
  const db = client.db();
  const payload = { result: '' };

  try {
    const result = await db
      .collection(`${BaseCollectionNames.VERBS_GROUPS}${params.language}`)
      .insertOne(data);
    payload.result = result.insertedId.toString();
  } catch (error) {
    client.close();
    res.status(500).json({ result: 'error', message: 'Storing data failed!', payload });
    return;
  }

  client.close();

  res.status(201).json({ result: 'ok', message: 'Success' });
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { params, data } = req.body;
  const client = await connectToDatabase();
  const db = client.db();
  const payload: { result: WithId<Document> | null } = { result: null };

  try {
    const result = await db
      .collection(`${BaseCollectionNames.VERBS_GROUPS}${params.language}`)
      .findOneAndUpdate(
        { userId: data.userId },
        { $set: data },
        { upsert: true, returnDocument: 'after' }
      );
    payload.result = result.value;
  } catch (error) {
    client.close();
    res.status(500).json({ result: 'error', message: 'Storing data failed!' });
    return;
  }

  client.close();

  res.status(201).json({ result: 'ok', message: 'Success', payload });
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { language, userId } = req.query;
  const client = await connectToDatabase();
  const db = client.db();

  let payload: WithId<IGroupsDataDocument>[] = [];

  try {
    const result = await db
      .collection<IGroupsDataDocument>(`${BaseCollectionNames.VERBS_GROUPS}${language}`)
      .find({ userId: parseInt(String(userId), 10) })
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

  if (req.method === 'PUT') {
    await handlePut(req, res);
    return;
  }

  if (req.method === 'GET') {
    await handleGet(req, res);
    return;
  }

  res.status(500).json({ result: 'error', message: 'No data processed' });
}
