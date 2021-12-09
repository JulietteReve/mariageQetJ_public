import React, {useState, useEffect} from 'react';
import '../App.css';

import {Col} from 'reactstrap';

function AdminBrunchComponent(props) {

    const [ouiArray, setOuiArray] = useState([]);
    const [nonArray, setNonArray] = useState([]);
    const [dontknowArray, setDontKnowArray] = useState([]);

    useEffect(() => {
        const oui = props.participantsArray.filter(element => element.breakfast == "Oui");
        setOuiArray(oui);
        const non = props.participantsArray.filter(element => element.breakfast == "Non");
        setNonArray(non);
        const dontknow = props.participantsArray.filter(element => element.breakfast == "Je ne sais pas");
        setDontKnowArray(dontknow);
    }, [props.participantsArray]); 
    
    return (
        <Col xs='12' sm="6" md="3" className="admin-col">
            <p className="font-size-20px margin-0">Brunch : </p>
            <p className="margin-0">Oui : {ouiArray.length}</p>
            <p className="margin-0">Non : {nonArray.length}</p>
            <p className="margin-0">Je ne sais pas: {dontknowArray.length}</p>
        </Col>
    )
}

export default AdminBrunchComponent