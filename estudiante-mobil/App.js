import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import * as eva from '@eva-design/eva';
import { Avatar, Button, ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera, CameraType } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import { URL_API } from './configuracion.json';
const apiUrl = `${URL_API}/api/asistencias`;

const apiService = axios.create({
  URL_API,
  timeout: 10000, // Adjust the timeout as needed
});

const formatDate = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = (hour % 12 || 12).toString().padStart(2, '0'); // Convert to 12-hour format and pad with leading zeros
  const formattedMinute = minute.toString().padStart(2, '0'); // Pad minutes with leading zeros
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
  const day = date.getDate().toString().padStart(2, '0'); // Pad day with leading zeros
  const year = date.getFullYear();

  // Step 3: Format the extracted values as strings
  return `${formattedHour}:${formattedMinute} ${amPm} - ${day}/${month}/${year}`;
}

const HomeScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [codigo, setCodigo] = useState('');
  const [estudiante, setEstudiante] = useState(null);
  const [asistencia, setAsistencia] = useState(null);
  const [reject, setReject] = useState(null);

  const registrarAsitencia = async (eventoId) => {
    try {
      const asistencia = {
        codigoEstudiante: codigo,
        eventoId,
      };

      const opciones = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asistencia)
      };

      const { id, subject } = await fetch(apiUrl, opciones)
        .then(async response => {
          if (response.status === 400) {
            // throw new Error('No se puede registrar asistencia a un evento que no está en curso.');
            const data = await response.json();
            return Promise.reject(data);
          }

          if (!response.ok) {
            throw new Error('Hubo un problema registrando');
          }

          return response.json();
        });

      // const { data: { id, subject } } = await apiService.post('/api/asistencias', asistencia)

      setAsistencia(subject);
      setReject(null);
    } catch (error) {
      setAsistencia(null);
      
      if (error?.errors) {
        setReject(Object.values(error.errors)[0]);
      } else {
        setReject(error);
      }
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('codigo').then((value) => setCodigo(value));
    AsyncStorage.getItem('estudiante').then((value) => setEstudiante(JSON.parse(value)));
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    if (codigo === '' || codigo === null || codigo === undefined) {
      setCodigo(data);
      AsyncStorage.setItem('codigo', data);

      const estudianteData = await fetch(`${URL_API}/api/estudiantes/${data}`).then(response => response.json());
      AsyncStorage.setItem('estudiante', JSON.stringify(estudianteData));
      setEstudiante(estudianteData);
    } else {
      registrarAsitencia(data);
    }
  };

  const salir = () => {
    setCodigo('')
    AsyncStorage.removeItem('codigo');
    AsyncStorage.removeItem('estudiante');
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      {codigo && estudiante ? (
        <>
          <Avatar source={{
            uri: estudiante.foto || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
          }} size="giant" width={300} height={300} />
          <Text category='h6' style={{ color: 'black' }}>
            {estudiante.grado}. {estudiante.nombre}
          </Text>
          <Text category='h3' style={{ color: 'black' }}>
            {estudiante.codigo}
          </Text>
          <Button onPress={() => setScanned(false)} style={{ backgroundColor: '#003f8a', margin: 12 }}>
            Registrar Asistencia
          </Button>

          {asistencia && <Layout style={{
            backgroundColor: '#00a56b',
            borderRadius: 20,
            margin: 20,
            padding: 20,
            width: '80%',
          }}>
            <Text style={{ color: '#fff' }}>
              Asistencia Registrada: {asistencia}
            </Text>
            <Text style={{ color: '#fff' }}>
              {formatDate(new Date())}
            </Text>
          </Layout>}

          {reject && <Layout style={{
            backgroundColor: '#dc1f18',
            borderRadius: 20,
            margin: 20,
            padding: 20,
            width: '80%',
          }}>
            <Text style={{ color: '#fff' }}>
              {reject}
            </Text>
          </Layout>}
        </>
      ) : (
        <>
          <Image source={require('./assets/emilogo.png')} style={{ width: 300, height: 100, resizeMode: 'stretch', }} />
          <Image source={require('./assets/qrcodebro.png')} style={{ width: '100%', height: 500 }} />
          <Button onPress={() => setScanned(false)} style={{ backgroundColor: '#fdd000', margin: 12 }}>
            Escanear QR
          </Button>
        </>
      )}

      {codigo && <Button onPress={() => salir()} style={{ backgroundColor: '#fdd000', margin: 24, position: 'absolute', bottom: 12 }}>Salir</Button>}

      {!scanned && <Camera
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          flex: 1,
        }} type={type}>
        <View style={{
          width: '100%',
          height: '30%',
          flexDirection: 'row',
          backgroundColor: 'transparent',
          margin: 64,
        }}>
          <TouchableOpacity style={{
            flex: 1,
            alignSelf: 'flex-end',
            alignItems: 'center',
          }} onPress={() => setScanned(true)}>
            <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: 'white',
            }}>Salir</Text>
          </TouchableOpacity>
        </View>
      </Camera>}
    </Layout >
  )
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);