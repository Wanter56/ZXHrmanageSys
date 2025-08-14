export default {
  namespace: 'users',
  state: {
    list: [],
  },
  reducers: {
    save(state, action) {
      return { ...state, list: action.payload };
    },
  },
};
