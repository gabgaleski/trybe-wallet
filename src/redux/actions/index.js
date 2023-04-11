// Coloque aqui suas actions
export const GET_USER_INFOS = 'GET_USER_INFOS';

export const userInfos = (email) => ({
  type: GET_USER_INFOS,
  payload: {
    email,
  },
});
