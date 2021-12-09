import React from 'react';
import { Button, Modal, ModalBody } from 'reactstrap';

const DeleteCarpoolingModal = (props) => {

  var deleteCarpooling = async () => {
    await fetch(`/deleteCarpooling`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            guestToken : props.guestToken, 
            carpoolingId: props.carpoolingId,
        }),
    }); 
    props.handleClickParent()
  }

  return (
    <Modal isOpen={props.isOpen} toggle={props.handleClickParent} size='xs'>
        <ModalBody className="orange-background center-content-column">
            {props.type == "offer" ?
                <p class="cormorant font-size-20px">Es-tu sûr de vouloir supprimer ton offre de covoiturage ?</p>
            :
                <p class="cormorant font-size-20px">Es-tu sûr de vouloir supprimer ta demande de covoiturage ?</p>
            }
            <div className="center-content">
                <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => deleteCarpooling()}>Supprimer</Button>
                <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => props.handleClickParent()}>Annuler</Button>
            </div>
        </ModalBody>
    </Modal>
  );
}

export default DeleteCarpoolingModal ;