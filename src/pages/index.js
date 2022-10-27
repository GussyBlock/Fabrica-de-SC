import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "../redux/blockchain/blockchainActions";
import styles from "./index.module.scss";
import { fetchData } from "../redux/data/dataActions";
import { fetchFabrica } from "../redux/fabrica/fabricaActions";

export default function Home() {
  const dispatch = useDispatch();

  const { blockchain, data, fabrica } = useSelector((state) => state);
  console.log({ blockchain, data, fabrica });

  const [Postulante, setPostulante] = useState("");
  const [Prueba, setPrueba] = useState(0);

  const handleValidacion = async () => {
    const account = await blockchain.account;
    const validacion = await blockchain.smartContract.methods
      .CentrosSalud(Postulante)
      .send({ from: account });
    await validacion;
    dispatch(fetchData());
    dispatch(fetchFabrica());

    setPostulante("");
  };
  const handleFactory = async () => {
    const account = await blockchain.account;
    await blockchain.smartContract.methods
      .FactoryCentroSalud()
      .send({ from: account });
    dispatch(fetchData());
    dispatch(fetchFabrica());
  };

  const handlePrueba = async () => {
    const account = await blockchain.account;
    await fabrica.smartContractFabrica.methods
      .RAAAA(Prueba)
      .send({ from: account });

    dispatch(fetchData());
    dispatch(fetchFabrica());

    setPrueba(0);
  };
  return (
    <div>
          <div className={styles.contact__login}>
            <button
              onClick={() => {
                dispatch(connect());
              }}
            >
              Conect Wallet
            </button>
          </div>
      {blockchain.account === null ? (
        <div>
          <h4>Click</h4>
        </div>
      ) : (
        <div>
          {blockchain.account ===
          "0x6223566556e2b8d2d0d2e707f55ec4c78324a48a" ? (
            <div>
              <h1>Bienvenido Ministerio de Educación</h1>
              <h2>Otorgar Validación</h2>
              <div>
                <input
                  type="text"
                  value={Postulante}
                  onChange={(e) => setPostulante(e.target.value)}
                />
                <button onClick={handleValidacion}>Validar</button>
              </div>
            </div>
          ) : (
            <div>
              {data.Validacion ? (
                <div>
                  <h1>A sido autorizado para desplegar un SC</h1>
                  <h4>Crear Smart Contract</h4>
                  <div>
                    <button onClick={handleFactory}>Crear SC</button>
                  </div>
                  {data.add_New_SC ===
                  "0x0000000000000000000000000000000000000000" ? (
                    <div>
                      <h3>Aun no a desplegado el SmartContract </h3>
                    </div>
                  ) : (
                    <div>
                      <h3>Su contrato es: {data.add_New_SC}</h3>
                    </div>
                  )}
                  <div>
                    <input
                      type="number"
                      value={Prueba}
                      onChange={(e) => setPrueba(e.target.value)}
                    />
                    <button onClick={handlePrueba}>Send</button>

                    <h5>Tu numero es : {fabrica.number}</h5>
                  </div>
                </div>
              ) : (
                <h2> Lo siento, no ha sido aceptado</h2>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
