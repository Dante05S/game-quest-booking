import { type NextApiRequest, type NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function getCookieTokenHandler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  try {
    const { tokenSession } = req.cookies;
    if (tokenSession === undefined) {
      res.status(401).json({
        data: null,
        success: false,
        message: '',
        code: 401,
        errors: ['Token is required']
      });
      return;
    }
    if (tokenSession.length === 0) {
      const cookie = serialize('token', '', {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
      });
      res.setHeader('Set-Cookie', cookie);
      res.status(401).json({
        data: null,
        success: false,
        message: '',
        code: 401,
        errors: ['Token is invalid']
      });
      return;
    }

    res.status(200).json({
      data: tokenSession,
      success: true,
      message: 'Get Token successfully',
      code: 200,
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
