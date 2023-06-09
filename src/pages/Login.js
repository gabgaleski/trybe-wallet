import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userInfos } from '../redux/actions';
import logo from '../images/logo.svg';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  handleChange = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    });
  };

  changePage = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userInfos(email));
    history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const minPassword = 6;
    return (
      <form className="form-login">
        <div className="inputs-container">
          <section>
            <img src={ logo } alt="logo" />
            <h1>
              Trybe
              <span>Wallet</span>
            </h1>
          </section>
          <label htmlFor="email">
            Email
            <input
              placeholder="Email"
              id="email"
              name="email"
              data-testid="email-input"
              type="email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            senha
            <input
              placeholder="Password"
              id="password"
              name="password"
              data-testid="password-input"
              type="password"
              onChange={ this.handleChange }
              value={ password }
            />
          </label>
          <button
            type="button"
            disabled={
              !(password.length >= minPassword
              && email.includes('@') && email.includes('.com'))
            }
            onClick={ this.changePage }
          >
            Entrar
          </button>
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
