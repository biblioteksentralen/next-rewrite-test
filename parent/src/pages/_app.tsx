import { useLogDevInfo } from "@/logDevInfo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useLogDevInfo();
  return <Component {...pageProps} />;
}
