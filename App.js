
// todo app 
// Almar Assetbekov 20MD0107

import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  ScrollView
} from "react-native";
import AppBar from "./src/components/AppBar";
import Todo from "./src/components/Todo";
import TodoList from "./src/components/TodoList";

export default function App() {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const addTodo = () => {
    if (title.length > 0) {
      setTodos([...todos, { key: Date.now(), name: title, isChecked: false }]);
      setTitle("");
    }
  };

  const checkTodo = id => {
    setTodos(
        todos.map(todo => {
          if (todo.key === id) {
            todo.isChecked = !todo.isChecked;
          }
          return todo;
        })
    );
  };

  const deleteTodo = id => {
    setTodos(todos.filter(todo => {
      return todo.key !== id;
    }));
  };


  return (
      <View style={styles.container}>
        <View style={styles.statusBar}></View>
        <AppBar />
        <View style={styles.todo}>
          <TextInput
              placeholder="Add a todo"
              value={title}
              onChangeText={value => setTitle(value)}
              style={styles.textbox}
          />
          <Button title="Add" color="#7F39FB" onPress={() => addTodo()} />
        </View>

        <ScrollView>
          {todos.map(todo => (
              <TodoList
                  key={todo.key}
                  todo={todo}
                  checkTodo={checkTodo}
                  deleteTodo={deleteTodo}
              />
          ))}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: "#7F39FB",
    color: "#fff",
    width: "100%",
    height: 30
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  todo: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  textbox: {
    borderWidth: 1,
    borderColor: "#7F39FB",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: "80%"
  }
});
