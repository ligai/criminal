var total = ""
var num = 1
var urlInBrower = ""
var app_url = 'http://10.167.173.113:3000'

//点击搜索改变当前URL
function changeUrl(){
  var accusal = $('.search-input').val()
  window.location.href = app_url + '/list?q=' + accusal
}

//监听input回车
$('.search-input').on('keypress',function(event){ 
  if(event.keyCode == 13) {
    changeUrl()
  }
})

function getUrlParam (key) {
    // 获取参数
  var url = window.location.search
    // 正则筛选地址栏
  var reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)')
    // 匹配目标参数
  var result = url.substr(1).match(reg)
    // 返回参数值
  return result ? decodeURIComponent(result[2]) : null
}

// 判断参数名
var urlaccusal = getUrlParam('q')
$('.search-input').val(urlaccusal)

function sure (num, type) {
  var accusal = $('.search-input').val()
  $('.search-con').html(accusal)
    $.post('/search', {q: accusal, from: (num -1) * 10}, function (resp) {
        var resp = JSON.parse(resp);
        total = resp.total
        $('.total').html(resp.total)
        if (resp.items.length > 0 && type != 'change') {
          loadData(num)
          loadpage()
        }
        loadingData(resp)
    })
}


var obj = {items: []}
new Vue({
    el: '#cause-list',
    data: obj
})
sure (num)

function loadingData (resp) {
  if (resp.items.length > 0) {
    $('.ibox').show()
    obj.items = resp.items
    console.log(obj)
  } else {
    $('.ibox').hide()
    $('.empty').show()
  }
}

// 分页功能
function loadData (num) {
  $('#PageCount').val(total)
}

function loadpage () {
  var myPageCount = parseInt(total)
  var myPageSize = parseInt('10')
  var countindex = myPageCount % myPageSize > 0 ? (myPageCount / myPageSize) + 1 : (myPageCount / myPageSize)
  $('#countindex').val(countindex)

  $.jqPaginator('#pagination', {
    totalPages: parseInt($('#countindex').val()),
    visiblePages: parseInt($('#visiblePages').val()),
    currentPage: 1,
    first: '<li class="first"><a href="javascript:;">首页</a></li>',
    prev: '<li class="prev"><a href="javascript:;"><i class="arrow arrow2"></i>上一页</a></li>',
    next: '<li class="next"><a href="javascript:;">下一页<i class="arrow arrow3"></i></a></li>',
    last: '<li class="last"><a href="javascript:;">末页</a></li>',
    page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
    onPageChange: function (num, type) {
      if (type == 'change') {
        sure(num, type)
      }
    }
  })
}
