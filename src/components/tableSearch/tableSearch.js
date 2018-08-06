export default {
  name: 'TableSearch',
  data() {
    return {};
  },
  props: {
    searchModel: {
      type: Object,
      default() {
        return {};
      }
    },
    searchRules: Object,
    searchFields: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  component: {},
  methods: {
    onSearch() {
      this.$emit('onSearch', this.searchRules);
    },
    onReset() {
      this.$emit('onReset', this.searchRules);
    }
  },
  created() {},
  mounted() {}
};
