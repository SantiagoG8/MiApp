import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Modal, Text, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Notificaciones = () => {
  const [fechas, setFechas] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [descripcion, setDescripcion] = useState('');
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [esEdicion, setEsEdicion] = useState(false);

  useEffect(() => {
    const cargarFechas = async () => {
      const data = await AsyncStorage.getItem('notificaciones');
      if (data) {
        setFechas(JSON.parse(data));
      }
    };
    cargarFechas();
  }, []);

  const guardarFechas = async (nuevasFechas) => {
    await AsyncStorage.setItem('notificaciones', JSON.stringify(nuevasFechas));
  };

  const onDayPress = (day) => {
    const date = day.dateString;
    setFechaSeleccionada(date);
    if (fechas[date]) {
      setDescripcion(fechas[date].descripcion);
      setEsEdicion(true);
      setModalVisible(true);
    } else {
      setDescripcion('');
      setEsEdicion(false);
      setModalVisible(true);
    }
  };

  const guardarNotificacion = () => {
    const nuevasFechas = {
      ...fechas,
      [fechaSeleccionada]: {
        marked: true,
        dotColor: 'purple',
        selected: true,
        selectedColor: '#A29BFE',
        descripcion,
      }
    };
    setFechas(nuevasFechas);
    guardarFechas(nuevasFechas);
    setModalVisible(false);
    setDescripcion('');
    setEsEdicion(false);
  };

  const eliminarNotificacion = () => {
    Alert.alert(
      "Eliminar notificación",
      "¿Estás seguro de que quieres eliminar esta notificación?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            const nuevasFechas = { ...fechas };
            delete nuevasFechas[fechaSeleccionada];
            setFechas(nuevasFechas);
            guardarFechas(nuevasFechas);
            setModalVisible(false);
            setDescripcion('');
            setEsEdicion(false);
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Calendar
        markedDates={fechas}
        onDayPress={onDayPress}
        theme={{
          selectedDayBackgroundColor: '#00adf5',
          todayTextColor: '#00adf5',
          arrowColor: '#00adf5',
        }}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{esEdicion ? 'Editar' : 'Añadir'} Notificación</Text>
            <Text>{fechaSeleccionada}</Text>
            <TextInput
              placeholder="Descripción"
              value={descripcion}
              onChangeText={setDescripcion}
              style={styles.input}
            />
            <Button title="Guardar" onPress={guardarNotificacion} />
            {esEdicion && (
              <Button title="Eliminar" onPress={eliminarNotificacion} color="red" />
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelBtn}>
              <Text style={{ color: 'gray' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,
    paddingVertical: 5,
  },
  cancelBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default Notificaciones;

