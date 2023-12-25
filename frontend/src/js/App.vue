<!-- 
  - reset after submit
  - highlight selected category

 -->

<template>
  
  <div class="grid-container">
    <h1 class="m-4">expense tracker.</h1>
    <div class="containter custom-container p-2 mx-auto">
      <div class="row px-3 pb-1 m-3">
        <div class="col">
          <div class="form-floating">
          <input type="text" class="form-control" placeholder="title" v-model="title">
          <label for="floatingInput">name</label>
        </div>
        </div>
      </div>
      
      <div class="row px-3 pb-3 m-3">
    <div class="col btn-group-vertical">
      <button
        class="btn"
        :class="{ 'btn-primary': dataObject.type === name, 'btn-outline-primary': dataObject.type !== name }"
        @click="setType(name)"
        v-for="(name, index) in types"
        :key="index"
      >
        {{ name }}
      </button>
    </div>
  </div>

  <div class="row p-3 m-3">
    <div class="mb-3">
      <textarea v-model="notes" class="form-control" id="notes" placeholder="notes" rows="3"></textarea>
      <!-- <label for="notes" class="form-label">notes</label> -->
    </div>
  </div>

      <div class="row m-3 px-3">
        <div class="input-group fs-2">
          <span class="input-group-text">$</span>
          <input type="number" v-model="price" class="form-control" aria-label="Amount (to the nearest dollar)">
          <button type="button" class="btn btn-success" @click="sendData">submit</button>
        </div>
      </div>
      <div class="text-center">
        <span class="badge text-bg-success" v-if="isSuccess">SUCCESS</span>
        <span class="badge text-bg-danger" v-if="isSuccess == false">ERROR</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      title: '',
      price: 0.00,
      types: ['error fetching categories'],
      notes: '',
      isSuccess: null,
      dataObject:{
        title: 'n/a',
        price: -1,
        type: 'n/a',
        notes: 'n/a',
        date: new Date()
      }
    }
  },
  mounted() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetch('http://localhost:8000/categories');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        this.types = data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
    async sendData(){
      this.dataObject.title = this.title
      this.dataObject.price = this.price
      this.dataObject.notes = this.notes

      try{
        const response = await fetch('http://localhost:8000/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.dataObject)
        })

        if (!response.ok){
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        this.isSuccess = true
        console.log(responseData)
        window.location.reload();

      } catch(error){
        this.isSuccess = false
        console.error('There was a problem with the fetch operation:', error);
      }
    },
    setType(type){
      this.dataObject.type = type
    }
  }
}
</script>