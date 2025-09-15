
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 
      <section className="max-w-[1240px] mx-auto flex">
        {children}
      </section>

  );
}
