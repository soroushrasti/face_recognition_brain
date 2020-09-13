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
      value:50,
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

const app = new Clarifai.App({apiKey:'b48024407ad04798a8eb1429fcc41f5b'});


class App extends Component {

  constructor(){
    super();
    this.state={input:'',
    ImageURL:'',
    box:{}
  }
  }  

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image=document.getElementById('inputImage');
    const width=Number(image.width);
    const height=Number(image.height);
    return{
      leftcol:clarifaiFace.left_col*width,
      toprow:clarifaiFace.top_row*height,
      rightcol:width-(clarifaiFace.left_col*width),
      bottomcol:height-(clarifaiFace.top_row_col*height),
    }
  }

  displayFaceBox=(box)=>{
    this.setState({box:box})
  }

  onInputChange=(event)=>{
   this.setState({input:event.target.value})
  }
  onButtonSubmit=()=>{
   this.setState({ImageURL:this.state.input});
    app.models.predict(
             Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
     this.displayFaceBox(this.calculateFaceLocation(response))
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
     <FaceRecognition box={this.box} ImageURL={this.state.ImageURL} />
    
    </div>
  );
}
}

export default App;
