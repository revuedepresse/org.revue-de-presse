import Config from '../config'
import { FormattedStatus } from '../mixins/status-format'

type EnvParam = {
  developmentMode: boolean,
  mobileMode: boolean,
  productionMode: boolean,
  testMode: boolean
}

type EnvProvider = {
  getEnvironmentParameters: () => EnvParam
}

const developmentMode = process.env.NODE_ENV !== 'production'
const productionMode = !developmentMode

const environmentParameters: EnvParam = {
  developmentMode,
  mobileMode: developmentMode,
  productionMode: !developmentMode,
  testMode: Config.testMode
}

const getEnvironmentParameters = (): EnvParam => environmentParameters

const environmentProvider: EnvProvider = { getEnvironmentParameters }

let api = {}
if (!Config.testMode) {
  api = Config.getApi(environmentProvider)
}

const isProductionModeActive = (): boolean => getEnvironmentParameters().productionMode

const REQUIRED_COLLECTION = 'Empty aggregate'

type Errors = {[key: string]: string}

const errors = {
  REQUIRED_COLLECTION
}

type VisibleStatuses = {
  name: string,
  originalCollection: FormattedStatus[],
  statuses: FormattedStatus[],
}

const state = {
  maxStatusPerAggregateAtFirst: 5,
  loadingStatuses: true,
  visibleStatuses: {
    name: 'press-review',
    originalCollection: [],
    statuses: []
  }
}

type extra = {[key:string]: string}

type ErrorContext = {
  error: string,
  file: string,
  extra: extra
}

const logLevel = {
  isSilent: false,
  onError: (context: ErrorContext): void => {
    // eslint-disable-line no-console
    console.error(context)
  }
}

type captureMessage = (message: string, context: {[key:string]: string|extra}) => void
type captureException = (error: string, context: {[key:string]: string|extra}) => void

type Sentry = {
  captureMessage: captureMessage,
  captureException: captureException
}

class Logger {
  $sentry: Sentry

  constructor ($sentry: Sentry) {
    this.$sentry = $sentry
  }

  info (message: string, file: string, extra: {[key:string]: string}): void {
    if (logLevel.isSilent) {
      return
    }

    if (productionMode) {
      this.$sentry.captureMessage(message, {
        level: 'info',
        logger: file,
        extra
      })
    }
  }

  error (error: string, file: string, extra: {[key:string]: string}): string {
    logLevel.onError({ error, file, extra })

    if (logLevel.isSilent) {
      return error
    }

    if (productionMode) {
      this.$sentry.captureException(error, {
        logger: file,
        extra
      })

      return error
    }

    return error
  }
}

export { EnvParam, EnvProvider, Errors, VisibleStatuses }

export default {
  api,
  errors,
  getEnvironmentParameters,
  isProductionModeActive,
  Logger,
  logLevel,
  state
}
