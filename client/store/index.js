export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn;
  },

  currentUser(state) {
    return state.auth.user;
  },
};
