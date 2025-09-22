import { ToastContainer } from "react-toastify";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="max-w-[1240px] mx-auto flex overflow-hidden">
        <ToastContainer/>
        {children}
      </body>
    </html>
  );
}
