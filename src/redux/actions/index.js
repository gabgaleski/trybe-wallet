// Coloque aqui suas actions
export const GET_USER_INFOS = 'GET_USER_INFOS';
export const GET_CURRENCIES_API = 'GET_CURRENCIES_API';
export const GET_EXPENSES_WALLET = 'GET_EXPENSES_WALLET';
export const UPDATE_DELETED_EXPENSES = 'UPDATE_DELETED_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';
export const SAVE_EDIT_EXPENSES = 'SAVE_EDIT_EXPENSES';

export const userInfos = (email) => ({
  type: GET_USER_INFOS,
  payload: {
    email,
  },
});

export const currenciesFromApi = (data) => ({
  type: GET_CURRENCIES_API,
  payload: {
    data,
  },
});

export const expensesWallet = (modInfos) => ({
  type: GET_EXPENSES_WALLET,
  payload: {
    expenses: modInfos,
  },
});

export const deletedExpenses = (newExpenses) => ({
  type: UPDATE_DELETED_EXPENSES,
  payload: {
    newExpenses,
  },
});

export const editExpenses = (id) => ({
  type: EDIT_EXPENSES,
  payload: {
    id,
  },
});

export const saveEdit = (expensesEdited) => ({
  type: SAVE_EDIT_EXPENSES,
  payload: {
    expensesEdited,
  },
});

export const fetchAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const filterData = Object.keys(data).filter((element) => element !== 'USDT');
  dispatch(currenciesFromApi(filterData));
};

export const fetchExpenses = (infos) => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  infos.exchangeRates = data;
  dispatch(expensesWallet(infos));
};
