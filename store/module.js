export default {
  namespaced: true,
  state: {
    incrementer: 0,
    list: {},
  },
  getters: {
    list(state) {
      return state.list;
    },
  },
  mutations: {
    /**
     * Append a new callout to the list of callouts.
     * @param  {Object|String} callout
     */
    push(state, callout) {
      if (typeof callout === 'string') {
        callout = { text: callout };
      }
      state.list = Object.keys(state.list).reduce(
        (carry, key) => ({
          ...carry,
          [key]: state.list[key],
        }),
        { [state.incrementer]: callout },
      );
      state.incrementer++;
    },
    /**
     * Remove a callout by it's id in the list.
     * @param  {number} id
     */
    dismiss(state, id) {
      state.list = Object.keys(state.list).reduce((carry, key) => {
        if (id !== key) {
          carry[key] = state.list[key];
        }
        return carry;
      }, {});
    },
    clear(state) {
      state.list = {};
    },
  },
};
