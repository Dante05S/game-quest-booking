import { clearTokenThunk } from '@/redux/slices/userSlice';
import { type AppDispatch } from '@/redux/store';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

interface UseRedirectNav {
  redirectTo: (href: string) => Promise<void>;
}

export default function useRedirectNav(): UseRedirectNav {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const redirectTo = async (href: string): Promise<void> => {
    if (href === '/logout') {
      await dispatch(clearTokenThunk());
      router.reload();
      return;
    }
    void router.push(href);
  };

  return {
    redirectTo
  };
}
