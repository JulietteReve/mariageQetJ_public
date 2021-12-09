import React, {useState} from 'react';
import '../App.css';

import { Badge, Input, CardText, Card, CardBody, CardTitle} from 'reactstrap';

import {canSaveFunction, saveType} from '../helpers/_carpoolingHelper';
import DeleteCarpoolingModal from '../modals/_DeleteCarpoolingModal';


function CarpoolingComponent(props) {

    const [modal, setModal] = useState(false);

    const [update, setUpdate] = useState(false);
    
    const [seat, setSeat] = useState(props.item.seats);
    const [seatError, setSeatError] = useState('')
    const [departure, setDeparture] = useState(props.item.from);
    const [departureError, setDepartureError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(props.item.phoneNumber);
    const [phoneNumberError, setPhoneNumberError] = useState('');

    var closeUpdate = () => {
        setSeatError('');
        setDepartureError('');
        setPhoneNumberError('');
        setUpdate(false);
    }
    
    var saveUpdate = async () => {
        var canSaveResult = canSaveFunction(seat, departure, phoneNumber);
        var canSave = canSaveResult.canSave;
        setSeatError(canSaveResult.seatError);
        setDepartureError(canSaveResult.departureError);
        setPhoneNumberError(canSaveResult.phoneNumberError);
        if (canSave == true) {
            var saveTypeResult = saveType(seat, props.type);
            await fetch(`/updateCarpooling`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    guestToken : props.token, 
                    carpoolingId: props.item.id,
                    offerSeats: saveTypeResult.offerSeats,
                    searchSeats: saveTypeResult.searchSeats,
                    from: departure,
                    phoneNumber: phoneNumber,
                }),
            }); 
            props.handleClickParent();
            closeUpdate();
        }
    }

    var closeModal = () => {
        props.handleClickParent();
        setModal(!modal)
    }

    var openModal = () => {
        setSeat(props.item.seats);
        setDeparture(props.item.from);
        setPhoneNumber(props.item.phoneNumber);
        setUpdate(true);
    }

    console.log('update',props.item, seat, departure, phoneNumber);


    return (
        <div className="width-100 center-content">
        <Card className="margin-2100 width-60">
            <CardBody className="cormorant">
                <CardTitle tag="h5" className="bold">{props.item.name.join(', ')}</CardTitle>
                {update ? 
                    <div>
                        <div className="margin-l-25px">
                            <CardText className="margin-b-5px"><span className="bold">Nombre de places disponibles: </span>
                                <Input type="number" onChange={(e) => setSeat(e.target.value)} value={seat} className="width-65px margin-b-3px " min="1" max="20"/>
                                <p className='error-modal'>{seatError}</p>
                                
                            </CardText>
                            <CardText className="margin-b-5px"><span className="bold">Au départ de: </span>
                                <Input onChange={(e) => setDeparture(e.target.value)} value={departure} className="width-60 margin-b-3px"/>
                                <p className='error-modal'>{departureError}</p>
                            </CardText>
                            <CardText className="margin-b-5px"><span className="bold">Me contacter: </span>
                                <Input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className="width-60 margin-b-3px"/>
                                <p className='error-modal'>{phoneNumberError}</p>
                            </CardText>
                        </div>
                        <div className="end-content">
                            <Badge className="margin-tr-3px" style={{backgroundColor: '#F1A54C'}} onClick={() => saveUpdate()}>Modifier</Badge>
                            <Badge className="margin-tr-3px" style={{backgroundColor: '#F16A4C'}} onClick={() => closeUpdate()}>Annuler</Badge>
                        </div>
                    </div>
                :
                <div>
                    <div className="margin-l-25px">
                        <CardText className="margin-b-5px"><span className="bold">Nombre de places disponibles: </span> {props.item.seats}</CardText>
                        <CardText className="margin-b-5px"><span className="bold">Au départ de: </span>{props.item.from}</CardText>
                        <CardText className="margin-b-5px"><span className="bold">Me contacter: </span>{props.item.phoneNumber}</CardText>
                    </div>
                    {props.token == props.item.token ?
                        <div className="end-content">
                            <Badge className="margin-tr-3px" style={{backgroundColor: '#F1A54C'}} onClick={() => openModal()}>Modifier</Badge>
                            <Badge className="margin-tr-3px" style={{backgroundColor: '#F16A4C'}} onClick={() => setModal(!modal)}>Supprimer</Badge>
                        </div>
                    :null}
                </div>
                }
            </CardBody>
        </Card>
        <DeleteCarpoolingModal isOpen={modal} handleClickParent={() => closeModal()} guestToken={props.token} carpoolingId={props.item.id} type={props.type}/>
        </div>
    )
                   
}

export default CarpoolingComponent;