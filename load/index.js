import './style/bootstrap.min.css'
import './style/plug-in.scss'

import X from './class/X'

// 面板显示
let panelShow = true

const x = new X()

// 将操作界面添加到页面
const domCreat = () => {
    // 面板切换按钮
    $('#panelToggleButton').on('click', () => {
        if (panelShow) {
            panelShow = false
            $('#panelBody').hide()
            $('#panelToggleButton').text('显示')
        } else {
            panelShow = true
            $('#panelBody').show()
            $('#panelToggleButton').text('隐藏')
        }
    })
    // Excel载入
    $('#excelUploader').on('change', () => {
        const file = $('#excelUploader').get(0).files[0]
        var reader = new FileReader();
        reader.readAsText(file, 'utf-8');
        reader.onload = function (e) {
            var fileText = e.target.result.split("\n");
            console.log(fileText)
        }
    })
}

// jquery加载后执行
$(() => {
    // 将操作界面添加到页面
    domCreat()
    // 操作页面中的函数 载入数据
    loadData()
})