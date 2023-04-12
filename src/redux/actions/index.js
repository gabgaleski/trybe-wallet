// Coloque aqui suas actions
export const GET_USER_INFOS = 'GET_USER_INFOS';
export const GET_CURRENCIES_API = 'GET_CURRENCIES_API';
export const GET_EXPENSES_WALLET = 'GET_EXPENSES_WALLET';
export const UPDATE_VALUE_EXPENSES = 'UPDATE_VALUE_EXPENSES';

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

export const updateValue = (value) => ({
  type: UPDATE_VALUE_EXPENSES,
  payload: {
    value,
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

  const expensesValue = [infos].map((element) => {
    const getValues = Object.values(element.exchangeRates);
    const findValues = getValues.filter((value) => value.code === element.typeCoin);
    const totalValue = findValues[0].ask * element.value;
    return totalValue;
  });

  dispatch(updateValue(Number(expensesValue[0])));
};
