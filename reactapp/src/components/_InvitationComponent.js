import React, {useState, useEffect} from 'react';
import '../App.css';

import {connect} from 'react-redux';

import InvitationModal from '../modals/_InvitationModal';

import {Link} from 'react-router-dom';

import { Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, Popover, PopoverBody, Card, CardTitle} from 'reactstrap';


function InvitationComponent(props) {

    const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen(!popoverOpen);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [modal, setModal] = useState(false);
    const [user, setUser] = useState(null);
    const [guest, setGuest] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [response, setResponse] = useState(null);
    const [update, setUpdate] = useState(false);
    // 0 : non, 1: oui, 2 pas encore de réponse

    const [accomodation, setAccomodation] = useState('');
    const [brunch, setBrunch] = useState('');
    const [alcoolLiked, setAlcoolLiked] = useState('');
    const [drink, setDrink] = useState('');
    const [songs, setSongs] = useState([]);
    const [comment, setComment] = useState(null);
    const [isAttending, setIsAttending] = useState(null);
    const [name, setName] = useState(null);


    useEffect(() => {
        const getUser = async () => {
            const data = await fetch(`/userDetails/${props.user._id}/${props.token}`);
            const result = await data.json();
            console.log(result);
            setName(result.user.firstName);
            setUser(result.user);
            setIsAttending(result.user.isAttending);
            if (result.user.sleep == 0) {
                setAccomodation('Je réserve un hôtel / gite, à proximité du lieu du mariage');
                } else if (result.user.sleep == 1 ) {
                setAccomodation('Je souhaite dormir en dortoir collectif (sur le lieu du mariage)');
            } else if (result.user.sleep == 2 ) {
                setAccomodation("J'apporte ma tente (accès salle de bain prévu)");
            } else if (result.user.sleep == 3) {
                setAccomodation("Je viens en camping-car que je garerai sur le lieu du mariage");
            } 
            if (result.user.status == 0) {
                setAccomodation('VIP: lit réservé sur le lieu du mariage')
            }
            if (result.user.breakfast == 'Oui') {
                setBrunch('Je participe au brunch dimanche midi')
            } else if (result.user.breakfast == 'Non') {
                setBrunch('Je ne participe pas au brunch dimanche midi')
            } else {
                setBrunch('Je ne sais pas encore si je participerai au brunch dimanche midi')
            }
            setAlcoolLiked(result.user.alcoolLiked.join(', '));
            setDrink(result.user.drink);
            if (result.user.drink == "C'est qui Parcimonie ?") {
                setDrink("Vous ne m'avez toujours pas dit qui était cette Parcimonie !")
            }
            setSongs(result.user.songs);
            setComment(result.user.comment);
            setGuest(result.guest);
            props.guest(result.guest);
        };
        getUser();
      }, [update]);


    var openModal = () => {
        if (response == null) {
            setErrorMessage('Choisis une réponse avant de valider');
        } else {
            setModal(!modal);
        }
    }

    var closeModal = () => {
        setUpdate(!update);
        setModal(!modal);
        setResponse(null);
    }

    var participationModal = () => {
        setResponse('Je participe');
        setModal(!modal)
    }

    var noParticipationModal = () => {
        setResponse('Je ne participe pas');
        setModal(!modal);
    }

    
    if (songs) {
        var songsTab = songs.map((element, i) => {
        return(
          <p className="song-text">{element}</p>
        )
      })
    }

    var display;
    if (isAttending == 2) {
        display = 
        <Card className='card-inv'>
            {props.i == 12 ?
                null
                :
                <CardTitle><p className="name text-center bold margin-0">{name}</p></CardTitle>
            }
            <div className="center-content-column width-100">
                <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                    <DropdownToggle caret className='dropdown-invitation'>
                        {response ? 
                        response 
                        : "Répondre à l'invitation" }
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="item-invitation" onClick={() => setResponse('Je participe')}>Je participe</DropdownItem>
                        <DropdownItem className="item-invitation" onClick={() => setResponse('Je ne participe pas')}>Je ne participe pas</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

                <p className="error error-invitation">{errorMessage}</p>
                <button  className="btn bouton margin-top-20px" style={{backgroundColor: '#F1CC94'}} onClick={() => openModal()}>Valider</button> 
                
            </div>
        </Card>
    } else if (isAttending == 0) {
        display = 
            <Card className='card-inv'>
                {props.i == 12 ?
                    <CardTitle><p className="name text-center bold margin-0">Je ne participe pas</p></CardTitle>
                    :
                    <CardTitle><p className="name text-center bold margin-0">{name} ne participe pas</p></CardTitle>
                }
                <div className="center-content-column width-100">
                    <p class="font-size-18 text-center">Nous sommes triste mais nous t'aimons quand même</p>
                    <button  className="btn bouton" style={{backgroundColor: '#F1CC94'}} onClick={() => participationModal()}>J'ai changé d'avis</button> 
                </div>
            </Card>
    } else if (isAttending == 1 ) {
        display = 
            <Card className='card-inv'>
                {props.i == 12 ?
                    <CardTitle><p className="name text-center bold margin-0">Je participe</p></CardTitle>
                    :
                    <CardTitle><p className="name text-center bold margin-0">{name} participe</p></CardTitle>
                }
                <div className='padding-10px'>
                    <div className="subtext-invitation">
                        {accomodation == 'Je réserve un hôtel / gite, à proximité du lieu du mariage' ?
                            <div>
                                <p id="Popover1" className="margin-0"><Link to='/PlaceScreen' className='text-decoration-none color-black' onMouseEnter={() => togglePopover()} onMouseLeave={() => togglePopover()}>Je réserve un hôtel / gite, à proximité du lieu du mariage</Link></p>
                                <Popover placement="bottom" isOpen={popoverOpen} target="Popover1">
                                    <PopoverBody className="invitation-popover">Clique pour consulter la liste des hôtels / gîtes à proximité</PopoverBody>
                                </Popover>
                            </div>
                            :
                            <div>
                                <p className="margin-0">{accomodation}</p>
                                {accomodation == 'Je souhaite dormir en dortoir collectif (sur le lieu du mariage)' ?
                                <p className="error-modal">Pense à apporter tes draps et/ou ton sac de couchage</p>
                                :
                                null}
                            </div>
                        }
                    </div>
                        
                    
                    <div className="subtext-invitation">
                        <p >{brunch}</p>
                    </div>

                    {alcoolLiked != null && alcoolLiked.length > 0  ?
                        <div className="subtext-invitation">
                            <p>J'aime {alcoolLiked}</p>
                        </div>
                        :null
                    }

                    <div className="subtext-invitation">
                        <p >{drink}</p>
                    </div>

                    {songs != null && songs.length > 0 ?
                        <div className="subtext-invitation">
                            <p className="margin-0">Mes idées de musique pour se déhancher sur le dancefloor:</p> 
                            {songsTab}
                        </div>
                        :null
                    }

                    {comment ?
                        <div className="subtext-invitation">
                            <p className="margin-0">Et aussi: </p>
                            <p className="song-text">{comment}</p>
                        </div>
                        :null
                    }
                    <div className="flex-wrap-center">
                        <button  className="btn bouton margin-5px" style={{backgroundColor: '#F1CC94'}} onClick={() => participationModal()}>Modifier mes réponses</button>
                        <button  className="btn bouton margin-5px" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => noParticipationModal()}>Je ne participe plus</button>
                    </div>
                </div>
            </Card>
    }
    
    return (
        <Col xs='12' md={props.i} className="cormorant center-content margin-b-5px ">

            {display}
            
            {/* MODAL */}
            <div >
                <Modal isOpen={modal} fade={false} toggle={closeModal}>
                    <InvitationModal handleClickParent={closeModal} response={response} user={user} />
                </Modal>
            </div>

        </Col>
    )
}

function mapDispatchToProps(dispatch){
    return {
        guest: function(guest){
            dispatch({
                type: 'guest',
                guest: guest,
            })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(InvitationComponent);
