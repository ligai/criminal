function initData () {
  var str = window.location.href
  var index = str.lastIndexOf('?')
  var params = str.substring(index + 1, str.length)
  $.get('/content/detail2?'+params, function (resp) {
    var resp = JSON.parse(resp)
    new Vue({
      el: '#ibox',
      data: {
        title: resp.title,
        html: resp.html
      }
    })
  })
}
initData()


