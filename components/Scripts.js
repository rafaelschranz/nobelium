import Script from "next/script";
import { useConfig } from "@/lib/config";

const Scripts = () => {
  const BLOG = useConfig();

  return (
    <>
      {BLOG.analytics && BLOG.analytics.provider === "ackee" && (
        <Script
          src={BLOG.analytics.ackeeConfig.tracker}
          data-ackee-server={BLOG.analytics.ackeeConfig.dataAckeeServer}
          data-ackee-domain-id={BLOG.analytics.ackeeConfig.domainId}
        />
      )}
      {BLOG.analytics && BLOG.analytics.provider === "ga" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${BLOG.analytics.gaConfig.measurementId}`}
          />
          <Script strategy="lazyOnload" id="ga">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${BLOG.analytics.gaConfig.measurementId}', {
                page_path: window.location.pathname,
              });`}
          </Script>
        </>
      )}
      {BLOG.analytics && BLOG.analytics.provider === "umami" && (
        <script
          defer
          src="https://analytics.rafaelschranz.com/script.js"
          data-website-id="b34463b9-5f13-4a1f-9be1-271b8dbdd97d"
        ></script>
      )}
    </>
  );
};

export default Scripts;
