'use client'
import client from "../apollo-client"
import { ApolloProvider, useQuery } from "@apollo/client/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ApolloProvider client={client}>
        {children}
      </ApolloProvider>
      </body>
    </html>
  );
}
