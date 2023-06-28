import React from 'react';
import MyTabs from '../../tabs/Tabs';
import Drawer from './component/Drawer';
import AllMovements from '../home/AllMovements';
import Expenses from '../home/Expenses';

const MyDrawer = () => {

  return (
      <Drawer>
        <MyTabs/>
      </Drawer>
  );
};

export default MyDrawer;
