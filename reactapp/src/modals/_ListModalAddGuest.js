import React, {useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, DropdownMenu, DropdownItem, Dropdown, DropdownToggle} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';

const ListModalAddGuest = (props) => {

    const [nestedModal, setNestedModal] = useState(false);
    const toggleNested = () => {setNestedModal(!nestedModal)}

    const [identifiant, setIdentifiant] = useState('');
    const [idError, setIdError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    const [dropdownOpenStatut, setdropdownOpenStatut] = useState(false);
    const toggleStatut = () => setdropdownOpenStatut(prevState => !prevState);
    const [statut, setStatut] = useState('');
    const [errorStatut, setErrorStatut] = useState('');

    const [guests, setGuests] = useState([]);
    const [number, setNumber] = useState(1);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dropdownOpenGender, setdropdownOpenGender] = useState(false);
    const toggleGender = () => setdropdownOpenGender(prevState => !prevState);
    const [gender, setGender] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [addNewGuest, setAddNewGuest] = useState(true);

    const [error, setError] = useState('');


    var saveGuest = () => {
            var newGuest = {number: number, firstName : firstName, lastName: lastName, gender: gender};
            setGuests([...guests, newGuest])
            setNumber(number+1);
            setFirstName('');
            setLastName('');
            setGender('');
            setErrorMessage('');
            setAddNewGuest(false);
    }

    var deleteGuest = (element) => {
        setGuests(guests.filter((item) => (item.number !== element.number)));
    }

    var guestsMap = guests.map((element, i) => {
        return(
            <div >
                <p className="margin-5px"> {element.firstName} {element.lastName} - {element.gender} <FontAwesomeIcon icon={faTimes} style={{color: 'red', marginLeft: '5px'}} onClick={() => deleteGuest(element) }/></p>  
            </div>
        )
    })

    var deleteErrorMessages = () => {
        setIdError('');
        setEmailError('');
        setErrorStatut('');
        setErrorMessage('');
        setPasswordError('');
    }

    var deleteAll = () => {
        deleteErrorMessages();
        setIdentifiant('');
        setEmail('');
        setPassword('');
        setStatut('');
        setFirstName('');
        setLastName('');
        setGender('');
        setGuests([]);
        setAddNewGuest(true);
        setError('');
    }

    var cancel = () => {
        deleteAll();
        props.handleClickParent();
    }

    var sentToBack = async () => {
        deleteErrorMessages();
            var data = await fetch('/saveGuest', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifiant: identifiant,
                    email: email,
                    password: password,
                    status: statut,
                    guests: guests,
                }),
            });
        const result = await data.json();
        if (result.result == false) {
            setError(result.error);
            setFirstName('');
            setLastName('');
            setGender('');
            setAddNewGuest(false);   
        } else {
            deleteAll();
            props.handleUpload();
            props.handleClickParent();
        }
        
    }

    var modalValidation = (answer) => {
        if (answer == 'oui') {
            var guestsArray = guests;
            var newGuest = {firstName : firstName, lastName: lastName, gender: gender};
            guestsArray.push(newGuest)
            setGuests(guestsArray)  
        }
        sentToBack();
        setNestedModal(!nestedModal);
    }

    var validation = async () => {
        var canBeSaved = true
        if (identifiant == '') {
            setIdError('Veuillez choisir un identifiant');
            canBeSaved = false
        }
        if (email =='') {
            setEmailError('Veuillez indiquer une adresse mail');
            canBeSaved = false
        }
        if (password == '') {
            setPasswordError('Veuillez choisir un mot de passe');
            canBeSaved = false
        }
        if (statut == '') {
            setErrorStatut('Veuillez indiquer un statut');
            canBeSaved = false
        }

        if (canBeSaved == true) {
            setIdError('');
            setEmailError('');
            setPasswordError('');
            setErrorStatut('');
            var readyTosend = true;
            if (guests.length < 1) {
                if (firstName != '' && lastName != '' && gender != '') {
                    var guestsArray = guests;
                    var newGuest = {firstName : firstName, lastName: lastName, gender: gender};
                    guestsArray.push(newGuest)
                    setGuests(guestsArray)
                } else {
                    setErrorMessage('Votre groupe doit contenir au moins un invité');
                    readyTosend = false;
                }
            } else {
                if (firstName != '' && lastName != '' && gender != '') {
                    setNestedModal(!nestedModal);
                    readyTosend = false
                }
            }
        
            if (readyTosend == true) {
                sentToBack();
            }
        }
    } 

    var formateName = (name) => {
        var firstLetter = name.charAt(0).toUpperCase();
        var restOfLetters = name.slice(1);
        return firstLetter+restOfLetters;
    }

  return (
    <div>
        <Modal isOpen={props.isOpen} fade={false} toggle={cancel}>
          <ModalHeader className="orange-background center-content-column">Ajouter des invités</ModalHeader>
          <ModalBody className="orange-background">
            <div className='cormorant'>
                <div className='center-content-column'>
                
                    <p className="margin-5px">Identifiant du groupe d'invités : </p>
                    <p className='error-modal'>{idError}</p>
                    <Input onChange={(e) => setIdentifiant(e.target.value.toLowerCase().replace(/ /g, ""))} value={identifiant} placeholder="Identifiant" className="margin-b-3px"/>

                    <p className="margin-5px">Email du groupe d'invités : </p>
                    <p className='error-modal'>{emailError}</p>
                    <Input onChange={(e) => setEmail(e.target.value.toLowerCase().replace(/ /g, ""))} value={email} placeholder="Email" className="margin-b-3px" />

                    <p className="margin-5px">Mot de passe : </p>
                    <p className='error-modal'>{passwordError}</p>
                    <Input onChange={(e) => setPassword(e.target.value.toLowerCase().replace(/ /g, ""))} value={password} placeholder="Mot de passe" className="margin-b-3px"/>
                    

                    <p className="margin-5px">Statut</p>
                    <p className='error-modal'>{errorStatut}</p>
                
                    <Dropdown isOpen={dropdownOpenStatut} toggle={toggleStatut} className="margin-bottom-15px width-50">
                        <DropdownToggle caret className='dropdown-invitation width-100'>
                            {statut ? 
                            statut
                            : null }
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem className="item-invitation" onClick={() => setStatut('VIP (chambre réservée)')}>VIP (chambre réservée)</DropdownItem>
                            <DropdownItem className="item-invitation" onClick={() => setStatut('Ne pas proposer le dortoir')}>Ne pas proposer le dortoir</DropdownItem>
                            <DropdownItem className="item-invitation" onClick={() => setStatut('Pas de restrictions')}>Pas de restrictions</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <hr />
                <div >
                    {guestsMap}
                    
                    {addNewGuest || guests.length < 1 ?
                    <div>
                        <p className='error-modal'>{errorMessage}</p>
                        <p className="margin-5px">Prénom : </p>
                        <Input onChange={(e) => setFirstName(formateName(e.target.value).replace(/ /g, ""))} value={firstName} placeholder="prénom" className="margin-b-3px"/>

                        <p className="margin-5px">Nom : </p>
                        <Input type='email' onChange={(e) => setLastName(formateName(e.target.value).replace(/ /g, ""))} value={lastName} placeholder="nom" className="margin-b-3px"/>

                        <p className="margin-5px">Sexe :</p>
                                
                        <Dropdown isOpen={dropdownOpenGender} toggle={toggleGender} className="margin-bottom-15px width-50">
                            <DropdownToggle caret className='dropdown-invitation width-100'>
                            {gender ? 
                                gender
                            : null }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className="item-invitation" onClick={() => setGender('Homme')}>Homme</DropdownItem>
                                <DropdownItem className="item-invitation" onClick={() => setGender('Femme')}>Femme</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        {firstName == '' || lastName == '' || gender == '' ?
                            // <div style={{color: 'red'}} className='bold center-content center-items'>
                                <p className='text-center' style={{color: 'red'}}>Renseigner tous les champs pour valider l'invité</p>
                            // </div> 
                        :
                            <div style={{color: 'green'}} className='bold center-content center-items' onClick={() =>saveGuest() }>
                                <FontAwesomeIcon icon={faCheck} style={{marginRight: '2px'}} /><span >Valider cet invité</span>
                            </div> 
                        }
                         
                    </div>   
                        :
                        <div>
                            {guests.length > 2 ?
                            null
                            :
                            <div className="plus-icon" onClick={() => setAddNewGuest(true)}>
                                <FontAwesomeIcon icon={faPlusCircle}  />
                                <span className="margin-l-3px ">Ajouter un invité supplémentaire au groupe</span>
                            </div>
                            }
                        </div>
                    } 
                </div>
                    
            </div>
          </ModalBody>
          <ModalFooter className="orange-background center-content-column">
            <p className='error'>{error}</p>
                <div className="center-content">
                    <Button id="Popover1" className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => validation()}>Valider</Button>
                    <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => cancel()}>Annuler</Button>
                </div>

          </ModalFooter>
        </Modal>
        {/* MODAL ADD LAST GUEST */}
            <Modal isOpen={nestedModal} toggle={toggleNested} size='sm'>
                <ModalBody className='font-size-18 cormorant'>
                    <p className='text-center margin-0'>Vous n'avez pas validé l'invité :</p>
                    <p className='text-center bold margin-0'>{firstName} {lastName} ({gender})</p>
                    <p className='text-center'> Souhaitez-vous l'ajouter ?</p>
                    <div className='center-content'>
                        <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => modalValidation('oui') }>Oui</Button>
                        <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => modalValidation('non')}>Non</Button>
                    </div>
                </ModalBody>
            </Modal>
    </div>
  );
}

export default ListModalAddGuest ;