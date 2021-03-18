<template>
<div> 
  <li><span :class="showdata.titleclass">{{showdata.titlename}}</span></li>
	<li><span :class="showclass" :title="showdata.value+'%'" :style="showcolor"></span></li>
</div>
</template>
<script>
export default{
  props: {
  	showdata:Object,
  },
  data () {
    return {
      showclass:'',
      showcolor:'',
		  mydata:this.showdata
    }
  },
  mounted:function(){
	  this.showclass=this.mydata.msgclass;
        if(this.showdata.value<20){
          this.showclass+=' '+this.mydata.showico+0;
          this.showcolor="color:green;"
        }else if(this.showdata.value<40){
          this.showclass+=' '+this.mydata.showico+1;
          this.showcolor="color:green;"
        }else if(this.showdata.value<60){
          this.showclass+=' '+this.mydata.showico+2;
          this.showcolor="color:green;"
        }else if(this.showdata.value<80){
          this.showclass+=' '+this.mydata.showico+3;
          this.showcolor="color:red;"
        }else{
          this.showclass+=' '+this.mydata.showico+4;
          this.showcolor="color:red;"
        }
  },
  methods:{
    
  },
  components: {}
}
</script>
<style>
</style>