<!-- 
  - reset after submit
  - highlight selected category

 -->

<template>
  
  <div class="grid-container">
    <h1>expense tracker.</h1>
    <div class="containter custom-container p-2 mx-auto">
      <div class="row px-3 pb-1 m-3">
        <div class="col">
          <div class="form-floating">
          <input type="text" class="form-control" placeholder="title" v-model="title">
          <label for="floatingInput">entry title</label>
        </div>
        </div>
      </div>
      
      <div class="row px-3 pb-3 m-3">
    <div class="col btn-group">
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

      <div class="row pt-5 px-3 m-3">
        <div class="input-group fs-2">
          <span class="input-group-text">$</span>
          <input type="number" v-model="price" class="form-control" aria-label="Amount (to the nearest dollar)">
          <button type="button" class="btn btn-success" @click="printData">submit</button>
        </div>
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
      price: 5,
      types: ['food', 'personal', 'school', 'misc'],
      dataObject:{
        title: 'n/a',
        price: -1,
        type: 'n/a',
        date: new Date()
      }
    }
  },
  methods: {
    sendData(){
      this.dataObject.title = this.title
      this.dataObject.price = this.price
      // const jsonPayload = JSON.stringify(this.dataObject);
    },
    printData(){ //for logging 
      this.dataObject.title = this.title
      this.dataObject.price = this.price
      console.log(this.dataObject)
    },
    setType(type){
      this.dataObject.type = type
    }
  }
}
</script>