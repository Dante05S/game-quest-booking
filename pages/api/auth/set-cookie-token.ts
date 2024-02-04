import { type NextApiRequest, type NextApiResponse } from 'next';
import { serialize } from 'cookie';

interface ApiRequest extends NextApiRequest {
  body: {
    token: string;
  };
}

export default function setCookieTokenHandler(
  req: ApiRequest,
  res: NextApiResponse
): void {
  try {
    const { token } = req.body;
    const cookie = serialize('tokenSession', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7 * 4 * 3,
      path: '/'
    });
    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({
      data: {
        token
      },
      code: 200,
      success: true,
      message: 'Set cookie token success',
      errors: []
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      data: null,
      code: 500,
      success: false,
      message: '',
      errors: [(e as Error).message]
    });
  }
}
