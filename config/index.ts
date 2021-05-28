import { EnvParam, EnvProvider } from '~/modules/shared-state'

const raven = {
  dsn: process.env.RAVEN_DSN
}

const testMode = false

const getHostAndScheme = (environmentProvider: EnvProvider) => {
  let host: string|undefined = 'localhost'
  let scheme: string|undefined = 'http://'

  const environment: EnvParam = environmentProvider.getEnvironmentParameters()
  if (environment.productionMode) {
    host = process.env.API_HOST
    scheme = 'https://'
  }

  return {
    host,
    scheme
  }
}

type Route = {
  method: string,
  route: string,
  params: {[key: string]: NumberConstructor|StringConstructor}
}

type Routes = {
  actions: {[key: string]: Route}
}

type Api = {
  host?: string,
  scheme?: string,
  routes: Routes
}

const api: Api = {
  routes: {
    actions: {
      fetchHighlights: {
        method: 'get',
        route: '/api/twitter/highlights',
        params: {
          pageSize: Number,
          pageIndex: Number
        }
      }
    }
  }
}

const getApi = (environmentProvider: EnvProvider) => {
  api.host = getHostAndScheme(environmentProvider).host
  api.scheme = getHostAndScheme(environmentProvider).scheme

  return api
}

const getRoutes = (): Routes => api.routes
const getSchemeAndHost = () => `${api.scheme}${api.host}`

let apiAuthToken = ''
if (process.env.API_AUTH_TOKEN !== undefined) {
  apiAuthToken = process.env.API_AUTH_TOKEN
}

localStorage.setItem('x-auth-token', apiAuthToken)

export { Api, Routes }

export default {
  getApi,
  getRoutes,
  getSchemeAndHost,
  raven,
  testMode
}
