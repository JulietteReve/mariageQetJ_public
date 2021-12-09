import React, {useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Card, CardText, CardBody, CardTitle} from 'reactstrap';


const PlaceModalAccomodations = (props) => {

  const [accomodationsArray, setAccomodationsArray] = useState([]);
 
  useEffect( async () => {
    const data = await fetch(`/getAccomodations`);
    const result = await data.json();
    setAccomodationsArray(result);
  }, []);

  var cards = accomodationsArray.map((element, i) => {

    var number;
    if (element.phoneNumber) {
      number = element.phoneNumber
    } else {
      number = 'non renseigné'
    }

    var type;
    if (element.category == "Grand gite") {
      type = 'Maison entière ou bungalow'
    } else {
      type = "Chambres d'hôte ou chambres d'hôtel"
    }

    return (
      <Card className="margin-2100">
        <CardBody className="cormorant">
          <CardTitle tag="h5" className="bold">{element.name}</CardTitle>
          <div className="margin-l-25px">
            <CardText className="margin-b-5px"><span className="bold">Adresse:</span> {element.adresse}</CardText>
            <CardText className="margin-b-5px"><span className="bold">Numéro de téléphone:</span> {number}</CardText>
            <CardText className="margin-b-5px"><span className="bold">Type:</span> {type}</CardText>
            <CardText className="margin-b-5px"><a href={element.url} target="_blank" className="color-black">Accéder à leur site de réservation</a></CardText>
          </div>
        </CardBody>
      </Card>
    )
  })

  return (
    <div>
      <Modal isOpen={props.isOpen} toggle={props.handleClickParent} size="lg">
      <ModalHeader className="orange-background center-content-column">
        <h5 className="modal-title">Hébergements à proximité </h5>
        <h1>(liste non-exhaustive)</h1>
      </ModalHeader>
          <ModalBody className="orange-background">
            {cards}
          </ModalBody>
        <ModalFooter className="orange-background center-content-column">
            <Button className="modal-button bouton" style={{backgroundColor: '#F16A4C', borderColor: '#F16A4C'}} onClick={() => props.handleClickParent()}>Retour</Button>
          </ModalFooter>
      </Modal>
    </div>
  );
}

export default PlaceModalAccomodations ;