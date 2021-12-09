import React, {useState, useEffect} from 'react';
import '../App.css';
import {Container,Row, Button, Modal, ModalBody, Card, CardTitle, CardText} from 'reactstrap';

import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import MyCarousel from '../carousels/_MyCarousel';

import Nav from './_Nav';

function PicturesScreen(props) {

    const [picsArray, setPicsArray] = useState([])
    const [newPictures, setNewPictures] = useState({});

    const [addModal, setAddModal] = useState(false);
    const [isdownloading, setIsDownloadling] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false);
    const [pictureToDelete, setPictureToDelete] = useState(null);

    const [watchPicsModal, setWatchPicsModal] = useState(false);

    const [picClicked, setPicClicked] = useState(null);

    const [upload, setUpload] = useState(false);

    const [countPic, setCountPic] = useState(0);

    useEffect ( async () => {
        const data = await fetch('/allWeddingPictures');
        const result = await data.json();
        setPicsArray(result);
    }, [upload])

    var closeAddModal = () => {
        setNewPictures([]);
        setAddModal(false);
    }

    var savePictures = async () => {
        setIsDownloadling(true);
        setAddModal(false);
        for (var i=0; i<newPictures.length; i++) {
            var picDatas = new FormData();
            picDatas.append('pic', newPictures[i]);
            var data = await fetch(`/uploadWeddingPics/${props.guest.token}`, {
                method: 'post',
                body: picDatas
            });  
            const result = await data.json();
            setCountPic(i+1);

        }
        setNewPictures([]);
        setIsDownloadling(false);
        setUpload(!upload);
        setCountPic(0);
   }

   var openDeleteModal = (pic) => {
        setPictureToDelete(pic);
        setDeleteModal(!deleteModal);
   }

   var closeDeleteModal = () => {
        setPictureToDelete(null);
        setDeleteModal(!deleteModal);
   }

   var deletePicture = async () => {
       await fetch('/deleteWeddingPicture', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                picture: pictureToDelete,
                token: props.guest.token
            }),
        });
        setUpload(!upload);
        closeDeleteModal();
   }
   

    const pictures = picsArray.map((pic) => {
        
        var users = pic.guest.users;
        var name = users[0].firstName;
    
        if (users.length == 2) {
            name += ' et ' + users[1].firstName;
        } else if (users.length == 3) {
            name += ', ' + users[1].firstName + ' et ' + users[2].firstName;
        }
        
        if (name.length > 30) {
        name = name.slice(0, 30)+'...';
        }
        
        return (
            <div className="center-content-column">
                <img src={pic.url} alt={name} className='wedding-pics' onClick={() => openWatchPics(pic.url)}></img>
                {props.guest.guestName == pic.guest.guestName ?
                <p className='cormorant text-center color-red' onClick={() => openDeleteModal(pic)}>Supprimer cette photo</p>
                :
                <p class="text-center">{name}</p>
                }
            </div>
        )
    })

    var openWatchPics = (pic) => {
        setWatchPicsModal(true);
        setPicClicked(pic);
    }

    var imageData = [];
    var i= 0;
    picsArray.forEach( function(pic) {
        imageData.push({src: pic.url, number: i+1})
        i++;
    })

    if (props.guest.token) {
        
        return(
            <Container className="cormorant">
                <Nav page="pictures"/> 
                <Row>
                    <p className="title-global">Les photos du mariage</p>
                </Row>
                {Date.now() < new Date('2022-06-18') ?
                <div>
                    
                    
                    <Row>
                        <div className="center-content">
                            <Button className="modal-button bouton" style={{backgroundColor: '#F1CC94', borderColor: '#F1CC94'}} onClick={() => setAddModal(!addModal)} >Ajouter mes photos</Button>
                        </div>
                    </Row >
                        
                    <Row >
                        {picsArray.length > 0 ?
                            <div class="flex-wrap-center">
                                {pictures}
                            </div>
                        :
                            <p className="text-center font-size-25px margin-top-20px">Sois le premier à ajouter des photos !</p>
                        }
                    </Row>
                </div>
                :
                <Card body className="margin-10px">
                    <CardTitle >
                        <p className='text-center cormorant font-size-30px bold margin-0'>Notre photographe, c'est toi !</p>
                    </CardTitle>
                    <CardText>
                        <p className='text-center cormorant font-size-25px'>Dès le 19 juin, rendez-vous sur cette page pour partager tes photos !</p>
                        <p className="cormorant text-center font-size-17px">Nous n'engageons pas de photographe professionnel. Nous comptons sur toi pour immortaliser cette journée :)</p>
                    </CardText>
                </Card>
                }

                {/* MODAL ADD PIC */}
                <Modal isOpen={addModal} fade={false} size='xs' toggle={closeAddModal}>
                    <ModalBody className='cormorant center-content-column'>
                        <input type='file' onChange={(e) => setNewPictures(e.target.files)} multiple className="margin-10px"/>
                        <div className="center-content">
                            <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => savePictures()}>Ajouter</Button>
                            <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => closeAddModal()}>Annuler</Button>
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

                {/* MODAL DELETE PIC */}
                {pictureToDelete != null ?
                <Modal isOpen={deleteModal} fade={false} size='xs' toggle={closeDeleteModal}>
                    <ModalBody >
                        <div className='center-content-column'>
                            <p className='cormorant text-center font-size-18'>Es-tu sûr de vouloir supprimer cette image ?</p>
                            <img src={pictureToDelete.url} alt={pictureToDelete} className='list-img'></img>
                        </div>
                
                        <div className="center-content">
                            <Button id="Popover1" className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => deletePicture(pictureToDelete)} >Oui</Button>
                            <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => closeDeleteModal()}>Annuler</Button>
                        </div>
                    </ModalBody>
                </Modal>
                : null}

                {/* MODAL WATCH PICS */}
                <Modal isOpen={watchPicsModal} fade={false} toggle={() => setWatchPicsModal(false)} size="xl">
                    <ModalBody>
                        <MyCarousel imageData={imageData} size="wedding-size" picClicked={picClicked}/>
                        <div className="center-content">
                            <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => setWatchPicsModal(false)}>Retour</Button>
                        </div>
                    </ModalBody>
                </Modal>

            </Container>
        )
    } else {
        return (
            <Redirect to="/" />
        )
    }
}

function mapStateToProps(state){
    return {guest: state.guest}
}

export default connect(
    mapStateToProps,
    null
)(PicturesScreen);