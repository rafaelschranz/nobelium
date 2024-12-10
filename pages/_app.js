import "@/styles/globals.css"; // Your global styles
import "@/styles/notion.css"; // Additional styles (if needed)
import Head from "next/head";
import { ConfigProvider } from "@/lib/config";
import { LocaleProvider } from "@/lib/locale";
import { prepareDayjs } from "@/lib/dayjs";
import { ThemeProvider } from "@/lib/theme";

export default function MyApp({ Component, pageProps, config, locale }) {
  return (
    <ConfigProvider value={config}>
      <LocaleProvider value={locale}>
        <ThemeProvider>
          <>
            {/* Add Umami analytics script globally */}
            <Head>
              {process.env.NODE_ENV === "production" && (
                <script
                  defer
                  src="https://analytics.rafaelschranz.com/script.js"
                  data-website-id="b34463b9-5f13-4a1f-9be1-271b8dbdd97d"
                ></script>
              )}
            </Head>

            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </LocaleProvider>
    </ConfigProvider>
  );
}

MyApp.getInitialProps = async (ctx) => {
  const config =
    typeof window === "object"
      ? await fetch("/api/config").then((res) => res.json())
      : await import("@/lib/server/config").then(
          (module) => module.clientConfig
        );

  prepareDayjs(config.timezone);

  return {
    ...App.getInitialProps(ctx),
    config,
    locale: await loadLocale("basic", config.lang),
  };
};
