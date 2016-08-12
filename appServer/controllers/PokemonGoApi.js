'use strict';

const PokemonGO = require('pokemon-go-node-api');

class PokemonGoApi {
  constructor() {
    this.api = new PokemonGO.Pokeio();
    this.init = this.init.bind(this);
    this.GetAccessToken = this.GetAccessToken.bind(this);
    this.GetApiEndpoint = this.GetApiEndpoint.bind(this);
    this.GetInventory = this.GetInventory.bind(this);
  }

  init(username, password, provider) {
    return new Promise((resolve, reject) => {
      if (provider !== 'ptc' && provider !== 'google') {
        return reject(new Error('Invalid provider'));
      }

      this.api.playerInfo.initTime = new Date().getTime();

      this.api.playerInfo.provider = provider;
      this.GetAccessToken(username, password)
          .then(this.GetApiEndpoint)
          .then(resolve)
          .catch(reject);
    });
  }

  GetApiEndpoint() {
    return new Promise((resolve, reject) => {
      this.api.GetApiEndpoint((err, apiEndpoint) => {
        if (err) {
          return reject(err);
        }
        return resolve(apiEndpoint);
      });
    });
  }

  GetAccessToken(username, password) {
    return new Promise((resolve, reject) => {
      this.api.GetAccessToken(username, password, (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      });
    });
  }

  GetInventory() {
    return new Promise((resolve, reject) => {
      this.api.GetInventory((err, inventory) => {
        if (err) {
          return reject(err);
        }
        return resolve(inventory);
      });
    });
  }
}

module.exports = PokemonGoApi;
