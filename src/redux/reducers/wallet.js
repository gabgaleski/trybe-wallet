// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCIES_API,
  GET_EXPENSES_WALLET,
  UPDATE_DELETED_EXPENSES,
  EDIT_EXPENSES,
  SAVE_EDIT_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
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
  case UPDATE_DELETED_EXPENSES:
    return {
      ...state,
      expenses: action.payload.newExpenses,
    };
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: true,
      idToEdit: action.payload.id,
    };
  case SAVE_EDIT_EXPENSES:
    return {
      ...state,
      editor: false,
      expenses: action.payload.expensesEdited,
    };
  default:
    return state;
  }
};

export default walletReducer;
