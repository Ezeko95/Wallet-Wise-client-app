import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLabel, VictoryChart, Border} from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useAppSelector } from '../../redux/hooks/hooks';
import { useAppDispatch } from '../../redux/store';
import { Dropdown } from 'react-native-element-dropdown';
import { filterBalanceAccount, getAccounts, getMovements, getExpense, getIncome, getExpensesSuccess } from '../../redux/slices/allMovementsSlice';

export interface AccountData {
  label: string;
  value: string;
}


interface Props {}

const AllMovements: React.FC<Props> = () => {
 
  const dispatch = useAppDispatch()
  const account = useAppSelector(state=> state.allMovements.accounts)
  const incomes = useAppSelector(state => state.allMovements.incomes)
  const expenses = useAppSelector(state => state.allMovements.expenses)
  const idUser = useAppSelector((state) => state.user.user)
  const allMovements = useAppSelector((state) => state.allMovements.allMovements)

 console.log(idUser, 'REDUX USUARIO');
 
  const filter = useAppSelector((state) => state.allMovements.filtered)

  const balance = useAppSelector((state)=> state.allMovements.balance)
  console.log(filter,'FILTER');
  console.log(allMovements, 'ALLMOVEMENTS');
  
  console.log('============BALANCE=================');
  console.log(balance, 'Balance from redux');


  
  const ide =  idUser.map((idUser) =>  idUser.payload.user.id)
  console.log(ide[0], 'ide ceroooooooooo');
  console.log(ide[ide.length-1], 'ide menos unooooooooooooooooooo');
  

  //const incexp: any[] = [...incomes, ...expenses]
  //const showExpense= expenses.filter(e=> !e.deletedExpense)
  //const showIncome= incomes.filter(e=> !e.deletedIncome)
  const showExp= filter.filter(e=> e.deletedExpense=== false)
  console.log(showExp);
  
  const showInc= filter.filter(e=> e.deletedIncome=== false)
  const show: any[] = [...showExp, ...showInc]; 
  console.log(show, 'SHOW');
  
  //const showFiltered= filter.map(e=> e.)

  
  //const filterIncome = incomes.filter((element: { amount: any; })=> element.amount)
  
  // type, amount

  // incomes.map((e, index) => incexp.push( {['key']: index, ['account']:e.account, ['amount']:e.amount }))
  //console.log("incexp en el pager",incexp)
  //onsole.log(account,'ACCOUNT');
  

  useEffect(()=>{
    dispatch(getAccounts(ide[ide.length-1]))
    dispatch(getMovements(ide[ide.length-1]))
    dispatch(getIncome(ide[ide.length-1]))
    dispatch(getExpense(ide[ide.length-1]))
    
  }, [dispatch])
  
 
 

  const data: AccountData[] = [
    
  ];

  
  

  account.forEach((a: string) => {
    data.push({
      label: a,
      value: a,
    });
  });

  const colors = ["#5EFC8D","#8EF9F3","#53599A","#ECD444","#FFFFFF","#C42021","#F44708","#CA61C3","#FF958C","#ADFCF9"]

  const [value, setValue] = useState<string | null>(null);

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
                  setValue(item.value);
                  
                  dispatch(filterBalanceAccount(item.value));
                  
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
                            data={show?.map((e) =>{
                      
                              if (e.type){
                              return {x: e.type, y: e.amount}
                              } else {
                                return {x: e.category, y: e.amount}
                              }
                            })}
                          />
                    </View>
                   
                 {
                  show.map(mov=>{
            
                      if(mov.type){
                        return(
                          <View key={mov.type}>
                          <Text style={styles.detail}>
                            {mov.type}: {mov.amount} 
                          </Text>
                        </View>
                        )  
                        
                      } else {
                        return(
                        <View>
                         <Text style={styles.detail}>{mov.category}:  {mov.amount}</Text>
                        </View>
                        )
                      }  
                  })
                }     
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
    borderRadius: 100,
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

