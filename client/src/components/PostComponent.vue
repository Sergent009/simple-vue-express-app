<template>
<div class="container" :class="{'dark-theme': darkTheme}">
  <div class="togglebutton">
  <label class="switch">
    <input type="checkbox" @click="buttonChecked">
    <span class="slider"></span>
  </label>
  </div>

  <h1>Creat Post || Delete Post || Read Post</h1>
  <!-- create post here -->
  <div class="create-post" :class="{'dark-create-post' : darkTheme}">
    <input type="text" id="create-post" v-model="text" placeholder="Create A Post ...">
    <button @click="createPost">Post</button>
  </div>
  <hr>
  <p class="error" v-if="error">{{error}}</p>
  <div class="posts-container" :class="{'dark-post-container' : darkTheme}">
    <div class="post" v-for="(post, index) in posts"  v-bind:item="post" v-bind:index="index" v-bind:key="post._id">
      <button class="deleteButton" @click="deletePost(post._id)">x</button>
      {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
      <p class="">{{post.text}}</p>
    </div>
  </div>
</div>

</template>

<script>
import PostService from '../PostService'

export default {
  name: 'PostComponent',

  data(){
    return{
      posts: [],
      error: '',
      text: '',
      darkTheme: false
    }
  },

  async created(){
    try{
      this.posts = await PostService.getPosts()
    }
    catch(err){
      this.error = err.message
    }
  },

  methods: {
    async createPost(){
      await PostService.insertPost(this.text)
      this.posts = await PostService.getPosts()
      this.text = ''
    },

    async deletePost(id){
      await PostService.deletePost(id)
      this.posts = await PostService.getPosts()
    },

    buttonChecked(){
      this.darkTheme = !this.darkTheme
      console.log(this.darkTheme)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');

.container{
  max-width: 800px;
  margin: 0 auto;
  font-family: "Varela Round", sans-serif;
}

.error{
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
  font-family: "Varela Round", sans-serif;

}

.post{
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
  border-radius: 4px;
}

.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

.text{
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

#create-post{
  width: 60%;
  height: 35px;
  border: none;
  background: rgb(158, 163, 158);
  color: black;
  font-weight: 600;
  border-radius: 3px;
  font-size: 16px;
  font-family: "Varela Round", sans-serif;

}
#create-post:focus{
  outline: none;
}

button{
  width: 100px;
  height: 35px;
  margin: 0 10px;
  font-weight: 600;
  font-size: 16px;
  background: rgb(158, 163, 158);
  border: none;
  border-radius: 3px;
  color: wheat;
}

button:hover{
  background: rgb(209, 188, 149);
  color: rgb(158, 163, 158);
  cursor: pointer;
}

.deleteButton{
  position: absolute;
  top: 10px;
  right: 0;
  width: 30px;
  height: 30px;
}

.deleteButton:hover{
  background: rgb(196, 37, 37);
  color: white;
}

/* styling of toggle button */

.togglebutton{
  width: 80px;
  height: 40px;
  position: absolute;
  top: 40px;
  right: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.switch{
  width: 80px;
  height: 40px;
  background: wheat;
  border-radius: 30px;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 1px 1px 5px 1px black;
}

.switch input{
  display: none;
}

.slider{
  width: 35px;
  height: 35px;
  background-color: grey;
  border-radius: 50%;
  margin: 5px;
  position: absolute;
  transition: 0.5s;
}

input:checked~.slider{
  transform: translateX(35px);
  background-color: black;
}

/* styling for dark theme post classes */

.dark-theme {
  background-color: #333;
  color: #fff;
}

.dark-theme .create-post input[type="text"] {
  background: #666;
  color: #fff;
}

.dark-theme .create-post button {
  background: #666;
  color: #fff;
}

.dark-theme .posts-container .post {
  border: 1px solid #fff;
  background-color: #666;
}

.dark-theme .deleteButton {
  background: #ff4d4d;
}

.dark-theme .deleteButton:hover {
  background: #d11e1e;
}


</style>
