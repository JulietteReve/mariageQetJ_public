import React, {useState, useEffect} from 'react';
import '../App.css';

import {Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ModalBody} from 'reactstrap';

import {connect} from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteCarpoolingModal from './_DeleteCarpoolingModal';


function InvitationModal(props) {

    const [user, setUser] = useState(props.user);
    
    const [dropdownOpenAccomodation, setdropdownOpenAccomodation] = useState(false);
    const toggleAccomodation = () => setdropdownOpenAccomodation(prevState => !prevState);
    const [accomodation, setAccomodation] = useState(null);
    const [errorAccomodation, setErrorAccomodation] = useState('');

    const [dropdownOpenBrunch, setdropdownOpenBrunch] = useState(false);
    const toggleBrunch = () => setdropdownOpenBrunch(prevState => !prevState);
    const [brunch, setBrunch] = useState(null);
    const [errorBrunch, setErrorBrunch] = useState('');

    const [biere, setBiere]= useState(false);
    const [champagne, setChampagne] = useState(false);
    const [blanc, setBlanc] = useState(false);
    const [rose, setRose] = useState(false);
    const [rouge, setRouge] = useState(false);
    const [soupeAngevine, setSoupeAngevine] = useState(false);
    const [spritz, setSpritz] = useState(false);
    const [ginTo, setGinTo] = useState(false);
    const [rhum, setRhum] = useState(false);
    const [jus, setJus] = useState(false);
    const [eau, setEau] = useState(false);

    const [dropdownOpenAlcool, setdropdownOpenAlcool] = useState(false);
    const toggleAlcool = () => setdropdownOpenAlcool(prevState => !prevState);
    const [alcool, setAlcool] = useState(null);
    const [errorAlcool, setErrorAlcool] = useState('');

    const [countSongs, setCountSongs] = useState(0);
    const [song1, setSong1] = useState(null);
    const [song2, setSong2] = useState(null);
    const [song3, setSong3] = useState(null);
    const [song4, setSong4] = useState(null);
    const [song5, setSong5] = useState(null);
    const [song6, setSong6] = useState(null);
    const [song7, setSong7] = useState(null);
    const [song8, setSong8] = useState(null);
    const [song9, setSong9] = useState(null);
    const [song10, setSong10] = useState(null);

    const [comment, setComment] = useState(null);

    const [carpoolingDelete, setCarpoolingDelete] = useState(false);
    const [carpoolingMessage, setCarpoolingMessage] = useState('');

    useEffect(() => {
        const getUserDetails = async () => {
            if (user.sleep == 1) {
                setAccomodation('Je souhaite dormir en dortoir collectif (sur le lieu du mariage)')
            } else if (user.sleep == 2) {
                setAccomodation("J'apporte ma tente (accès salle de bain prévu)")
            } else if (user.sleep == 3) {
                setAccomodation('Je viens en camping-car que je garerai sur le lieu du mariage');
            } else if (user.sleep == 0) {
                setAccomodation("Je réserve un hôtel / gite, à proximité du lieu du mariage")
            } 

            if (user.status == 0) {
                setAccomodation('');
            }
           
            setBrunch(user.breakfast);
           
            if (user.alcoolLiked.includes("la bière")) {
               setBiere(!biere);
            }
            if (user.alcoolLiked.includes("le champagne")) {
               setChampagne(true);
            }
            if (user.alcoolLiked.includes("le blanc")) {
                setBlanc(true);
            }
            if (user.alcoolLiked.includes("le rosé")) {
                setRose(true);
            }
            if (user.alcoolLiked.includes("le rouge")) {
                setRouge(true);
            }
            if (user.alcoolLiked.includes("la soupe angevine")) {
                setSoupeAngevine(true);
            }
            if (user.alcoolLiked.includes("le spritz")) {
                setSpritz(true);
            }
            if (user.alcoolLiked.includes("le gin tonic")) {
                setGinTo(true);
            }
            if (user.alcoolLiked.includes("le rhum arrangé")) {
                setRhum(true);
            }
            if (user.alcoolLiked.includes("les jus de fruits")) {
                setJus(true);
            }
            if (user.alcoolLiked.includes("l'eau")) {
                setEau(true);
            }

            setAlcool(user.drink);
            setCountSongs(user.songs.length);
            setSong1(user.songs[0]);
            setSong2(user.songs[1]);
            setSong3(user.songs[2]);
            setSong4(user.songs[3]);
            setSong5(user.songs[4]);
            setSong6(user.songs[5]);
            setSong7(user.songs[6]);
            setSong8(user.songs[7]);
            setSong9(user.songs[8]);
            setSong10(user.songs[9]);
            setComment(user.comment);

            var countAttending = props.guest.users.filter(user => user.isAttending == 1).length
            console.log(countAttending);
            if (user.isAttending == 2) {
                countAttending += 1;
            }
            if (countAttending < 2 && props.guest.carpooling.length > 0) {
                setCarpoolingDelete(true);
                var countCarpoolingOffers = props.guest.carpooling.filter(car => car.offerSeats != null).length;
                var countCarpoolingSearchs = props.guest.carpooling.filter(car => car.searchSeats != null).length;
                if (countCarpoolingOffers > 0 && countCarpoolingSearchs > 0) {
                    setCarpoolingMessage("Attention, tes offres et demandes de covoiturage seront effacées. Pense stp à prévenir les personnes avec qui tu as été en contact.")
                } else if (countCarpoolingOffers > 0) {
                    setCarpoolingMessage("Attention, ton offre de covoiturage sera annulée. Pense stp à prévenir les personnes avec qui tu as été en contact.");
                } else {
                    setCarpoolingMessage("Attention, ta demande de covoiturage sera annulée. Pense stp à prévenir les personnes avec qui tu as été en contact.");
                }
            } 
        };
        getUserDetails();
      }, []);
    
    var noParticipation = async (retour) => {
        if (retour == true) {
            var sleep;
            if (user.status == 0) {
                sleep = 4;
            } else {
                sleep = null;
            }
            await fetch(`/noparticipation`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  user: user,
                  token : props.guest.token,
                  sleep: sleep,
                  carpoolingDelete: carpoolingDelete,
                }),
            }); 
            
        }
        props.handleClickParent();
    }

    var participation = async (retour) => {
        if (retour == false) {
            props.handleClickParent();
        } else {
            if (accomodation == null || brunch == null || alcool == null) {
                if (accomodation == null) {
                    setErrorAccomodation('Veuillez choisir une réponse:')
                }
                if (brunch == null) {
                    setErrorBrunch('Veuillez choisir une réponse:')
                }
                if (alcool == null) {
                    setErrorAlcool('Veuillez choisir une réponse:')
                }
            } else {
                var sleep = '';
                if (accomodation == "J'apporte ma tente (accès salle de bain prévu)") {
                    sleep = 2
                } else if (accomodation == 'Je viens en camping-car que je garerai sur le lieu du mariage') {
                    sleep = 3
                } else if (accomodation == 'Je souhaite dormir en dortoir collectif (sur le lieu du mariage)') {
                    sleep = 1
                } else if (accomodation == "Je réserve un hôtel / gite, à proximité du lieu du mariage") {
                    sleep = 0;
                } 
                if (user.status == 0) {
                    sleep = 4;
                }

                var drinks = [];
                if (biere == true) {
                    drinks.push('la bière');
                }
                if (champagne == true) {
                    drinks.push('le champagne');
                }
                if (blanc == true) {
                    drinks.push('le blanc')
                }
                if (rose == true) {
                    drinks.push('le rosé')
                }
                if (rouge == true) {
                    drinks.push('le rouge')
                }
                if (soupeAngevine == true) {
                    drinks.push('la soupe angevine')
                }
                if (spritz == true) {
                    drinks.push('le spritz')
                }
                if (ginTo == true) {
                    drinks.push('le gin tonic')
                }
                if (rhum == true) {
                    drinks.push('le rhum arrangé')
                }
                if (jus == true) {
                    drinks.push('les jus de fruits')
                }
                if (eau == true) {
                    drinks.push("l'eau")
                }
                var songsArray = [song1, song2, song3, song4, song5, song6, song7, song8, song9, song10];
                
                const songsTemp = songsArray.filter(song => song != null);
                const songsTemp2 = songsTemp.filter(song => song != '');
                //REGEX POUR NE PAS ENREGISTRER UN SONG QUI COMPORTE UNIQUEMENT DES ESPACES
                const songs = songsTemp2.filter(song => /^\s+$/.test(song) != true);

                await fetch(`/participation`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user: user,
                        token : props.guest.token,
                        sleep: sleep,
                        brunch: brunch,
                        drinks: drinks,
                        alcool: alcool,
                        songs: songs,
                        comment: comment
                    }),
                }); 
                props.handleClickParent();
            }
        }  
    }

    if (props.response == 'Je participe') {
        return (
        <ModalBody className="background-modal cormorant font-size-18">
            <p className="modal-title">Chouette :) {user.firstName}</p>
            <p className="text-center">Merci de répondre à ces quelques questions pour valider ta participation:</p>

            <p className="margin-5px">Hébergement le soir du mariage:* </p>
            {user.status == 0 ?
            <div>
                <p className="VIP-modal">Tu es un VIP. Nous avons réservé une chambre pour toi sur le lieu du mariage :)</p>
            </div>
            :
            <div>
                <p className='error-modal'>{errorAccomodation}</p>
                <Dropdown isOpen={dropdownOpenAccomodation} toggle={toggleAccomodation} className="margin-bottom-15px">
                    <DropdownToggle caret className='dropdown-invitation width-100'>
                        {accomodation ? 
                        accomodation
                        : null }
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="item-invitation" onClick={() => setAccomodation("J'apporte ma tente (accès salle de bain prévu)")}>J'apporte ma tente (accès salle de bain prévu)</DropdownItem>
                        <DropdownItem className="item-invitation" onClick={() => setAccomodation('Je viens en camping-car que je garerai sur le lieu du mariage')}>Je viens en camping-car que je garerai sur le lieu du mariage</DropdownItem>
                        {user.status == 2 ?
                            null
                            :<DropdownItem className="item-invitation" onClick={() => setAccomodation("Je souhaite dormir en dortoir collectif (sur le lieu du mariage)")}>Je souhaite dormir en dortoir collectif (sur le lieu du mariage)</DropdownItem>
                        }
                        
                        <DropdownItem className="item-invitation" onClick={() => setAccomodation("Je réserve un hôtel / gite, à proximité du lieu du mariage")}>Je réserve un hôtel / gite, à proximité du lieu du mariage</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            }

            <p className="margin-5px">Brunch dimanche midi:* </p>
            <p className='error-modal'>{errorBrunch}</p>
            <Dropdown isOpen={dropdownOpenBrunch} toggle={toggleBrunch} className="margin-bottom-15px">
                <DropdownToggle caret className='dropdown-invitation width-100'>
                    {brunch ? 
                    brunch
                    : null }
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem className="item-invitation" onClick={() => setBrunch('Oui')}>Oui</DropdownItem>
                    <DropdownItem className="item-invitation" onClick={() => setBrunch('Non')}>Non</DropdownItem>
                    <DropdownItem className="item-invitation" onClick={() => setBrunch('Je ne sais pas')}>Je ne sais pas</DropdownItem>
                </DropdownMenu>
            </Dropdown>

            
                <p className="margin-5px">Tu aimes ? (choix multiple)</p>
                <div className="flex-wrap-center margin-bottom-15px">
                    <div className="display-flex margin-5px">
                        {biere ?
                            <Input type="checkbox" onClick={() => setBiere(!biere)} checked/>
                            :
                            <Input type="checkbox" onClick={() => setBiere(!biere)}/>
                        }
                        <p className="margin-2px">Biere</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {champagne ?
                            <Input type="checkbox" onClick={() => setChampagne(!champagne)} checked/>
                            :
                            <Input type="checkbox" onClick={() => setChampagne(!champagne)} />
                        }
                        <p className="margin-2px">Champagne</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {blanc ?
                            <Input type="checkbox" onClick={() => setBlanc(!blanc)} checked/>
                            :
                            <Input type="checkbox" onClick={() => setBlanc(!blanc)} />
                        }
                        <p className="margin-2px">Blanc</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {rose ?
                            <Input type="checkbox" onClick={() => setRose(!rose)} checked/>
                            :
                            <Input type="checkbox" onClick={() => setRose(!rose)} />}
                        <p className="margin-2px">Rosé</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {rouge ?
                        <Input type="checkbox" onClick={() => setRouge(!rouge)} checked/>
                        :
                        <Input type="checkbox" onClick={() => setRouge(!rouge)} />}
                        <p className="margin-2px">Rouge</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {spritz ? 
                        <Input type="checkbox" onClick={() => setSpritz(!spritz)} checked/>
                        : 
                        <Input type="checkbox" onClick={() => setSpritz(!spritz)} /> }
                        <p className="margin-2px">Spritz</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {ginTo ? 
                        <Input type="checkbox" onClick={() => setGinTo(!ginTo)} checked/>
                        :
                        <Input type="checkbox" onClick={() => setGinTo(!ginTo)} />}
                        <p className="margin-2px">Gin Tonic</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {rhum ? 
                        <Input type="checkbox" onClick={() => setRhum(!rhum)} checked/>
                        :
                        <Input type="checkbox" onClick={() => setRhum(!rhum)} />}
                        <p className="margin-2px">Rhum arrangé</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {soupeAngevine ? 
                        <Input type="checkbox" onClick={() => setSoupeAngevine(!soupeAngevine)} checked/>
                        :
                        <Input type="checkbox" onClick={() => setSoupeAngevine(!soupeAngevine)} />}
                        <p className="margin-2px">Soupe Angevine</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {jus ? 
                        <Input type="checkbox" onClick={() => setJus(!jus)} checked/>
                        :
                        <Input type="checkbox" onClick={() => setJus(!jus)} />}
                        <p className="margin-2px">Jus de fruits</p>
                    </div>
                    <div className="display-flex margin-5px">
                        {eau ? 
                        <Input type="checkbox" onClick={() => setEau(!eau)} checked/>
                        :
                        <Input type="checkbox" onClick={() => setEau(!eau)} />}
                        <p className="margin-2px">l'eau c'est bien aussi</p>
                    </div>
                </div>
            

           
                <p className="margin-5px">Et ta consommation d'alcool ?*</p>
                <p className='error-modal'>{errorAlcool}</p>
                <Dropdown isOpen={dropdownOpenAlcool} toggle={toggleAlcool} className="margin-bottom-15px">
                    <DropdownToggle caret className='dropdown-invitation width-100'>
                        {alcool ? 
                        alcool
                        : null }
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem className="item-invitation" onClick={() => setAlcool('Je ne bois pas')}>Je ne bois pas</DropdownItem>
                        <DropdownItem className="item-invitation" onClick={() => setAlcool('Je bois avec parcimonie')}>Je bois avec parcimonie</DropdownItem>
                        <DropdownItem className="item-invitation" onClick={() => setAlcool("C'est qui Parcimonie ?")}>C'est qui Parcimonie ?</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            

           
                <p className="margin-5px">Des idées de sons pour te déhancher sur le dancefloor ?</p>
                <Input onChange={(e) => setSong1(e.target.value)} value={song1} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                {countSongs > 1 ? 
                    <Input onChange={(e) => setSong2(e.target.value)} value={song2} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                :null}
                {countSongs > 2 ? 
                    <Input onChange={(e) => setSong3(e.target.value)} value={song3} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                :null}
                {countSongs > 3 ?
                    <Input onChange={(e) => setSong4(e.target.value)} value={song4} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                :null}
                {countSongs > 4 ?
                    <Input onChange={(e) => setSong5(e.target.value)} value={song5} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                :null}
                {countSongs > 5 ?
                    <Input onChange={(e) => setSong6(e.target.value)} value={song6} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                :null}
                {countSongs > 6 ? 
                    <Input onChange={(e) => setSong7(e.target.value)} value={song7} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                :null}
                {countSongs > 7 ?
                    <Input onChange={(e) => setSong8(e.target.value)} value={song8} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                :null}
                {countSongs > 8 ?
                    <Input onChange={(e) => setSong9(e.target.value)} value={song9} placeholder="Saisir le titre et si possible l'auteur" className="margin-b-3px"/>
                :null}
                {countSongs > 9 ?
                    <Input onChange={(e) => setSong10(e.target.value)} value={song10} placeholder="Saisir le titre et si possible l'auteur"/>
                :null}
                {countSongs < 10 ?
                <div className="plus-icon" onClick={() => setCountSongs(countSongs+1)}>
                    <FontAwesomeIcon icon={faPlusCircle}  />
                    <span className="margin-l-3px ">Ajoute un autre titre</span>
                </div>
                :null}
                
                <p className="margin-5px">Autre chose ?</p>
                <Input className="margin-bottom-15px" type="textarea" onChange={(e) => setComment(e.target.value)} value={comment} placeholder="restrictions alimentaires, demandes spéciales, mots doux..."/>

                <p className='margin-5px'>* Réponses exigées</p>
            

            <div className="center-content">
                <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => participation(true)}>Valider</Button>{' '}
                <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}}  onClick={() => participation(false)}>Annuler</Button>
            </div>
        </ModalBody>             
    ) 
    } else {
        return (
        <ModalBody className="background-modal">
            <p className="modal-title">Dommage {user.firstName}, tu vas nous manquer </p>
                {user.gender == 'female' ?
                    <p className="modal-subtitle">Es-tu sûre ?</p>
                    :
                    <p className="modal-subtitle">Es-tu sûr ?</p>
                }
                <p className="error text-center">{carpoolingMessage}</p>
            <div className="center-content">
                <Button className="modal-button bouton" style={{backgroundColor: '#F1A54C', borderColor: '#F1A54C'}} onClick={() => noParticipation(true)}>Oui</Button>{' '}
                <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}}  onClick={() => noParticipation(false)}>Annuler</Button>
            </div>
        </ModalBody>
        )
        
    }
    
}

function mapStateToProps(state){
    return {guest: state.guest}
}

export default connect(
    mapStateToProps,
    null
)(InvitationModal);
