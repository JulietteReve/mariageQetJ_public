import React, {useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

const ListModalPictures = (props) => {

    const [modalDelete, setModalDelete] = useState(false);
    var closeModalDelete = () => setModalDelete(!modalDelete); 
    
    const [picturesArray, setPicturesArray] = useState([]);
    const [pictureToDelete, setPictureToDelete] = useState(null);

    const [newPictures, setNewPictures] = useState({});
    const [errorAdd, setErrorAdd] = useState('');
    const [modalAdd, setModalAdd] = useState(false);

    const [isdownloading, setIsDownloadling] = useState(false);

    const [countPic, setCountPic] = useState(0);


    var closeModalAdd = () => {
        setNewPictures({});
        setErrorAdd('')
        setModalAdd(!modalAdd);
    }

    useEffect (() => {
        setPicturesArray(props.guest.pictures);
    }, [props.guest])

    var openDeleteModal = (element) => {
        setPictureToDelete(element);
        setModalDelete(!modalDelete);
    }

    var deletePicture = async (picture) => {
        await fetch('/deletePic', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                picture: picture,
                token: props.guest.token
            }),
        });
        setPicturesArray(picturesArray.filter(pic => pic != picture));
        setModalDelete(!modalDelete);
    }

    var savePicture = async () => {
        setIsDownloadling(true);
        var tempArray = [];
        if (newPictures.length == undefined) {
            setErrorAdd('Veuillez selectionner au moins une photo')
        } else {
            for ( var i=0; i<newPictures.length; i++) {
                var picDatas = new FormData();
                picDatas.append('pic', newPictures[i]);
                var data = await fetch(`/uploadPics/${props.guest.token}`, {
                    method: 'post',
                    body: picDatas
                });  
                const result = await data.json();
                tempArray = result;
                setCountPic(i+1);
            }
            setPicturesArray(tempArray);
            setIsDownloadling(false);
            closeModalAdd(); 
        }
    }

    console.log(picturesArray);

       var picturesTab = picturesArray.map((element, i) => {
            return(
                <div>
                    <img src={element.url} alt={element.url} className='list-img'></img>
                    {picturesArray.length > 1 ?
                        <p className='cormorant text-center color-red' onClick={() => openDeleteModal(element)}>Supprimer cette photo</p>
                    :null}
                </div>
            )
        }) 
    

  return (
    <div>
        <Modal isOpen={props.isOpen} fade={false} size='xl' toggle={props.handleClickParent} >
          <ModalHeader className="orange-background center-content-column">Photos de {props.guest.guestName}</ModalHeader>
          <ModalBody className="orange-background">
            <div className='flex-wrap-center'>
                {picturesTab}
            </div>
            <div className="center-content">
                <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => setModalAdd(!modalAdd)} >Ajouter des photos</Button>
            </div>
                    
          </ModalBody>
          <ModalFooter className="orange-background center-content-column">
                <div className="center-content">
                    <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => props.handleClickParent()}>Retour</Button>
                </div>
          </ModalFooter>
        </Modal>
        {/* MODAL DELETE PIC */}
        {pictureToDelete ?
            <Modal isOpen={modalDelete} fade={false} size='xs' toggle={closeModalDelete}>
                <ModalBody >
                    <div className='center-content-column'>
                        <p className='cormorant text-center font-size-18'>Etes vous sûr de vouloir supprimer cette image ?</p>
                        <img src={pictureToDelete.url} alt={pictureToDelete.url} className='list-img'></img>
                    </div>
            
                    <div className="center-content">
                        <Button id="Popover1" className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => deletePicture(pictureToDelete)} >Oui</Button>
                        <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => closeModalDelete()}>Annuler</Button>
                    </div>
                </ModalBody>
            </Modal>
            :
        null}
        {/* MODAL ADD PIC */}
        <Modal isOpen={modalAdd} fade={false} size='xs' toggle={closeModalAdd}>
            <ModalBody className='cormorant center-content-column'>
                <p><input type='file' onChange={(e) => setNewPictures(e.target.files)} multiple/></p>
                <p className="color-red">{errorAdd}</p>
                <div className="center-content">
                    <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => savePicture()}>Ajouter</Button>
                    <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => closeModalAdd()}>Annuler</Button>
                </div>
            </ModalBody>
        </Modal>
        {/* MODAL DOWNLOAD PICS */}
        <Modal isOpen={isdownloading} fade={false} >
            <ModalBody className='cormorant center-content-column'>
                <p className="font-size-18 bold">Téléchargement des photos en cours... {countPic}/{newPictures.length}</p>
                <img src="/images/cat.gif" />
            </ModalBody>
        </Modal>

    </div>
  );
}

export default ListModalPictures ;