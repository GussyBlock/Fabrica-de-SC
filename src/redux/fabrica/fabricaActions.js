import store from "../store";
import CentroSalud from "../../abis/CentroSalud.json";
import Web3 from "web3";
import Web3EthContract from "web3-eth-contract";


const fetchFabricaRequest = () => {
  return {
    type: "CHECK_FABRICA_REQUEST",
  };
};

const fetchFabricaSuccess = (payload) => {
  return {
    type: "CHECK_FABRICA_SUCCESS",
    payload: payload,
  };
};

const fetchFabricaFailed = (payload) => {
  return {
    type: "CHECK_FABRICA_FAILED",
    payload: payload,
  };
};

export const fetchFabrica = () => {
  return async (dispatch) => {
    dispatch(fetchFabricaRequest());
    try {
      const { ethereum } = window;
      Web3EthContract.setProvider(ethereum); 
      let web3 = new Web3(ethereum);

      // console.log(store.getState().blockchain.account)
      const abi = CentroSalud.abi;
      console.log("abi:",abi)
      const add = await store.getState().data.add_New_SC;
      console.log("address:",add)

      const smartContractFabrica = new web3.eth.Contract(abi, add);
      console.log("smartContractFabrica:" ,smartContractFabrica)

      // numero de prueva
      const number = await store.getState().fabrica.smartContractFabrica.methods.num().call();

      dispatch(
        fetchFabricaSuccess({
          smartContractFabrica,
          number,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchFabricaFailed("Could not load Fabrica from contract."));
    }
  };
};
