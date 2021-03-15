import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import createCache from '@emotion/cache';
import ResponsiveDrawer from '../src/navigation';
import theme from '../src/theme';
import { Provider, useSession, signIn } from 'next-auth/client';

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

function Unauthorized() {
    return (
        <div className="row">
            <div className="col-lg-10 col-offset-1">

                <p>Hey There, looks like you reached an area you don't have access to.</p>

               <p> Please sign in here.</p>

               <p> <button className="btn btn-secondary" onClick={()=>signIn()}>Login</button></p>
            </div>
        </div>
    )
}
export const AuthHOC = (props: AppProps)=>{
  const { Component, pageProps } = props;
  const [session] = useSession();
  if(session){
    return <Component {...pageProps}/>
  }
  else{
    return <Unauthorized/>
  }
} 
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
    <Provider session={pageProps.session}>
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
          <AuthHOC Component={Component} {...pageProps}/>
        </main>
        
      </ThemeProvider>
    </CacheProvider>
  
    </Provider>
    );
}
