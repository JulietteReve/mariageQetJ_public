import React from 'react';
import '../App.css';

import Nav from './_Nav';
import InvitationComponent from '../components/_InvitationComponent';

import {Container,Row} from 'reactstrap';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


function InvitationScreen(props) {

    if (props.guest.token) {

    const invitations = props.guest.users.map((user) => {
        var i = 12/props.guest.users.length;
        return (
            <InvitationComponent i={i} user={user} token={props.guest.token} carpooling={props.guest.carpooling}/>
        )
    })


    return(
        
            <Container className="margin-bottom-20px">
                <Nav page="invitation"/> 
                <Row>
                    <p className="title-global">Répondre à l'invitation</p>
                </Row>
                <Row>
                    {invitations}
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
)(InvitationScreen);