import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLabel, VictoryChart, Border} from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useAppSelector } from '../../redux/hooks/hooks';
import { useAppDispatch } from '../../redux/store';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { filterBalanceAccount, getAccounts, getMovements, getExpense, getIncome, getExpensesSuccess } from '../../redux/slices/allMovementsSlice';

interface Props {}

const AllMovements: React.FC<Props> = () => {
 
  const dispatch = useAppDispatch()
  const account = useAppSelector(state=> state.allMovements.accounts)
  const incomes = useAppSelector(state => state.allMovements.incomes)
  const expenses = useAppSelector(state => state.allMovements.expenses)
  const idUser = useAppSelector((state) => state.user.user)
  const allMovements = useAppSelector((state) => state.allMovements.allMovements)

  const filter = useAppSelector((state) => state.allMovements.filtered)

  const balance = useAppSelector((state)=> state.allMovements.balance)
  console.log(filter,'FILTER');
  console.log(allMovements, 'ALLMOVEMENTS');
  
  console.log('============BALANCE=================');
  console.log(balance, 'Balance from redux');


  
  const ide = idUser.map((idUser) => idUser.payload.user.id)

  //const incexp: any[] = [...incomes, ...expenses]
  const show: any[] = filter; 
  console.log(account);
  
  //const filterIncome = incomes.filter((element: { amount: any; })=> element.amount)
  
  // type, amount

  // incomes.map((e, index) => incexp.push( {['key']: index, ['account']:e.account, ['amount']:e.amount }))
  //console.log("incexp en el pager",incexp)
  //onsole.log(account,'ACCOUNT');
  

  useEffect(()=>{
    dispatch(getAccounts(ide[0]))
    dispatch(getMovements(ide[0]))
    dispatch(getIncome(ide[0]))
    dispatch(getExpense(ide[0]))
  }, [])

  interface AccountData {
    label: string;
    value: string;
  }

  const data: AccountData[] = [];

  account.forEach((a: string) => {
    data.push({
      label: a,
      value: a,
    });
  });

  const colors = ["#5EFC8D","#8EF9F3","#53599A","#ECD444","#FFFFFF","#C42021","#F44708","#CA61C3","#FF958C","#ADFCF9"]

  const [value, setValue] = useState(null);

  const charGraficos = useAppSelector((state) => state.onBoarding.Onboarding);
  const change = charGraficos.change.map((item) => item.name);
  const chart = charGraficos.grafico.map((item) => item.name);

  return (
    <View style={styles.homeCard}>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <Text style={styles.title}>All</Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Dropdown<AccountData>
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                /* imageStyle={styles.imageStyle} */
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                valueField="value"
                labelField="label"
                placeholder="Filter by Account"
                searchPlaceholder="Search..."
                value={value}
                onChange={item => {
                  console.log('filterButton');
                  setValue(value) 
                  dispatch(filterBalanceAccount(item.value))
                }}
              />

            </View>
                    <View>
                      <Text style={styles.text}>${balance}</Text>
                      <VictoryPie
                      
                            style={{
                              labels: {
                                fill: '#FFFFFF'
                              }
                            }}
                            innerRadius={110}
                            colorScale={colors}
                            data={show?.map(e=>{
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
                  data={show}
                  renderItem={({item}) =>{
                    if(item.type){
                      return <Text style={styles.detail}> {item.type}:  {item.amount}</Text>
                    } else {
                      return <Text style={styles.detail}>{item.category}:  {item.amount}</Text>
                    }
                  }}
                />
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
    padding: 10,
    backgroundColor: Colors.DETAIL_COLOR,
    margin: 10,
    borderRadius: 10,
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
  },
  dropdown: {
    width: 200,
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 15,
  },
  
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: 'white'
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    backgroundColor: '#eaeaea',
    borderRadius: 15,
  },
  imageStyle: {
    width: 25,
    height: 25,
    borderRadius: 12,
  },
});

export default AllMovements;

