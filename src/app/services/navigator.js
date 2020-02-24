let containerPrivate;

function setContainer(container) {
  containerPrivate = container;
}

function navigate(dispatch) {
  containerPrivate.dispatch(dispatch);
}

export default {
  setContainer,
  navigate,
};
