import DatePicker from '../components/date-picker/picking-choices'

export const state = () => ({
  pickingChoice: DatePicker.month
})

export const mutations = {
  pickDay (state) {
    state.pickingChoice = DatePicker.day
  },
  pickMonth (state) {
    state.pickingChoice = DatePicker.month
  },
  pickYear (state) {
    state.pickingChoice = DatePicker.year
  }
}
