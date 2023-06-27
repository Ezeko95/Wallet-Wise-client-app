import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { VictoryPie, VictoryTheme, VictoryLabel, VictoryChart, VictoryBar } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useAppSelector } from '../../redux/hooks/hooks';
import { useAppDispatch } from '../../redux/store';
import { Dropdown } from 'react-native-element-dropdown';
import { filterBalanceAccount, getAccounts, getExpense, getIncome, getMovements } from '../../redux/slices/allMovementsSlice';
import { useNavigation } from '@react-navigation/native';
import { AppThunk } from '../../redux/store';
interface Props {}

const AllMovements: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.allMovements.accounts);
  const filter = useAppSelector((state) => state.allMovements.filtered);
  const balance = useAppSelector((state) => state.allMovements.balance);
  const idUser = useAppSelector((state) => state.user.user);
  
  
  const [value, setValue] = useState(null);

  const ide = idUser.map((idUser) => idUser.payload.user.id);

  useEffect(()=>{
    dispatch(getAccounts(ide[(ide.length)]))
    dispatch(getMovements(ide[(ide.length)]))
    dispatch(getIncome(ide[(ide.length)]))
    dispatch(getExpense(ide[(ide.length)]))
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

  const reload = () => {
    dispatch(getMovements(ide[0]));
    dispatch(getAccounts(ide[0]));
  };

  const colors = ["#5EFC8D", "#699492", "#5e6391", "#ECD444", "#FFFFFF", "#C42021", "#F44708", "#CA61C3", "#FF958C", "#ADFCF9"];

  const show: any[] = filter;

  const charGraficos = useAppSelector((state) => state.onBoarding.Onboarding);
  const change = charGraficos.change.map((item) => item.name);
  const chart = charGraficos.grafico.map((item) => item.name);
  const navigation:(any) = useNavigation()

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
              onChange={(item) => {
                setValue(value);
                dispatch(filterBalanceAccount(item.value));
              }}
            />
            <TouchableOpacity onPress={reload}>
              <Image style={{ width: 25, height: 25, top: 33, left: 20 }} source={require('./reload.png')} />
            </TouchableOpacity>
          </View>
          <View>
                <Text style={styles.text}>{change}{balance}</Text>
                <VictoryPie
                  style={{
                    labels: {
                      fill: '#ffffff'
                    }
                  }}
                  innerRadius={110}
                  colorScale={colors}
                  data={show?.map(e => {
                    if (e.type) {
                      return { x: e.type, y: e.amount }
                    } else {
                      return { x: e.category, y: e.amount }
                    }
                  })}
                />  
              </View>
          <View style={styles.flatContainer}>
          <FlatList
            nestedScrollEnabled
            data={show}
            renderItem={({ item }) => {
              if (item.type) {
                return <Text style={styles.detail}>{item.type}: {item.amount}</Text>
              } else {
                return <Text style={styles.detail}>{item.category}:  {item.amount}</Text>
              }
            }}
            />
            </View>
   
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  viewButons: {
    top: "80%",
    flexDirection: "row",
    justifyContent: "space-around",
    height: 200,
  },
  flatContainer:{
    backgroundColor: "#e8c5ff",
    borderRadius: 10,
    width: "97%"
  },
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
    width: 300,
    padding: 10,
    backgroundColor: Colors.DETAIL_COLOR,
    margin: 10,
    borderRadius: 10,
    color: '#ffffff',
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

function getAllAccounts(ide: number[]): any {
  throw new Error('Function not implemented.');
}

function dispatch(arg0: AppThunk) {
  throw new Error('Function not implemented.');
}

