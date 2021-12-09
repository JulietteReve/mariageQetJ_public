import React, {useState, useEffect} from 'react';
import '../App.css';
import NavAdmin from './_NavAdmin';
import ListModalAddGuest from '../modals/_ListModalAddGuest';
import ListModalPictures from '../modals/_ListModalPictures';
import ListUsersComponent from '../components/_ListUsersComponent';
import ListAddUserComponent from '../components/_ListAddUserComponent';
import ListEmailComponent from '../components/_ListEmailComponent';


import {Container,Row, Table, Badge, Modal, ModalBody, } from 'reactstrap';
import {Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faMars, faVenus, faTimes, faPen, faPlusCircle} from '@fortawesome/free-solid-svg-icons'

import {connect} from 'react-redux';

function ListScreen(props) {

    // PREVOIR MODIFIER EMAIL, SUPPRIMER GUEST (SI PAS DE REPONSE ?) - SUPPRESSION DU USER : AJOUTER UNE CONDITION SI DEJA REPONDU ?

    const [guestArray, setGuestArray] = useState([]);
    const [orderId, setOrderId] = useState(false);
    const [orderConnexion, setOrderConnexion] = useState(false);
    const [orderStatut, setOrderStatut] = useState(false);

    const [modalAddGuests, setModalAddGuests] = useState(false);
    var closeModalAddGuests = () => setModalAddGuests(!modalAddGuests);

    const [modalPictures, setModalPictures] = useState(false);
    var closeModalPictures = () => setModalPictures(!modalPictures);

    const [modalDeleteGuest, setModalDeleteGuest] = useState(false);
    var closeModalDeleteGuest = () => setModalDeleteGuest(!modalDeleteGuest);
    const [guestDeleted, setGuestDeleted] = useState(null)

    const [guestSelected, setGuestSelected] = useState(null);

    const [upload, setUpload] = useState(false);

    useEffect( async () => {
        const data = await fetch(`/allGuests`);
        const result = await data.json();
        setGuestArray(result);
    }, [upload]);

    var openPicturesModal = (element) => {
        setGuestSelected(element);
        setModalPictures(!modalPictures);
    }

    var openDeleteGuest = async (guest) => {
        setGuestDeleted(guest);
        setModalDeleteGuest(!modalDeleteGuest);
    }

    var deleteGuest =  async (guest) => {
        await fetch('/deleteGuest', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guest: guest,
            }),
        });
        setUpload(!upload);
        closeModalDeleteGuest();
    }

    
    if (guestDeleted != null ) {

        var usersDeleted = guestDeleted.users.map((user, i) => {
            var text = "n'a pas encore répondu à l'invitation";
            if (user.isAttending != 2) {
                text = "a déjà répondu à l'invitation !"
            }
            return (
                <p className='text-center cormorant margin-0' key={i}>{user.firstName} {user.lastName} {text}</p>
            )
        })

    }
    
    var myTable = () => {

        var clickOnTitle = (item) => {
            var newArray = [...guestArray];
            if (item == 'id') {
                setOrderId(!orderId)
                if (orderId) {
                    newArray = newArray.sort((a, b) => a.guestName.localeCompare(b.guestName))
                } else {
                    newArray = newArray.sort((a, b) => b.guestName.localeCompare(a.guestName))
                }
            } else if (item == 'connexion') {
                setOrderConnexion(!orderConnexion)
                if (orderConnexion) {
                    newArray = newArray.sort((a, b) => a.countConnexion - b.countConnexion)
                } else {
                    newArray = newArray.sort((a, b) => b.countConnexion - a.countConnexion)
                }
            } else if (item == 'statut') {
                setOrderStatut(!orderStatut)
                if (orderStatut) {
                    newArray = newArray.sort((a, b) => a.users[0].status - b.users[0].status)
                } else {
                    newArray = newArray.sort((a, b) => b.users[0].status - a.users[0].status)
                }
            }
            setGuestArray(newArray)
        }

        var guestsTable = guestArray.map((element, i) => {
    
            var users = element.users.map((item, y) => {
                var icon;
                if (item.gender == 'male') {
                    icon = faMars;
                } else {
                    icon = faVenus;
                }
                return (
                    <ListUsersComponent element={element} item={item} icon={icon} key={y} handleUpload={() => setUpload(!upload)}/>
                )
            })
            var statut;
            if (element.users[0].status == 0) {
                statut = 'VIP (chambre réservée)'
            } else if (element.users[0].status == 2) {
                statut = 'Ne pas proposer le dortoir'
            } else {
                statut = 'Pas de restrictions'
            }

            return (
              <tr key={i}>
                <td>{element.guestName}</td>
                <td>
                    {users}
                    {element.users.length < 3 ?
                        <ListAddUserComponent handleUpload={() => setUpload(!upload)} element={element}/>
                    :null}
                </td>
                <td>{element.countConnexion}</td>
                <td>{statut}</td>
                <td>
                    <ListEmailComponent element={element} handleUpload={() => setUpload(!upload)}/>
                </td>
                <td><Badge className='list-badge' onClick={() => openPicturesModal(element)}>Gérer les photos</Badge></td>
                <td>
                    <div className='center-content center-items'>
                        <FontAwesomeIcon icon={faTimes} className="margin-3px color-red" onClick={() => openDeleteGuest(element)}/>
                    </div>
                </td>
              </tr>
            )
        })

        return (
            <Table striped style={{backgroundColor: 'white'}} className="cormorant margin-top-20px">
                <thead>
                    <tr>
                        <th style={{width: '18%'}} onClick={() => clickOnTitle('id')} >Identifiants <FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                        <th style={{width: '26%'}}>Invités</th>
                        
                        <th style={{width: '5%'}} onClick={() => clickOnTitle('connexion')}> <FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                        
                        <th style={{width: '16%'}} onClick={() => clickOnTitle('statut')}>Statut <FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                        <th style={{width: '22%'}}>Email</th>
                        <th style={{width: '8%'}}></th>
                        <th style={{width: '5%'}}></th>
                    </tr>
                </thead>
                <tbody>
                    {guestsTable}
                </tbody>
            </Table>
        )
    }

    


    if (props.guest.admin) {
        return(
            <Container className="margin-bottom-20px">
                <NavAdmin page="list"/> 
                <Row>
                    <p className="title-global">Liste des invités</p>
                </Row>
                <Row className='center-content'>
                    <button  class="btn bouton margin-5px" style={{backgroundColor: '#F1CC94', width: '250px'}} onClick={() => setModalAddGuests(!modalAddGuests)}>Ajouter des invités</button>
                </Row>
                <Row>
                    {myTable()}
                </Row>
                {/* MODALS */}
                <ListModalAddGuest isOpen={modalAddGuests} handleClickParent={closeModalAddGuests} guestArray={guestArray} handleUpload={() => setUpload(!upload)} ></ListModalAddGuest>

                {guestSelected != null ?
                    <ListModalPictures isOpen={modalPictures} handleClickParent={closeModalPictures} guest={guestSelected} ></ListModalPictures>
                :null}

                {/* MODAL DELETE GUEST */}
                {guestDeleted != null ?
                    <Modal isOpen={modalDeleteGuest} fade={false} centered toggle={closeModalDeleteGuest}>
                        <ModalBody className='center-content-column'>
                            <p className='text-center cormorant margin-0 bold'>Etes-vous sûr de vouloir supprimer {guestDeleted.guestName} ?</p>
                            
                                {usersDeleted}
                           
                                <div>
                                    <Badge className='yes-badge margin-5px ' onClick={()=> deleteGuest(guestDeleted)}>Supprimer</Badge>
                                    <Badge className='list-badge' onClick={() => closeModalDeleteGuest()}>Annuler</Badge>
                                </div>
                        </ModalBody>
                    </Modal>
                :null}
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
)(ListScreen);