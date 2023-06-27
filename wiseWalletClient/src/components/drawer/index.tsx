import React from 'react';
import MyTabs from '../../tabs/Tabs';
import { ScrollView } from 'react-native';
import Drawer from './component/Drawer';
import AllMovements from '../home/AllMovements';
import Pager from '../home/Pager';
import FormPager from '../formIncome/Pager';

const MyDrawer = () => {
  return (
      <Drawer>
        <Pager/>
      </Drawer>
  );
};

export default MyDrawer;
