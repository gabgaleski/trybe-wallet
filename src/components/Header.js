import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../images/logo.svg';
import moedas from '../images/moedas.svg';
import profile from '../images/profile.svg';

class Header extends Component {
  getValue = () => {
    const { expenses } = this.props;
    const value = expenses.reduce((acc, element) => (
      Number(acc) + (Number(element.value) * element.exchangeRates[element.currency].ask)
    ), 0);
    return value.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <div className="header-container">
        <section className="header-logo">
          <img src={ logo } alt="logo" />
          <h1>
            Trybe
            <span>Wallet</span>
          </h1>
        </section>
        <section className="expenses-container">
          <img src={ moedas } alt="Moedas Icon" />
          <p>Despesa Total:</p>
          <p className="value" data-testid="total-field">{this.getValue()}</p>
          <p data-testid="header-currency-field">BRL</p>
        </section>
        <section className="email-container">
          <img src={ profile } alt="Profile Icon" />
          <p data-testid="email-field">{email}</p>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Header);
