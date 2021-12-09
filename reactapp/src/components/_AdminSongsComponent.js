import React, {useState, useEffect} from 'react';
import '../App.css';

import {Table} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort} from '@fortawesome/free-solid-svg-icons'

function AdminSongsComponent(props) {

    const [songs, setSongs] = useState([]);
    const [orderSong, setOrderSong] = useState(false);
    const [orderName, setOrderName] = useState(false);
    const [uploadSong, setUploadSong] = useState(0);

    
    var clickOnTitle = (order, item) => {
        setUploadSong(1);
        var newArray = songs;
        if (item == 'song') {
            setOrderSong(!orderSong);
            if (order) {
                newArray.sort((a, b) => a.song.localeCompare(b.song))
            } else {
                newArray.sort((a, b) => b.song.localeCompare(a.song))
            } 
        } else if (item == 'name') {
            setOrderName(!orderName)
            if (order) {
                newArray.sort((a, b) => a.name.localeCompare(b.name))
            } else {
                newArray.sort((a, b) => b.name.localeCompare(a.name))
            } 
        }
        setSongs(newArray);
    }
  

    useEffect(() => {
        var participants = props.participantsArray;
        var songsArray = [];
        for (var i=0; i<participants.length; i++) {
            for (var y=0; y<participants[i].songs.length; y++) {
                songsArray.push({song: participants[i].songs[y], name: participants[i].firstName+' '+participants[i].lastName})
            }
        }
        setSongs(songsArray);
    }, [props.participantsArray]); 


    if (uploadSong == 0) {
        var songsTable = songs.map((element, i) => {
            return(
                <tr key={i}>
                    <td >{element.song}</td>
                    <td >{element.name}</td>
                </tr>
            )
        })
    } else {
        var songsTable = songs.map((element, i) => {
            return(
                <tr key={i}>
                    <td >{element.song}</td>
                    <td >{element.name}</td>
                </tr>
            )
        })
    }

    return (
        <Table striped style={{backgroundColor: 'white'}} className="cormorant">
            <thead>
                <tr>
                  <th style={{width: '70%'}} onClick={() => clickOnTitle(orderSong, 'song')} >Titre <FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                  <th style={{width: '30%'}} onClick={() => clickOnTitle(orderName, 'name')}>Suggéré par<FontAwesomeIcon icon={faSort} className="color-grey" /></th>
                </tr>
            </thead>
            <tbody>
                {songsTable}
            </tbody>
        </Table>
    )
}

export default AdminSongsComponent;