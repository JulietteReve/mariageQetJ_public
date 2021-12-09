import React, {useState} from 'react';
import '../App.css';

import Nav from './_Nav';
import MyCarousel from '../carousels/_MyCarousel';

import {Container, Row} from 'reactstrap';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';



function HomeScreen(props) {

    const [guest, setGuest] = useState(props.guest);

    if (props.guest.token) {
    
        var users = guest.users;
        var title = '';
        
        if (users.length == 2) {
            title = users[0].firstName+' et '+users[1].firstName;
            
        } else if (users.length == 1) {
            title = users[0].firstName;
            
        } else if (users.length == 3) {
            title = users[0].firstName+', '+users[1].firstName+' et '+users[2].firstName;
            
        }

        const imageData = [];
        var number = 0;
        for (var i=0; i<props.guest.pictures.length; i++) {
            if (props.guest.pictures[i].url != 'http://res.cloudinary.com/didvrkav5/image/upload/v1635335045/bnsf6xsynfa7x6tsg796.jpg') {
               number += 1;
                imageData.push({src: props.guest.pictures[i].url, number: number}) 
            }
        }

        const filtre = props.guest.pictures.filter(picture => picture.url == 'http://res.cloudinary.com/didvrkav5/image/upload/v1635335045/bnsf6xsynfa7x6tsg796.jpg');
        if (filtre.length > 0) {
            imageData.push({src: filtre[0].url, number: number+1})
        }
        

        return(
                <Container  >
                    <Row className="on-the-right">
                        {guest.admin?
                            <p className="margin-0"><Link to='/admin' className='text-decoration-none link-navbar'>Admin</Link></p>
                        :null}
                        <p className="margin-0"><Link to='/' className='text-decoration-none link-navbar'>Déconnexion</Link></p>
                        
                    </Row>
                    <Nav page="home"/> 
                    <Row>
                        <p className="title-global">Bienvenue {title}</p>
                    </Row>

                    <Row className="cormorant text-center">
                        {users.length > 1 ?
                        <p className="font-size-28px bold">Nous vous invitons à notre mariage le 18 juin 2022, au Grand Gite des Faucheries en Sarthe</p>
                        :
                        <p className="font-size-28px bold">Nous t'invitons à notre mariage le 18 juin 2022, au Grand Gite des Faucheries en Sarthe</p>
                        }
                        <p className="font-size-22px color-black">Réponse souhaitée avant le 18 avril 2022.</p>
                    </Row>

                    <Row className='center-content'>
                        <button  class="btn bouton" style={{backgroundColor: '#F1CC94', width: '250px'}}><Link to='/invitation' className='text-decoration-none color-black'>Répondre à l'invitation</Link></button>
                    </Row>

                    <Row className='margin-top-20px'>
                        <MyCarousel imageData={imageData} size="home-size"/>
                    </Row>
                    
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
)(HomeScreen);