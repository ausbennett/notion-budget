<!-- 
  - reset after submit
  - highlight selected category

 -->

<template>

  <div class="container bg-warning p-2  m-5">


    <div class="row p-3 m-3">
      <div class="col">
        <div class="form-floating">
        <input type="text" class="form-control" placeholder="title" v-model="title">
        <label for="floatingInput">Title</label>
      </div>
      </div>
    </div>
    
    <div class="row p-3 m-3">
      <div class="col btn-group">
        <button class="btn btn-primary" @click="setType(name)" v-for="(name, index) in types" :key="index">
          {{ name }}
        </button>
      </div>
    </div>

    <div class="row p-3 m-3">
      <div class="input-group">
        <span class="input-group-text">$</span>
        <input type="number" v-model="price" class="form-control" aria-label="Amount (to the nearest dollar)">
        <button type="button" class="btn btn-success" @click="printData">print data object</button>
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
      types: ['Groceries', 'Personal', 'Education', 'Misc'],
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