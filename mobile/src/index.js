import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, FlatList, StatusBar, StyleSheet, TouchableHighlight } from 'react-native';
import api from './services/api';

export default function App() {

  const[projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setProjects(response.data);
    });
  });

  async function handleAddProject() {
    const response = await api.post('repositories', {
      curso: `PHP ${Date.now()}`,
      nome: "Tobias"
    });

    setProjects(...projects, response.data);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={projects}
          keyExtractor={project => projects.id}
          renderItem={({ item }) =>(
            <View style={styles.list}><Text style={styles.project}>{item.curso}</Text></View>
          )}
        />

        <TouchableHighlight style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableHighlight>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  list: {
    justifyContent: "center",
    alignItems: "center"
  },
  project: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    height: 50,
  },
  buttonText: {
    fontWeight: "bold",
  },
});