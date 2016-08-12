import ActionDispatcher from '../dispatcher';
import { GET_GOOGLE_PROFILE, GET_PTC_PROFILE } from '../events';

export default {
  getPTCProfile: (loginObj) => {
    const { username, password } = loginObj;
    ActionDispatcher.dispatch({
      type: GET_PTC_PROFILE,
      username,
      password
    });
  },

  getGoogleProfile: (loginObj) => {
    const { username, password } = loginObj;
    ActionDispatcher.dispatch({
      type: GET_GOOGLE_PROFILE,
      username,
      password
    });
  }
};
