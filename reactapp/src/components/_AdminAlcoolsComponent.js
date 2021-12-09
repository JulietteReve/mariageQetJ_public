import React, {useState, useEffect} from 'react';
import '../App.css';

import {Col} from 'reactstrap';

function AdminAlcoolsComponent(props) {

    const [biere, setBiere]= useState(0);
    const [champagne, setChampagne] = useState(0);
    const [blanc, setBlanc] = useState(0);
    const [rose, setRose] = useState(0);
    const [rouge, setRouge] = useState(0);
    const [soupeAngevine, setSoupeAngevine] = useState(0);
    const [spritz, setSpritz] = useState(0);
    const [ginTo, setGinTo] = useState(0);
    const [rhum, setRhum] = useState(0);
    const [jus, setJus] = useState(0);
    const [eau, setEau] = useState(0);

    useEffect(() => {
        var biereArray = props.participantsArray.filter(element => element.alcoolLiked.includes('la bière'));
        setBiere(biereArray.length);
        var champagneArray = props.participantsArray.filter(element => element.alcoolLiked.includes("le champagne"));
        setChampagne(champagneArray.length);
        var blancArray = props.participantsArray.filter(element => element.alcoolLiked.includes("le blanc"));
        setBlanc(blancArray.length);
        var roseArray = props.participantsArray.filter(element => element.alcoolLiked.includes("le rosé"));
        setRose(roseArray.length);
        var rougeArray = props.participantsArray.filter(element => element.alcoolLiked.includes("le rouge"));
        setRouge(rougeArray.length);
        var soupeArray = props.participantsArray.filter(element => element.alcoolLiked.includes("la soupe angevine"));
        setSoupeAngevine(soupeArray.length);
        var spritzArray = props.participantsArray.filter(element => element.alcoolLiked.includes("le spritz"));
        setSpritz(spritzArray.length);
        var ginArray = props.participantsArray.filter(element => element.alcoolLiked.includes("le gin tonic"));
        setGinTo(ginArray.length);
        var rhumArray = props.participantsArray.filter(element => element.alcoolLiked.includes("le rhum arrangé"));
        setRhum(rhumArray.length);
        var jusArray = props.participantsArray.filter(element => element.alcoolLiked.includes("les jus de fruits"));
        setJus(jusArray.length);
        var eauArray = props.participantsArray.filter(element => element.alcoolLiked.includes("l'eau"));
        setEau(eauArray.length);
        
    }, [props.participantsArray]); 
    
    return (
        <Col xs='12' sm="6" md="3" className="admin-col">
            <p className="font-size-20px margin-0">Alcools : </p>
            <p className="margin-0">Bière : {biere}</p>
            <p className="margin-0">Champagne : {champagne}</p>
            <p className="margin-0">Blanc: {blanc}</p>
            <p className="margin-0">Rosé: {rose}</p>
            <p className="margin-0">Rouge: {rouge}</p>
            <p className="margin-0">Soupe angevine: {soupeAngevine}</p>
            <p className="margin-0">Spritz: {spritz}</p>
            <p className="margin-0">Gin To: {ginTo}</p>
            <p className="margin-0">Rhum arrangé: {rhum}</p>
            <p className="margin-0">Jus de fruits: {jus}</p>
            <p className="margin-0">Eau: {eau}</p>
        </Col>
    )
}

export default AdminAlcoolsComponent;