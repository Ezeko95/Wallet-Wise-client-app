import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, Touchable, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Colors } from '../../enums/Colors';
import AllExpenses from './AllMovements';
import Incomes from './Income';
import Expenses from './Expenses';
import { getMovements, getAccounts, getExpense, getIncome } from '../../redux/slices/allMovementsSlice';
import { useAppSelector, useAppDispatch } from '../../redux/store';

interface Props {}

const Pager: React.FC<Props> = () => {
  const dispatch = useAppDispatch()
  const idUser = useAppSelector((state) => state.user.user)
  const selector = useAppSelector((state) => state.user.user) // esto e user enterito
  const ide = idUser.map((idUser) => idUser.payload.user.id)
  const aidi = selector.map(selector => selector.payload.user.id)

  const reload = () => {
    dispatch(getMovements(ide[0]))
    dispatch(getAccounts(ide[0]))
    dispatch(getExpense(aidi[0]))
    dispatch(getIncome(aidi[0])) 
  } 

  const ref = useRef<PagerView | null>(null);


  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pager}
        ref={ref}
        initialPage={0}
        onPageScroll={e => console.log('Scroll')}
        onPageSelected={e => console.log('Selected')}
        onPageScrollStateChanged={e => console.log('Changed')}
      >

        <View key="1">
          
            <AllExpenses />
          
        </View>

        <View key="2">
          
            <Incomes />
         
        </View>

        <View key="3">
          
            <Expenses />
          
        </View>
        
      </PagerView>
    </View>
  );
};

export default Pager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.BACKGROUND_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },

  pager: {
    flex: 1,
    alignSelf: 'stretch',
  },

  text: {
    fontSize: 20,
    color: Colors.TITLE_COLOR,
    textAlign: 'center',
  },
});