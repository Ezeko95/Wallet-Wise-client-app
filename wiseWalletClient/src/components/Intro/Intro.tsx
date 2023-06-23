import React, {useState, useRef} from 'react';
import { Text, View, StyleSheet, ImageBackground, FlatList, Image, ListRenderItem, Animated, Button} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import Paginattor from './Paginattor';
import ButtonNext from './ButtonNext';
import Login from '../Login/Login'


interface Slide {
    image: number;
}

const slide: Slide[] = [
    {
        image: require('./assets/introWelcome5.png')
    },
    {
        image: require('./assets/introAccount.png')
    },
    {
        image: require('./assets/introGraphic.png')
    },
    {
        image: require('./assets/introShared.png')
    },
    {
        image: require('./assets/introPremium.png')
    },
]


const Intro = () => {
    const navigation:(any) = useNavigation();
    
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
      }

      


    return (
        <ImageBackground style={styles.img} source={require('./assets/fondoIntro2.png')}>
            <View style={styles.container}>
                <FlatList  data={slide} renderItem={renderItem} keyExtractor={(_, index) => index.toString()} horizontal showsHorizontalScrollIndicator={false} pagingEnabled bounces={false} onScroll={Animated.event([{nativeEvent: { contentOffset: {x: scrollX} } }], {
                    useNativeDriver: false
                })}
                    scrollEventThrottle={32}
                    onViewableItemsChanged={viewableItemsChanged}
                    ref={slidesRef}
                />
            </View>
            <Paginattor data={slide} scrollX={scrollX}/>
            <ButtonNext viewableItemsChanged scrollTo={scrollTo} percentage={(currentIndex + 1) * (100 / slide.length)} />
        </ImageBackground>
    )
}

export default Intro;

const styles= StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slideImage: {
        justifyContent: 'center',
        alignItems: 'center',
        top: 50
      },
})