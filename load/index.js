// import './style/bootstrap.min.css'
import './style/plug-in.scss'
import X from './class/X'

let x = {}

// jquery加载后执行
$(() => {
    x = new X()
    // 修改页面
    $('.taskBar').hide()
})