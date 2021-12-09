import React, {useState} from 'react';
import '../App.css';


import {Input, Modal, Badge, ModalBody} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faPen} from '@fortawesome/free-solid-svg-icons'

function ListUsersComponent(props) {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [clickOnPen, setClickOnPen] = useState(false);
    const [firstName, setFirstName] = useState(props.item.firstName);
    const [lastName, setLastName] = useState(props.item.lastName);

    var formateName = (name) => {
        var firstLetter = name.charAt(0).toUpperCase();
        var restOfLetters = name.slice(1);
        return firstLetter+restOfLetters;
    }

    var saveModification = async () => {
        await fetch('/updateUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guest: props.element,
                user: props.item,
                firstName: firstName,
                lastName: lastName,
            }),
        });
        setClickOnPen(false);
        props.handleUpload();
    }

    var deleteUser = async () => {
        await fetch('/deleteUser', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guest: props.element,
                user: props.item,
            }),
        });
        toggle();
        props.handleUpload();
    }

    return (
        <div >
            {clickOnPen ?
            <div className='center-items'>
                <Input onChange={(e) => setFirstName(formateName(e.target.value).replace(/ /g, ""))} value={firstName} placeholder="prénom" className="margin-b-3px"/>
                <Input type='email' onChange={(e) => setLastName(formateName(e.target.value).replace(/ /g, ""))} value={lastName} placeholder="nom" className="margin-b-3px"/>
                {firstName == '' || lastName == '' ?
                    <FontAwesomeIcon icon={faCheck} className="color-grey  margin-3px"/>
                :
                    <FontAwesomeIcon icon={faCheck} className="color-green margin-3px" onClick={() => saveModification()}/>
                }
                <FontAwesomeIcon icon={faTimes} className="color-red margin-3px" onClick={() => setClickOnPen(false)}/>
                
            </div>
            :
            <div className='center-items'>
                
                <p className="margin-0" >
                    {props.element.users.length > 1 ?
                        <FontAwesomeIcon icon={faTimes} className="color-red" style={{padding: '2px'}} onClick={() => toggle()}/>
                    :null}
                    <FontAwesomeIcon icon={faPen} className="padding-4px" onClick={() => setClickOnPen(true)}/>
                    {props.item.firstName} {props.item.lastName} 
                    
                </p>
            </div>
            }
            {/* MODAL */}
            <Modal isOpen={modal} toggle={toggle} size='sm' fade={false} centered>
                <ModalBody className='center-content-column'>
                    <p className='text-center cormorant margin-0 bold'>Etes-vous sûr de vouloir supprimer {props.item.firstName} {props.item.lastName} ?</p>
                    <p className='text-center cormorant margin-0'>Tous ses choix seront perdus</p>
                        <div>
                            <Badge className='yes-badge margin-5px ' onClick={()=> deleteUser()}>Supprimer</Badge>
                            <Badge className='list-badge' onClick={toggle}>Annuler</Badge>
                        </div>
                </ModalBody>
            </Modal>
        </div>
    )
}


export default ListUsersComponent