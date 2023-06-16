
import { useRef } from 'react';
import { StyleSheet,ScrollView, Text, View, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import Dropdown from './Dropdown';
import DropdownExpense from './DropdownExpense';
import PagerView from 'react-native-pager-view';

/* amounth: number,
    description: string,
    category: string,
    paymentMethod: string, */

export default function App() {
  const ref = useRef()
  return (
    
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        
          <TouchableOpacity  style={styles.buttonsPages} title="Add Income" onPress={() => ref.current?.setPage(0)}>
            <Text style={styles.textButton}>Add Income</Text>
          </TouchableOpacity>
          <TouchableOpacity  style={styles.buttonsPages} title="Expenses" onPress={() => ref.current?.setPage(1)}>
            <Text style={styles.textButton}>Add Expenses</Text>
          </TouchableOpacity>
      </View>

      
      
      <PagerView 
        style={styles.pager} 
        ref={ref}
        initialPage={0}
        onPageScroll={(e) => console.log(e)}
        onPageSelected={(e) => console.log(e)}
        onPageScrollStateChanged={(e) => console.log(e)}
      >
        <View key="1">
        <Text style={styles.textForm}>Add your Incomes here!</Text>
            
            <View style={styles.formContainer}>
                <Text style={styles.text}>Add Income</Text>
            <Dropdown/>

            <TextInput placeholder='Type' placeholderTextColor='gray' style={styles.input}/>
            <TextInput placeholder='Amount' placeholderTextColor='gray' style={styles.input}/>

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.textBtn}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
        
        <View key="2">
          <Text style={styles.textForm}>Add your expenses here!</Text>
          
            <View style={styles.formContainer}>
                <Text style={styles.text}>Add Expense</Text>
            <Dropdown/>
            <DropdownExpense />

            <TextInput placeholder='Type' placeholderTextColor='gray' style={styles.input}/>
            <TextInput placeholder='Description' placeholderTextColor='gray' style={styles.input}/>
            <TextInput placeholder='Amount' placeholderTextColor='gray' style={styles.input}/>

                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.textBtn}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
  
      </PagerView>
      <StatusBar style={styles.auto} />
    </View>
  

  );
}

const styles = StyleSheet.create({
    img:{
      width: 100,
      height: 100,
    },
    container: {
      flex: 1,
      width: '90%',
      backgroundColor: '#202254',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pager: {
      flex: 1,
      alignSelf: "stretch"
    },
  
  formContainer:{
      backgroundColor: '#050A30',
      padding: 20,
      borderRadius: 15,
      alignItems: 'center',
      top: 80,
  },
  text:{
      fontSize: 20,
      color:'white',
      textAlign: 'center',
      
  },
  input:{
      height: 40,
      width: 200,
      borderWidth: 1,
      borderColor: 'white',
      margin: 10,
      padding: 10,
      borderRadius: 15,
      backgroundColor: '#202254',
      marginTop: 20,
  },
  textBtn:{
      textAlign: 'center',
      borderRadius: 15,
      backgroundColor: '#1A6FC2',
      padding: 10,
      width: 100,
      color: 'white',
      fontSize:16,
  },
  btn:{
      marginTop: 30,
      borderRadius:20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  dropdown:{
      borderRadius: 20,
      backgroundColor: 'red'
  },
  btnContainer:{
    flexDirection: 'row',
  },
  buttonsPages:{
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 8,
      margin: 10,
  },
  textButton:{
    color: 'black',
    textAlign: 'center',
  },
  textForm:{
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    top: 50
},

});