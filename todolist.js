load()
$('#title').on('keydown', function (event) {
  if (event.keyCode === 13) {
  if($(this).val() === ""){
    alert('请输入')
  }else{
      //读取本地存储原来的数据
      let local = getDate()
      //更新数据 把最新的数据追加到local数组中
      local.push({
        title: $(this).val(),
        done: false
      })
      saveDate(local)
      //渲染页面操作
      load()
      $(this).val("")
  }
  }
})

//读取本地存储******************************************
function getDate() {
  let data = localStorage.getItem("todolist")
  if (data != null) {
    return JSON.parse(data)
  } else {
    return []
  }
}
//保存本地存储**************************************
function saveDate(data) {
  localStorage.setItem('todolist', JSON.stringify(data))
}
//渲染页面函数*******************************************
function load() {
  //正在进行
  let todo = 0
  //已经完成
  let done = 0
  //读取本地存储
  let date = getDate()
  console.log(date);
  //调用前清空元素
  $('ol').empty()
  $('ul').empty()
  //遍历数据
  $.each(date, function (index, item) {
    if(item.done){
    $('ul').prepend(`<li><input id="ia"  type='checkbox' checked><label for="ia"></label><p>${item.title}</p><a href='javascript:;' id=${index}><svg t="1606652408532" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2954" width="128" height="128"><path d="M970.24 256h-301.44L592.64 160H431.36L355.2 256H53.76V192h270.72l76.16-96h222.72L699.52 192h270.72v64zM803.84 928H220.16L144 356.48l64-8.96 67.84 516.48h472.32l67.84-516.48 64 8.96-76.16 571.52z" fill="#ffffff" p-id="2955"></path><path d="M376.96 412.16h64v371.84h-64zM583.04 412.16h64v371.84h-64z" fill="#ffffff" p-id="2956"></path></svg></a></li>`)
    done++
    }else{
    $('ol').prepend(`<li><input id="ia" type='checkbox'><label for="ia"></label><p>${item.title}</p><a href='javascript:;' id=${index}><svg t="1606652408532" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2954" width="128" height="128"><path d="M970.24 256h-301.44L592.64 160H431.36L355.2 256H53.76V192h270.72l76.16-96h222.72L699.52 192h270.72v64zM803.84 928H220.16L144 356.48l64-8.96 67.84 516.48h472.32l67.84-516.48 64 8.96-76.16 571.52z" fill="#ffffff" p-id="2955"></path><path d="M376.96 412.16h64v371.84h-64zM583.04 412.16h64v371.84h-64z" fill="#ffffff" p-id="2956"></path></svg></a></li>`)
     todo++
    }
    if(item.length === 0){
      $('#toDoCount').text(todo).val() = 0
      $('#doneCount').text(done).val() = 0
    }else{
      $('#toDoCount').text(todo)
      $('#doneCount').text(done)
    }
   
  })
}
//删除数据*******************************************
$('ol,ul').on('click', 'a', function (){
  //获取本地存储
  let data = getDate()
  //修改数据
  let index = $(this).attr("id")
  console.log(index);
  console.log(this);
  data.splice(index, 1)
  //保存到本地存储
  saveDate(data)
  //重新渲染页面
  load()
})
//todolist已经完成和正在进行中的
$('ol,ul').on('click','input',function () {
   //获取本地存储
   let data = getDate()
   //修改数据
   let index = $(this).siblings('a').attr("id")
   console.log(index);
   console.log(this);
   data[index].done = $(this).prop('checked')   // ***********true
   //保存到本地存储
   saveDate(data)
   //重新渲染页面
   load()
  })