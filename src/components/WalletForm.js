import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, fetchExpenses } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  onClick = () => {
    this.setState((prev) => ({
      id: prev.id + 1,
    }));
    const { dispatch } = this.props;
    dispatch(fetchExpenses(this.state));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, tag, method } = this.state;
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            name="value"
            data-testid="value-input"
            type="number"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            name="description"
            data-testid="description-input"
            type="text"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>
        <select
          name="currency"
          onChange={ this.handleChange }
          value={ currency }
          data-testid="currency-input"
        >
          {currencies.map((element) => (
            <option key={ element }>{element}</option>
          ))}
        </select>
        <select
          name="method"
          onChange={ this.handleChange }
          value={ method }
          data-testid="method-input"
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select
          name="tag"
          onChange={ this.handleChange }
          value={ tag }
          data-testid="tag-input"
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        <button
          onClick={ this.onClick }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
