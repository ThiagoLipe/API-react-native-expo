import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import axios from 'axios';

const API_KEY = '484e2aad606313884e28a7e6b2deb88a'; 

const App = () => {
  const [city, setCity] = useState('');
  const [temperature, setTemperature] = useState(null);

  const fetchTemperature = async () => {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const { main } = response.data;
      setTemperature(main.temp);
    } catch (error) {
      console.error(error);
      setTemperature(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de Temperatura</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da cidade"
        onChangeText={(text) => setCity(text)}
        value={city}
      />
      <Button title="Consultar" onPress={fetchTemperature} />
      {temperature !== null && (
        <Text style={styles.temperature}>Temperatura: {temperature}°C</Text>
      )}
    </View>
  );
};

App.propTypes = {
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
  },
  temperature: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default App;