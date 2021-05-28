import { Vue, Component } from 'nuxt-property-decorator'
import Config, { Routes } from '../config'

@Component
class ApiMixin extends Vue {
  get routes (): any {
    const routePaths: Routes = Config.getRoutes()
    const routes: {[key: string]: object} = {}

    // Handle actions separately for more clarity
    routes.actions = routePaths.actions

    return routes
  }
}

export default ApiMixin
