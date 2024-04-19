import { Image, StyleSheet, Text, View } from "react-native"
import { Marker } from "react-native-maps"
import { useStore } from "../utils/store"

export const Marcador  = ({mark, index, openModal}) => {
    const {star} = useStore()
    return(
        <Marker
            coordinate={{latitude: Number(mark.ubicacion.latitud.replace(",", ".")), longitude: Number(mark.ubicacion.longitud.replace(",", "."))}}
        
            onPress={() => openModal(mark)}
            description="test"
            // image={require('../../assets/Shell.png')}
            >
              {/* {
                star.codigo === mark.codigo &&
                <Image
                source={{ uri: mark?.distribuidor.logo}}
                  style={styles.marker}
                /> 
              } */}
              <View className={`${star.codigo === mark.codigo ? 'bg-yellow-200' : 'bg-white'} w-[50px] flex items-center border rounded-xl`}>
               <Text>{Number(mark.precios["93"].precio)}</Text>
               <Image
                source={{ uri: mark?.distribuidor.logo}}
                  style={styles.marker}
                /> 
               
              </View>
            </Marker>
    )
}


const styles = StyleSheet.create({
      marker: {
  
        width: 20,
        height: 20
      }
  });