import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Project Task Tracker",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main
          style={{
            backgroundColor:
              "#" + Math.floor(Math.random() * 16777215).toString(16),
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
