// Coloque aqui suas actions
export const GET_USER_INFOS = 'GET_USER_INFOS';
export const GET_CURRENCIES_API = 'GET_CURRENCIES_API';

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

export const fetchAPI = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const filterData = Object.keys(data).filter((element) => element !== 'USDT');
  dispatch(currenciesFromApi(filterData));
};
