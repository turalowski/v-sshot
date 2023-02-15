import ytdl from 'ytdl-core';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { url } = JSON.parse(req.body);
  ytdl(url).pipe(res);
}
