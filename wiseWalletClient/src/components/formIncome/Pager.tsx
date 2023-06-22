import React, {useState} from 'react';
import { StyleSheet,Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SelectCountry } from 'react-native-element-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { postMovement, MovementData } from '../../redux/features/movementSlice';
import { ExpenseData, postExpense } from '../../redux/features/expenseSlice';
import { RootState, AppDispatch } from '../../redux/store';


interface Data {
  value: string;
  label: string;
  image: {
    uri: string;
  };
}

interface PaymentMethod {
  value: string;
  label: string;
  image: {
    uri: string;
  };
}

interface Expense {
  value: string;
  label: string;
  image: {
    uri: string;
  };
} 

const paymentMethodX: PaymentMethod[] = [
  {
    value: 'mercadopago',
    label: 'Mercado Pago',
    image: {
      uri: 'https://www.bsr.cl/wp-content/uploads/2018/12/Mercadopago.jpg',
    },
  },
  {
    value: 'brubank',
    label: 'Brubank',
    image: {
      uri: 'https://th.bing.com/th/id/OIP.JKHQkVt2TiFcTDh4DNNI_AAAAA?pid=ImgDet&rs=1',
    },
  },
  {
    value: 'cash',
    label: 'Cash',
    image: {
      uri: 'https://th.bing.com/th/id/R.46885d1334b48f81acf9a4e6b5fea757?rik=WUZNoNBF8HztrA&riu=http%3a%2f%2ffishaowiki.com%2fwp-content%2fuploads%2f2013%2f10%2ffishbucks.gif&ehk=jFVu8FmI9rISaCTEcIg7Oc6Cy2lIOwU%2bruIc%2bDIn3fc%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: 'uala',
    label: 'Uala',
    image: {
      uri: 'https://th.bing.com/th/id/OIP.raKhtV2oJ1WEJg8wFUFTJAHaHa?pid=ImgDet&rs=1',
    },
  },
  {
    value: 'santander',
    label: 'Santander Rio',
    image: {
      uri: 'https://yt3.ggpht.com/-ucfOhKHcl_w/AAAAAAAAAAI/AAAAAAAAAAA/mzypJuHb_go/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
    },
  },
]

const data: Data[] = [
  {
    value: 'mercadopago',
    label: 'Mercado Pago',
    image: {
      uri: 'https://www.bsr.cl/wp-content/uploads/2018/12/Mercadopago.jpg',
    },
  },
  {
    value: 'brubank',
    label: 'Brubank',
    image: {
      uri: 'https://th.bing.com/th/id/OIP.JKHQkVt2TiFcTDh4DNNI_AAAAA?pid=ImgDet&rs=1',
    },
  },
  {
    value: 'cash',
    label: 'Cash',
    image: {
      uri: 'https://th.bing.com/th/id/R.46885d1334b48f81acf9a4e6b5fea757?rik=WUZNoNBF8HztrA&riu=http%3a%2f%2ffishaowiki.com%2fwp-content%2fuploads%2f2013%2f10%2ffishbucks.gif&ehk=jFVu8FmI9rISaCTEcIg7Oc6Cy2lIOwU%2bruIc%2bDIn3fc%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: 'uala',
    label: 'Uala',
    image: {
      uri: 'https://th.bing.com/th/id/OIP.raKhtV2oJ1WEJg8wFUFTJAHaHa?pid=ImgDet&rs=1',
    },
  },
  {
    value: 'santander',
    label: 'Santander Rio',
    image: {
      uri: 'https://yt3.ggpht.com/-ucfOhKHcl_w/AAAAAAAAAAI/AAAAAAAAAAA/mzypJuHb_go/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
    },
  },
];

const dataExpense: Expense[] = [
  {
    value: 'farmacia',
    label: 'Farmacia',
    image: {
      uri: 'https://th.bing.com/th/id/R.50d05e3e5fc870a8bf7d0cfb0aef3432?rik=6ZLTHdVHYC8fiQ&riu=http%3a%2f%2fwww.camaradesalud.com.ar%2fsaludjujuy%2fimages%2fpdf%2flogofarmacias1.png&ehk=8K6h%2bzr47Y8eDp9NA5QFV6yOkh1Il4QpKaVfc6UJTLM%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: 'supermarket',
    label: 'Supermarket',
    image: {
      uri: 'https://static.vecteezy.com/system/resources/previews/002/300/734/non_2x/cartoon-illustration-of-supermarket-grocery-cart-with-healthy-organic-food-isolated-on-white-background-vector.jpg',
    },
  },
  {
    value: 'dinner',
    label: 'Dinner Out',
    image: {
      uri: 'https://w7.pngwing.com/pngs/971/466/png-transparent-breakfast-lunch-dinner-meal-breakfast-food-logo-eating.png',
    },
  },
  {
    value: 'electrodomestics',
    label: 'Electrodomestics',
    image: {
      uri: 'https://th.bing.com/th/id/R.c44bfd254f040c8dd8017466a3d099bc?rik=z2EqlLFUvlbBKA&riu=http%3a%2f%2fwww.electrodomesta.es%2fimagenes%2farticulos%2foriginal%2ftostador_princess_142372_707.jpg&ehk=b89Q5gK%2fKAYJ58Fr9A8CtfbKgW3nd9loslti5KOMaMY%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: 'technology',
    label: 'Technology',
    image: {
      uri: 'https://4.bp.blogspot.com/-WL97Q9Msy5k/V9A6HHy6svI/AAAAAAAALU4/3nu2kG1u-VowtwpxhzfRlHuQB4Dio55cQCLcB/s1600/uuuuu.jpg',
    },
  },
]; 

const Pager = () => {
  
  const dispatch = useDispatch<AppDispatch>()
  const { loading, error } = useSelector((state: RootState) => state.movement);
  const [type, setType] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePostMovement = () => {
    
    const data: MovementData = {
      type,
      account,
      amount: parseFloat(amount),
    };
    if(!type || !account || !amount) return Alert.alert('Incomplete fields, please complete them all')
    console.log(dispatch(postMovement(data)));
    Alert.alert('Successfully created income')
    setType('');
    setAccount('');
    setAmount('');
  };

  const handlePostExpense = () => {
    const data: ExpenseData = {
      amount: parseFloat(amount),
      description,
      category,
      paymentMethod,
      
    };
    console.log(dispatch(postExpense(data)));
    if(!amount || !category || !description || paymentMethod ) return Alert.alert('Incomplete fields, please complete them all')
    Alert.alert('Successfully created expense')
    setAmount('');
    setDescription('');
    setCategory('');
    setPaymentMethod('');
  };

  const onChange = (item: Data) => {
    setAccount(item.value);
    console.log(item.value);
  }
  const onChange1 = (item: Expense) => {
    setCategory(item.value);
    console.log(item.value);
  }
  const onChange2 = (item: PaymentMethod) => {
    setPaymentMethod(item.value);
    console.log(item.value);
  }

   const ref = React.useRef<PagerView>(null);

  return (
    
    <View style={styles.container}>
      
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.buttonsPages} onPress={() => ref.current?.setPage(0)}>
          <Text style={styles.textButton}>Add Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonsPages} onPress={() => ref.current?.setPage(1)}>
          <Text style={styles.textButton}>Add Expenses</Text>
        </TouchableOpacity>
      </View>
      <PagerView style={styles.pager} ref={ref} initialPage={0}>
        <View key="1">
        <View>
            <Text style={styles.textForm}>Add your Incomes here!</Text>
            <View style={styles.formContainer}>
              <SelectCountry<Data>
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={account}
                data={data}
                valueField="value"
                labelField="label"
                imageField="image"
                placeholder="Select Account"
                onChange={onChange as (item: Data) => void}
                />
              <TextInput
                value={type}
                onChangeText={setType}
                placeholder="Type"
                placeholderTextColor="gray"
                style={styles.input}
              />
              
              <TextInput
                value={amount} 
                onChangeText={setAmount} 
                keyboardType="numeric"
                placeholder="Amount"
                placeholderTextColor="gray"
                style={styles.input}
              />
              
              <TouchableOpacity onPress={handlePostMovement} disabled={loading}  style={styles.btn}>
                <Text style={styles.textBtn}>Add</Text>
              </TouchableOpacity>
            </View>
            
          </View>
          
        </View>
        
        <View key="2">
          <View>
             <Text style={styles.textForm}>Add your Expenses here!</Text>
             
             <View style={styles.formContainer}>

              <SelectCountry<Expense>
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={category}
                data={dataExpense}
                valueField="value"
                labelField="label"
                imageField="image"
                placeholder="Select Category"
                onChange={onChange1 as (item: Expense) => void}
                />
              
              <SelectCountry<PaymentMethod>
                style={styles.dropdown}
                selectedTextStyle={styles.selectedTextStyle}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imageStyle}
                iconStyle={styles.iconStyle}
                maxHeight={200}
                value={paymentMethod}
                data={paymentMethodX}
                valueField="value"
                labelField="label"
                imageField="image"
                placeholder="Select Account"
                onChange={onChange2 as (item: PaymentMethod) => void}
                />
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                placeholderTextColor="gray"
                style={styles.input}
              />
              <TextInput
                value={amount} 
                onChangeText={setAmount} 
                keyboardType="numeric"
                placeholder="Amount"
                placeholderTextColor="gray"
                style={styles.input}
              />
              <TouchableOpacity onPress={handlePostExpense} disabled={loading}  style={styles.btn}>
                <Text style={styles.textBtn}>Add</Text>
              </TouchableOpacity>
              
             </View>
             
          </View>
        </View>
      </PagerView>
    </View>
  );
}

export default Pager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pager: {
    flex: 1,
    alignSelf: 'stretch',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  buttonsPages: {
    backgroundColor: '#4D2FE4',
    borderRadius: 10,
    padding: 8,
    margin: 10,
    marginBottom: -20,
    top: 5,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
  },
  formContainer: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    top: 80,
  },
  text: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderColor: 'lightblue',
    margin: 10,
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'white',
    marginTop: 20,
  },
  textBtn: {
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: '#1A6FC2',
    padding: 10,
    width: 100,
    color: 'white',
    fontSize: 16,
  },
  btn: {
    marginTop: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textForm: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    top: 85,
  },
  dropdown: {
    margin: 16,
    height: 40,
    width: 200,
    backgroundColor: '#EEEEEE',
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 25,
    height: 25,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  
});
