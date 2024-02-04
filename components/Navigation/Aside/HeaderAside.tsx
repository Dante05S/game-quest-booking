import React from 'react';
import HeaderBar from '@/components/Surfaces/HeaderBar';
import useAside from '@/hooks/useAside';

export default function HeaderAside(): React.JSX.Element {
  const { toggle, labelHeader, iconHeader, stickyHeader } = useAside();
  const Icon = iconHeader;
  return (
    <HeaderBar sticky={stickyHeader}>
      {typeof labelHeader === 'string' ? (
        <button
          onClick={() => {
            toggle();
          }}
        >
          <div className="flex items-center">
            <>
              <Icon className="text-2xl" />
              <h4 className="font-semibold uppercase ml-1">{labelHeader}</h4>
            </>
          </div>
        </button>
      ) : (
        labelHeader
      )}
    </HeaderBar>
  );
}
