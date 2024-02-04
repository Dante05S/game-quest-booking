import Avatar from '@/components/Display/Avatar';
import React from 'react';
import navItemsUser from '@/utils/navItemsUser';

export default function AsideUser(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center w-full h-full">
      <Avatar size={65}>A</Avatar>
      <div className="mt-2.5 w-full flex flex-col items-center gap-0.5">
        <span>¡Bienvenido! Alejandro</span>
        <span className="text-primary">+57 321 8403738</span>
      </div>
      <ul className="flex flex-col gap-1 w-full px-2 mt-2.5">
        {navItemsUser.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.key}
              className="px-2 py-3 rounded-md group cursor-pointer hover:bg-primary transition-colors"
            >
              <div className="flex items-center">
                <Icon className="text-xl  transition-colors" />
                <span className="text-sm ml-2  transition-colors">
                  {item.title}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
