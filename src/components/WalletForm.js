import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPI, fetchExpenses, saveEdit } from '../redux/actions';

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

  onClickSaveEdit = () => {
    const { dispatch, idToEdit, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const changeTable = expenses.map((element) => {
      if (element.id === idToEdit) {
        element.value = value;
        element.currency = currency;
        element.description = description;
        element.method = method;
        element.tag = tag;
        return element;
      }
      return element;
    });

    dispatch(saveEdit(changeTable));

    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, tag, method } = this.state;
    const theButton = !editor ? (
      <button
        onClick={ this.onClick }
      >
        Adicionar despesa
      </button>) : (<button onClick={ this.onClickSaveEdit }>Editar despesa</button>);

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
        {theButton}
      </div>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape).isRequired,
  editor: PropTypes.bool.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
