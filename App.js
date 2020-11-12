import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View ,Image,Button} from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'lightgreen',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text>Loading....</Text>
  </View>
);

const App=()=> {
  const [image,setImage]=useState(null)

  const takePicture = async function(camera) {
    const options = { quality: 0.5, base64: true }
    const data = await camera.takePictureAsync(options)
    setImage(data.uri);
  }
    return (

      <View style={styles.container}>
          {image ? (
            <View>
              <Text style={styles.camText}>Here is your profile pic</Text>
          <Image source={{uri:image,width:'100%',height:'100%'}} style={styles.clicked}/>
          <Button
          title='Click new Image'
          onPress={()=>{
            setImage(null)
          }}
          ></Button>
          </View>
          )
          :
          (
            <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status}) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
          )
          }
        
      </View>
    );
  

  
}

export default App
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'blue',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  camText:{
    backgroundColor: '#3498DB',
    color:"#FFFFFF", 
    marginBottom:10,
    width:"100%",
    textAlign: 'center',
    
    fontSize:25
  },
  clicked:{
    width:300,
    height:300,
    borderRadius:150,

  }
});

