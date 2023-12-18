<template>
  <input type="text" placeholder="Title" v-model="title">
  <input type="number" v-model="price"/>
  <div>
    <button @click="setType(name)" v-for="(name, index) in types" :key="index">
      {{ name }}
    </button>
  </div>

  <button @click="printData">print data object</button>
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
        title: '',
        price: 0,
        type: 'n/a'
      }
    }
  },
  methods: {
    sendData(){
      // const jsonPayload = JSON.stringify(this.dataObject);
    },
    printData(){
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