
var app_url = 'http://10.167.173.113:3000'

// function search () {
//   var accusal  = $('#accusal').val()
//   if (accusal  == '' || accusal  == null) {
//     console.log(1)
//   } else {
//     window.location.href = app_url + '/list?q=' + accusal
//     $('#accusal').val('')
//   }
// }


// var data = {todos: []}
// var a = new Vue({
//   el: '.accusal-list',
//   data: data,
//   methods: {
//     close: function (e) {
//       console.log(e)
//     }
//   }
// })

// $('#accusal').on('keypress',function(event){ 
//   if(event.keyCode == 13) {
//     var accusal  = $('#accusal').val()
//     var accusalCon = {}
//     accusalCon.accusal = accusal
//     data.todos.push(accusalCon)
//     console.log(data.todos)
//     $('#accusal').val("")
//   }
// })


Vue.component('todo-item', {
  template: '\
    <li><a>\
      {{ title }}\
      <span v-on:click="$emit(\'remove\')" class="close">×</span>\
    </a></li>\
  ',
  props: ['title']
})
var vm = new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: []
  },
  computed: {
    todoslength: function () {
      console.log(this.todos.length) 
      return this.todos.length
    }
  },
  methods: {
    addNewTodo: function () {
      if(this.newTodoText == ""){
        tip("请输入内容")
      }else{
        this.todos.push(this.newTodoText)
        this.newTodoText = ''
      }
    },
    search: function () {
      var inputcon = $('#accusal').val()
      if (inputcon == "" || inputcon == null) {

      }else{
        this.todos.push(inputcon)
      }
      console.log(this.todos.join(" "))
      var accusal = encodeURIComponent(this.todos.join(" "))
      window.location.href = app_url + '/list?q=' + accusal
    }
  }
})

function tip(infor){
  $(".tip").fadeIn("300")
    $(".tip-con").text(infor)
    setTimeout(function (){
        $(".tip").fadeOut()
    }, 1500)
}