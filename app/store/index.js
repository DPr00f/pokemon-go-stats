import ActionDispatcher from '../dispatcher';
import request from 'superagent';
import EventEmitter from 'events';
import {
  GET_PTC_PROFILE,
  GET_GOOGLE_PROFILE,
  GOT_PROFILE,
  ERROR_ON_PROFILE
} from '../events';

class Store extends EventEmitter {
  getProfile(username, password, provider) {
    request.post('/api/profile')
           .send({username, password, provider })
           .set('Accept', 'application/json')
           .end((err, res) => {
             if (err) {
               this.emit(ERROR_ON_PROFILE, err);
             } else {
               this.emit(GOT_PROFILE, res.body.pokemons);
             }
           });
  }

  getPTCProfile(username, password) {
    this.getProfile(username, password, 'ptc');
  }

  getGoogleProfile(username, password) {
    this.getProfile(username, password, 'google');
  }
}

const store = new Store();

ActionDispatcher.register((action) => {
  switch (action.type) {
    case GET_PTC_PROFILE:
      store.getPTCProfile(action.username, action.password);
      break;

    case GET_GOOGLE_PROFILE:
      store.getGoogleProfile(action.username, action.password);
      break;

    default:
      throw new Error(`Action of type ${action.type} not found`);
  }
});

export default store;
