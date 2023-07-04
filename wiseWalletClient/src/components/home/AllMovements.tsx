import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { VictoryPie } from 'victory-native';
import { Colors } from '../../enums/Colors';
import { useAppSelector } from '../../redux/store';
import { useAppDispatch } from '../../redux/store';
import { Dropdown } from 'react-native-element-dropdown';
import {
  filterBalanceAccount,
  getAccounts,
  getMovements,
  getExpense,
  getIncome,
  orderByAmount,
  orderByAlpha,
  orderByDate,
} from '../../redux/slices/allMovementsSlice';
import LoaderChart from '../Loader/LoaderChart';

export interface AccountData {
  label: string;
  value: string;
  
}

interface Props {}

const AllMovements: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  let account = useAppSelector(state => state.allMovements.accounts);
  const idUser = useAppSelector(state => state.user.user);
  const allMovements = useAppSelector(state => state.allMovements.allMovements);
  const filter = useAppSelector(state => state.allMovements.filtered);
  const balance = useAppSelector(state => state.allMovements.balance);

  const [showLoader, setShowLoader] = useState(false);
  console.log('FILTER',filter);
  console.log("allmovements",allMovements)

  console.log('Balance from redux', balance);

  account = [...account, 'All accounts'];

  const ide = idUser.map(idUser => idUser.payload.user.id);
  const show: any[] = filter.filter(
    e => e.deletedExpense === false || e.deletedIncome === false,
  );
  const [openModal, setOpenModal] = useState(false);
  console.log('show', show);

  useEffect(() => {
    setShowLoader(true);
    dispatch(getAccounts(ide[ide.length - 1]));
    dispatch(getMovements(ide[ide.length - 1]));
    dispatch(getIncome(ide[ide.length - 1]));
    dispatch(getExpense(ide[ide.length - 1]));
  }, [dispatch]);

  
  useEffect(() => {
    if (showLoader) {
      setTimeout(() => {
        setShowLoader(false);
      }, 4000); // Duración de 3 segundos
    }
  }, [showLoader]);


  const data: AccountData[] = [];

  account.forEach((a: string) => {
    data.push({ label: a, value: a });
  });

  const valuesOrders: AccountData[] = [
    { label: 'ascendent', value: 'asc' },
    { label: 'descendent', value: 'desc' },
  ];

  const valueOrderAlpha: AccountData[] = [
    { label: 'A-Z', value: 'a' },
    { label: 'Z-A', value: 'z' },
  ];

  const colors = [
    '#5EFC8D',
    '#8EF9F3',
    '#53599A',
    '#ECD444',
    '#FFFFFF',
    '#C42021',
    '#F44708',
    '#CA61C3',
    '#FF958C',
    '#ADFCF9',
  ];

  const [value, setValue] = useState<string | null>(null);
  const [valueOrder, setValueOrder] = useState<string | null>(null);
  const [valueAlpha, setValueAlpha] = useState<string | null>(null);

  console.log(valueAlpha, 'valueAlpha');

  return (
    <View style={styles.homeCard}>
      <ScrollView bounces={true}>
        <StatusBar barStyle="light-content" />
        <View style={styles.homeCard}>
          <View>
            <Text style={styles.title}>All</Text>

            <TouchableOpacity
              style={{ marginBottom: -50 }}
              onPress={() => setOpenModal(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#1C1F3B',
                  borderRadius: 10,
                  padding: 10,
                  borderWidth: 2,
                  borderColor: 'white',
                }}>
                <Text style={{ color: 'white', fontSize: 20, margin: 5 }}>
                  Filter
                </Text>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require('./assets/filter1.png')}
                />
              </View>

              {openModal && (
                <View>
                  <Modal
                    visible={openModal}
                    animationType="slide"
                    transparent={true}>
                    <View
                      style={{
                        width: '100%',
                        height: '40%',
                        alignSelf: 'flex-end',
                        backgroundColor: '#1C1F3B',
                      }}>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'white',
                          fontSize: 30,
                          top: 20,
                          marginBottom: -20,
                        }}>
                        Filters
                      </Text>

                      <TouchableOpacity
                        style={{ alignSelf: 'flex-end' }}
                        onPress={() => {
                          setOpenModal(false);
                        }}>
                        <Image
                          style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            marginTop: 20,
                            marginRight: 20,
                          }}
                          source={require('./assets/x.png')}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                        }}>
                        <Dropdown<AccountData>
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={data}
                          maxHeight={150}
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
                        <Dropdown<AccountData>
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={valuesOrders}
                          maxHeight={150}
                          valueField="value"
                          labelField="label"
                          placeholder="By Amount"
                          value={valueOrder}
                          onChange={item => {
                            setValueOrder(item.value);
                            dispatch(orderByAmount(item.value));
                          }}
                        />

                        <Dropdown<AccountData>
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={valueOrderAlpha}
                          maxHeight={150}
                          valueField="value"
                          labelField="label"
                          placeholder="Order alpha"
                          searchPlaceholder="Search..."
                          value={valueAlpha}
                          onChange={item => {
                            setValueAlpha(item.value);
                            dispatch(orderByAlpha(item.value));
                          }}
                        />
                        <Dropdown<AccountData>
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={valuesOrders}
                          maxHeight={150}
                          valueField="value"
                          labelField="label"
                          placeholder="By Date"
                          searchPlaceholder="Search..."
                          value={value}
                          onChange={item => {
                            setValue(item.value);
                            dispatch(orderByDate(item.value));
                          }}
                        />
                      </View>
                    </View>
                  </Modal>
                </View>
              )}
            </TouchableOpacity>
          </View>



          <Text style={styles.text}>${balance}</Text>
          <VictoryPie
            style={{
              labels: {
                fill: '#FFFFFF',
              },
            }}
            innerRadius={110}
            colorScale={colors}
            data={show?.map(e => {
              if (e.type) {
                return { x: e.index, y: e.amount };
              } else {
                return { x: e.index, y: e.amount };
              }
            })}
          />

          <View>
            {show.map((mov, index) => {
              if (mov.type) {
                return (
                  <View key={index}>
                    <Text style={styles.detail}>
                      {index} - {mov.type}: {mov.amount}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View key={index}>
                    <Text style={styles.detail}>
                      {index} - {mov.category}: {mov.amount}
                    </Text>
                  </View>
                );
              }
            })}
          </View>
        </View>
      </ScrollView>
      {showLoader && <LoaderChart />}
    </View>
  );
};

const styles = StyleSheet.create({
  homeCard: {
    alignItems: 'center',
    /* backgroundColor: Colors.BACKGROUND_COLOR,
    height: '100%', */
  },
  title: {
    color: Colors.TITLE_COLOR,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 40,
    textAlign: 'center',
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
  text: {
    top: 230,
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
  dropdown: {
    width: 130,
    margin: 10,
    height: 40,
    backgroundColor: '#4D2FE4',
    padding: 10,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 40,
    borderColor: 'white',
    borderWidth: 1,
  },

  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: 'white',
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

const chucho = [
  {
    accountId: 1,
    amount: 2000,
    category: 'farmacia',
    createdAt: '2023-07-01T18:00:05.148Z',
    deletedExpense: false,
    description: 'Remedios para la abu',
    id: 2,
    paymentMethod: 'Mercado Pago',
    updatedAt: '2023-07-01T18:00:05.228Z',
  },
  {
    accountId: 1,
    amount: 2000,
    category: 'farmacia',
    createdAt: '2023-07-01T18:45:51.818Z',
    deletedExpense: false,
    description: 'Remedios para la abu',
    id: 3,
    paymentMethod: 'Mercado Pago',
    updatedAt: '2023-07-01T18:45:52.096Z',
  },
  {
    accountId: 1,
    amount: 800,
    category: 'farmacia',
    createdAt: '2023-07-01T19:59:47.264Z',
    deletedExpense: false,
    description: 'remedios',
    id: 8,
    paymentMethod: 'Mercado Pago',
    updatedAt: '2023-07-01T19:59:47.411Z',
  },
  {
    accountId: 1,
    amount: 1500,
    category: 'electrodomestics',
    createdAt: '2023-07-01T18:54:20.900Z',
    deletedExpense: false,
    description: 'Cocina',
    id: 5,
    paymentMethod: 'Mercado Pago',
    updatedAt: '2023-07-01T18:54:21.019Z',
  },
  {
    accountId: 1,
    amount: 500,
    category: 'electrodomestics',
    createdAt: '2023-07-01T20:00:06.548Z',
    deletedExpense: false,
    description: 'cocina',
    id: 9,
    paymentMethod: 'Mercado Pago',
    updatedAt: '2023-07-01T20:00:06.648Z',
  },
];
