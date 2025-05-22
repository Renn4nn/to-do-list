import { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  function addTask() {
    if (title && description) {
      const newTask = {
        id: tasks.length + 1,
        title,
        description,
        completed: false,
      };

      setTasks([...tasks, newTask]);
      console.log(tasks);
      closeModal();
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  }

  function closeModal() {
    setModalVisible(false);
    setTitle("");
    setDescription("");
  }

  function openModal() {
    setModalVisible(true);
  }

  function toggleTaskCompleted(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 p-4">
        <View className="flex-col justify-center items-center">
          <Text className="text-3xl font-bold text-blue-600">
            Minha Lista de Tarefas
          </Text>
          <TouchableOpacity
            onPress={openModal}
            className="w-12 h-12 bg-blue-500 active:bg-blue-600 rounded-full items-center justify-center my-5"
          >
            <Icon name="plus" type="font-awesome" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {tasks.map((task) => (
            <View key={task.id} className="mb-2">
              <TouchableOpacity
                onPress={() => toggleTaskCompleted(task.id)}
                className="bg-gray-100 rounded-lg p-4"
              >
                <Text
                  className={`text-lg font-medium ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.title}
                </Text>
                <Text
                  className={`text-gray-500 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.description}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* EXIBIÇÃO DO MODAL */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white p-6 rounded-lg w-11/12 max-w-md">
              <Text className="text-lg font-bold mb-4 text-center">
                Adicionar Tarefa
              </Text>

              <Text className="mt-3 text-base font-semibold text-gray-700 rounded-lg mb-1 ml-2">
                Título da tarefa:
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-3 py-2 mt-1 text-base bg-gray-100 p-4 mb-5 h-14"
                placeholder="Digite o título"
                placeholderTextColor="#888"
                onChangeText={setTitle}
                value={title}
              />

              <Text className="my-3 text-base font-semibold text-gray-700 rounded-lg mb-2 ml-2">
                Descrição da tarefa:
              </Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-3 py-2 mt-1 text-base bg-gray-100 p-4 mb-1 h-14"
                placeholder="Digite a descrição"
                placeholderTextColor="#888"
                multiline
                numberOfLines={4}
                onChangeText={setDescription}
                value={description}
              />

              <TouchableOpacity
                onPress={addTask}
                className="bg-blue-500 active:bg-blue-600 h-14 mt-8 rounded-xl justify-center items-center shadow-md"
              >
                <Text className="text-white text-xl font-semibold">Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={closeModal}
                className="bg-red-500 active:bg-red-600 h-14 mt-4 rounded-xl justify-center items-center shadow-md"
              >
                <Text className="text-white text-xl font-semibold">Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
