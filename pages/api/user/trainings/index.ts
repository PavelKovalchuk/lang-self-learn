// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { WithId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { IBaseApiResponse, IUserTrainingData, IUserTrainingDocument } from 'types';
import { BaseCollectionNames, connectToDatabase, getFindByUserAndLanguage } from 'utils/db';

const handlePut = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { data }: { data: IUserTrainingData } = req.body;
  const client = await connectToDatabase();
  const db = client.db();
  const payload: { result: WithId<IUserTrainingDocument> | null } = { result: null };

  try {
    const oldData = await db
      .collection<IUserTrainingDocument>(`${BaseCollectionNames.USER_TRAININGS}`)
      .findOne({ userId: data.userId, language: data.language });

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 7);

    // Save only last 7 days trainings
    const allTrainings = [
      ...(oldData?.trainings.length ? oldData.trainings : []),
      ...data.trainings.map((item) => ({
        ...item,
        date: new Date(),
      })),
    ];

    const trainingToSave = allTrainings.filter((item) => {
      const time = item.date.getTime();
      return startDate.getTime() < time && time < new Date().getTime();
    });

    const result = await db
      .collection<IUserTrainingDocument>(`${BaseCollectionNames.USER_TRAININGS}`)
      .findOneAndUpdate(
        { userId: data.userId, language: data.language },
        {
          $set: {
            ...data,
            lastUpdated: new Date(),
            sumPoints: Number(oldData?.sumPoints) + Number(data?.trainings?.[0].points),
            trainings: trainingToSave,
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

const handleGet = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { language, userId } = req.query;
  const client = await connectToDatabase();
  const db = client.db();
  let payload: WithId<IUserTrainingDocument>[] = [];

  try {
    const result = await db
      .collection<IUserTrainingDocument>(`${BaseCollectionNames.USER_TRAININGS}`)
      .find(getFindByUserAndLanguage(userId, language))
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
