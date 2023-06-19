import React from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet } from 'react-native';
import { VictoryPie, VictoryTheme } from 'victory-native';
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
    borderRadius: 5,
    color: '#fff',
    fontSize: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default AllExpenses;
