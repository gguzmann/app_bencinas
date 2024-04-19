import MapView, { Marker } from 'react-native-maps';
import { Image, StyleSheet, View, Text, Modal, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { datos } from './src/utils/data';
import { useEffect, useRef, useState } from 'react';
import * as Location from 'expo-location';
import { useStore } from './src/utils/store';
import { bencineraBarata, getParaderosInRegion } from './src/utils/utils';
import { ModalSelect } from './src/components/ModalSelect';
import { Marcador } from './src/components/Marcador';

export default function App() {
  const [location, setLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [select, setSelect] = useState(null)

  const [region, setRegion] = useState({
    latitude: -20.2686722,
    longitude: -70.10491689999998,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const mapRef = useRef(null)
  const { marcadores, setMarcadores, star, setStar } = useStore()

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      console.log("Access")
      let loc = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = loc.coords
      setInitialRegion({
        latitude,
        longitude,
        latitudeDelta: 0.0462,
        longitudeDelta: 0.0271,
      })
    })();
  }, []);




  const onChangeRegion = async (newRegion) => {
    console.log("onChangeRegion")
    setRegion(newRegion)
    // setMarcadores([])
    const paraderos = getParaderosInRegion(datos, region)
    console.log(paraderos.length)
    const test = bencineraBarata(paraderos)
    setMarcadores(test)
    setStar(test[0])
  }

  const openModal = (local) => {
    setModalVisible(true)
    setSelect(local)
  }

  return (
    <View style={styles.container}>
      <Text>1</Text>
      <Text>{marcadores.length}</Text>
      <ModalSelect modalVisible={modalVisible} setModalVisible={setModalVisible} select={select}/>

      <MapView style={styles.map}
      ref={mapRef}
      onRegionChangeComplete={onChangeRegion}
      initialRegion={initialRegion}
      showsUserLocation={true}
      >
        { initialRegion && marcadores.length > 0 &&
          marcadores.slice(0,10).map((x, i) => (
            <Marcador mark={x} key={x.codigo + i} openModal={openModal} />
          ))
        }
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
    marker: {

      width: 25,
      height: 25
    },
  map: {
    width: '100%',
    height: '100%',
  },
});