import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [value, setValue] = useState('');
  const [convertedValue, setConvertedValue] = useState('');
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');

  const myHeaders = new Headers();
  myHeaders.append('apikey', 'e4sEYtPJce7xDRUkucF2jz3lYHHNucvB');

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  };

  const getConversion = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedCurrency}&amount=${value}`, requestOptions)
    .then(response => response.json())
    .then(data => setConvertedValue( data.result.toFixed(2) ))
    .catch(error => {
      console.error(error);
    });
  };

  const getCurrency = () => {
    fetch(`https://api.apilayer.com/exchangerates_data/symbols`, requestOptions)
    .then( response => response.json() )
    .then( data => setCurrencyCodes(data.symbols) )
    .catch( error => {
      console.error(error);
    } );
  };

  useEffect(() => getCurrency(), []);

  return (
    <View style={styles.container}>
      
      <Image style={styles.image} source={ require('./pixabay-euro.png') } />

      <Text style={{padding: 15, fontSize: 18, fontWeight: 'bold'}}>{convertedValue} €</Text>

      <View style={styles.converting}>
      <TextInput style={styles.input} keyboardType='numeric' placeholder='Write value' onChangeText={ text => setValue(text) }
        value={value}
      />
      
        <Picker 
          style={{ width: 100}}
          selectedValue={selectedCurrency} 
          onValueChange={ (itemValue, itemIndex) => setSelectedCurrency(itemValue) }
        >
          { Object.keys(currencyCodes).map( val => (<Picker.Item label={val} value={val} key={val} />)) }
        </Picker>
      </View>

      <View style={styles.button}>
        <Button title='Convert' onPress={getConversion} />
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  converting: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',

  },
  image: {
    width: 180,
    height: 100,
    alignSelf: 'center',
  },
  input: {
    width: 120,
    borderColor: 'grey',
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    width: 90,
  },
});