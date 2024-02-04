import React from 'react';
import Footer from '@/components/Footer';
import NavBar from '@/components/Navbar';
interface Props {
  overflow?: boolean;
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props): React.JSX.Element {
  return (
    <div className="flex flex-col h-full relative">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
