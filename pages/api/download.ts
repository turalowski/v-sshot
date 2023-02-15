import ytdl from 'ytdl-core';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {} = req.body;
  ytdl('https://www.youtube.com/watch?v=4vQ8If7f374').pipe(res);
}
