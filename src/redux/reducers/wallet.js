// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_API,
  GET_EXPENSES_WALLET,
  UPDATE_VALUE_EXPENSES,
  UPDATE_DELETED_EXPENSES,
  UPDATE_DELETED_VALUE_EXPENSES,
  EDIT_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalValue: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_API:
    return {
      ...state,
      currencies: action.payload.data,
    };
  case GET_EXPENSES_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, action.payload.expenses],
    };
  case UPDATE_VALUE_EXPENSES:
    return {
      ...state,
      totalValue: state.totalValue + action.payload.value,
    };
  case UPDATE_DELETED_EXPENSES:
    return {
      ...state,
      expenses: action.payload.newExpenses,
    };
  case UPDATE_DELETED_VALUE_EXPENSES:
    return {
      ...state,
      totalValue: state.totalValue - action.payload.value,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.id,
    };
  default:
    return state;
  }
};

export default walletReducer;
