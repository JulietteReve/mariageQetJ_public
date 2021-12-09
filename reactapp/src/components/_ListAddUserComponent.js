import React, {useState, useEffect} from 'react';
import '../App.css';

import {Input, Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMars, faVenus, faTimes, faPlusCircle, faCheck} from '@fortawesome/free-solid-svg-icons'


function ListAddUserComponent(props) {

    const [clickOnPlus, setClickOnPlus] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [dropdownOpenGender, setdropdownOpenGender] = useState(false);
    const toggleGender = () => setdropdownOpenGender(prevState => !prevState);

    var formateName = (name) => {
        var firstLetter = name.charAt(0).toUpperCase();
        var restOfLetters = name.slice(1);
        return firstLetter+restOfLetters;
    }

    var saveNewUser = async () => {
        await fetch('/createUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guest: props.element,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
            }),
        });
        setClickOnPlus(false);
        props.handleUpload();
    }

    return (
        <div>
            {clickOnPlus ?
                <div className='center-items'>
                    <Input onChange={(e) => setFirstName(formateName(e.target.value).replace(/ /g, ""))} value={firstName} placeholder="prénom" className="margin-b-3px"/>
                    <Input type='email' onChange={(e) => setLastName(formateName(e.target.value).replace(/ /g, ""))} value={lastName} placeholder="nom" className="margin-b-3px"/>
                    <Dropdown isOpen={dropdownOpenGender} toggle={toggleGender} >
                            <DropdownToggle caret className='dropdown-invitation' style={{height: '35px'}}>
                            {gender ? 
                                <div>
                                {gender == 'Homme' ?
                                    <FontAwesomeIcon icon={faMars} className="color-grey"/>
                                    :
                                    <FontAwesomeIcon icon={faVenus} className="color-grey"/>
                                }
                                </div>
                            : null }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className="item-invitation" onClick={() => setGender('Homme')}><FontAwesomeIcon icon={faMars} className="color-grey  margin-3px"/></DropdownItem>
                                <DropdownItem className="item-invitation" onClick={() => setGender('Femme')}><FontAwesomeIcon icon={faVenus} className="color-grey  margin-3px"/></DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    {firstName == '' || lastName == '' || gender == '' ?
                        <FontAwesomeIcon icon={faCheck} className="color-grey  margin-3px"/>
                    :
                        <FontAwesomeIcon icon={faCheck} className="color-green margin-3px" onClick={() => saveNewUser()}/>
                    }
                    <FontAwesomeIcon icon={faTimes} className="color-red margin-3px" onClick={() => setClickOnPlus(false)}/>
                
                </div>
            :
            <div className="plus-icon center-items" onClick={() => setClickOnPlus(true)}>
                <FontAwesomeIcon icon={faPlusCircle} className='padding-4px' />
                <p class='margin-0 font-size-rem8' >Ajouter un invité</p>
            </div>
            }
        </div>
    )
                   
}

export default ListAddUserComponent;