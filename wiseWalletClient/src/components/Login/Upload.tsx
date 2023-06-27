import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getUri } from '../../redux/slices/getUsers';

interface Props {
    handleInputChange: Function
}

const Upload: React.FC<Props> = ({handleInputChange}) => {
  const dispatch = useAppDispatch()

  const [photo, setPhoto] = useState(
    'https://res.cloudinary.com/dhgn9tq4j/image/upload/v1666764536/cld-sample-2.jpg',
  );
  const cloudinaryUpload = (photo: any) => {
    const data = new FormData();
    data.append('file', photo);
    data.append('upload_preset', 'hjuft8mh');
    data.append('cloud_name', 'dtw0xzty5');
    fetch('https://api.cloudinary.com/v1_1/dtw0xzty5/upload', {
      method: 'post',
      body: data,
    })
    .then(res => res.json())
      .then(resData => {
        const uploadImageUrl = resData.secure_url;
        setPhoto(uploadImageUrl)
        handleInputChange('picture',uploadImageUrl)
        
      })
      //.then(resp=> console.log(resp))
      .catch(err => {
        console.log('err.response.data', err);
        Alert.alert('An Error Occured While Uploading', err);
      });
  };

  const handleUploadImage = () => {
    launchImageLibrary({mediaType: 'photo', selectionLimit: 1}, response => {
      console.log('response', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const uri = response?.assets?.[0].uri;
        const type = response?.assets?.[0].type;
        const name = response?.assets?.[0].fileName;
        const source = {
          uri,
          type,
          name,
        };
        cloudinaryUpload(source);
      }
    });
  };

  
  // const getUrL = ()=>{
  //   dispatch(getUri(photo))
  // }
  // console.log(userUri,"CONSOLE.LOGURL")
  return (
    
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          onPress={()=>{
            handleUploadImage()
            //getUrL()
          }
        }
          style={styles.openGalaryStyle}>
          <Image source={{uri: photo}} style={StyleSheet.absoluteFill} />
        </TouchableOpacity>
        <Text style={styles.uploadHeaderStyle}>Upload Picture</Text>
      </View>
    
  );
};



const styles = StyleSheet.create({
  uploadHeaderStyle: {
    fontStyle: 'normal',
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 24,
    fontSize: 16,
  },
  openGalaryStyle: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 60,
    height: 150,
    width: 160,

  },
});
export default Upload;