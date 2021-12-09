import React, {useState, useEffect} from 'react';
import '../App.css';
import {Container,Row, Col} from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Nav from './_Nav';
import CarpoolingModal from '../modals/_CarpoolingModal';
import CarpoolingComponent from '../components/_CarpoolingComponent';


function CarpoolingScreen(props) {

    const [carpoolingModal, setCarpoolingModal] = useState(false);
    const [upload, setUpload] = useState(false);
    const [type, setType] = useState(null);

    const [offersArray, setOffersArray] = useState([]);
    const [searchsArray, setSearchsArray] = useState([]);

    useEffect( async () => {
        const data = await fetch(`/getCarpooling`);
        const result = await data.json();
        setOffersArray(result.offers);
        setSearchsArray(result.searchs)
    }, [upload]);


    if (props.guest.token) {

        var cards = (items, type) => {
            const displayCards = items.map((item) => {
                return(
                    <CarpoolingComponent item={item} token={props.guest.token} type={type} handleClickParent={() => setUpload(!upload)}/>
                )
            })
            return displayCards;
        }

        var closeOffer = () => {
            setCarpoolingModal(!carpoolingModal);
            setUpload(!upload);
        }

        var openModal = (choice) => {
            setType(choice);
            setCarpoolingModal(!carpoolingModal)
        }

        return(
            <Container>
                <Nav page="carpooling"/> 
                <Row>
                    <p className="title-global">Covoiturage</p>
                </Row>
                <Row className="margin-bottom-20px">
                    <Col xs='12' md="6" className='center-content-column border-invitation margin-bottom-20px'>
                        <button  class="btn bouton" style={{backgroundColor: '#F1CC94', width: '250px'}} onClick={() => openModal('offer')}>Proposer un covoiturage</button>
                        {offersArray.length > 0 ?
                            <p class="text-center margin-top-20px cormorant font-size-18 bold">Liste des personnes qui proposent des places dans leurs voitures :</p>
                        :
                            <p className="text-center margin-top-20px cormorant font-size-18 bold">Sois le premier à proposer un covoiturage !</p>
                        }
                        {cards(offersArray, 'offer')}
                    </Col>
                    <Col xs='12' md="6" className='center-content-column' >
                        <button  class="btn bouton" style={{backgroundColor: '#F1CC94', width: '250px'}} onClick={() => openModal('search')}>Rechercher un covoiturage</button>
                        {searchsArray.length > 0 ?
                            <p class="text-center margin-top-20px cormorant font-size-18 bold">Liste des personnes qui recherchent des places dans une voiture :</p>
                        :
                            <p className="text-center margin-top-20px cormorant font-size-18 bold">Sois le premier à rechercher un covoiturage !</p>
                        }
                        {cards(searchsArray, 'search')}
                    </Col>
                </Row>
                <CarpoolingModal isOpen={carpoolingModal} handleClickParent={() => closeOffer()} guest={props.guest} type={type}/>
            </Container>
        )
    } else {
        return(
            <Redirect to="/" />
        )
    }
}

function mapStateToProps(state){
    return {guest: state.guest}
}

export default connect(
    mapStateToProps,
    null
)(CarpoolingScreen);

