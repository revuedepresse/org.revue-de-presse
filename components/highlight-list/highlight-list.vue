<template>
  <div :class='highlightsClasses'>
    <intro />
    <div class="highlight-list__buttons">
      <label
        :class="{ 'highlight-list__dates': showEndDate }"
        for="start-date"
      >
        <input
          id="start-date"
          ref="startDate"
          v-model="startDate"
          :min="minDate"
          :max="maxStartDate"
          type="date"
        >
        <input
          v-if="showEndDate"
          id="end-date"
          v-model="endDate"
          :min="minEndDate"
          :max="maxDate"
          type="date"
        >
        <input
          v-else
          v-model="startDate"
          :min="minEndDate"
          :max="maxDate"
          type="hidden"
        >
      </label>
      <div
        v-if="canIdentifyRetweets"
        v-show="canFilterByRetweet"
        class="highlight-list__retweets"
      >
        <span class="highlight-list__retweets-label">
          Retweets are
        </span>
        <label
          for="included-retweets"
          title="Include or exclude retweets">
          <input
            id="included-retweets"
            v-model="includeRetweets"
            name="retweets"
            type="radio"
            value="1"
          >{{ includedRetweetsLabel }}
        </label>
        <label
          for="excluded-retweets"
          title="Include or exclude retweets">
          <input
            id="excluded-retweets"
            v-model="includeRetweets"
            type="radio"
            name="retweets"
            value="0"
          >{{ excludedRetweetsLabel }}
        </label>
      </div>
    </div>
    <ul class="list__items">
      <li
        v-for="(highlight, index) in highlights"
        :key="highlight.statusId"
        :data-key="highlight.statusId"
        class="list__item"
      >
        <status
          :status-at-first="formatStatus(highlight.status)"
          :ref-name="index"
        />
      </li>
    </ul>
    <outro />
  </div>
</template>

<script>
import ApiMixin from '../../mixins/api';
import Config from '../../config';
import DateMixin from '../../mixins/date';
import EventHub from '../../modules/event-hub';
import StatusFormat from '../../mixins/status-format';
import SharedState from '../../modules/shared-state';
import Status from '../status/status.vue';
import Intro from '../intro/intro.vue';
import Outro from '../outro/outro.vue';

const RETWEETS_EXCLUDED = '0';

export default {
  name: 'highlight-list',
  components: { Intro, Status, Outro },
  mixins: [ApiMixin, DateMixin, StatusFormat],
  data() {
    let { startDate, endDate } = this.$route.params;

    if (startDate === '1970-01-01') {
      startDate = this.getMaxDate();
    }

    if (endDate === '1970-01-01') {
      endDate = this.getMaxDate();
    }

    return {
      includeRetweets: RETWEETS_EXCLUDED,
      aggregates: [],
      items: [],
      logger: new SharedState.Logger(this.$sentry),
      minDate: '2018-01-01',
      maxDate: this.getMaxDate(),
      selectedAggregates: [],
      pageIndex: 1,
      pageSize: 10,
      totalPages: null,
      endDate,
      startDate
    };
  },
  computed: {
    canIdentifyRetweets() {
      return new Date(this.startDate) >= new Date('2018-12-09');
    },
    canFilterByRetweet() {
      return false;
    },
    highlights() {
      return this.items;
    },
    highlightsClasses() {
      return {
        'highlight-list': true,
        list: true
      };
    },
    includedRetweetsLabel() {
      return 'included';
    },
    excludedRetweetsLabel() {
      return 'excluded';
    },
    maxStartDate() {
      if (new Date(this.maxDate) > new Date(this.endDate)) {
        return this.endDate;
      }

      return this.maxDate;
    },
    minEndDate() {
      if (new Date(this.minDate) > new Date(this.startDate)) {
        return this.minDate;
      }

      return this.startDate;
    },
    showEndDate() {
      return this.$route.name !== 'highlights';
    },
    sortedAggregates() {
      const reversedAggregates = this.aggregates.concat([]);
      return reversedAggregates.reverse();
    }
  },
  watch: {
    startDate() {
      this.updateHighlights();
    },
    endDate() {
      this.updateHighlights();
    },
    includeRetweets() {
      this.updateHighlights();
    }
  },
  destroyed() {
    EventHub.$off('highlight_list.reload_intended');
  },
  created() {
    EventHub.$off('highlight_list.reload_intended');
    EventHub.$on('highlight_list.reload_intended', this.fetchHighlights);

    this.fetchHighlights();
  },
  async fetch() {
    const action = this.getHighlightsAction();
    const route = this.getHighlightsRoute();
    const requestOptions = this.getRequestOptions();

    const url = new URL(route);
    Object.keys(requestOptions.params).map(key =>
      url.searchParams.set(key, requestOptions.params[key])
    );

    const response = await fetch(
      url,
      {
        method: action.method,
        headers: requestOptions.headers
      }
    )
    .then(res => res.json())
    .catch(e => {
      this.logger.error(e.message, 'highlight-list', e);
    });

    this.items = response.statuses;
  },
  methods: {
    getRequestOptions(params = {}) {
      const authenticationToken = localStorage.getItem('x-auth-token');
      const requestOptions = {
        headers: { 'x-auth-token': authenticationToken }
      };

      requestOptions.params = {
        startDate: this.startDate,
        endDate: this.endDate
      };

      if (!this.showEndDate) {
        requestOptions.params.endDate = this.startDate;
      }

      if (params.pageIndex) {
        if (!('params' in requestOptions)) {
          requestOptions.params = {};
        }

        requestOptions.params.pageIndex = params.pageIndex;
      }

      if (!('params' in requestOptions)) {
        requestOptions.params = {};
      }

      if (this.pageSize > 0) {
        requestOptions.params.pageSize = this.pageSize;
      }

      requestOptions.params.includeRetweets = 1;
      if (this.includeRetweets === RETWEETS_EXCLUDED) {
        requestOptions.params.includeRetweets = 0;
      }

      if (this.selectedAggregates.length > 0) {
        requestOptions.params.selectedAggregates = this.selectedAggregates;
      }

      return requestOptions;
    },
    getHighlightsAction() {
      return this.routes.actions.fetchHighlights;
    },
    getHighlightsRoute() {
      const action = this.getHighlightsAction();
      return `${Config.getSchemeAndHost()}${action.route}`;
    },
    fetchHighlights(params = {}) {
      this.$fetch();
    },
    getMaxDate() {
      return this.getCurrentDate();
    },
    updateHighlights() {
      this.fetchHighlights();
      this.$router.push({
        path: `/highlights/${this.startDate}/${this.getMaxDate()}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import './highlight-list.scss';
</style>
