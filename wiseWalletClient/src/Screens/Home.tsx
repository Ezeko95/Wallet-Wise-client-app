import { View, Text, StyleSheet, ScrollView } from "react-native";
import { VictoryPie, VictoryTheme } from "victory-native";

// const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const montos = {
    montoA: 40,
    montoB: 70,
    montoC: 20,
    montoD: 30,
    montoE: 25,
    montoF: 55,
  };

    return (
        <ScrollView
            bounces={true}
        >

            <View style={styles.homeCard}>
                <Text style={styles.title} >Wise Wallet</Text>
                <VictoryPie 
                    theme={VictoryTheme.material}
                    data={[
                        {x: 'A', y: montos.montoA},
                        {x: 'A', y: montos.montoB},
                        {x: 'A', y: montos.montoC},
                        {x: 'A', y: montos.montoD},
                        {x: 'A', y: montos.montoE},
                        {x: 'A', y: montos.montoF},
                        {x: 'A', y: montos.montoA},
                        {x: 'A', y: montos.montoB},
                        {x: 'A', y: montos.montoC},
                        {x: 'A', y: montos.montoD},
  
                    ]}
                />
                <Text style={styles.detail}>Gasto a: {montos.montoA}</Text>
                <Text style={styles.detail}>Gasto b: {montos.montoB}</Text>
                <Text style={styles.detail}>Gasto c: {montos.montoC}</Text>
                <Text style={styles.detail}>Gasto d: {montos.montoD}</Text>
                <Text style={styles.detail}>Gasto e: {montos.montoE}</Text>
                <Text style={styles.detail}>Gasto f: {montos.montoF}</Text>
                <Text style={styles.detail}>Gasto a: {montos.montoA}</Text>
                <Text style={styles.detail}>Gasto b: {montos.montoB}</Text>
                <Text style={styles.detail}>Gasto c: {montos.montoC}</Text>
                <Text style={styles.detail}>Gasto d: {montos.montoD}</Text>
                <Text style={styles.detail}>Gasto e: {montos.montoE}</Text>
                <Text style={styles.detail}>Gasto f: {montos.montoF}</Text>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
  homeCard: {
    alignItems: 'center',
    backgroundColor: '#171738',
  },

  title: {
    color: '#a0a0a0',
    fontSize: 30,
  },

  chart: {
    marginTop: 40,
    height: 250,
    width: 250,
  },

  detail: {
    width: 250,
    borderColor: 'black',
    backgroundColor: '#7180b9',
    margin: 10,
    borderRadius: 15,
    color: '#fff',
    fontSize: 25,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default HomeScreen;
