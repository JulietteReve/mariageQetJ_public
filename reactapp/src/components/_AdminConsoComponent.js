import React, {useState, useEffect} from 'react';
import '../App.css';

import {Col} from 'reactstrap';

function AdminConsoComponent(props) {

    const [noArray, setNoArray] = useState([]);
    const [parcimonieArray, setParcomonieArray] = useState([]);
    const [drinkersArray, setDrinkersArray] = useState([]);

    useEffect(() => {
        const no = props.participantsArray.filter(element => element.drink == "Je ne bois pas");
        setNoArray(no);
        const parcimonie = props.participantsArray.filter(element => element.drink == "Je bois avec parcimonie");
        setParcomonieArray(parcimonie);
        const drinkers = props.participantsArray.filter(element => element.drink == "C'est qui Parcimonie ?");
        setDrinkersArray(drinkers);
    }, [props.participantsArray]); 
    
    return (
        <Col xs='12' sm="6" md="3" className="admin-col">
            <p className="font-size-20px margin-0">Consommation : </p>
            <p className="margin-0">Ne bois pas : {noArray.length}</p>
            <p className="margin-0">Avec parcimonie : {parcimonieArray.length}</p>
            <p className="margin-0">C'est qui Parcimonie ? : {drinkersArray.length}</p>
        </Col>
    )
}

export default AdminConsoComponent