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
  onError: (_: ErrorContext): void => {
  }
}

class Logger {
  constructor () {
  }

  info (): void {
  }

  error (): void {
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
