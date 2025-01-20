import React from 'react';
import './globals.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="w-screen h-screen flex flex-col bg-slate-200">
          <h1 className="bg-slate-900 h-16 font-bold text-white flex justify-center items-center">
            Mi Banco
          </h1>
          <div className="flex flex-1 h-full w-full justify-center items-start md:items-center p-2">
            <div className="w-full max-w-96 rounded shadow-sm bg-white shadow-black p-3 flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
