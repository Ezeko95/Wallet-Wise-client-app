import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  Button,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Circle, CircleProps } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ButtonNext = ({ percentage, scrollTo }: any) => {
  const navigation: any = useNavigation();
  const [storage, setStorage] = useState(false);
  const size = 128;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef<Circle | null>(null);

  const animation = (toValue: number) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  const local = async () => {
    try {
      const accesTokken = await AsyncStorage.getItem('accessToken');
      if (accesTokken) {
        setStorage(true);
        navigation.navigate('Slider');
        console.log(accesTokken);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage, local()]);

  useEffect(() => {
    progressAnimation.addListener(value => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;

      if (progressRef?.current) {
        const props: CircleProps = {
          strokeDashoffset,
        };
        progressRef.current.setNativeProps(props);
      }
    });
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={scrollTo}
        style={styles.button}
        activeOpacity={0.6}>
        <Image source={require('./assets/next3.png')} />
      </TouchableOpacity>
    </View>
    
  );
};

export default ButtonNext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  button: {
    position: 'absolute',
    backgroundColor: '#8C52FF',
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 20,
    top: -60,
  },
});
