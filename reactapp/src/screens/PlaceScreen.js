import React, {useState} from 'react';
import '../App.css';

import Nav from './_Nav';
import MyCarousel from '../carousels/_MyCarousel';
import PlaceModalAccomodations from '../modals/_PlaceModalAccomodations';

import {Redirect, Link} from 'react-router-dom';
import {Container,Row, Col, Card, CardTitle, CardText} from 'reactstrap';
import {connect} from 'react-redux';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Icon } from "leaflet";


function PlaceScreen(props) {

    const [accomodationsModal, setAccomodationsModal] = useState(false);

    const imageData = [
        {src: "https://res.cloudinary.com/didvrkav5/image/upload/v1638032869/gite1_dl9taq.jpg", number: 1},
        {src: "https://res.cloudinary.com/didvrkav5/image/upload/v1638032865/gite2_dpm541.jpg", number: 2},
        {src: "https://res.cloudinary.com/didvrkav5/image/upload/v1638032871/gite3_fkf9cd.jpg", number: 3},
        {src: "https://res.cloudinary.com/didvrkav5/image/upload/v1638032875/gite4_grqmdp.jpg", number: 4},
        {src: "https://res.cloudinary.com/didvrkav5/image/upload/v1638032870/gite5_pgynx8.jpg", number: 5}
      ];

    const icon = new Icon({
        iconUrl: "/icon.jpeg",
        iconSize: [30, 30]
      });

    if (props.guest.token) {
        return(
            <Container>
                <Nav page="place"/> 
                <Row>
                    <p className="title-global">Le Grand Gite des Faucheries</p>
                </Row>
                <Row >
                    <MyCarousel imageData={imageData} size="place-size"/>
                </Row>
                <Row className="place-subtitle">
                    <p className="text-center margin-0">Lieu dit “Les Faucheries”, 72350 Saint Denis d’Orques</p>
                </Row>

                <Row className="margin-bottom-20px color-black">

                    <Col xs="12" md="4" style={{height: '300px'}} className="margin-bottom-15px">
                        <MapContainer center={[48.053195, -0.273228]} zoom={14} scrollWheelZoom={false} className="map-size carousel-shadow">
                            <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[48.0536, -0.273228]} icon={icon}></Marker>
                        </MapContainer>  
                    </Col>

                    <Col xs="12" md="8" className="cormorant">
                        <Card body className="margin-bottom-15px">
                            <CardTitle tag="h5" className="bold margin-0">Comment s'y rendre ?</CardTitle>
                            <CardText>
                            <p className="font-size-17px margin-0">En train, jusqu'à la gare du Mans ou de Laval, puis en taxi (RADIO TAXI LE MANS 02 43 24 92 92) ou en Uber.</p>
                            <p className="font-size-17px margin-0">En voiture. Parking sur le lieu. Pensez à partager vos places !</p>
                            <div className="end-content">
                                <button  class="btn bouton" style={{backgroundColor: '#F1CC94', width: '200px'}}><Link to='/covoiturage' className='text-decoration-none color-black'>Voir les covoiturages</Link></button>
                            </div>
                            </CardText>
                        </Card>
                        <Card body className="margin-bottom-15px">
                            <CardTitle tag="h5" className="bold margin-0">Où dormir ?</CardTitle>
                            <CardText>
                                <p className="font-size-17px margin-0">Nous avons la chance de disposer d'un lieu immense avec des lits en dortoir, des espaces où vous pourrez planter votre tente (des salles de bain seront mis à disposition) ou même garer votre camping-car. Vous pouvez aussi consulter la liste des hébergements à proximité :</p>
                                <div className="end-content">
                                    <button class="btn bouton" style={{backgroundColor: '#F1CC94', width: '200px'}} onClick={() => setAccomodationsModal(!accomodationsModal)} >Voir les hôtels/gites</button>
                                </div>
                            </CardText>
                        </Card>
                    </Col>
                    
                </Row>

                <PlaceModalAccomodations isOpen={accomodationsModal} handleClickParent={() => setAccomodationsModal(!accomodationsModal)}/>

            </Container>
        )
    } else {
        return (
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
)(PlaceScreen);