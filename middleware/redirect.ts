import { Middleware } from '@nuxt/types'
import Time from '../modules/time'

const RedirectMiddleware: Middleware = ({ route, redirect }) => {
  if (
    route.name === 'curated-highlights' && !route.path.endsWith('/')) {
    return redirect(`/${route.params.day}/`)
  }

  if (
    route.name === 'legal-notice' && !route.path.endsWith('/')) {
    return redirect(`/mentions-legales/`)
  }

  if (
    route.name !== 'homepage' &&
    route.name !== 'curated-highlights' &&
    route.name !== 'legal-notice') {
    return redirect(`/${Time.today()}/`)
  }
}

export default RedirectMiddleware
