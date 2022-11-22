// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { WithId, Document } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { IBaseApiResponse, IUserTrainingData } from 'types';
import { BaseCollectionNames, connectToDatabase } from 'utils/db';

const handlePut = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { data }: { data: IUserTrainingData } = req.body;
  const client = await connectToDatabase();
  const db = client.db();
  const payload: { result: WithId<Document> | null } = { result: null };

  try {
    const result = await db.collection(`${BaseCollectionNames.USER_TRAININGS}`).findOneAndUpdate(
      { userId: data.userId, language: data.language },
      {
        $set: {
          ...data,
          lastUpdated: new Date(),
          trainings: data.trainings.map((item) => ({
            ...item,
            date: new Date(),
          })),
        },
      },
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

export default async function handler(req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) {
  if (req.method === 'PUT') {
    await handlePut(req, res);
    return;
  }

  res.status(500).json({ result: 'error', message: 'No data processed' });
}
