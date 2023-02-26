import { Middleware } from '@nuxt/types'

const RedirectMiddleware: Middleware = ({ route, redirect }) => {
  if (
    route.name !== 'homepage' &&
    route.name !== 'curated-highlights' &&
    route.name !== 'legal-notice') {
    return redirect('/')
  }
}

export default RedirectMiddleware
