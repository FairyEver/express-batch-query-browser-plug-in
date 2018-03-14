import 'babel-polyfill'
import './style/plug-in.scss'
import X from './class/X'

// jquery加载后执行
$(() => {
    let x = new X()
})