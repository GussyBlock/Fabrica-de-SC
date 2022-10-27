import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    console.log("hola ")
    try {
      // console.log(store.getState().blockchain.account)
      const add_New_SC = await store
        .getState()
        .blockchain.smartContract.methods.addNewSC(
          store.getState().blockchain.account
        )
        .call();

      const Validacion = await store
        .getState()
        .blockchain.smartContract.methods.verValidacion(
          store.getState().blockchain.account
        )
        .call();

      dispatch(
        fetchDataSuccess({
          add_New_SC,
          Validacion,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
