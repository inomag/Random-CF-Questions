export const getProblems = (onSuccess, onError) => {
  return (dispatch, getState) => {
    fetch("https://codeforces.com/api/problemset.problems")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "GET_PROBLEMS",
          payload: data.result.problems,
        });
        onSuccess();
      })
      .catch((error) => {
        onError();
      });
  };
};

