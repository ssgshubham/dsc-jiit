import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components'
import { ServerStyleSheets } from '@material-ui/styles';
import theme from '../src/theme';

class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const styledComponentsSheet = new ServerStyleSheet()
    const materialSheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage;

    try {
        ctx.renderPage = () => originalRenderPage({
            enhanceApp: App => props => styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />))
          })
        const initialProps = await Document.getInitialProps(ctx)
        return {
          ...initialProps,
          styles: (
            <React.Fragment>
              {initialProps.styles}
              {materialSheets.getStyleElement()}
              {styledComponentsSheet.getStyleElement()}
            </React.Fragment>
          )
        }
      } finally {
        styledComponentsSheet.seal()
      }
  }

  render() {
    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={theme.palette.primary.main}
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />

  <meta name="apple-mobile-web-app-status-bar-style" content="#fff" />
  <link rel="manifest" href="manifest.json" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="description" content="IIITL Developer Student Club (DSC IIITL) is a Google Developers program for IIITL students to learn mobile and web development skills." />
  <title> DSC JIIT</title>
  <link rel="icon" href="assets/img/logo.png" />

  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800|Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons" />
  <link rel="stylesheet" href="./js/maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" />

  <link href="../assets/css/material-kit1c51.css?v=2.1.2" rel="stylesheet" />
  <link rel="stylesheet" href="./js/unpkg.com/flickity%402.2.1/dist/flickity.min.css" />
  <link href="../assets/css/custom.css" rel="stylesheet" />

        </Head>
        <body>
        <div class="wrapper">
            <div class="blue ball"></div>
            <div class="red ball"></div>
            <div class="yellow ball"></div>
            <div class="green ball"></div>
          </div>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;