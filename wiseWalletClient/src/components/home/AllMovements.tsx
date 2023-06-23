
import React from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLabel} from 'victory-native';
import Svg,{ Circle } from 'react-native-svg';
import { Colors } from '../../enums/Colors';
import { useAppSelector } from '../../redux/hooks/hooks';

interface Props {}

const AllMovements: React.FC<Props> = () => {

  const incomes = useAppSelector(state => state.allMovements.incomes)
  const expenses = useAppSelector(state => state.allMovements.expenses)
  
  const incexp: any[] = [...incomes, ...expenses]

  const filterIncome = incomes.filter((element: { amount: any; })=> element.amount)
  
  // type, amount

  // incomes.map((e, index) => incexp.push( {['key']: index, ['account']:e.account, ['amount']:e.amount }))
  //console.log("incexp en el pager",incexp)
  const types = {
    tipoA: 'Carniceria',
  }

  const montos = {
    montoA: 30,
  };

  return (
    <View style={styles.homeCard}>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
          <View style={styles.homeCard}>
            <Text style={styles.title}>All</Text>
                    <View>
                      <Text style={styles.text}>$15634</Text>
                      <VictoryPie
                            padAngle={({ datum }) => datum.y}
                            innerRadius={100}
                            theme={VictoryTheme.material}
                            data={incexp.map(e=>{
                              if (e.type){
                              return {x: e.type, y: e.amount}
                              } else {
                                return {x: e.category, y: e.amount}
                              }
                            })}
                          />
                    </View>
                          
                    
      
                <FlatList
                nestedScrollEnabled
                  data={incexp}
                  renderItem={({item}) =>{
                    if(item.type){
                      return <Text style={styles.detail}>{item.type}:  {item.amount}</Text>
                    } else {
                      return <Text style={styles.detail}>{item.category}:  {item.amount}</Text>
                    }
                  }}
                />

              {/* //<Text style={styles.detail}>{incexp}</Text> */}
          
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
  text:{
    top: 230,
    color: 'white',
    fontSize: 40,
    textAlign: 'center'
  }
});

export default AllMovements;
