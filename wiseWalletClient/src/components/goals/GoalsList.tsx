import React from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { base_URL } from '../../redux/utils';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../enums/Colors';
import GoalDetail from './GoalDetail';
import { setGoalId, getAllGoals } from '../../redux/slices/goalSlice';

export interface IGoal {
  name: string;
  description: string;
  total: number;
  save: number;
  picture: string;
  id: number;
  deletedGoal: boolean;
}
const GoalList: React.FC = () => {
  const dispatch = useAppDispatch();

  const idUser = useAppSelector(state => state.user.user);
  const ide = idUser.map(idUser => idUser.payload.user.id);
  const goals = useAppSelector(state => state.goal.allGoals);
  const navigation: any = useNavigation();

  console.log(goals);
  console.log(ide[ide.length - 1], 'ide');

  useEffect(() => {
    dispatch(getAllGoals(ide[ide.length - 1]));
  }, [dispatch]);

  const goalDelete = async (id: number) => {
    await axios.delete(`${base_URL}/goal/${id}`);
    dispatch(getAllGoals(ide[ide.length - 1]));
  };

  const showGoal = goals.filter(g => !g.deletedGoal);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          paddingBottom: 15,
          paddingVertical: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('MyDrawer')}>
          <Text style={styles.goBack}>{'<'}</Text>
        </TouchableOpacity>
        
        <View
          style={{
            marginStart: 30,
            flexDirection: 'row',
            width: '80%',
            alignContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 30,
              color: 'white',
              fontWeight: 'bold',
              left: 35
            }}>
            My
            <Text style={{ color: 'yellow' }}> Goals</Text>
          </Text>
        </View>
      </View>


            <View style={styles.allItems}>
            <TouchableOpacity
              style={styles.create}
              onPress={() => navigation.navigate('Goals')}>
              <Text style={{ color: '#A16AE2', fontSize: 30, fontWeight: 'bold' }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
      <ScrollView bounces={true}>
        {showGoal.length > 0 &&
          showGoal?.map((goal, index) => {
            return (
              <View key={index} style={{}}>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={() => {
                    dispatch(setGoalId(goal.id));
                    navigation.navigate('GoalDetail');
                  }}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>
                      {goal.name.charAt(0).toUpperCase() + goal.name.slice(1)}
                    </Text>
                    <TouchableOpacity
                      style={styles.buttonDelete}
                      onPress={() => goalDelete(goal.id)}>
                      <Text
                        style={{
                          color: 'yellow',
                          borderRadius: 5,
                          borderWidth: 2,
                          borderColor: 'yellow'
                        }}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{ uri: goal.picture }}
                    style={{ height: 120, width: 150, borderRadius: 15 }}
                  />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default GoalList;

const styles = StyleSheet.create({
  roomTitle:{
    alignSelf: "center",
    color: "white",
    marginStart: 20,
    fontSize: 30,
    height: 40,
    fontWeight: "bold"
  },
  touchable: {
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
    margin: 15,
    backgroundColor: '#3D2766',
    borderRadius: 15,
    borderColor: '#A16AE2',
    borderWidth: 1,
    padding: 12
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#A16AE2',
  },
  title: {
    color: 'white',
    fontSize: 15,
    fontWeight: '300',
    fontFamily: 'monospace',
    borderRadius: 5,
    transform: 'toUpperCase',
  },
  titleContainer: {
    width: '50%',
    heigth: '100%',
    flexDirection: 'column',
  },
  buttonDelete: {
    margin: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 50,
    marginTop: 60,
  },
  allItems: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: Colors.BACKGROUND_COLOR,
    flex: 1,
    height: '100%',
    width: '100%',
  },
  create: {
    backgroundColor: 'darkslateblue',
    borderRadius: 15,
    width: '95%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#A16AE2',
    borderWidth: 1,
    position: 'relative',
    margin: 5,
    marginBottom: 20,
  },
  goBack: {
    alignSelf: "flex-start",
    color: 'black',
    backgroundColor: 'yellow',
    borderRadius: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    width: 40,
    height: 40,
    borderColor: '#FFF7AE',
    borderWidth: 2,
    marginHorizontal:10,
  },
});
