import React from 'react';
import styles from './Pokemons.css';

class Pokemons extends React.Component {
  renderSingle(pokemon, key) {
    return (
      <div key={key} className={ styles.box }>
        <div className={ styles.cp }>CP: { pokemon.cp }</div>
        <div className={ styles[`poke${[pokemon.id]}`] }></div>
        <div className={ styles.iv }>IV { pokemon.iv }%</div>
        <div className={ styles.name }>{ pokemon.nickname || pokemon.name }</div>
      </div>
    );
  }

  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.boxCenter }>
          { this.props.data.map((item, index) => {
            return this.renderSingle(item, index);
          }) }
        </div>
      </div>
    );
  }
}

export default Pokemons;
