import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  Text,
  Animated,
  Image,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ButtonNext from '../Intro/ButtonNext';
import Paginattor from '../Intro/Paginattor';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { useAppSelector } from '../../redux/store';

interface Slide {
  image: number;
}
const slide: Slide[] = [
  {
    image: require('./assets/premiumFondo.png'),
  },
  {
    image: require('./assets/PremiumFondo2.png'),
  },
];
const Premium = () => {
  const [premium , setPremium] = useState()
  const state = useAppSelector(state => state.user.user);
  console.log(state);
  const tp = state[state.length - 1];
  const results = tp.payload.user.id;

  const navigation: any = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<Slide> | null>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
    if (viewableItems[0].index === slide.length - 1) {
      navigation.navigate('Login');
    }
  }).current;

  /* const viewConfig = useRef({viewAreaCoveragePercentThresHold: 50}).current; */

  const renderItem: ListRenderItem<Slide> = ({ item }) => {
    return <Image source={item.image} style={styles.slideImage} />;
  };

  const scrollTo = () => {
    if (slidesRef.current && currentIndex < slide.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };
 
  useEffect(()=>{
    axios.put(`${base_URL}/user/${results}`);
    console.log('ESTE ES EL ID QUE PASO POR PARAMS', results);
},[])
  return (
    <ImageBackground
      style={styles.img}
      source={require('../Intro/assets/fondoIntro2.png')}>
      <View style={styles.container}>
        <FlatList
          data={slide}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          ref={slidesRef}
        />
      </View>
      <Paginattor data={slide} scrollX={scrollX} />
      <ButtonNext
        viewableItemsChanged
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / slide.length)}
      />
      <TouchableOpacity
        style={styles.btnSkip}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.skip}>Skip</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};
export default Premium;

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideImage: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  skip: {
    color: 'white',
    backgroundColor: '#8C52FF',
    fontSize: 16,
    textAlign: 'center',
  },
  btnSkip: {
    padding: 10,
    backgroundColor: '#8C52FF',
    borderRadius: 30,
    top: -90,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
