import { type NextApiRequest, type NextApiResponse } from 'next';
import { serialize } from 'cookie';

interface ApiRequest extends NextApiRequest {
  body: {
    email: string;
  };
}

export default function setCookieEmailHandler(
  req: ApiRequest,
  res: NextApiResponse
): void {
  try {
    const { email } = req.body;
    const cookie = serialize('email', email.toLowerCase(), {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 60 * 10,
      path: '/'
    });
    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({
      data: {
        email
      },
      code: 200,
      success: true,
      message: 'Set cookie email success',
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
