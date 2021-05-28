import Time from './time'

const defaultRedirect = `/highlights/${Time.today()}/${Time.today()}`

export default [
  {
    path: '/',
    redirect: defaultRedirect
  },
  {
    path: '*',
    redirect: defaultRedirect
  },
  {
    path: '/highlights/:startDate/:endDate',
    name: 'highlights'
  }
]
