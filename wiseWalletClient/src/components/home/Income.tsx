import React from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory-native';
import { Colors } from '../../enums/Colors';

interface Props {}

const Incomes: React.FC<Props> = () => {
  const montos = {
    montoA: 50,
    montoB: 20,
    montoC: 15,
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
    <View>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>Incomes</Text>
          <VictoryPie
            theme={VictoryTheme.material}
            data={[
              { x: 'A', y: montos.montoA },
              { x: 'B', y: montos.montoB },
              { x: 'C', y: montos.montoC },
              { x: 'D', y: montos.montoD },
              { x: 'E', y: montos.montoE },
              { x: 'F', y: montos.montoF },
            ]}
            colorScale={['#35a39e', '#6e3983', '#5c5c8b']}
            labels={({ datum }) => `${datum.x}`}
            labelComponent={
              <VictoryLabel style={labelStyle} />
            }
          />
          <Text style={styles.detail}>Ingreso a: {montos.montoA}</Text>
          <Text style={styles.detail}>Ingreso b: {montos.montoB}</Text>
          <Text style={styles.detail}>Ingreso c: {montos.montoC}</Text>
          <Text style={styles.detail}>Ingreso d: {montos.montoD}</Text>
          <Text style={styles.detail}>Ingreso e: {montos.montoE}</Text>
          <Text style={styles.detail}>Ingreso f: {montos.montoF}</Text>
          <Text style={styles.detail}>Ingreso a: {montos.montoA}</Text>
          <Text style={styles.detail}>Ingreso b: {montos.montoB}</Text>
          <Text style={styles.detail}>Ingreso c: {montos.montoC}</Text>
          <Text style={styles.detail}>Ingreso d: {montos.montoD}</Text>
          <Text style={styles.detail}>Ingreso e: {montos.montoE}</Text>
          <Text style={styles.detail}>Ingreso f: {montos.montoF}</Text>
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
    color: 'white',
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
    padding : 10,
    color: '#ffffff',
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily:"Helvetica"
  },
});

export default Incomes;
