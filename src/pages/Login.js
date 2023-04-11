import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userInfos } from '../redux/actions';

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
    return history.push('/carteira');
  };

  render() {
    const { email, password } = this.state;
    const minPassword = 6;
    return (
      <div>
        <label htmlFor="email">
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
          disabled={
            !(password.length >= minPassword
              && email.includes('@') && email.includes('.com'))
          }
          onClick={ this.changePage }
        >
          Entrar
        </button>
      </div>
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
