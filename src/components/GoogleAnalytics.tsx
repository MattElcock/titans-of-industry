"use client";

import Script from "next/script";

export const GoogleAnalytics = () => {
  const ga_id = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  return (
    <>
      {ga_id && (
        <>
          <Script src="//cdn.cookie-script.com/s/785381726705be5134c0ebf6eb5ea385.js" />
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
          />
          <Script
            id="google-analytics"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga_id}');
              `,
            }}
          />
        </>
      )}
    </>
  );
};
