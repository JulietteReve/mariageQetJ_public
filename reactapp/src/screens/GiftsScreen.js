import React, {useState, useEffect} from 'react';
import '../App.css';
import {Container,Row, Col, Card, CardTitle, CardText} from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Nav from './_Nav';



function GiftsScreen(props) {

    


    if (props.guest.token) {


        return(
            <Container>
                <Nav page="gifts"/> 
                <Row>
                    <p className="title-global">Liste de Mariage</p>
                </Row>
                <Row className= "center-content">
                    <Col sm="10" className="margin-b-5px">
                        <Card body className="margin-10px">
                            <CardTitle >
                                <p className='text-center cormorant font-size-30px bold margin-0'>Si vous souhaitez nous faire un cadeau, nous vous proposons de participer à notre voyage de noces :)</p>
                            </CardTitle>
                            <CardText>
                                <p className='text-center cormorant font-size-25px margin-0'>Par virement : </p>
                                <p className="cormorant text-center font-size-17px margin-0"><span className="bold">Titulaire du compte : </span>M. PETIT Q ou Mlle REVERDY</p>
                                <p className="cormorant text-center font-size-17px margin-0"><span className="bold">Banque: </span>Boursorama Banque</p>
                                <p className="cormorant text-center font-size-17px margin-0"><span className="bold">BIC: </span>BOUS FRPP XXX</p>
                                <p className="cormorant text-center font-size-17px margin-0"><span className="bold">IBAN: </span>FR76 4061 8803 6700 0408 2967 073</p>
                                <p className="cormorant text-center font-size-17px"><span className="bold">RIB: </span>40618	80367	00040829670	73</p>
                                <p className='text-center cormorant font-size-25px'>ou Via Lydia : 06 17 76 20 72</p>
                                <p className='text-center cormorant font-size-30px bold margin-0'>❤️ Merci de tout coeur ❤️</p>
                            </CardText>
                        </Card>
                    </Col>
                </Row>
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
)(GiftsScreen);
