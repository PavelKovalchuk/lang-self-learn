// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { WithId, Document, ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

import { IBaseApiResponse, IVerbsTrainedData } from 'types';
import { getAverageMark } from 'utils';
import { BaseCollectionNames, connectToDatabase } from 'utils/db';

const handlePut = async (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const { params, data } = req.body;
  const client = await connectToDatabase();
  const db = client.db();
  // IVerbsDataDocument
  const payload: { result: (WithId<Document> | null)[] } = { result: [] };
  const collectionName = `${BaseCollectionNames.VERBS}${params.language}`;

  try {
    await Promise.all(
      data.verbsToUpdate.map(async (verb: IVerbsTrainedData) => {
        const oldData = await db
          .collection<Document>(collectionName)
          .findOne({ _id: new ObjectId(verb._id) });

        const trainingName = Object.keys(verb.marks)?.[0];
        const marks = {
          ...oldData?.marks,
          [`marks.${trainingName}`]: verb.marks[trainingName],
        };

        const result = await db.collection<Document>(collectionName).findOneAndUpdate(
          { _id: new ObjectId(verb._id) },
          {
            $set: {
              lastDateTrained: new Date(),
              averageMark: getAverageMark(Object.values(marks)),
              [`marks.${trainingName}`]: verb.marks[trainingName],
            },
          },
          { upsert: true, returnDocument: 'after' }
        );

        payload.result.push(result.value);
      })
    );
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
