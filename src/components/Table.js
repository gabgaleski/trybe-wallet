import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletedExpenses, editExpenses } from '../redux/actions';

class Table extends Component {
  getName = (expenses, info) => {
    const { exchangeRates } = expenses;
    const valuesExchange = Object.values(exchangeRates);
    const getCoin = valuesExchange.filter((coin) => coin.code === expenses.currency);

    if (info === 'ask') return Number(getCoin[0][info]);

    return getCoin[0][info];
  };

  onClickDeleted = (expense) => {
    const { dispatch, expenses } = this.props;
    const newExpenses = expenses.filter((element) => element.id !== expense.id);
    dispatch(deletedExpenses(newExpenses));
  };

  onClickEdit = (expense) => {
    const { dispatch } = this.props;
    dispatch(editExpenses(expense.id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>
                  {expense.description}
                </td>
                <td>
                  {expense.tag}
                </td>
                <td>
                  {expense.method}
                </td>
                <td>
                  {Number(expense.value).toFixed(2)}
                </td>
                <td>
                  {this.getName(expense, 'name')}
                </td>
                <td>
                  {(this.getName(expense, 'ask')).toFixed(2)}
                </td>
                <td>
                  {((this.getName(expense, 'ask')) * Number(expense.value)).toFixed(2)}
                </td>
                <td>
                  Real
                </td>
                <td>
                  <button
                    onClick={ () => this.onClickEdit(expense) }
                    data-testid="edit-btn"
                  >
                    Editar

                  </button>
                  <button
                    onClick={ () => this.onClickDeleted(expense) }
                    data-testid="delete-btn"
                  >
                    Excluir

                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
