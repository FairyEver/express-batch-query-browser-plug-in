import 'babel-polyfill'
import './style/plug-in.scss'
import X from './class/X'
import XPLUS from './class/XPLUS'

// jquery加载后执行
$(() => {
    // const x = new X()
    const xplus = new XPLUS()
})