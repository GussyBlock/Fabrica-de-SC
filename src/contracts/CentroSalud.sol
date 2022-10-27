// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;
pragma experimental ABIEncoderV2;

// Contrato autogestionable por el Centro de Salud 
contract CentroSalud {
    
    // Direcciones iniciales 
    address public DireccionCentroSalud;
    address public DireccionContrato;
    uint public num;

    constructor (address _direccion)  {
        DireccionCentroSalud = _direccion;
        DireccionContrato = address(this);
    }
    
    // Mapping para relacionar el hash de la persona con los resultados (diagnostico, CODIGO IPFS)
    mapping (bytes32 => Resultados) ResultadosCOVID;
    
    // Estructura de los resultados 
    struct Resultados {
        bool diagnostico;
        string CodigoIPFS;
    }
    
    // Eventos
    event NuevoResultado (bool, string);
    
    // Filtrar las funciones a ejecutar por el centro de salud 
    modifier UnicamenteCentroSalud(address _direccion) {
        require (_direccion == DireccionCentroSalud, "No tienes permisos para ejecutar esta funcion.");
        _;
    }
    
    // Funcion para emitir un resultado de una prueba de COVID 
    // Formato de los campos de entrada: | 12345X | true | QmNZTbxobVxzsCv4uwvSrh5a8bw6zJKFmNYvKbeRdDrnjT
    function ResultadosPruebaCovid(string memory _idPersona, bool _resultadoCOVID, string memory _codigoIPFS) public UnicamenteCentroSalud(msg.sender){
        // Hash de la identificacion de la persona 
        bytes32 hash_idPersona = keccak256 (abi.encodePacked(_idPersona));
        // Relacion del hash de la persona con la estructura de resultados 
        ResultadosCOVID[hash_idPersona] = Resultados(_resultadoCOVID, _codigoIPFS);
        // Emision de un evento 
        emit NuevoResultado(_resultadoCOVID, _codigoIPFS);
    }
    
    // Funcion que permita la visualizacion de los resultados 
    function VisualizarResultados(string memory _idPersona) public view returns (string memory _resultadoPrueba, string memory _codigoIPFS) {
        // Hash de la identidad de la persona 
        bytes32 hash_idPersona = keccak256 (abi.encodePacked(_idPersona));
        // Retorno de un booleano como un string 
        string memory resultadoPrueba;
        if (ResultadosCOVID[hash_idPersona].diagnostico == true){
            resultadoPrueba = "Positivo";
        } else{
            resultadoPrueba = "Negativo";
        }
        // Retorno de los parametros necesarios
        _resultadoPrueba = resultadoPrueba;
        _codigoIPFS = ResultadosCOVID[hash_idPersona].CodigoIPFS;
    }

    function RAAAA(uint _num) public {
        num = _num;
    }
    
    
}
