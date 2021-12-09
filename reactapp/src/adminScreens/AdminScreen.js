import React, {useState, useEffect} from 'react';
import '../App.css'
import NavAdmin from './_NavAdmin';

import AdminModalParticipants from '../modals/_AdminModalParticipants';
import AdminModalNoParticipants from '../modals/_AdminModalNoParticipants';
import AdminModalOthers from '../modals/_AdminModalOthers';

import AdminAccomodationComponent from '../components/_AdminAccomodationComponent';
import AdminBrunchComponent from '../components/_AdminBrunchComponent';
import AdminConsoComponent from '../components/_AdminConsoComponent';
import AdminAlcoolsComponent from '../components/_AdminAlcoolsComponent';
import AdminSongsComponent from '../components/_AdminSongsComponent';

import {Container,Row, Badge} from 'reactstrap';
import {Redirect} from 'react-router-dom';

import {connect} from 'react-redux';

function AdminScreen(props) {

    const [guestsArray, setGuestArray] = useState([]);
    const [countGuests, setCountGuests] = useState(null);
    const [participantsArray, setParticipantsArray] = useState([]);
    const [noParticipantsArray, setNoParticipantsArray] = useState([]);
    const [dontKnowsArray, setDontKnowsArray] = useState([]);
    
    const [modalParticipants, setModalParticipants] = useState(false);
    var closeModalParticipants = () => setModalParticipants(!modalParticipants);

    const [modalNoParticipants, setModalNoParticipants] = useState(false);
    var closeModalNoParticipants = () => setModalNoParticipants(!modalNoParticipants);

    const [modalOthers, setModalOthers] = useState(false);
    var closeModalOthers = () => setModalOthers(!modalOthers);

    const countingGuests = (result) => {
        var count = 0;
        var participants = [];
        var noParticipants = [];
        var dontKnows = [];
        for (var i = 0; i<result.length; i++) {
            for (var y=0; y<result[i].users.length; y++) {
                var user = result[i].users[y];
                count += 1
                if (user.isAttending == 0 ) {
                    noParticipants.push(user);
                } else if (user.isAttending == 1) {
                    participants.push(user)
                } else {
                    dontKnows.push(user)
                }
            }
        }
        setCountGuests(count);
        setParticipantsArray(participants);
        setNoParticipantsArray(noParticipants);
        setDontKnowsArray(dontKnows);
    }

    const getAllGuests = async () => {
        const data = await fetch(`/allGuests`);
        const result = await data.json();
        setGuestArray(result);
        countingGuests(result);
    };

    useEffect(() => {
        getAllGuests();
    }, []);

    if (props.guest.admin) {
        return(
            <Container className="margin-bottom-20px">
                <NavAdmin page='admin'/> 
                <Row>
                    <p className="title-global">Suivi des réponses</p>
                </Row>
                    <Row className="admin-first">
                        <p className= 'admin-subtitle text-center' >Nombres de réponses : {countGuests - dontKnowsArray.length} / {countGuests}</p>
                        <div className="center-content-column">
                            <div className="div-admin-text">
                                <p className="margin-0">{participantsArray.length} participent</p>
                                <Badge color="secondary" onClick={() => setModalParticipants(!modalParticipants)} style={{backgroundColor: '#F16A4C', margin: '10px'}}>Voir le détail</Badge>
                            </div>
                            <div className="div-admin-text">
                                <p className="margin-0">{noParticipantsArray.length} ne viendront pas</p>
                                <Badge color="secondary" style={{backgroundColor: '#F16A4C', margin: '10px'}} onClick={() => setModalNoParticipants(!modalNoParticipants)} >Voir le détail</Badge>
                            </div>
                            <div className="div-admin-text">
                                <p className="margin-0">{dontKnowsArray.length} n'ont pas répondu</p>
                                <Badge color="secondary" style={{backgroundColor: '#F16A4C', margin: '10px'}}onClick={() => setModalOthers(!modalOthers)}>Voir le détail</Badge>
                            </div>
                        </div>
                    </Row>

                    <Row>
                        <AdminAccomodationComponent participantsArray={participantsArray}/>
                        <AdminBrunchComponent participantsArray={participantsArray}/>
                        <AdminConsoComponent participantsArray={participantsArray}/>
                        <AdminAlcoolsComponent participantsArray={participantsArray}/>
                    </Row>
                    <Row>
                    <AdminSongsComponent participantsArray={participantsArray}/>
                    </Row>

                    {/* MODALPARTICIPANTS */}
                    <AdminModalParticipants isOpen={modalParticipants} handleClickParent={closeModalParticipants} participantsArray={participantsArray} guestsArray={guestsArray}/>
                    {/* MODAL NO PARTICIPANTS */}
                    <AdminModalNoParticipants isOpen={modalNoParticipants} handleClickParent={closeModalNoParticipants} noParticipantsArray={noParticipantsArray} guestsArray={guestsArray} ></AdminModalNoParticipants>
                    {/* MODAL OTHERS */}
                    <AdminModalOthers isOpen={modalOthers} handleClickParent={closeModalOthers} dontKnowsArray={dontKnowsArray} guestsArray={guestsArray} ></AdminModalOthers>
     
            </Container>
        )
    } else {
        return(
            <Redirect to="/bienvenue" />
        )
    }

    
    
}

function mapStateToProps(state){
    return {guest: state.guest}
}

export default connect(
    mapStateToProps,
    null
)(AdminScreen);
