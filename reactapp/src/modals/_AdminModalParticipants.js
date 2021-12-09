import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table, Badge } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faTimes } from '@fortawesome/free-solid-svg-icons'

const AdminModalParticipants = (props) => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [orderName, setOrderName] = useState(false);
  const [orderBrunch, setOrderBrunch] = useState(false);
  const [orderSleep, setOrderSleep] = useState(false);
  const [orderDrink, setOrderDrink] = useState(false);

  const [array, setArray] = useState([]);

  const [modalText, setModalText] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  var clickOnComment = (element) => {
    setModalTitle(element.firstName+' '+element.lastName)
    setModalText(element.comment)
    toggle()
  }

  var myTable = () => {
    
    var clickOnTitle = (item) => {
      var newArray = [...props.participantsArray]
      if (item == 'name') {
        setOrderName(!orderName);
        if (orderName) {
          newArray = newArray.sort((a, b) => a.firstName.localeCompare(b.firstName))
        } else {
          newArray = newArray.sort((a, b) => b.firstName.localeCompare(a.firstName))
        }
      } else if (item == 'brunch') {
        setOrderBrunch(!orderBrunch);
        if (orderBrunch) {
          newArray = newArray.sort((a, b) => a.breakfast.localeCompare(b.breakfast))
        } else {
          newArray = newArray.sort((a, b) => b.breakfast.localeCompare(a.breakfast))
        }
      } else if (item == 'sleep') {
        setOrderSleep(!orderSleep);
        if (orderSleep) {
          newArray = newArray.sort((a, b) => a.sleep - b.sleep)
        } else {
          newArray = newArray.sort((a, b) => b.sleep - a.sleep)
        }
      } else if (item == 'drink') {
        setOrderDrink(!orderDrink)
        if (orderDrink) {
          newArray = newArray.sort((a, b) => a.drink.localeCompare(b.drink))
        } else {
          newArray = newArray.sort((a, b) => b.drink.localeCompare(a.drink))
        }
      }
      setArray(newArray);
    }

      var participants;
      if (array.length > 0) {
        participants = array
      } else {
        participants = props.participantsArray
      }
      
      var participantsTable = participants.map((element, i) => {
      var VIP = ''
      if (element.status == 0) {
          VIP = '(VIP)'
      }
      var sleep;
      if (element.sleep == 0) {
          sleep = 'hôtel';
      } else if (element.sleep == 1) {
          sleep = 'dortoir';
      } else if (element.sleep == 2) {
          sleep = 'tente'
      } else if (element.sleep == 3) {
          sleep = 'camping-car';
      } else {
          sleep ="VIP";
      }
      var alcoolTab = element.alcoolLiked.map((item, y) => {
          return(
              <p className='margin-0' key={y}>{item}</p>
          )
      })
      var songsTab = element.songs.map((item, i) => {
          return(
              <p className='margin-0'>{item}</p>
          )
      })

      var comment = element.comment;
      if (element.comment != null && element.comment.length > 100) {
        comment = 
          <div>
            {element.comment.slice(0, 100)+'...'}
            <Badge className='orange-background color-black' onClick={() => clickOnComment(element)}>Voir la suite</Badge>
          </div>;
      }

      return(
          <tr key={i}>
              <td >
                <p className="margin-0 bold" >{element.firstName} {element.lastName}</p> 
                <p className="margin-0">{VIP}</p>
              </td>
              <td >{element.breakfast}</td>
              <td >{sleep}</td>
              <td >{element.drink}</td>
              <td >{alcoolTab}</td>
              <td >{songsTab}</td>
              <td className='margin-0'>{comment}</td>
          </tr>
      )
  })

    return (
      <Table striped style={{backgroundColor: 'white'}} className="cormorant">
              <thead>
                <tr>
                  <th style={{width: '15%'}} onClick={() => clickOnTitle('name')}>Nom <FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                  <th style={{width: '12%'}} 
                  onClick={() => clickOnTitle('brunch')}
                  >Brunch <FontAwesomeIcon icon={faSort} className="color-grey"  /></th>
                  <th style={{width: '9%'}} 
                  onClick={() => clickOnTitle('sleep')}
                  >Héb <FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                  <th style={{width: '14%'}} 
                  onClick={() => clickOnTitle('drink')}
                  >Conso <FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                  <th style={{width: '13%'}}>Boissons</th>
                  <th style={{width: '18%'}}>Sons</th>
                  <th style={{width: '19%'}}>Commentaire</th>
                </tr>
              </thead>
              <tbody>
                {participantsTable}
              </tbody>
            </Table>
    )
  }

  return (
    <div>
        <Modal isOpen={props.isOpen} fade={false} size='xl' style={{fontSize: '1.1vw'}} toggle={props.handleClickParent}>
          <ModalHeader className="orange-background center-content-column">Liste des participants</ModalHeader>
          <ModalBody className="orange-background">
            {myTable()}
          </ModalBody>
          <ModalFooter className="orange-background center-content-column">
            <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => props.handleClickParent()}>Retour</Button>
          </ModalFooter>
        </Modal>

        {/* COMMENT MODAL */}
        <Modal isOpen={modal} toggle={toggle} >
        <ModalBody className="content-column">
          <FontAwesomeIcon icon={faTimes} style={{color: 'red'}} className='align-self-end' onClick={toggle}/>
          <p className="cormorant bold">{modalTitle} :</p>
          <p className="cormorant">{modalText}</p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default AdminModalParticipants ;