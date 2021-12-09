import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, Input, DropdownMenu, DropdownItem, Dropdown, DropdownToggle} from 'reactstrap';


const AddAccomodationModal = (props) => {

    const [dropdown, setdropdown] = useState(false);
    const toggle = () => setdropdown(prevState => !prevState);

    const [name, setName] = useState(null);
    const [nameError, setNameError] = useState('');
    const [adress, setAdress] = useState(null);
    const [adressError, setAdressError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [url, setUrl] = useState(null);
    const [urlError, setUrlError] = useState('');
    const [category, setCategory] = useState(null);
    const [categoryError, setCategoryError] = useState('');

    useEffect( () => {
        if (props.accomodation != null) {
            setName(props.accomodation.name);
            setAdress(props.accomodation.adresse);
            setPhoneNumber(props.accomodation.phoneNumber);
            setUrl(props.accomodation.url);
            setCategory(props.accomodation.category);
        }
    }, [props.accomodation]);

    var closeModal = () => {
        setName(null);
        setAdress(null);
        setPhoneNumber(null);
        setUrl(null);
        setCategory(null);
        setNameError('');
        setAdressError('');
        setUrlError('');
        setCategoryError('');
        props.handleUpload();
        props.handleClickParent();
    }

    var saveAccomodation = async () => {
        var canSave = true;
        if (name == null) {
            setNameError("Renseignez le nom de l'hébergement");
            canSave = false;
        }
        if (adress == null ) {
            setAdressError("Renseignez l'adresse de l'hébergement");
            canSave = false;
        }
        if (url == null) {
            setUrlError("Renseignez le site web de l'hébergement");
            canSave = false;
        }
        if (category == null) {
            setCategoryError("Renseignez la catégorie de l'hébergement");
            canSave = false;
        }
        
        if (canSave == true) {
            if (props.accomodation == null ) {
                await fetch(`/saveAccomodation`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: name,
                        adress : adress,
                        phoneNumber: phoneNumber,
                        url: url,
                        category: category
                    }),
                }); 
            } else {
                await fetch(`/updateAccomodation`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: props.accomodation._id,
                        name: name,
                        adress : adress,
                        phoneNumber: phoneNumber,
                        url: url,
                        category: category
                    }),
                }); 
            }
            
            closeModal();
        }
    }



    
  return (
    <div>
        <Modal isOpen={props.isOpen} toggle={props.handleClickParent} size='lg'>
            {props.accomodation == null ?
                <ModalHeader className="orange-background center-content-column">Ajouter un hébergement</ModalHeader>
                :
                <ModalHeader className="orange-background center-content-column">Modifier {props.accomodation.name}</ModalHeader>
            }
            <ModalBody className="background-modal cormorant font-size-18">
                <div className="margin-5px">
                    <Input onChange={(e) => setName(e.target.value)} value={name} className="input-shadow" placeholder="Nom de l'hébergement *"/>
                    <p className='error-modal'>{nameError}</p>
                </div>
                <div className="margin-5px">
                    <Input onChange={(e) => setAdress(e.target.value)} value={adress} className="input-shadow" placeholder="Adresse de l'hébergement *" type="textarea"/>
                    <p className='error-modal'>{adressError}</p>
                </div>
                <div className="margin-5px">
                    <Input onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} className="input-shadow" placeholder="Numéro de téléphone de l'hébergement"/>
                </div>
                <div className="margin-5px">
                    <Input onChange={(e) => setUrl(e.target.value)} value={url} className="input-shadow" placeholder="Site web de l'hébergement *"/>
                    <p className='error-modal'>{urlError}</p>
                </div>
                <div className="margin-5px">
                <Dropdown isOpen={dropdown} toggle={toggle}>
                    <DropdownToggle caret className='dropdown-invitation width-100'>
                        {category ? 
                        category
                        : "Choisir une catégorie d'hébergement" }
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => setCategory("Grand gite")}>Grand gite</DropdownItem>
                        <DropdownItem onClick={() => setCategory("Chambres d'hôtel")}>Chambres d'hôtel</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <p className='error-modal'>{categoryError}</p>
                </div>
                <div className="center-content">
                    <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => saveAccomodation()}>Enregistrer</Button>{' '}
                    <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => closeModal()}>Annuler</Button>
                </div>
            </ModalBody>
        </Modal>
    </div>
  );
}

export default AddAccomodationModal;