const initialState = {
  loading: false,
  account: null,
  smartContract: null,
  error: false,
  errorMsg: "",
};

const blockchainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CONNECTION_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CONNECTION_SUCCESS":
      return {
        ...state,
        loading: false,
        account: action.payload.account,
        smartContract:action.payload.smartContract,
        web3: action.payload.web3,
        // owner: action.payload.owner,
      };
    case "CONNECTION_FAILED":
      return {
        ...initialState,
        loading: false,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default blockchainReducer;
