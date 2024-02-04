import React from 'react';
import socialNetworks from '@/utils/socialNetworks';

export default function Footer(): React.JSX.Element {
  return (
    <footer className="w-full bg-secondary flex flex-col items-center justify-center p-5 py-[0.72rem]">
      <p className="text-center">Made with ❤️ by Alejandro Bedoya Sanchez</p>
      <div className="flex items-center mt-1.5">
        <ul className="flex items-center gap-3">
          {socialNetworks.map((socialNetwork) => {
            const Icon = socialNetwork.icon;
            return (
              <li key={socialNetwork.key} className="group">
                <a
                  href={socialNetwork.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="text-3xl group-hover:scale-125 transition-transform" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
