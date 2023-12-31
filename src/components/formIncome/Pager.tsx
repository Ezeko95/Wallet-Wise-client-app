import React, {useState, useEffect} from 'react';
import { StyleSheet,Text, TextInput, View, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SelectCountry } from 'react-native-element-dropdown';
import { postMovement, MovementData } from '../../redux/slices/movementSlice';
import { ExpenseData, postExpense } from '../../redux/slices/expenseSlice';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { gettingUsers } from '../../redux/slices/getUsers';
import { getMovements, getAccounts, getExpense, getIncome } from '../../redux/slices/allMovementsSlice';
import { useNavigation } from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';
import LoaderSuccess from '../Loader/LoaderSuccess';
import Drawer from '../drawer/component/Drawer';

export interface AccountData {
  label: string;
  value: string;
  
}

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
    value: 'Mercadopago',
    label: 'Mercado Pago',
    image: {
      uri: 'https://www.bsr.cl/wp-content/uploads/2018/12/Mercadopago.jpg',
    },
  },
  {
    value: 'Brubank',
    label: 'Brubank',
    image: {
      uri: 'https://th.bing.com/th/id/OIP.JKHQkVt2TiFcTDh4DNNI_AAAAA?pid=ImgDet&rs=1',
    },
  },
  {
    value: 'Cash',
    label: 'Cash',
    image: {
      uri: 'https://th.bing.com/th/id/R.46885d1334b48f81acf9a4e6b5fea757?rik=WUZNoNBF8HztrA&riu=http%3a%2f%2ffishaowiki.com%2fwp-content%2fuploads%2f2013%2f10%2ffishbucks.gif&ehk=jFVu8FmI9rISaCTEcIg7Oc6Cy2lIOwU%2bruIc%2bDIn3fc%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: 'Uala',
    label: 'Uala',
    image: {
      uri: 'https://th.bing.com/th/id/OIP.raKhtV2oJ1WEJg8wFUFTJAHaHa?pid=ImgDet&rs=1',
    },
  },
  {
    value: 'Santander',
    label: 'Santander Rio',
    image: {
      uri: 'https://yt3.ggpht.com/-ucfOhKHcl_w/AAAAAAAAAAI/AAAAAAAAAAA/mzypJuHb_go/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
    },
  },
];

const dataExpense: Expense[] = [
  {
    value: 'Pharmacy',
    label: 'Pharmacy',
    image: {
      uri: 'https://th.bing.com/th/id/R.50d05e3e5fc870a8bf7d0cfb0aef3432?rik=6ZLTHdVHYC8fiQ&riu=http%3a%2f%2fwww.camaradesalud.com.ar%2fsaludjujuy%2fimages%2fpdf%2flogofarmacias1.png&ehk=8K6h%2bzr47Y8eDp9NA5QFV6yOkh1Il4QpKaVfc6UJTLM%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: 'Supermarket',
    label: 'Supermarket',
    image: {
      uri: 'https://static.vecteezy.com/system/resources/previews/002/300/734/non_2x/cartoon-illustration-of-supermarket-grocery-cart-with-healthy-organic-food-isolated-on-white-background-vector.jpg',
    },
  },
  {
    value: 'Dinner',
    label: 'Dinner Out',
    image: {
      uri: 'https://w7.pngwing.com/pngs/971/466/png-transparent-breakfast-lunch-dinner-meal-breakfast-food-logo-eating.png',
    },
  },
  {
    value: 'Electrodomestics',
    label: 'Electrodomestics',
    image: {
      uri: 'https://th.bing.com/th/id/R.c44bfd254f040c8dd8017466a3d099bc?rik=z2EqlLFUvlbBKA&riu=http%3a%2f%2fwww.electrodomesta.es%2fimagenes%2farticulos%2foriginal%2ftostador_princess_142372_707.jpg&ehk=b89Q5gK%2fKAYJ58Fr9A8CtfbKgW3nd9loslti5KOMaMY%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: 'Technology',
    label: 'Technology',
    image: {
      uri: 'https://4.bp.blogspot.com/-WL97Q9Msy5k/V9A6HHy6svI/AAAAAAAALU4/3nu2kG1u-VowtwpxhzfRlHuQB4Dio55cQCLcB/s1600/uuuuu.jpg',
    },
  },
]; 

interface IncomeForm {
  account: string;
  type: string;
  amount: number;
  accountError?: string;
  typeError?: string;
  amountError?: string;
  amountError2?: string;
}

interface ExpenseForm {
  account: string;
  category: string;
  description: string,
  amount: number;
  accountError?: string;
  descriptionError?: string;
  categoryError?: string;
  amountError?: string;
  amountError2?: string;
}
const Pager = () => {
  
  const [showLoader, setShowLoader] = useState(false);

  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((state) => state.movement);
  const [type, setType] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigation:(any) = useNavigation();
  const selector = useAppSelector((state) => state.user.user) // esto e user enterito
  const aidi = selector.map(selector => selector.payload.user.id)
  const accounts = useAppSelector(state => state.allMovements.accounts);

  const [errorForm, setErrorForm] = useState<IncomeForm>({
    account: '',
    type: '',
    amount: 0,
  });

  const [errorExpense, setErrorExpense] = useState<ExpenseForm>({
    account: '',
    description: '',
    category: '',
    amount: 0,
  });
  
  const handlePostMovement = () => {
    setShowLoader(true);

    dispatch(getAccounts(aidi[aidi.length -1]))
    
    const data: MovementData = {
      type,
      account,
      amount: parseFloat(amount),
    };

    let accountError = '';
    if (!account) {
      accountError = '* Please select an account';
    }
    
    let typeError = '';
    if (!type) {
      typeError = '* Please enter a description';
    }
    
    let amountError = '';
    if (!/^\d+$/.test(amount)) {
      amountError = '* Only numbers are allowed';
    }
    
    let amountError2 = '';
    if (!amount) {
      amountError2 = '* Please enter an amount';
    }
    
    setErrorForm({
      ...errorForm,
      accountError: accountError,
      typeError: typeError,
      amountError: amountError,
      amountError2: amountError2
    });

     const accountExists = accounts.includes(account);


    if (!accountExists) {
      setShowLoader(false);
      return Alert.alert('The selected account does not existe in your profile');
     }

    if(account.length !== account.length){
      return Alert.alert('Error in selected account, please try again')
    }
    
    if(accountError || typeError || amountError || amountError){
      setShowLoader(false);
      return
    }
    
    if(!type || !account || !amount){
      setShowLoader(false);
    }
    if(!type || !account || !amount) return Alert.alert('Incomplete fields, please complete them all')
    
    if(!/^\d+$/.test(amount)){
      setShowLoader(false);
    }

    dispatch(postMovement(aidi[aidi.length -1],data));
    dispatch(getIncome(aidi[aidi.length -1]))
    dispatch(getMovements(aidi[aidi.length -1]))
    
    
    setType('');
    setAccount('');
    setAmount('');
  };
  
  const handlePostExpense = () => {
    setShowLoader(true);
    dispatch(getAccounts(aidi[aidi.length-1]))
    
    let accountError = '';
    if (!paymentMethod) {
      accountError = '* Please select an account';
    }
    
    let descriptionError = '';
    if (!description) {
      descriptionError = '* Please enter a description';
    }

    let categoryError = '';
    if (!category) {
      categoryError = '* Please select a category';
    }
    
    let amountError = '';
    if (!/^\d+$/.test(amount)) {
      amountError = '* Only numbers are allowed';
    }
    
    let amountError2 = '';
    if (!amount) {
      amountError2 = '* Please enter an amount';
    }
    
    setErrorExpense({
      ...errorExpense,
      accountError: accountError,
      descriptionError: descriptionError,
      categoryError: categoryError,
      amountError: amountError,
      amountError2: amountError2
    });

     const accountExists = accounts.includes(paymentMethod);

    
    if (!accountExists) {
      setShowLoader(false);
      return Alert.alert('The selected account does not existe in your profile');
    }
    
    if(accountError || categoryError || amountError || amountError || descriptionError){
      setShowLoader(false);
      return
    }

    const data: ExpenseData = {
      amount: parseFloat(amount),
      description,
      category,
      paymentMethod,
      
    };
    if(!amount || !category || !description || !paymentMethod ) return Alert.alert('Incomplete fields, please complete them all')
    if(!/^\d+$/.test(amount)){
      setShowLoader(false);
    }
    dispatch(postExpense(aidi[aidi.length-1], data))
    dispatch(getIncome(aidi[aidi.length-1]))
    dispatch(getMovements(aidi[aidi.length-1]))
    setAmount('');
    setDescription('');
    setCategory('');
    setPaymentMethod('');
  };
  
  const reload = () => {
    dispatch(getIncome(aidi[aidi.length-1]))
    dispatch(getMovements(aidi[aidi.length-1]))
    dispatch(getExpense(aidi[aidi.length-1]))
    dispatch(getAccounts(aidi[aidi.length-1]))
  } 
  
  
  const onChange = (item: Data) => {
    setAccount(item.label);
  }
  const onChange1 = (item: Expense) => {
    setCategory(item.value);
  }
  const onChange2 = (item: PaymentMethod) => {
    setPaymentMethod(item.label);
  }

  const ref = React.useRef<PagerView>(null);

  useEffect(()=>{
    dispatch(gettingUsers())
    dispatch(getMovements(aidi[aidi.length -1]))
    dispatch(getExpense(aidi[aidi.length -1]))
    dispatch(getAccounts(aidi[aidi.length -1]))
    
  },[])

  useEffect(() => {
    if (showLoader) {
      setTimeout(() => {
        setShowLoader(false);
      }, 2000); // Duración de 3 segundos
    }
  }, [showLoader]);

  return (
    <View style={styles.container}>
    
      <View style={{ alignSelf: 'flex-start',bottom:20.5, right:38.5}}>
        <Drawer />
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.buttonsPages} onPress={() => ref.current?.setPage(0)}>
          <Text style={styles.textButton}>Add Income</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonsPages} onPress={() => ref.current?.setPage(1)}>
          <Text style={styles.textButton}>Add Expenses</Text>
        </TouchableOpacity>

      
     </View> 
      <PagerView style={styles.pager} ref={ref} initialPage={0}>


      <ScrollView>
        <View key="1">
        <View style={{bottom: 30}}>
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
                placeholder={account ? account : "Select Account"}
                onChange={onChange as (item: Data) => void}
                />
                {errorForm.accountError && <Text style={styles.textError}>{errorForm.accountError}</Text>}
              <TextInput
                value={type}
                onChangeText={setType}
                placeholder="Desciption"
                placeholderTextColor="gray"
                style={styles.input}
                />
                {errorForm.typeError && <Text style={styles.textError}>{errorForm.typeError}</Text>}
              <TextInput
                value={amount} 
                onChangeText={setAmount} 
                keyboardType="numeric"
                placeholder="Amount"
                placeholderTextColor="gray"
                style={styles.input}
                />
                {errorForm.amountError && <Text style={styles.textError}>{errorForm.amountError}</Text>}
                {errorForm.amountError2 && <Text style={styles.textError}>{errorForm.amountError2}</Text>}
            </View>

              <TouchableOpacity onPress={() => { handlePostMovement(); reload()}}  style={styles.btn}>
                <Text style={styles.textBtn}>Add</Text>
              </TouchableOpacity>
            
          </View>
        </View>
      </ScrollView>

      <ScrollView>
        <View key="2">
          <View style={{bottom: 30}}>
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
                {errorExpense.categoryError && <Text style={styles.textError}>{errorExpense.categoryError}</Text>}
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
                placeholder={paymentMethod ? paymentMethod : "Select Account"}
                onChange={onChange2 as (item: PaymentMethod) => void}
                />
                {errorExpense.accountError && <Text style={styles.textError}>{errorExpense.accountError}</Text>}
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Description"
                placeholderTextColor="gray"
                style={styles.input}
                />
                {errorExpense.descriptionError && <Text style={styles.textError}>{errorExpense.descriptionError}</Text>}
              <TextInput
                value={amount} 
                onChangeText={setAmount} 
                keyboardType="numeric"
                placeholder="Amount"
                placeholderTextColor="gray"
                style={styles.input}
                />
                {errorExpense.amountError && <Text style={styles.textError}>{errorExpense.amountError}</Text>}
             </View>
              <TouchableOpacity onPress={() => { handlePostExpense(); reload()}} disabled={loading}  style={styles.btn}>
                <Text style={styles.textBtn}>Add</Text>
              </TouchableOpacity>
             
          </View>
          </View>
        </ScrollView>
        
      </PagerView>
      {showLoader && <LoaderSuccess />}
      
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
    color: 'black'
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
    marginTop: 85,
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
    color: 'black'
  },
  selectedTextStyle: {
    fontSize: 14,
    marginLeft: 8,
    color: 'black'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  textError: {
    color: 'white',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  
});