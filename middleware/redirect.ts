import { Middleware } from '@nuxt/types'

const RedirectMiddleware: Middleware = ({ route, redirect }) => {
  if (
    route.name !== 'homepage' &&
    route.name !== 'contact' &&
    route.name !== 'curated-highlights' &&
    route.name !== 'legal-notice' &&
    route.name !== 'sources'
  ) {
    return redirect('/')
  }
}

export default RedirectMiddleware
