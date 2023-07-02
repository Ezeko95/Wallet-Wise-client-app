import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Image, TextInput, ImageBackground, Modal } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLabel, VictoryChart, Border} from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useAppSelector } from '../../redux/hooks/hooks';
import { useAppDispatch } from '../../redux/store';
import { Dropdown } from 'react-native-element-dropdown';
import { filterBalanceAccount, getAccounts, getMovements, getExpense, getIncome } from '../../redux/slices/allMovementsSlice';
import { IExpenses } from '../../redux/interfaces/Interface';



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



  
  const ide =  idUser.map((idUser) =>  idUser.payload.user.id)
  console.log(ide[0], 'ide ceroooooooooo');
  console.log(ide[ide.length-1], 'ide menos unooooooooooooooooooo');
  


  const showExp= filter.filter(e=> e.deletedExpense=== false)
  console.log(showExp);
  
  const showInc= filter.filter(e=> e.deletedIncome=== false)
  const show: any[] = [...showExp, ...showInc]; 
  console.log(show, 'SHOW');
  const [openModal, setOpenModal] = useState(false)




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
        
        <View style={{flexDirection: 'row'}}>
        
        <Text style={styles.title}>Movements</Text>
        
        <TouchableOpacity onPress={() => setOpenModal(true)}>
        
        <Image style={{width: 40, height: 40, left: 60}} source={require('./assets/filter.png')}/>
        
        
          
          {
            openModal &&
            <View>
            <Modal visible={openModal} animationType='slide' transparent={true}>
            {/* <View style={{height: '100%', width: '70%', alignSelf: 'flex-end'}}> */}
            <ImageBackground style={{height: '100%', width: 300, alignSelf: 'flex-end'}} source={require('./assets/bgFilter.png')}>
            <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => { setOpenModal(false)}}>
            <Image style={{ width: 40, height: 40, top: 20, marginRight: 20 }} source={require('./assets/x.png')} />
            </TouchableOpacity>
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
              placeholder="By Account"
              searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
                
                dispatch(filterBalanceAccount(item.value));
                
              }}
              />
              </View>
              </ImageBackground>
              
              
              
              
              
              {/* </View> */}
              </Modal>
              </View>
            }
            </TouchableOpacity>
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
    marginLeft: 40
    
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
    width:150,
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    color: 'black',
    padding: 10,
    borderRadius: 15,
  },
  
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
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

