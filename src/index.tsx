import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './../src/app/redux/store'
// Axios
import axios from 'axios'
import { Chart, registerables } from 'chart.js'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
// Apps
import './_duhope/assets/fonticon/fonticon.css'
import './_duhope/assets/keenicons/duotone/style.css'
import './_duhope/assets/keenicons/outline/style.css'
import './_duhope/assets/keenicons/solid/style.css'
import { MetronicI18nProvider } from './_duhope/i18n/Metronici18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 * import './_duhope/assets/css/style.rtl.css'
 **/
import './_duhope/assets/sass/plugins.scss'
import './_duhope/assets/sass/style.react.scss'
import './_duhope/assets/sass/style.scss'
import { AuthProvider, setupAxios } from './app/modules/auth'
import { AppRoutes } from './app/routing/AppRoutes'
/**
 * Creates `axios-mock-adapter` instance for provided `axios` instance, add
 * basic Metronic mocks and returns it.
 *
 * @see https://github.com/ctimmerm/axios-mock-adapter
 */
/**
 * Inject Metronic interceptors for axios.
 *
 * @see https://github.com/axios/axios#interceptors
 */
setupAxios(axios)
Chart.register(...registerables)

const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <QueryClientProvider client={queryClient}>
      <MetronicI18nProvider>
        <AuthProvider>
          <Provider store={store}>
          <AppRoutes />
          </Provider>
        </AuthProvider>
      </MetronicI18nProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
