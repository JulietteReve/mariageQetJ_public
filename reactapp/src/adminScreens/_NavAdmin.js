
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



function NavAdmin(props) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);    

    return (
        
        <Navbar light expand="md" >
            <NavbarBrand href=""></NavbarBrand>
            <NavbarToggler onClick={toggle} />
           
            <Collapse isOpen={isOpen} navbar style={{alignItems: 'center', justifyContent: 'center'}} >
                <Nav  navbar className='navBarText'>
                    <NavItem>
                        <Link to='/bienvenue' className='text-decoration-none'><NavLink className='link-navbar'>Retour à la page d'acceuil</NavLink></Link>
                    </NavItem>
                    {props.page == 'admin' ?
                        <NavItem>
                            <NavLink className='link-navbar bold'>Suivi des réponses</NavLink>
                        </NavItem>
                        :
                        <NavItem>
                            <Link to='/admin' className='text-decoration-none'><NavLink className='link-navbar'>Suivi des réponses</NavLink></Link>
                        </NavItem>
                    }
                    {props.page == "list" ?
                        <NavItem>
                            <NavLink className='link-navbar bold'>Liste des invités</NavLink>
                        </NavItem>
                        :
                        <NavItem>
                            <Link to='/liste' className='text-decoration-none'><NavLink className='link-navbar'>Liste des invités</NavLink></Link>
                        </NavItem>
                    }
                    {props.page == 'accomodation' ?
                        <NavItem>
                            <NavLink className='link-navbar bold'>Liste des hébergements</NavLink>
                        </NavItem>
                        :
                        <NavItem>
                            <Link to='/hebergements' className='text-decoration-none'><NavLink className='link-navbar'>Liste des hébergements</NavLink></Link>
                        </NavItem>
                    }
                </Nav>
            </Collapse>
        </Navbar>
        
    )
}

export default NavAdmin;