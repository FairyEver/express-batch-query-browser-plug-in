let x = {
    panelShow: true,
    dom: {}
}

const readXlsx = file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      const fixdata = data => {
        let o = ''
        let l = 0
        const w = 10240
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      }
      const getHeaderRow = sheet => {
        const headers = []
        const range = XLSX.utils.decode_range(sheet['!ref'])
        let C
        const R = range.s.r
        for (C = range.s.c; C <= range.e.c; ++C) {
          var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
          var hdr = 'UNKNOWN ' + C
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
          headers.push(hdr)
        }
        return headers
      }
      reader.onload = e => {
        const data = e.target.result
        const fixedData = fixdata(data)
        const workbook = XLSX.read(btoa(fixedData), { type: 'base64' })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const header = getHeaderRow(worksheet)
        const results = XLSX.utils.sheet_to_json(worksheet)
        resolve({header, results})
      }
      reader.readAsArrayBuffer(file)
    })
}

// 等待
const sleep = async (time = 0) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

// 将操作界面添加到页面
const domCreat = () => {
    $('body').append($(`
    <div class="x">
        <div class="x-header">
            批量操作
            <span class="toggle" id="panelToggleButton">隐藏</span>
        </div>
        <div class="x-body" id="panelBody">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text">选择单号文件</span>
                </div>
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="upload">
                    <label class="custom-file-label" for="upload">请选择保存单号的 .xlsx 文件</label>
                </div>
            </div>
            <p>进度</p>
            <div class="progress">
                <div
                    class="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    aria-valuenow="75"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    style="width: 75%">
                </div>
            </div>
        </div>
    </div>
    `.trim()))
}
// 将页面元素注册到缓存
const domCache = () => {
    // id的可以这样注册
    [
        'panelToggleButton',
        'panelBody',
        'upload'
    ].forEach(e => {
        x.dom[e] = $(`#${e}`)
    })
}
// 给页面元素注册事件
const domRegistMethod = () => {
    // 面板切换按钮
    x.dom.panelToggleButton.on('click', () => {
        if (x.panelShow) {
            x.dom.panelBody.hide()
            x.panelShow = false
            x.dom.panelToggleButton.text('显示')
        } else {
            x.dom.panelBody.show()
            x.panelShow = true
            x.dom.panelToggleButton.text('隐藏')
        }
    })
    // 打开Excel文件输入框
    x.dom.upload.on('change', () => {
        const file = x.dom.upload.get(0).files[0]
        readXlsx(file)
            .then(res => {
                console.log(res)
            })
    })
}

// jquery加载后执行
$(async () => {
    // 将操作界面添加到页面
    domCreat()
    // 将页面元素注册到缓存
    domCache()
    // 给页面元素注册事件
    domRegistMethod()
    // 操作页面中的函数 载入数据
    loadData()
})
