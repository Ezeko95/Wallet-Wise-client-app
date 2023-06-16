import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const local_data = [
  {
    value: '1',
    lable: 'Farmacia',
    image: {
      uri: 'https://th.bing.com/th/id/R.50d05e3e5fc870a8bf7d0cfb0aef3432?rik=6ZLTHdVHYC8fiQ&riu=http%3a%2f%2fwww.camaradesalud.com.ar%2fsaludjujuy%2fimages%2fpdf%2flogofarmacias1.png&ehk=8K6h%2bzr47Y8eDp9NA5QFV6yOkh1Il4QpKaVfc6UJTLM%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: '2',
    lable: 'Supermarket',
    image: {
      uri: 'https://static.vecteezy.com/system/resources/previews/002/300/734/non_2x/cartoon-illustration-of-supermarket-grocery-cart-with-healthy-organic-food-isolated-on-white-background-vector.jpg',
    },
  },
  {
    value: '3',
    lable: 'Dinner Out',
    image: {
      uri: 'https://w7.pngwing.com/pngs/971/466/png-transparent-breakfast-lunch-dinner-meal-breakfast-food-logo-eating.png',
    },
  },
  {
    value: '4',
    lable: 'Electrodomestics',
    image: {
      uri: 'https://th.bing.com/th/id/R.c44bfd254f040c8dd8017466a3d099bc?rik=z2EqlLFUvlbBKA&riu=http%3a%2f%2fwww.electrodomesta.es%2fimagenes%2farticulos%2foriginal%2ftostador_princess_142372_707.jpg&ehk=b89Q5gK%2fKAYJ58Fr9A8CtfbKgW3nd9loslti5KOMaMY%3d&risl=&pid=ImgRaw&r=0',
    },
  },
  {
    value: '5',
    lable: 'Technology',
    image: {
      uri: 'https://4.bp.blogspot.com/-WL97Q9Msy5k/V9A6HHy6svI/AAAAAAAALU4/3nu2kG1u-VowtwpxhzfRlHuQB4Dio55cQCLcB/s1600/uuuuu.jpg',
    },
  },
];

const Dropdown = ({_props}: any) => {
  const [acc, setCountry] = useState('1');

  return (
    <SelectCountry
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={acc}
      data={local_data}
      valueField="value"
      labelField="lable"
      imageField="image"
      placeholder="Select country"
      searchPlaceholder="Search..."
      onChange={e => {
        setCountry(e.value);
      }}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
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