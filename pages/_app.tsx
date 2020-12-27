import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import createCache from '@emotion/cache';
import ResponsiveDrawer from '../src/navigation';
import theme from '../src/theme';

export const cache = createCache({ key: 'css', prepend: true });
const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    marginLeft:73,
    padding: theme.spacing(3),
  },
}));
export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;
  const classes = useStyles();
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Apollo 24|7</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      
      <ThemeProvider theme={theme}>
      <nav>
        <ResponsiveDrawer/>
        <CssBaseline />
      </nav>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <main className ={classes.content}>
        <div className={classes.toolbar} />
          <Component {...pageProps} />
        </main>
        
      </ThemeProvider>
    </CacheProvider>
  );
}
