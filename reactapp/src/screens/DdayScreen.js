import React from 'react';
import '../App.css';

import Nav from './_Nav';

import {Container,Row, Col, Card, CardTitle, CardText} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


function DdayScreen(props) {


    if (props.guest.token) {
        return(
            <Container>
                <Nav page="dday"/> 
                <Row>
                    <p className="title-global">Le Jour J : 18 juin 2022</p>
                </Row>
                <Row className= "center-content">
                    <Col sm="10" className="margin-b-5px">
                        <Card body className="margin-10px">
                            <CardTitle >
                                <p className='text-center cormorant font-size-30px bold margin-0'>Les festivités débuteront à 17h</p>
                            </CardTitle>
                            <CardText>
                                <p className='text-center cormorant font-size-25px'>Au programme : Echange de voeux, coktail, diner, soirée</p>
                                <p className="cormorant text-center font-size-17px">Accueil à partir de 12h, pour que vous puissiez profiter du lieu (promenades autour du lac). Des salles de bain seront à votre disposition pour vous changer. Nous ne prévoyons pas le déjeuner.</p>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
                <Row className="text-justify color-black">
                    <Col sm="6" className="margin-b-5px">
                        <Card body className="cormorant height-100">
                            <CardTitle tag="h4" className="bold">Enfants : </CardTitle>
                            <CardText className="font-size-17px">Nous n’avons pas prévu d’acceuillir les enfants ! Si vous avez un problème pour faire garder vos petits, n’hésitez pas à <a className="color-black" href={"mailto:reverdyjuliette@gmail.com"}>nous contacter</a>.</CardText>
                        </Card>
                    </Col>
                    <Col sm="6" className="margin-b-5px">
                        <Card body className="cormorant height-100">
                            <CardTitle tag="h4" className="bold">Conseils vestimentaires:</CardTitle>
                            <CardText className="font-size-17px margin-0 ">Pas de thème, n'hésitez pas à vous faire beaux :)</CardText>
                            <CardText className="font-size-17px">Nous déconseillons les talons fins, peu adaptés sur le sol de terre et de graviers du lieu.</CardText>
                            
                        </Card>
                    </Col>
                    <Col sm="6" className="margin-b-5px">
                        <Card body className="cormorant height-100">
                            <CardTitle tag="h4" className="bold">Dortoirs:</CardTitle>
                            <CardText className="margin-0 font-size-17px">Merci de penser à apporter <span className="bold color-red">TON SAC DE COUCHAGE OU TES DRAPS</span> pour dormir en dortoir. Nous payons une caution que nous souhaitons récupérer à la fin de la fête :)</CardText>
                            
                        </Card>
                    </Col>
                    <Col sm="6" className="margin-b-5px">
                        <Card body className="cormorant height-100">
                            <CardTitle tag="h4" className="bold">Brunch:</CardTitle>
                            <CardText className="margin-0 font-size-17px">Le brunch aura lieu le dimanche 19 juin à 10h30</CardText>
                            <CardText className="font-size-17px">Tenue décontractée et <span class="bold">MAILLOT DE BAIN</span> (pour les plus téméraires). </CardText>
                        </Card>
                    </Col>
                </Row>
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
)(DdayScreen);