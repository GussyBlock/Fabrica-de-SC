const initialState = {
  loading: false,
  smartContractFabrica: null,
  number: null,
  error: false,
  errorMsg: "",
};

const fabricaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_FABRICA_REQUEST":
      return {
        ...state,
        loading: true,
        error: false,
        errorMsg: "",
      };
    case "CHECK_FABRICA_SUCCESS":
      return {
        ...state,
        loading: false,
        smartContractFabrica: action.payload.smartContractFabrica,
        number: action.payload.number,
        error: false,
        errorMsg: "",
      };
    case "CHECK_FABRICA_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    default:
      return state;
  }
};

export default fabricaReducer;
