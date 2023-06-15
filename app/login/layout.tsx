import React from "react";
import { Header } from "../components/header";
import { Card, CardContent } from "../components/common/card";
import "../globals.css";

export const metadata = {
  title: "The-Playmaker | Log in",
  description: "The-Playmaker login page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        <div className="bg-slate-50 flex justify-center">
          <span className="text-sm">
            You are not signed in. Please log in or register
          </span>
        </div>
        <div className="xl:max-w-screen-xl sm:px-4 xl:px-0 mx-2">
          <Card>
            <CardContent>
              <div className="flex justify-center">Announcement banner</div>
            </CardContent>
          </Card>
          <main className="flex h-screen flex-col flex-wrap w-full md:content-center md:justify-center">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
