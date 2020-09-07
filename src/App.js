import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js'
import 'tachyons' ;

const ParticleOptions={
  particles:{
    number:{
      value:30,
      density:{
        enable:true,
        value_area:800
      }
    },
    shadow:{
      enable:true,color:'#3ca901',blur:5
    }
  }
}

class App extends Component {
  render(){
  return (
    <div className="App">
      <Particles params={ParticleOptions} className='particle'/>
     < Navigation />
     <Logo />
     <ImageLinkForm/>
     <Rank/>
    </div>
  );
}}

export default App;