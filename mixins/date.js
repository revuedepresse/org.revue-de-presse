import Time from '../modules/time';

export default {
  computed: {
    daysOfWeek() {
      return ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'];
    },
    getMonths() {
      return [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
      ]
    }
  },
  methods: {
    dateOfFirstVisibleDay() {
      let firstVisibleDayCandidate = this.nameOfFirstDayOfMonth();
      let dateCandidate = new Date(this.year, this.month, 1);

      this.guardAgainstMissingMonthOrYear(firstVisibleDayCandidate);

      while  (firstVisibleDayCandidate !== 'Lun.') {
        dateCandidate.setDate(dateCandidate.getDate() - 1);
        firstVisibleDayCandidate = this.whichDayOfWeek(dateCandidate.getDay());
      }

      return dateCandidate;
    },
    dateOfLastVisibleDay() {
      let lastVisibleDayCandidate = this.nameOfLastDayOfMonth();
      let dateCandidate = new Date(this.year, this.month, this.totalDaysInMonth());

      this.guardAgainstMissingMonthOrYear(lastVisibleDayCandidate);

      while  (lastVisibleDayCandidate !== 'Dim.') {
        dateCandidate.setDate(dateCandidate.getDate() + 1);
        lastVisibleDayCandidate = this.whichDayOfWeek(dateCandidate.getDay());
      }

      return dateCandidate;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    },
    guardAgainstMissingMonthOrYear(candidate) {
      if (candidate === undefined) {
        throw 'Definition of month and year properties, data, computed or props are to be defined'
      }
    },
    getCurrentDate() {
      return Time.today();
    },
    getMinDate() {
      return Time.formatDate(new Date('2018-01-01'));
    },
    getMaxDate() {
      return this.getCurrentDate();
    },
    nameOfFirstDayOfMonth() {
      return this.daysOfWeek[new Date(this.year, this.month, 1).getDay()]
    },
    nameOfLastDayOfMonth() {
      const lastDayNumberOfMonth = this.totalDaysInMonth();

      return this.whichDayOfWeek([new Date(this.year, this.month, lastDayNumberOfMonth).getDay()]);
    },
    totalDaysInMonth() {
      return new Date(this.year, this.month + 1, 0).getDate();
    },
    totalDaysInPreviousMonth() {
      return new Date(this.year, this.month, 0).getDate();
    },
    whichDayOfWeek(dayNumber) {
      return this.daysOfWeek[dayNumber];
    }
  }
};
