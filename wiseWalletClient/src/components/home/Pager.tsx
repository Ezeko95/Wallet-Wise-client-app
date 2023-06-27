import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { Colors } from '../../enums/Colors';
import AllExpenses from './AllMovements';
import Incomes from './Income';
import Expenses from './Expenses';
import MyTabs from '../../tabs/Tabs';
import Drawer from '../drawer/component/Drawer';
//import { getAccounts, getAccounts, getExpense, getIncome } from '../../redux/slices/allMovementsSlice';
import { AppThunk } from '../../redux/store';

interface Props {}

const Pager: React.FC<Props> = () => {
  const ref = useRef<PagerView | null>(null);

  // useEffect(()=>{
  //   dispatch(getAccounts())
  //   dispatch(getMovements())
  //   dispatch(getIncome())
  //   dispatch(getExpense())
  // }, [])

  return (
    <Drawer>
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
        <MyTabs/>
    </Drawer>
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

function dispatch(arg0: AppThunk) {
  throw new Error('Function not implemented.');
}


function getMovements(): any {
  throw new Error('Function not implemented.');
}
