import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { Avatar, Button, ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { URL_API } from './configuracion.json';
const apiUrl = `${URL_API}/api/asistencias`;

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);
  const [codigo, setCodigo] = useState('');

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

      const { codigo: codigoEstudiante, nombre = '' } = await fetch(apiUrl, opciones)
        .then(response => {
          if (!response.ok) {
            throw new Error('Hubo un problema registrando');
          }

          return response.json();
        })

      alert(`Bienvenido ${codigoEstudiante} ${nombre}`)
    } catch (error) {
      console.error('Asistencia', error);
      alert('Rechazado')
    }
  }

  useEffect(() => {
    AsyncStorage.getItem('codigo').then((value) => setCodigo(value));

    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    if (codigo === '' || codigo === null || codigo === undefined) {
      setCodigo(data);
      AsyncStorage.setItem('codigo', data);
    } else {
      registrarAsitencia(data);
    }
  };

  if (hasPermission === null) {
    return <Text>Solicitando Permiso de Camara.</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin Acceso a la Camara.</Text>;
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#174287' }}>
      <Avatar source={require('./assets/emi_logo.jpg')} size="giant" />

      {codigo ? (
        <>
          <Text category='h3' style={{ color: 'white' }}>{codigo}</Text>
          <Button onPress={() => setScanned(false)} style={{ backgroundColor: '#fdd000', margin: 12 }}>
            Registrar Asistencia
          </Button>
        </>
      ) : (
        <Button onPress={() => setScanned(false)} style={{ backgroundColor: '#fdd000', margin: 12 }}>
          Habilitar Aplicacion
        </Button>
      )}

      {codigo && <Button onPress={() => setCodigo('')} style={{ backgroundColor: '#4a00ff', margin: 24, position: 'absolute', bottom: 12 }}>Salir</Button>}

      {!scanned && <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />}
    </Layout>
  )
};

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <HomeScreen />
  </ApplicationProvider>
);