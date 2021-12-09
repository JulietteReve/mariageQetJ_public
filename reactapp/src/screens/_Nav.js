import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from 'reactstrap';
import '../App.css';



function NavBar(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen); 
    const [invitationClass, setInvitationClass] = useState('link-navbar');
    const [homeClass, setHomeClass] = useState('link-navbar');
    const [placeClass, setPlaceClass] = useState('link-navbar');
    const [carpoolingClass, setCarpoolingClass] = useState('link-navbar');
    const [ddayClass, setDdayClass] = useState('link-navbar');
    const [picturesClass, setPicturesClass] = useState('link-navbar');
    const [giftsClass, setGiftsClass] = useState('link-navbar');

    return (
        
        <Navbar light expand="lg" >
            <NavbarBrand href=""></NavbarBrand>
            <NavbarToggler onClick={toggle} />
           
            <Collapse isOpen={isOpen} navbar style={{alignItems: 'center', justifyContent: 'center'}} >
                <Nav  navbar className='navBarText' >
                    <NavItem>
                        {props.page == 'home' ?
                            <NavLink className='link-navbar bold border-nav'>Bienvenue</NavLink>
                            :
                            <Link to='/bienvenue' className='text-decoration-none'><NavLink className={homeClass} onMouseEnter={() => setHomeClass("link-navbar border-nav")} onMouseLeave={() => setHomeClass("link-navbar")}>Bienvenue</NavLink></Link>
                        }
                    </NavItem>
                    <NavItem>    
                        {props.page == 'invitation' ?
                            <NavLink className='link-navbar bold border-nav'>Répondre à l'invitation</NavLink>
                            :
                            <Link to='/invitation' className='text-decoration-none'>
                                <NavLink className={invitationClass} onMouseEnter={() => setInvitationClass("link-navbar border-nav")} onMouseLeave={() => setInvitationClass("link-navbar")}>Répondre à l'invitation</NavLink>
                            </Link>   
                        }
                    </NavItem>
                    <NavItem>
                        {props.page == 'place' ?
                            <NavLink className='link-navbar bold border-nav'>Le lieu</NavLink>
                            :
                            <Link to='/lieu' className='text-decoration-none'>
                                <NavLink className={placeClass} onMouseEnter={() => setPlaceClass("link-navbar border-nav")} onMouseLeave={() => setPlaceClass("link-navbar")}>Le lieu</NavLink>
                            </Link>
                        }
                    </NavItem>
                    <NavItem>
                        {props.page == "carpooling" ?
                            <NavLink className='link-navbar bold border-nav'>Covoiturage</NavLink>
                            :
                            <Link to='/covoiturage' className='text-decoration-none'>
                                <NavLink className={carpoolingClass} onMouseEnter={() => setCarpoolingClass("link-navbar border-nav")} onMouseLeave={() => setCarpoolingClass("link-navbar")}>Covoiturage</NavLink>
                            </Link>
                        }
                    </NavItem>
                    <NavItem>
                        {props.page == "dday" ?
                            <NavLink className='link-navbar bold border-nav'>Le jour J</NavLink>
                            :
                            <Link to='/jourJ' className='text-decoration-none'>
                                <NavLink className={ddayClass} onMouseEnter={() => setDdayClass("link-navbar border-nav")} onMouseLeave={() => setDdayClass("link-navbar")}>Le jour J</NavLink>
                            </Link>
                        }
                    </NavItem>
                    <NavItem>
                        {props.page == 'gifts' ?
                            <NavLink className='link-navbar bold border-nav'>La liste de mariage</NavLink>
                            :
                            <Link to='/listedemariage' className='text-decoration-none'>
                                <NavLink className={giftsClass} onMouseEnter={() => setGiftsClass("link-navbar border-nav")} onMouseLeave={() => setGiftsClass("link-navbar")}>La liste de mariage</NavLink>
                            </Link>
                        }
                    </NavItem> 
                    <NavItem>
                        {props.page == 'pictures' ?
                            <NavLink className='link-navbar bold border-nav'>Les photos du mariage</NavLink>
                            :
                            <Link to='/photos' className='text-decoration-none'>
                                <NavLink className={picturesClass} onMouseEnter={() => setPicturesClass("link-navbar border-nav")} onMouseLeave={() => setPicturesClass("link-navbar")}>Les photos du mariage</NavLink>
                            </Link>
                        }
                    </NavItem> 

                </Nav>
            </Collapse>
        </Navbar>
        
    )
}

export default NavBar;
