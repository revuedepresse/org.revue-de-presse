import Time from '../modules/time';

export default {
  methods: {
    getCurrentDate() {
      return Time.today();
    },
    getMinDate() {
      return Time.formatDate(new Date('2018-01-01'));
    },
    getMaxDate() {
      return this.getCurrentDate();
    }
  }
};
