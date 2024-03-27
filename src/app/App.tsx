import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { I18nProvider } from '../_duhope/i18n/i18nProvider'
import { MasterInit } from '../_duhope/layout/MasterInit'
import { LayoutProvider, LayoutSplashScreen } from '../_duhope/layout/core'
import { ThemeModeProvider } from '../_duhope/partials'
import { Providers } from './context/redux.provider'
import { AuthInit } from './modules/auth'
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Providers>
        <I18nProvider>
          <LayoutProvider>
            <ThemeModeProvider>
              <AuthInit>
                <Outlet />
                <MasterInit />
              </AuthInit>
              <ToastContainer
                className="z-60"
                position="top-right"
                autoClose={3500}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
              />
            </ThemeModeProvider>
          </LayoutProvider>
        </I18nProvider>
      </Providers>
    </Suspense>
  )
}

export { App }

