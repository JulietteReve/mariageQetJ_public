import React, {useState, useEffect} from 'react';
import '../App.css';
import NavAdmin from './_NavAdmin';
import AddAccomodationModal from '../modals/_AddAccomodationModal';


import {Container,Row, Table, Badge, Modal, ModalBody, } from 'reactstrap';
import {Redirect} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faTimes} from '@fortawesome/free-solid-svg-icons'

import {connect} from 'react-redux';

function AccomodationScreen(props) {

    const [addAccomodationModal, setAddAccomodationModal] = useState(false);
    const [accomodationArray, setAccomodationArray] = useState([]);
    const [upload, setUpload] = useState(false);
    const [order, setOrder] = useState(false);
    const [accomodation, setAccomodation] = useState(null);

    const [modalDelAcc, setModalDelAcc] = useState(false);
    const [accToDel, setAccToDel] = useState(null);

    useEffect( async () => {
        const data = await fetch(`/getAccomodations`);
        const result = await data.json();
        setAccomodationArray(result);
    }, [upload]);

    var clickOnCategory = () => {
        var newArray = [...accomodationArray];
        setOrder(!order);
        if (order == false) {
            newArray = newArray.sort((a, b) => a.category.localeCompare(b.category))
        } else {
            newArray = newArray.sort((a, b) => b.category.localeCompare(a.category))
        }
        setAccomodationArray(newArray);
    }

    var  openDelAccModal = (element) => {
        setAccToDel(element);
        setModalDelAcc(!modalDelAcc);
    }

    var closeDelAccModal = () => {
        setAccToDel(null);
        setModalDelAcc(!modalDelAcc);
    }

    var deleteAccomodation = async () => {
        await fetch(`/deleteAccomodation`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: accToDel._id
            }),
        }); 
        closeDelAccModal();
        setUpload(!upload);
    }

    var openModal = (element) => {
        setAccomodation(element);
        setAddAccomodationModal(!addAccomodationModal);
    }

    
    var accomodationTable = accomodationArray.map((element, i) => {

        return (
          <tr key={i}>
            <td>{element.category}</td>
            <td>{element.name}</td>
            <td>{element.adresse}</td>
            <td>{element.phoneNumber}</td>
            <td><a href={element.url} target="_blank">SiteWeb</a></td>
            <td><Badge className='list-badge' onClick={() => openModal(element)}>Modifier</Badge></td>
            <td><FontAwesomeIcon icon={faTimes} className="margin-3px color-red" onClick={() => openDelAccModal(element)}/></td>
          </tr>
        )
    })


    if (props.guest.admin) {
        return(
            <Container className="margin-bottom-20px">
                <NavAdmin page="accomodation" /> 
                <Row>
                    <p className="title-global">Liste des gites/hôtels</p>
                </Row>
                <Row className='center-content'>
                    <button  class="btn bouton margin-5px" style={{backgroundColor: '#F1CC94', width: '250px'}} onClick={() => openModal(null)}>Ajouter un hébergement</button>
                </Row>

                <AddAccomodationModal isOpen={addAccomodationModal} handleClickParent={() => setAddAccomodationModal(!addAccomodationModal)} handleUpload={() => setUpload(!upload)} accomodation={accomodation}/>

                <Table striped style={{backgroundColor: 'white'}} className="cormorant margin-top-20px">
                <thead>
                    <tr>
                        <th onClick={() => clickOnCategory()}>Catégorie<FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                        <th >Nom </th>
                        <th >Adresse</th>
                        <th >Numéro</th>
                        <th ></th>
                        <th ></th>
                        <th ></th>
                    </tr>
                </thead>
                <tbody>
                    {accomodationTable}
                </tbody>
                </Table>
                <Modal isOpen={modalDelAcc} fade={false} centered toggle={() => setModalDelAcc()}>
                    <ModalBody className='center-content-column'>
                        {accToDel ?
                            <p className='text-center cormorant margin-0 bold'>Etes-vous sûr de vouloir supprimer {accToDel.name} ?</p>
                        :null}   
                        <div>
                            <Badge className='yes-badge margin-5px ' onClick={() => deleteAccomodation()}>Supprimer</Badge>
                            <Badge className='list-badge' onClick={() => closeDelAccModal()}>Annuler</Badge>
                        </div>
                    </ModalBody>
                </Modal>
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
)(AccomodationScreen);