import React, {useState} from 'react';
import {View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [confirmText, setConfirmText] = useState([]);

  function submitHandler() {
    setConfirmText(prevConfirmText => [...prevConfirmText, text]);
    setText(''); // Clear the input after submission
  }

  function renderConfirmText({item, index}) {
    return (
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
      </View>
    );
  }

  function handleDelete(index) {
    setConfirmText(prevConfirmText => prevConfirmText.filter((_, i) => i !== index));
  }

  function handleEdit(index) {
    const editedText = prompt("Edit task", confirmText[index]);
    if (editedText !== null && editedText !== "") {
      setConfirmText(prevConfirmText => prevConfirmText.map((item, i) => i === index ? editedText : item));
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter the task"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Submit" onPress={submitHandler} />
      <FlatList
        data={confirmText}
        renderItem={renderConfirmText}
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
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  listItemText: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});
