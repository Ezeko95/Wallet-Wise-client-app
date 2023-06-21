import React from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
import { Colors } from '../../enums/Colors';

interface Props {}

const AllExpenses: React.FC<Props> = () => {

  const types = {
    tipoA: 'Carniceria',
    tipoB: 'Farmacia',
    tipoC: 'Impuestos'
  }

  const montos = {
    montoA: 30,
    montoB: 70,
    montoC: 10,
    montoD: 30,
    montoE: 65,
    montoF: 55,
  };
  const labelStyle = {
    fontFamily: 'Arial',
    fontSize: 15,
    fontWeight: 'bold',
    fill: 'white',
    
  };
  return (
    <View style={styles.homeCard}>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>All</Text>
          <VictoryPie
            theme={VictoryTheme.material}
            data={[
              { x: types.tipoA, y: montos.montoA },
              { x: types.tipoB, y: montos.montoB },
              { x: types.tipoC, y: montos.montoC },
  
            ]}
            colorScale={['#35a39e', '#6e3983', '#5c5c8b']}
            labels={({ datum }) => `${datum.x}`}
            labelComponent={
              <VictoryLabel style={labelStyle} />
            }
          />
          <Text style={styles.detail}>{types.tipoA}: {montos.montoA}</Text>
          <Text style={styles.detail}>{types.tipoB}: {montos.montoB}</Text>
          <Text style={styles.detail}>{types.tipoC}: {montos.montoC}</Text>
          
          
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  homeCard: {
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR,
    height: '100%',
  },

  title: {
    color: Colors.TITLE_COLOR,
    fontSize: 30,
  },

  chart: {
    marginTop: 40,
    height: 220,
    width: 220,
  },

  detail: {
    width: 250,
    borderColor: 'black',
    backgroundColor: Colors.DETAIL_COLOR,
    margin: 10,
    padding : 10,
    borderRadius: 5,
    color: '#ffffff',
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily:"Helvetica"
  },
});

export default AllExpenses;
