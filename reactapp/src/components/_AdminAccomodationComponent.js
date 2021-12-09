import React, {useState, useEffect} from 'react';
import '../App.css';

import {Col} from 'reactstrap';


function AdminAccomodationComponent(props) {


    const [outArray, setOutArray] = useState([]);
    const [dortoirArray, setDortoirArray] = useState([]);
    const [tenteArray, setTenteArray] = useState([]);
    const [campingCarArray, setCampingCarArray] = useState([]);
    const [chambreArray, setChambreArray] = useState([])

    useEffect(() => {
        const out = props.participantsArray.filter(element => element.sleep == 0);
        setOutArray(out);
        const dortoir = props.participantsArray.filter(element => element.sleep == 1);
        setDortoirArray(dortoir);
        const tente = props.participantsArray.filter(element => element.sleep == 2);
        setTenteArray(tente);
        const campingcar = props.participantsArray.filter(element => element.sleep == 3);
        setCampingCarArray(campingcar);
        const chambre = props.participantsArray.filter(element => element.sleep == 4);
        setChambreArray(chambre)
    }, [props.participantsArray]); 
    
    return (
        <Col xs='12' sm="6" md="3" className="admin-col">
            <p className="font-size-20px margin-0">Hébergements : </p>
            <p className="margin-0">Gite/Hôtel : {outArray.length}</p>
            <p className="margin-0">Dortoir : {dortoirArray.length}</p>
            <p className="margin-0">Tente : {tenteArray.length}</p>
            <p className="margin-0">Camping-car : {campingCarArray.length}</p>
            <p className="margin-0">Chambre: {chambreArray.length}</p>
        </Col>
    )
}


export default AdminAccomodationComponent