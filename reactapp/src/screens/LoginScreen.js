import React, {useState} from 'react';
import '../App.css';
import {Container, Row, Col, Input} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';



function LoginScreen(props) {

    const [guestName, setGuestName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [guestExists, setGuestExists] = useState(false);

    var seConnecter = async () => {
        const data = await fetch(`/signIn`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                guestName: guestName,
                password: password,
            }),
          });
        const body = await data.json();
        
        if (body.result === false ) {
            setErrorMessage(body.error);
        } else {
            props.guest(body.guest);
            setGuestExists(true);
            
        }
    }

    var enterClick = (e) => {
        if (e.key === 'Enter') {
            seConnecter();
        }
    }

    if (guestExists) {
        return <Redirect to='/bienvenue' />
    } 

    return(
        
            <Container >
                <Row style={{display:'flex', justifyContent:'center', alignItems:'center', height: '100vh'}}>
                    <Col xs='12' style={{display:'flex', flexDirection:'column',alignItems:'center', margin: 10}}>
                        <h1 className="title-login">Mariage de Quentin et Juliette</h1>
                        <div className="div-login">
                            <h3>Identifiant</h3>
                            <Input onChange={(e) => setGuestName(e.target.value)} value={guestName} className="input-shadow" onKeyDown={(e) => enterClick(e)}/>
                        </div>
                        <div className="div-login">
                            <h3>Mot de passe</h3>
                            <Input  type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input-shadow" onKeyDown={(e) => enterClick(e)}/>
                        </div>
                        <p className="error">{errorMessage}</p>
                        <button  class="btn bouton" onClick={() => seConnecter()} style={{backgroundColor: '#F1CC94'}}>Se connecter</button>
                    </Col>
                </Row>
            </Container>
        
    )

    
}

function mapDispatchToProps(dispatch){
    return {
        guest: function(guest){
            dispatch({
                type: 'guest',
                guest: guest,
            })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps,
)(LoginScreen);

