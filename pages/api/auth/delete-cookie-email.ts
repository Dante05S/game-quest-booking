import { type NextApiRequest, type NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default function deleteCookieEmailHandler(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  try {
    const { email } = req.cookies;
    if (email === undefined) {
      res.status(200).json({
        data: null,
        code: 200,
        success: true,
        message: 'Delete email success',
        errors: []
      });
      return;
    }
    const cookie = serialize('email', '', {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });
    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({
      data: null,
      code: 200,
      success: true,
      message: 'Delete email success',
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
