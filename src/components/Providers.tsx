'use client';

import { ThemeProvider } from 'next-themes';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ErrorBoundary>{children}</ErrorBoundary>
    </ThemeProvider>
  );
}
