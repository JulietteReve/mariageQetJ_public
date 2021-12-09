import React, {useState} from 'react';
import '../App.css';


import {Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faPen} from '@fortawesome/free-solid-svg-icons'

function ListEmailComponent(props) {

    const [clickOnPen, setClickOnPen] = useState(false);
    const [email, setEmail] = useState(props.element.email)


    var saveModification = async () => {
        await fetch('/updateEmail', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guest: props.element,
                email : email,
            }),
        });
        setClickOnPen(false);
        props.handleUpload();
    }

    return (
        <div>
            {clickOnPen ?
                <div className='center-items'>
                    <Input onChange={(e) => setEmail(e.target.value.toLowerCase().replace(/ /g, ""))} value={email} placeholder="Email" className="margin-b-3px" />
                    {email == '' ?
                        <FontAwesomeIcon icon={faCheck} className="color-grey  margin-3px"/>
                    :
                        <FontAwesomeIcon icon={faCheck} className="color-green margin-3px" onClick={() => saveModification()}/>
                    }
                    <FontAwesomeIcon icon={faTimes} className="color-red margin-3px" onClick={() => setClickOnPen(false)}/>
                </div>
            :
                <div>
                    <FontAwesomeIcon icon={faPen} className="padding-4px" onClick={() => setClickOnPen(true)}/>
                    {props.element.email}
                </div>
            }
        </div>
    )
}

export default ListEmailComponent