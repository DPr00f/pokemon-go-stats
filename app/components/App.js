import React from 'react';
import Pokemons from './Pokemons';
import styles from './App.css';
import ApiActions from '../actions/api';
import store from '../store';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { ERROR_ON_PROFILE, GOT_PROFILE } from '../events';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLogin: false,
      error: false,
      pokemons: []
    };
    this.onClickPTC = this.onClickPTC.bind(this);
    this.onClickGoogle = this.onClickGoogle.bind(this);
    this.onFailedToLogin = this.onFailedToLogin.bind(this);
    this.onProfileReceived = this.onProfileReceived.bind(this);
  }

  componentDidMount() {
    store.on(ERROR_ON_PROFILE, this.onFailedToLogin);
    store.on(GOT_PROFILE, this.onProfileReceived);
  }

  componentWillUnmount() {
    store.removeListener(ERROR_ON_PROFILE, this.onFailedToLogin);
    store.removeListener(GOT_PROFILE, this.onProfileReceived);
  }

  onProfileReceived(pokemons) {
    this.setState({
      hasLogin: true,
      pokemons
    });
  }

  onFailedToLogin() {
    this.setState({
      error: 'There was an error while loging in. Please verify your credentials.'
    });
  }

  getUserAndPass() {
    return {
      username: this.refs.username.value,
      password: this.refs.password.value
    };
  }

  onClickPTC() {
    this.setState({ error: false });
    ApiActions.getPTCProfile(this.getUserAndPass());
  }

  onClickGoogle() {
    this.setState({ error: false });
    ApiActions.getGoogleProfile(this.getUserAndPass());
  }

  renderForkMe() {
    return (
      <GitHubForkRibbon href="//github.com/DPr00f/pokemon-go-stats"
                        target="_blank"
                        position="right">
        Fork me on GitHub
      </GitHubForkRibbon>
    );
  }

  renderLogin() {
    if (this.state.hasLogin) {
      return null;
    }

    return (
      <div className={ styles.loginArea }>
        <div className={ styles.loginBox }>
          <input type="text" ref="username" placeholder="Username" className={ styles.textInput } />
          <input type="password" ref="password" placeholder="Password" className={ styles.textInput } />
          <input type="button" value="PTC Login" className={ styles.loginButton } onClick={ this.onClickPTC } />
          <input type="button" value="Google Login" className={ styles.loginButton } onClick={ this.onClickGoogle }/ >
        </div>
      </div>
    );
  }

  renderError() {
    if (!this.state.error) {
      return null;
    }

    return (
      <div className={ styles.errorBox }>
        { this.state.error }
      </div>
    );
  }

  renderPokemons() {
    if (!this.state.hasLogin) {
      return null;
    }

    return (
      <Pokemons data={ this.state.pokemons } />
    );
  }

  render() {
    return (
      <div className={styles.app}>
        { this.renderForkMe() }
        { this.renderError() }
        { this.renderLogin() }
        { this.renderPokemons() }
      </div>
    );
  }
}

export default App;
