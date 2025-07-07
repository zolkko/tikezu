import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Karwall" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <link rel="apple-touch-startup-image" href="/static/logi.svg" />
        <link rel="manifest" href="/static/manifest.json" />
        <link rel="apple-touch-icon" href="/static/logo.svg" />
        <link rel="stylesheet" href="/styles.css" />
        <title>Karwall</title>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
