import React, {useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort} from '@fortawesome/free-solid-svg-icons'

const AdminModalOthers = (props) => {

  const [array, setArray] = useState([]);
  const [orderName, setOrderName] = useState(false);

  var myTable = () => {

    var clickOnTitle = () => {
      var newArray = [...props.dontKnowsArray];
      setOrderName(!orderName);
      if (orderName) {
        newArray = newArray.sort((a, b) => a.firstName.localeCompare(b.firstName))
      } else {
        newArray = newArray.sort((a, b) => b.firstName.localeCompare(a.firstName))
      }
      setArray(newArray);
    } 

    var others;
      if (array.length > 0) {
        others = array
      } else {
        others = props.dontKnowsArray
      }

      var othersTable = others.map((element, i) => {
        return (
          <tr>
            <td>{element.firstName} {element.lastName}</td>
          </tr>
        )
      })

    return (
      <Table striped style={{backgroundColor: 'white'}} className="cormorant">
        <thead>
          <tr>
            <th style={{width: '15%'}} onClick={() => clickOnTitle()} >Nom <FontAwesomeIcon icon={faSort} className="color-grey" /></th>
          </tr>
        </thead>
        <tbody>
          {othersTable}
        </tbody>
      </Table>
    )

  }

  return (
    <div>
        <Modal isOpen={props.isOpen} fade={false} size='xs' style={{fontSize: '1.5vw'}} toggle={props.handleClickParent}>
          <ModalHeader className="orange-background center-content-column">Ne viendront pas :( </ModalHeader>
          <ModalBody className="orange-background">
            {myTable()}
          </ModalBody>
          <ModalFooter className="orange-background center-content-column">
            <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => props.handleClickParent()}>Retour</Button>
          </ModalFooter>
        </Modal>
    </div>
  );
}

export default AdminModalOthers ;