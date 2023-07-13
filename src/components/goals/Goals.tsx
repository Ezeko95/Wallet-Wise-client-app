import React, { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  Button,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { base_URL } from '../../redux/utils';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { Colors } from '../../enums/Colors';
import { getAllGoals } from '../../redux/slices/goalSlice';
import { useNavigation } from '@react-navigation/native';

const CloudinaryComponent: React.FC = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [title, onChangeTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [total, setTotal] = useState<string>('');
  const idUser = useAppSelector(state => state.user.user);
  const ide = idUser.map(idUser => idUser.payload.user.id);
  const error = useAppSelector(state => state.goal.error);
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  console.log(ide);

  const cloudinaryUpload = (photo: object) => {
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
        const uploadedImageUrl = resData.secure_url;
        setPhotos([uploadedImageUrl]);
      })
      .catch(err => {
        console.log('err.response.data', err);
        Alert.alert('An Error Occured While Uploading', err);
      });
  };

  const handleUploadImage = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 }, response => {
      // console.log('response', response);
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

  const oneImage = () => {
    if (photos.length > 0) return setPhotos([]);
    setTimeout(() => {
      handleUploadImage();
    }, 1500);
  };

  const onSubmit = async () => {
    const infoPhoto = {
      name: title,
      description,
      total: parseFloat(total),
      picture: photos[0],
    };
    await axios.post(`${base_URL}/goal/${ide[ide.length - 1]}`, infoPhoto);
    // if (error) {
    //   Alert.alert('Error while creating your goal');
    // } else {
    Alert.alert('Goal created');
    setPhotos([]);
    onChangeTitle('');
    setDescription('');
    setTotal('');

    dispatch(getAllGoals(ide[ide.length - 1]));
  };
  console.log(ide[ide.length - 1]);

  const clearImage = () => {
    setPhotos(['']);
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={() => navigation.navigate('GoalsList')}>
        <Text style={styles.goBack}>{'<'}</Text>
      </TouchableOpacity>
      <ScrollView bounces={true}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}>
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 40, color: 'white', fontWeight: 'bold' }}>
              New Goal
            </Text>
            <TextInput
              value={title}
              onChangeText={value => onChangeTitle(value)}
              style={styles.input}
              placeholder="name..."
            />
            <TextInput
              onChangeText={value => setDescription(value)}
              value={description}
              style={styles.input}
              placeholder="description..."
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={value => setTotal(value)}
              value={total}
              style={styles.input}
              placeholder="total..."
            />
            <View style={styles.buttons}>
              {photos.length < 1 && (
                <TouchableOpacity
                  disabled={photos.length > 0}
                  style={styles.upload}
                  onPress={handleUploadImage}>
                  <Text style={{
                      color: 'yellow',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>Upload Image</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          {photos.length > 0 &&
            photos.map((image, index) => {
              return (
                <View key={index} style={styles.imageContainer}>
                  {/* setTitle={setTitle} value={title} */}

                  {photos.length > 0 && (
                    <TouchableOpacity
                      style={styles.closeBtn}
                      onPress={() => setPhotos([])}>
                      <Text style={styles.text}> X </Text>
                    </TouchableOpacity>
                  )}

                  <Image
                    source={{ uri: image }}
                    style={styles.openGalaryStyle}
                  />

                  {photos.length > 0 && (
                    <TouchableOpacity
                      style={styles.closeBtn}
                      onPress={handleUploadImage}>
                       <Image
                        source={require('../home/assets/edit.png')}
                        style={{ width: 30, height: 34 }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
        </View>
      </ScrollView>

      <View style={styles.buttons}>
        <TouchableOpacity
          disabled={!photos.length || !description || !title || !total}
          style={styles.submit}
          onPress={() => onSubmit()}>
          <Text style={{ color: 'yellow', fontWeight: 'bold', fontSize: 18 }}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    backgroundColor: /* 'darkslateblue' */'#3D2766',
  },
  openGalaryStyle: {
    margin: 20,
    padding: 10,
    borderRadius: 10,
    width: 150,
    height: 150,
    alignSelf: 'center',
    alignContent: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    margin: 20,
    borderRadius: 10,
    width: 185,
    height: 45,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    top: 50,
  },
  text: {
    backgroundColor:  '#8757FF',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    borderRadius: 5,
  },
  uploadImage: {
    width: 170,
    color: 'white',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    padding: 4,
    margin: 25,
    backgroundColor: 'blue',
  },
  submit: {
    backgroundColor: '#513273',
    color: 'yellow',
    borderRadius: 5,
    width: 100,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: .1,
    position: 'absolute'
  },

  upload: {
    backgroundColor: '#513273',
    color: 'white',
    borderRadius: 10,
    width: 190,
    padding: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10,
    marginTop: 40,
    height: 45,
  },
  buttons: {
    flex: 1,
    flexDirect5on: 'row',
    padding: 2,
    margin: 30,
    justifyContent: 'flex-end',
  },

  inputContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  closeBtn: {
    height: 28,
    width: 27,
    borderRadius: 10,
  },

  imageContainer: {
    flexDirection: 'row',
    margin: 30,
    alignContent: 'center',
    justifyContent: 'center',
  },

  goBack: {
    color: 'black',
    backgroundColor: 'yellow',
    borderRadius: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    width: 40,
    height: 40,
    borderColor: '#FFF7AE',
    borderWidth: 2,
    right: 50,
    left: -170,
    marginTop: 25,
  },
  
});

export default CloudinaryComponent;
