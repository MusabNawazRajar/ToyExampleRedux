import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, editTask } from './store/tasksSlice';

export default function App() {
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedText, setEditedText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(null);
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  const submitHandler = () => {
    if (text.trim()) {
      dispatch(addTask(text));
      setText('');
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteTask(index));
  };

  const handleEdit = (index) => {
    setSelectedIndex(index);
    setEditedText(tasks[index]);
    setIsModalVisible(true);
  };

  const saveEditedTask = () => {
    if (editedText.trim() !== '') {
      dispatch(editTask({ index: selectedIndex, newText: editedText }));
      setIsModalVisible(false);
    } else {
      Alert.alert('Error', 'Task cannot be empty');
    }
  };

  const renderTaskItem = ({ item, index }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleDelete(index)}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleEdit(index)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              value={editedText}
              onChangeText={setEditedText}
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={saveEditedTask} />
              <Button title="Cancel" onPress={() => setIsModalVisible(false)} color="#FF6347" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      <TextInput
        placeholder="Enter the task"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Submit" onPress={submitHandler} />
      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F7F6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2C3E50',
  },
  input: {
    borderColor: '#95A5A6',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#ECF0F1',
  },
  list: {
    width: '100%',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
    color: '#34495E',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalInput: {
    borderColor: '#95A5A6',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ECF0F1',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
