import { Modal, ScrollView, TouchableOpacity, View, Text } from "react-native"


export const ModalSelect = ({modalVisible, setModalVisible, select}) => {
    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
          <View className="justify-end min-h-screen">
            <TouchableOpacity
            className="h-[70%]"
              onPress={() => setModalVisible(false)}
              >
              <Text className="text-white">Press Here</Text>

            </TouchableOpacity>
            <View className="bg-white h-[30%] p-3">
            
              <Text >{select?.distribuidor.marca} {select?.codigo}</Text>
              <ScrollView>
              {
                select &&
                Object.entries(select?.precios).map((x, i) => (
                  <View key={i} className="flex-row my-1 gap-3">
                    <Text className="bg-green-200 border w-10 text-center">{x[0]}</Text>
                    <Text>{x[1].precio}</Text>
                  </View>
                ) )
              }
              </ScrollView>
                {/* <Image
            source={{ uri: select?.distribuidor.logo}}
              style={styles.marker}
            />  */}
              <TouchableOpacity
              className="bg-red-600 p-2 flex items-center my-2"
              onPress={() => setModalVisible(false)}
              >
              <Text className="text-white">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>

            
      </Modal>

    )
}