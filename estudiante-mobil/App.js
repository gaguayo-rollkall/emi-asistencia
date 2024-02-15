import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { Avatar, Button, ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { BarCodeScanner } from 'expo-barcode-scanner';

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(true);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Solicitando Permiso de Camara.</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sin Acceso a la Camara.</Text>;
  }

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Avatar source={require('./assets/emi_logo.jpg')} size="large" />
      <Text category='h5'>T-79878</Text>
      <Button onPress={() => setScanned(false)}>
        Registrar Asistencia
      </Button>

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