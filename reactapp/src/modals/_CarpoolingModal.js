import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input} from 'reactstrap';
import {Link} from 'react-router-dom';

import {canSaveFunction, saveType} from '../helpers/_carpoolingHelper'


const CarpoolingModal = (props) => {

    const isAttending = props.guest.users.filter(user => user.isAttending == 1);
    const isNotAttending = props.guest.users.filter(user => user.isAttending == 0);

    const [seat, setSeat] = useState('');
    const [seatError, setSeatError] = useState('');
    const [departure, setDeparture] = useState('');
    const [departureError, setDepartureError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');

    var validation = async () => {
        var canSaveResult = canSaveFunction(seat, departure, phoneNumber);
        var canSave = canSaveResult.canSave;
        setSeatError(canSaveResult.seatError);
        setDepartureError(canSaveResult.departureError);
        setPhoneNumberError(canSaveResult.phoneNumberError)

        if (canSave == true) {
            var saveTypeResult = saveType(seat, props.type);
            await fetch(`/saveCarpooling`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token : props.guest.token,
                    offerSeats: saveTypeResult.offerSeats,
                    searchSeats: saveTypeResult.searchSeats,
                    from: departure,
                    phoneNumber: phoneNumber,
                }),
            }); 
            close();
        }
        
    }


    var close = () => {
        setSeat('');
        setSeatError('');
        setDeparture('');
        setDepartureError('');
        setPhoneNumber('');
        setPhoneNumberError('');
        props.handleClickParent();
    }

    var title;
    var seatQuestion;
    var mustAttend;
    var mustAnswer;
    if (props.type == 'offer') {
        title = "Proposer un covoiturage";
        seatQuestion = "Combien as-tu de places disponibles dans ta voiture ?";
        mustAttend = "Au moins une personne de ton groupe doit participer au mariage pour proposer un covoiturage ;)";
        mustAnswer = "Merci de répondre à l'invitation avant de proposer un covoiturage ;)"
    } else {
        title = "Rechercher un covoiturage";
        seatQuestion = "Combien de places cherches-tu ?";
        mustAttend = "Au moins une personne de ton groupe doit participer au mariage pour demander un covoiturage ;)"
        mustAnswer="Merci de répondre à l'invitation avant de demander un covoiturage ;)"
    }
    
    return (
        <div>
        <Modal isOpen={props.isOpen} toggle={props.handleClickParent} >
            {isAttending.length > 0 ?
                <div>
                    <ModalHeader className="orange-background center-content-column">
                        <h5 className="font-size-40px">{title}</h5>
                    </ModalHeader>
                    <ModalBody className="orange-background cormorant font-size-18">
                        
                        <p className="margin-5px">{seatQuestion}</p>
                        <div className="center-items">
                            <Input type="number" onChange={(e) => setSeat(e.target.value)} value={seat} className="width-65px margin-b-3px " min="1" max="20" autoComplete="new-off"/>
                            <p className='error-modal'>{seatError}</p>
                        </div>
                        
                        <p className="margin-5px">De quelle ville pars-tu ?</p>
                        <div className="center-items">
                            <Input onChange={(e) => setDeparture(e.target.value)} value={departure} className="width-60 margin-b-3px" autoComplete="new-off"/>
                            <p className='error-modal'>{departureError}</p>
                        </div>

                        <p className="margin-5px">Ton numéro de téléphone: </p>
                        <div className="center-items">
                            <Input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className="width-60 margin-b-3px" autoComplete="new-off"/>
                            <p className='error-modal'>{phoneNumberError}</p>
                        </div>

                    </ModalBody>
                    <ModalFooter className="orange-background center-content">
                        <Button id="Popover1" className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => validation()}>Valider</Button>
                        <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => close()}>Annuler</Button>
                    </ModalFooter>
                </div>
            :
                <ModalBody className="orange-background ">
                    {isNotAttending.length > 0 ?
                        <p className="text-center indie font-size-30px">{mustAttend}</p>
                    :
                        <p className="text-center indie font-size-30px">{mustAnswer}</p>
                    }
                        
                    <div className="center-content">
                        <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} ><Link to='/invitation' className='text-decoration-none color-black'>Répondre à l'invitation</Link></Button>
                        <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => props.handleClickParent()}>Annuler</Button>
                    </div>
                </ModalBody>
            }
        </Modal>
        </div>
    );
}

export default CarpoolingModal ;