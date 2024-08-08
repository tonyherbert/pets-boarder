import type { AppProps } from "next/app";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

    useEffect(() => {
      console.log("Current route:", router.pathname);
      document.body.classList.add('dark');
  }, []);

  return (
      <NextThemesProvider >
        <Component {...pageProps} />
      </NextThemesProvider>
  );
}

