import { useContext } from 'react';
import { AsideContext, type AsideState } from '@/context/AsideContext';

export default function useAside(): AsideState {
  return useContext(AsideContext);
}
