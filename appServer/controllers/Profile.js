'use strict';

const PokemonGoApi = require('./PokemonGoApi');
const PokemonIdToName = require('../data/pokemons.json');

class ProfileController {
  constructor() {
    this.route = this.route.bind(this);
  }

  filterPokemons(inventory) {
    const delta = inventory.inventory_delta;
    const items = delta.inventory_items;
    const pokemons = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i].inventory_item_data;
      if (item.pokemon && item.pokemon.pokemon_id) {
        const pokemon = {};
        pokemon.id = item.pokemon.pokemon_id;
        pokemon.name = PokemonIdToName[pokemon.id];
        pokemon.attack = item.pokemon.individual_attack || 0;
        pokemon.defense = item.pokemon.individual_defense || 0;
        pokemon.stamina = item.pokemon.individual_stamina || 0;
        pokemon.iv = (parseFloat(pokemon.attack + pokemon.defense + pokemon.stamina) / 45) * 100;
        pokemon.iv = parseInt(pokemon.iv * 100, 10) / 100;
        pokemon.nickname = item.pokemon.nickname;
        pokemon.cp = item.pokemon.cp || 0;
        pokemons.push(pokemon);
      }
    }
    return pokemons;
  }

  route(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const provider = req.body.provider;
    const api = new PokemonGoApi();
    api.init(username, password, provider)
      .then(api.GetInventory)
      .then(this.filterPokemons)
      .then((pokemons) => {
        res.json({ status: 200, pokemons });
      })
      .catch((err) => {
        res.status(501).json({ status: 501, message: err.message });
      });
  }
}

module.exports = new ProfileController();
