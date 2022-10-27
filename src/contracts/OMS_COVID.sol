// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 < 0.9.0;
pragma experimental ABIEncoderV2;
import "./CentroSalud.sol";

contract OMS_COVID {
    
    // Direccion de la OMS -> Owner / Dueño del contrato 
    address public OMS;
    
    // Constructor del contrato 
    constructor ()  {
        OMS = msg.sender;
    }
    
    // Mapping para relacionar los centros de salud (direccion/address) con la validez del sistema de gestion
    mapping (address => bool) public Validacion_CentrosSalud;
    
    // Relacionar una direccion de un centro de salud con su contrato 
    mapping (address => address) public CentroSalud_Contrato;
    
    // Ejmeplo 1: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4 -> true = TIENE PERMISOS PARA CREAR SU SMART CONTRACT
    // Ejmeplo 2: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2 -> false = NO TIENE PERMISOS PARA CREAR SU SMART CONTRACT
    
    // Array de direcciones que almacene los contratos de los centros de salud validados 
    address [] public direcciones_contratos_salud;
    
    // Array de las direcciones que soliciten acceso 
    address [] Solicitudes;
    
    // Eventos a emitir 
    event SolicitudAcceso (address);
    event NuevoCentroValidado (address);
    event NuevoContrato (address, address);
    
    
    // Modificador que permita unicamente la ejecucion de funciones por la OMS 
    modifier UnicamenteOMS(address _direccion) {
        require(_direccion == OMS, "No tienes permisos para realizar esta funcion.");
        _;
    }
    
    // Funcion para solicitar acceso al sistema medico 
    function SolicitarAcceso() public {
        // Almacenar la direccion en el array de solicitudes 
        Solicitudes.push(msg.sender);
        // Emision del evento 
        emit SolicitudAcceso (msg.sender);
    }
    
    // Funcion que visualiza las direcciones que han solicitado este acceso 
    function VisualizarSolicitudes() public view UnicamenteOMS(msg.sender) returns (address [] memory){
        return Solicitudes;
    }
    
    // Funcion para validar nuevos centros de salud que puedan autogestionarse -> UnicamenteOMS
    function CentrosSalud (address _centroSalud) public UnicamenteOMS(msg.sender) {
        // Asignacion del estado de validez al centro de salud 
        Validacion_CentrosSalud[_centroSalud] = true;
        // Emision del evento 
        emit NuevoCentroValidado(_centroSalud);
    }
    
    
    // Funcion que permita crear un contrato inteligente de un centro de salud 
    function FactoryCentroSalud() public {
        // Solo puede crear uno por cuenta aceptada
        require (addNewSC(msg.sender) == address(0), "Ya cuentas con un SC desplegado");
        // Filtrado para que unicamente los centros de salud validados sean capaces de ejecutar esta funcion 
        require (Validacion_CentrosSalud[msg.sender] == true, "No tienes permisos para ejecutar esta funcion.");
        // Generar un Smart Contract -> Generar su direccion 
        address contrato_CentroSalud = address (new CentroSalud(msg.sender));
        // Almacenamiento la direccion del contrato en el array 
        direcciones_contratos_salud.push(contrato_CentroSalud);
        // Relacion entre el centro de salud y su contrato 
        CentroSalud_Contrato[msg.sender] = contrato_CentroSalud;
        // Emisio del evento 
        emit NuevoContrato(contrato_CentroSalud, msg.sender);
    }

    function addNewSC(address _ADD) public view returns(address){
        return CentroSalud_Contrato[_ADD];
    }
    
    function verValidacion(address _centroSalud) public view returns(bool) {
        return Validacion_CentrosSalud[_centroSalud];
    }
    
}


