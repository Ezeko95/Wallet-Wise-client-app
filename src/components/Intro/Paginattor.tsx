import React from 'react';
import { Text, View, StyleSheet, useWindowDimensions, Animated } from 'react-native';

interface PaginatorProps {
  data: any[];
  scrollX: Animated.Value;
}

const Paginattor: React.FC<PaginatorProps> = ({ data, scrollX }) => {
  const width = useWindowDimensions().width;
 

  return (
    <View style={styles.paginator}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return <Animated.View style={[styles.dot, { width: dotWidth, opacity }]} key={i.toString()} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  paginator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    top: -40,
   
    
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'lightgray',
  },
});

export default Paginattor;