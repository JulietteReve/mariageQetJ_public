
import logo from './logo.svg';
import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {provider, Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

import guest from './reducers/guest.reducer'

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import InvitationScreen from './screens/InvitationScreen';
import PlaceScreen  from './screens/PlaceScreen';
import CarpoolingScreen from './screens/CarpoolingScreen';
import DdayScreen from './screens/DdayScreen';
import PicturesScreen from './screens/PicturesScreen';
import AdminScreen from './adminScreens/AdminScreen';
import ListScreen from './adminScreens/ListScreen';
import AccomodationScreen from './adminScreens/AccomodationScreen';
import GiftsScreen from './screens/GiftsScreen'

const store = createStore(combineReducers({guest}))

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Switch>
            {/* <Route component={LoginScreen} path="/" exact /> */}
            <Route component={HomeScreen} path="/bienvenue" exact />
            <Route component={InvitationScreen} path="/invitation" exact />
            <Route component={PlaceScreen} path="/lieu" exact />
            <Route component={CarpoolingScreen} path="/covoiturage" exact />
            <Route component={DdayScreen} path="/jourJ" exact />
            <Route component={PicturesScreen} path="/photos" exact />
            <Route component={AdminScreen} path="/admin" exact />
            <Route component={ListScreen} path="/liste" exact />
            <Route component={AccomodationScreen} path="/hebergements" exact />
            <Route component={GiftsScreen} path="/listedemariage" exact />
            <Route component={LoginScreen} path="/" />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
