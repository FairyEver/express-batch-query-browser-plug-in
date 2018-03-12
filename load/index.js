import './style/bootstrap.min.css'
import './style/plug-in.scss'
import X from './class/X'

// jquery加载后执行
$(() => {
    const x = new X()
    // 操作页面中的函数 载入数据
    loadData()
})