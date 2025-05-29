import React from "react";

export const metadata = {
  title: "Data Aptika Jeneponto Management",
  description: "Admin management system for Data Aptika Jeneponto",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white text-black">
      <body>{children}</body>
    </html>
  );
}
