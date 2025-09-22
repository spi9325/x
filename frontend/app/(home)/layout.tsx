import { Sidebar } from "../components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (        
     <main className="max-w-[1440px] mx-auto flex w-screen gap-x-2 overflow-hidden">
          <Sidebar/>
          <div className="flex-1 overflow-hidden">
             {children}
          </div>
     </main>
     
  );
}
