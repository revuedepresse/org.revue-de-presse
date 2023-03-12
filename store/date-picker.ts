import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import DatePickerChoices from '../components/date-picker/picking-choices'

@Module({
  name: 'date-picker',
  stateFactory: true,
  namespaced: true
})
class DatePickerStore extends VuexModule {
  public pickingChoice: string = DatePickerChoices.none

  public pickedDate: Date|null = null

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

  public get beingUndecided (): boolean {
    return this.getPickingChoice === DatePickerChoices.none
  }

  public get datePicker (): () => Date|null {
    const pickedDate = this.pickedDate

    return () => pickedDate
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

  @Mutation
  public resetPickingChoice (): void {
    this.pickingChoice = DatePickerChoices.none
  }

  @Mutation
  public intendingToPick (date: Date): void {
    this.pickedDate = date
  }
}

export default DatePickerStore
