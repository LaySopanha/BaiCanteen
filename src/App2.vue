<script setup>
import { ref,onMounted } from 'vue'
  const name = ref('John doe');
  const status = ref('active');
  const tasks = ref(['task1', 'task2', 'task3']);
  const newTask = ref('');

  const toggleStatus =() => {
    if(status.value === 'active'){
      status.value = 'pending'
    }
    else if(status.value === 'pending'){
      status.value = 'inactive'
    }
    else{
      status.value = 'active'
    }
  };
  const addTask =() =>{
    if(newTask.value.trim() !== ''){
      tasks.value.push(newTask.value);
      newTask.value ='';
    }

  };
  const deleteTask=(index) =>{
    tasks.value.splice(index, 1);
  };
  onMounted(async () =>{
    try{
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      tasks.value = data.map((task) => task.title);

    }catch(error){
      console.log(error);
    }

  });
</script>


<template>
  <h1>{{name}}</h1>
  <p v-if = "status === 'active'"> User is active</p>
  <p v-else-if = "status === 'pending'"> user is pending</p>
  <p v-else> user is inactive</p>

  <form @submit.prevent = "addTask">
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" v-model="newTask">
    <button type="submit">Submit</button>
  </form>
  <h3>Tasks:</h3>
  <ul>
    <li v-for = "(task, index) in tasks" :key = "task">
      <span>
        {{ task }}
      </span>
      <button @click="deleteTask(index)"> Delete Task</button>
      </li>
  </ul>
  <br />
  <button @click="toggleStatus">Change status</button>
</template>

<style scoped>
h1{
  color:red;
}
</style>


