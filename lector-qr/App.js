import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Camera, CameraType } from "expo-camera";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import crypto from 'crypto-js';

export default function App() {
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [openCamera, setOpenCamera] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [info, setInfo] = useState(null);
  const cameraRef = useRef(null);

  function parseStringToJSON(inputString) {
    // Define regular expressions to extract data
    const regex = /CLIENTE:(.*?) FECHA:(.*?) CONCEPTO:(.*?) COSTO:(\d+) USUARIO:(.*)/;

    // Execute the regular expression to match against the input string
    const match = regex.exec(inputString);

    // Check if the input string matches the expected format
    if (!match) {
      return { error: "Invalid input string format" };
    }

    // Extract matched groups
    const cliente = match[1].trim();
    const fecha = match[2].trim();
    const concepto = match[3].trim();
    const costo = parseInt(match[4]);
    const usuario = match[5].trim();

    // Create JSON object with extracted data
    const jsonData = {
      CLIENTE: cliente,
      FECHA: fecha,
      CONCEPTO: concepto,
      COSTO: costo,
      USUARIO: usuario
    };

    return jsonData;
  }

  const decrypt = (value) => {
    const iv = crypto.enc.Utf8.parse('1234567890ABCDEF');
    const key = crypto.enc.Utf8.parse('0123456789ABCDEF');

    const result = crypto.AES.decrypt(value, key, {
      iv,
      mode: crypto.mode.CBC,
    }).toString(crypto.enc.Utf8);

    return result;
  }

  const onQRCodeScanned = async ({ type, data }) => {
    setOpenCamera(false);

    const output = decrypt(data);
    setInfo(parseStringToJSON(output))
  }

  const readOtherQR = () => {
    setInfo(null);
    setOpenCamera(true);
  }

  if (info) {
    return (
      <View style={styles.container}>
        <Text style={{ color: '#fff', fontSize: 20, marginBottom: 20 }}>Código QR leído:</Text>

        <View style={{
          backgroundColor: '#f2f2f2',
          width: '80%',
          borderRadius: 20,
          padding: 20,
          marginBottom: 20,
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 14,
            color: '#333',
            marginBottom: 12,
          }}>
            {info.FECHA}
          </Text>

          <View style={{
            backgroundColor: 'green',
            width: '100%',
            padding: 10,
            alignItems: 'center',
            borderRadius: 10,
            marginBottom: 12,
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 24,
              color: 'white'
            }}>
              Bs. {info.COSTO}
            </Text>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginBottom: 12,
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              Concepto:
            </Text>
            <Text style={{
              fontSize: 16,
            }}>
              {info.CONCEPTO}
            </Text>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginBottom: 12,
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              Cliente:
            </Text>
            <Text style={{
              fontSize: 16,
            }}>
              {info.CLIENTE}
            </Text>
          </View>

          <View style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            marginBottom: 12,
          }}>
            <Text style={{
              fontWeight: 'bold',
              fontSize: 16,
            }}>
              Usuario:
            </Text>
            <Text style={{
              fontSize: 16,
            }}>
              {info.USUARIO}
            </Text>
          </View>
        </View>

        <Button onPress={readOtherQR} title="Leer otro código QR" />
      </View>
    )
  }

  if (openCamera) {
    return (
      <BarCodeScanner barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }} onBarCodeScanned={onQRCodeScanned} style={{ flex: 1 }} type={type} ref={cameraRef}>
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
    <View style={styles.container}>
      <View style={{ justifyContent: 'center', alignItems: 'center', width: '80%', height: '30%', padding: 10, }}>
        <Image source={require('./assets/logo.png')} style={{ width: '100%', height: '100%', resizeMode: 'stretch', }} />
      </View>

      {!status?.granted && (
        <View
          style={{ marginTop: 20, justifyContent: "center", alignContent: "center" }}
        >
          <Text style={{ textAlign: "center" }}>
            Se necesita acceder a la cámara para poder leer códigos QR.
          </Text>
          <Button onPress={requestPermission} title="Conceder Permisos" />
        </View>
      )}

      {status?.granted && (
        <View
          style={{ marginTop: 20, justifyContent: "center", alignContent: "center" }}
        >
          <Button onPress={() => setOpenCamera(true)} title="Leer Codigo QR" />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
