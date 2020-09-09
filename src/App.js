import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
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

const app = new Clarifai.App({apiKey:''});


class App extends Component {

  constructor(){
    super();
    this.state={input:'',
    ImageURL:'',
    box:{}
  }
  }  

  onInputChange=(event)=>{
   this.setState({input:event.target.value})
  }
  onButtonSubmit=()=>{
   this.setState({ImageURL:this.state.input});
    app.models.predict(
    Clarifai.FACE_DETECT_MODEL, 'https://samples.clarifai.com/metro-north.jpg')
    .then(response => {
     console.log(response);
   })
   .catch(err => {
     console.log(err);
   });
  }

  render(){
  return (
    <div className="App">
      <Particles params={ParticleOptions} className='particle'/>
     < Navigation />
     <Logo />
     <Rank/>
     <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
     <FaceRecognition ImageURL={this.state.ImageURL} />
    
    </div>
  );
}
}

export default App;
