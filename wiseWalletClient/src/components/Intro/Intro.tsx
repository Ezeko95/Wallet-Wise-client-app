import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
  ListRenderItem,
  Animated,
  Button,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Paginattor from './Paginattor';
import ButtonNext from './ButtonNext';
import Login from '../Login/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoaderChart from '../Loader/LoaderChart';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getAccounts } from '../../redux/slices/allMovementsSlice';

interface Slide {
  image: number;
}

const slide: Slide[] = [
  {
    image: require('./assets/introWelcome5.png'),
  },
  {
    image: require('./assets/introAccount.png'),
  },
  {
    image: require('./assets/introGraphic.png'),
  },
  {
    image: require('./assets/introShared.png'),
  },
  {
    image: require('./assets/introPremium.png'),
  },
];

const Intro = () => {
  const navigation: any = useNavigation();
  const dispatch= useAppDispatch()
  const [showLoader, setShowLoader] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList<Slide> | null>(null);
  const accounts = useAppSelector(state=> state.allMovements.accounts)
  const [account, setAccount] = useState<boolean | null>(false);
  const idUser = useAppSelector(state => state.user.user);
  const ide = idUser.map(idUser => idUser.payload.user.id);

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


  const [accesToken, setAccessToken] = useState<boolean | null>(false);

  useEffect(() => {
    //dispatch(getAccounts(ide[ide.length-1]))
    const fetchAccesToken = async () => {
      setShowLoader(true);
      try {
        const token = await AsyncStorage.getItem('accessToken');
        

        if (token) {
          setAccessToken(true);
        }
        
      } catch (error) {
        console.log(error);
      }
    };
    fetchAccesToken();
    const fetchAccounts= async ()=>{
      const accountToken = await AsyncStorage.getItem('account')
      if (accesToken && accountToken ==='true') {
        console.log(accountToken)
        return navigation.navigate('MyDrawer');
      }
      if (accesToken && accountToken === 'false') { 
        console.log(accountToken)
        return navigation.navigate("Slider")
      }
    }
    fetchAccounts()

  }, [accesToken]);

  useEffect(() => {
    if (showLoader) {
      setTimeout(() => {
        setShowLoader(false);
      }, 4000);
    }
  }, [showLoader]);

  return (
    <>
      <ImageBackground
        style={styles.img}
        source={require('./assets/fondoIntro2.png')}>
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
        {showLoader && <LoaderChart />}
      </ImageBackground>
    </>
  );
};

export default Intro;

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
