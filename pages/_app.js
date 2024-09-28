import '../styles/globals.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const noAuthRequired = ['/login', '/signup'];

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <AuthGuard Component={Component} pageProps={pageProps} />
    </SessionProvider>
  );
}

function AuthGuard({ Component, pageProps }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isAuthPage = noAuthRequired.includes(router.pathname);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading

    if (!session && !isAuthPage) {
      router.push('/login');
    }
    if (session && isAuthPage) {
      router.push('/'); // Redirect authenticated users away from auth pages
    }
    


  }, [session, status, router.pathname]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session && !isAuthPage) {
    return null; // Return nothing while redirecting
  }

  return <Component {...pageProps} />;
}

export default MyApp;
