console.log('plug-in is load')

if ($) {
    console.log('jQuery ready') 
}

// 测试代码
const test =  () => {
    // 调用测试方法
    search()
    // 检测输入框的值
    console.log('#input值为:', $('#input').val())
    // 重新赋值
    $('#input').val('这是新的值')
    console.log('#input赋值结束')
    // 检测输入框的值
    console.log('#input值为:', $('#input').val())
}

const creatPanel

// jquery加载后执行
$(() => {
    // 测试 正式用的时候删除
    test()
})
