import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;

    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p>Despesa Total:</p>
        <p data-testid="total-field">{total.toFixed(2)}</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.totalValue,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
