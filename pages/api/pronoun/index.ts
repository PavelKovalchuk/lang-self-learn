// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { IBaseApiResponse } from 'types';

const handlePost = (req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) => {
  const body = req.body;
  console.log('body', body);

  res.status(200).json({ result: 'ok', message: 'Success' });
};

export default function handler(req: NextApiRequest, res: NextApiResponse<IBaseApiResponse>) {
  if (req.method === 'POST') {
    handlePost(req, res);
    return;
  }

  res.status(500).json({ result: 'error', message: 'No data processed' });
}
