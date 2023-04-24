import { Global, ThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import { appWithTranslation } from 'next-i18next';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { RecoilRoot } from 'recoil';
import BottomNavigation from '@components/common/BottomNavigation';
import Header from '@components/common/Header';
import ToastBase from '@components/common/ToastBase';
import Layout from '@components/layout';
import useAppTheme from '@hooks/useAppTheme';
import useModal from '@hooks/useModal';
import * as gtag from '@lib/gtag';
import { GlobalStyle } from '@styles/globalStyle';
import { ResetStyle } from '@styles/resetStyle';
import { default as Theme } from '@styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 1000 * 60,
    },
  },
});

const notoSansKR = Noto_Sans_KR({ weight: '500', subsets: ['latin'] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme, toggleTheme } = useAppTheme();
  const createScheduleModal = useModal();
  gtag.useGtag();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme[theme]}>
        <RecoilRoot>
          <Global styles={ResetStyle} />
          <Global styles={GlobalStyle} />
          <main className={notoSansKR.className}>
            <Layout>
              <Header theme={theme} toggleTheme={toggleTheme} />
              <Component {...pageProps} createScheduleModal={createScheduleModal} />
              <BottomNavigation createScheduleModal={createScheduleModal} />
              <ToastBase />
            </Layout>
          </main>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp);
