function isInvalidToken(response) {
  return response.status === 401;
}

export default {
  isInvalidToken,
};
