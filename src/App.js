import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './Login.css';
import './Header.css';
import './WalletForm.css';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
