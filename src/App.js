import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js'
import 'tachyons' ;
import Clarifai from 'clarifai'

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

const app=new Clarifai.App({apikey:'b48024407ad04798a8eb1429fcc41f5b'})

class App extends Component {

  constructor(){
    super();
    this.state={input:'',
    ImageURL:'',
    box:{}
  }
  }  

  onInputChange=(event)=>{

  }
  onButtonSubmit=()=>{

  }

  render(){
  return (
    <div className="App">
      <Particles params={ParticleOptions} className='particle'/>
     < Navigation />
     <Logo />
     <Rank/>
     <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
    
    </div>
  );
}}

export default App;
