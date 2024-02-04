import React from 'react';
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
interface Props {
  isAuth?: boolean;
  children: React.ReactNode;
}

export default function PageLayout({
  children,
  isAuth = false
}: Props): React.JSX.Element {
  return (
    <div className="flex flex-col h-full relative">
      <NavBar />
      <main>
        <div className="h-full">{children}</div>
      </main>
      {!isAuth && <Footer />}
    </div>
  );
}
