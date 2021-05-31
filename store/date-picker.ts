import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import DatePickerChoices from '../components/date-picker/picking-choices'

@Module({
  name: 'date-picker',
  stateFactory: true,
  namespaced: true
})
class DatePickerStore extends VuexModule {
  public pickingChoice: string = DatePickerChoices.none

  public get getPickingChoice (): string {
    return this.pickingChoice
  }

  public get pickingDay (): boolean {
    return this.getPickingChoice === DatePickerChoices.day
  }

  public get pickingMonth (): boolean {
    return this.getPickingChoice === DatePickerChoices.month
  }

  public get pickingYear (): boolean {
    return this.getPickingChoice === DatePickerChoices.year
  }

  @Mutation
  public pickDay (): void {
    this.pickingChoice = DatePickerChoices.day
  }

  @Mutation
  public pickMonth (): void {
    this.pickingChoice = DatePickerChoices.month
  }

  @Mutation
  public pickYear (): void {
    this.pickingChoice = DatePickerChoices.year
  }
}

export default DatePickerStore
