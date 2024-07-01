import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Alert } from 'react-native';
import * as eva from '@eva-design/eva';
import { Avatar, Button, ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { Camera, CameraType } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarCodeScanner } from 'expo-barcode-scanner';

import { URL_API } from './configuracion';
const apiUrl = `${URL_API}/api/asistencias`;

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
  const [permission, requestPermission] = Camera.useCameraPermissions();
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

  const escanear = async () => {
    if (!permission.granted) {
      await requestPermission();
    }

    setScanned(false);
  }

  useEffect(() => {
    AsyncStorage.getItem('codigo').then((value) => setCodigo(value));
    AsyncStorage.getItem('estudiante').then((value) => setEstudiante(JSON.parse(value)));
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      setScanned(true);

      if (codigo === '' || codigo === null || codigo === undefined) {
        const estudianteData = await fetch(`${URL_API}/api/estudiantes/${data}`).then(response => response.json());
        AsyncStorage.setItem('estudiante', JSON.stringify(estudianteData));
        setEstudiante(estudianteData);
        setCodigo(data);
        AsyncStorage.setItem('codigo', data);
      } else {
        registrarAsitencia(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const salir = () => {
    Alert.alert('Salir', 'Desea cerrar la sesion?', [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Si', onPress: () => {
        setCodigo('')
        AsyncStorage.removeItem('codigo');
        AsyncStorage.removeItem('estudiante');
      }},
    ])
  }

  const foto = estudiante?.foto?.startsWith('/images') ? `http://192.248.161.19${estudiante.foto}` : estudiante?.foto;

  if (!scanned) {
    // return (
    //   <BarCodeScanner
    //     barCodeScannerSettings={{
    //       barCodeTypes: [256],
    //     }}
    //     onBarCodeScanned={handleBarCodeScanned}
    //     style={{
    //     }} type={type}>
    //     <View style={{
    //       flex: 1,
    //       backgroundColor: "transparent",
    //       flexDirection: "row",
    //       justifyContent: "center",
    //       alignItems: "center"
    //     }}>
    //       <TouchableOpacity style={{
    //         flex: 0.2,
    //         alignSelf: 'flex-end',
    //         alignItems: 'center',
    //       }} onPress={() => setScanned(true)}>
    //         <Text style={{
    //           fontSize: 24,
    //           fontWeight: 'bold',
    //           color: 'white',
    //         }}>Salir</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </BarCodeScanner>
    // )
    return (
      <BarCodeScanner barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }} onBarCodeScanned={handleBarCodeScanned} style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{
            width: '50%',
            height: '30%',
            marginLeft: '25%',
            borderColor: '#fff',
            borderWidth: 2,
            alignSelf: 'center',
            position: 'absolute'
          }}></View>

          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: "flex-end",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#666",
              marginBottom: 40,
              marginLeft: 20,
            }}
            onPress={() => setOpenCamera(false)}
          >
            <Text style={{ fontSize: 30, padding: 10, color: "white" }}>❌</Text>
          </TouchableOpacity>
        </View>
      </BarCodeScanner>
    )
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      {codigo && estudiante ? (
        <>
          <Avatar source={{
            uri: foto || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
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
          <Button onPress={escanear} style={{ backgroundColor: '#fdd000', margin: 12 }}>
            Escanear QR
          </Button>
        </>
      )}

      {codigo && <Button onPress={() => salir()} style={{ backgroundColor: '#fdd000', margin: 24, position: 'absolute', bottom: 12 }}>Salir</Button>}
    </Layout >
  )
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);