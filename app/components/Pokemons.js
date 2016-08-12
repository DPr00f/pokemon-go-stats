import React from 'react';
import styles from './Pokemons.css';
import firstBy from 'thenby';
import Dropdown from 'react-dropdown';

class Pokemons extends React.Component {
  static get propTypes() {
    return {
      data: React.PropTypes.array.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      sortBy: { value: 'id', label: 'Pokemon Number' }
    };
    this.onSortChange = this.onSortChange.bind(this);
  }

  onSortChange(option) {
    this.setState({
      sortBy: option
    });
  }

  sortData() {
    const sortBy = this.state.sortBy.value;
    let direction = 1;
    if (sortBy === 'iv') {
      direction = -1;
    }
    return this.props.data.sort(
      firstBy(sortBy, { ignoreCase: true, direction })
      .thenBy('iv', { direction: -1 })
    );
  }

  sortOptions() {
    return [
      { value: 'id', label: 'Pokemon Number' },
      { value: 'iv', label: 'IV' },
      { value: 'name', label: 'Name' }
    ];
  }

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
        <div className={ styles.dropdownContainer }>
          <Dropdown
              options={ this.sortOptions() }
              onChange={ this.onSortChange }
              value={ this.state.sortBy }
              placeholder="Select an option to order from"
          />
        </div>
        <div className={ styles.boxCenter }>
          { this.sortData().map((item, index) => {
            return this.renderSingle(item, index);
          }) }
        </div>
      </div>
    );
  }
}

export default Pokemons;
