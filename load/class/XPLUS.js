import Csv from '../lib/csv'
import ExportCsv from '../lib/csvExport'

const domStr = `
<div class="x-plus">
    <div id="log"></div>
    <div class="uploader-textarea-group">
        <div>在这里粘贴单号，多个单号换行分割，不限制数量，然后点击下面的导入按钮</div>
        <textarea id="uploader-textarea"></textarea>
    </div>
    <div class="btn-ground">
        <button id="uploader-textarea-ok-btn" class="btn-x">导入</button>
        <button id="btn-start" type="button" class="btn-x">开始</button>
        <button id="btn-pause" type="button" class="btn-x">暂停</button>
        <button id="btn-go-on" type="button" class="btn-x">继续</button>
        <button id="btn-export" type="button" class="btn-x">导出</button>
    </div>
</div>
`.trim()

// 调试用的id
const ids = [
    // '630808830478',
    // '630808830485',
    // '630808830508',
    // '630358323368',
    // '630506310243',
    // '630808830609',
    // '630506310256',
    // '630808830616',
    // '630598531107',
    // '630598531975',
    // '630598531476',
    // '630598532152',
    // '630598531215',
    // '630598531463',
    // '630598531710',
    // '630598531759',
    // '630598531786',
    // '630598531842'
]

export default class XPLUS {
    constructor () {
        this.$log = null
        // 调试用的ids
        this.ids = ids
        this.idIndex = 0
        this.res = []
        this.play = false
        // 在页面上添加面板
        this.init()
        // hack
        $('#Panel1').html('')
        $('.taskBar').hide()
    }
    // 注册事件
    init () {
        // 将结构添加到页面上
        $('#ajaxdata').before($(domStr))
        this.$log = $('#log')
        $('#uploader-textarea-ok-btn').on('click', () => {
            if ($('#uploader-textarea').val().trim() == "") {
                layer.msg('请输入至少一个运单号码');
                return false;
            }
            let listI = $('#uploader-textarea').val().trim().split("\r\n");
            let listF = $('#uploader-textarea').val().trim().split("\n");
            let list = null;
            if (listI.length > listF.length) {
                list = listI;
            } else {
                list = listF;
            }
            this.ids = list
            this.log(`导入${this.ids.length}个订单查询任务 现在可以点击 [开始] 按钮开始自动处理`)
            $('#uploader-textarea').val('')
            return false
        })
        $('#btn-start').on('click', async () => {
            if (this.ids.length < 1) {
                layer.msg('请输入至少一个运单号码');
                return
            }
            this.play = true
            this.startSearch()
        })
        $('#btn-pause').on('click', () => {
            this.play = false
        })
        $('#btn-go-on').on('click', () => {
            this.play = true
            this.startSearch()
        })
        $('#btn-export').on('click', () => {
            this.exportCSV()
        })
    }
    log (text) {
        this.$log.text(text)
    }
    exportCSV () {
        ExportCsv.download('单号查询结果', Csv([
            {label: '运单编号', prop: 'yundanbianhao'},
            {label: '订单编号', prop: 'dingdanbianhao'},
            {label: '订单时间', prop: 'dingdanshijian'},
            {label: '发件人(电话)', prop: 'fajianrendianhua'},
            {label: '发件人地址', prop: 'fajianrendizhi'},
            {label: '收件人(电话)', prop: 'shoujianrendianhua'},
            {label: '收件人地址', prop: 'shoujianrendizhi'},
            {label: '揽件人', prop: 'lanjianren'},
            {label: '收件网点', prop: 'shoujianwangdian'},
            {label: '订单来源', prop: 'dingdanlaiyuan'},
            {label: '品名', prop: 'pinming'},
            {label: '代收款', prop: 'daishoukuan'}
        ], this.res, {}, false))
    }
    async startSearch () {
        const round = async () => {
            this.log(`${this.idIndex + 1} / ${this.ids.length} ${this.ids[this.idIndex]} 正在查询`)
            this.res.push(await this.one(this.ids[this.idIndex]))
            this.log(`${this.idIndex + 1} / ${this.ids.length} ${this.ids[this.idIndex]} 结束`)
            this.idIndex ++
            if (this.play) {
                if (this.idIndex < this.ids.length) {
                    round()
                } else {
                    this.exportCSV()
                    this.ids = []
                    this.idIndex = 0
                    this.play = false
                    this.res = []
                }    
            } else {
                layer.msg('已经暂停');
            }
        }
        round()
    }
    async one (id) {
        return new Promise(async (resolve, reject) => {
            const dingdanxinxi = await this.dingdanxinxi(id)
            const ludanjilu = await this.ludanjilu(id)
            const res = Object.assign({}, dingdanxinxi[0], ludanjilu[0])
            resolve(res)
        })
    }
    async dingdanxinxi (id) {
        return new Promise(async (resolve, reject) => {
            const table = await this.giveMeTable(id, 'A014')
            resolve(this.analysisTable(table, 'dingdanxinxi', id))
        })
    }
    async ludanjilu (id) {
        return new Promise(async (resolve, reject) => {
            const table = await this.giveMeTable(id, 'A013')
            resolve(this.analysisTable(table, 'ludanjilu', id))
        })
    }
    analysisTable (table, type, id) {
        const undefindStr = '未找到'
        const dingdanxinxiUndefind = {
            yundanbianhao: id,
            dingdanbianhao: undefindStr,
            dingdanshijian: undefindStr,
            fajianrendianhua: undefindStr,
            fajianrendizhi: undefindStr,
            shoujianrendianhua: undefindStr,
            shoujianrendizhi: undefindStr,
            lanjianren: undefindStr,
            shoujianwangdian: undefindStr,
            dingdanlaiyuan: undefindStr
        }
        const ludanjiluUndefind = {
            pinming: undefindStr,
            daishoukuan: undefindStr
        }
        if (!table) {
            if (type === 'dingdanxinxi') {
                return [dingdanxinxiUndefind]
            } else {
                return [ludanjiluUndefind]
            }
        }
        let res = []
        const tableStr = table.match(/<table[^>]*>[\s\S]*<\/table>/)[0]
        const trs = $(tableStr).children(1).children()
        // 订单信息
        if (type === 'dingdanxinxi') {
            if (trs.length <= 1) {
                res.push(dingdanxinxiUndefind)
            }
            for (let index = 1; index < trs.length; index++) {
                const tds = $(trs[index]).children()
                const row = {
                    yundanbianhao: "\t" + tds[0].innerHTML || '-',
                    dingdanbianhao: "\t" + tds[1].innerHTML || '-',
                    dingdanshijian: tds[2].innerHTML || '-',
                    fajianrendianhua: tds[3].innerHTML || '-',
                    fajianrendizhi: tds[4].innerHTML || '-',
                    shoujianrendianhua: tds[5].innerHTML || '-',
                    shoujianrendizhi: tds[6].innerHTML || '-',
                    lanjianren: tds[7].innerHTML || '-',
                    shoujianwangdian: tds[8].innerHTML || '-',
                    dingdanlaiyuan: $(tds[9]).text() || '-'
                }
                res.push(row)
            }
        }
        // 录单记录
        else if (type === 'ludanjilu') {
            if (trs.length <= 1) {
                res.push(ludanjiluUndefind)
            }
            for (let index = 1; index < trs.length; index++) {
                const tds = $(trs[index]).children()
                const row = {
                    pinming: tds[8].innerHTML || '-',
                    daishoukuan: tds[10].innerHTML || '-'
                }
                res.push(row)
            }
        }
        return res
    }
    // 返回凭证
    giveMeTickt (id, type) {
        const doTry = () => {
            return new Promise((resolve, reject) => {
                $.ajax({
                    url: `https://connect.zto.com/security-services/billtrack/billinfo-query-preauth?bill_id=${id}&type=${type}`,
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true
                    },
                    success (res) {
                        if (res.ticket) {
                            resolve(res.ticket)
                        } else {
                            doTry()
                        }
                    }
                })
            })
        }
        return doTry()
    }
    // 返回表格
    giveMeTable (id, type) {
        let count = 1
        const typeName = type === 'A014' ? '订单信息' : '录单记录'
        return new Promise((resolve, reject) => {
            const round = async () => {
                if (count !== 1 ) {
                    this.log(`${this.idIndex + 1} / ${this.ids.length} ${this.ids[this.idIndex]} ${typeName} 第${count}次查询数据`)
                }
                const tickt = await this.giveMeTickt(id, type)
                $.ajax({
                    url: `http://bills.zt-express.com/postdate.aspx?id=${id}&type=${type}&queryTicket=${tickt}`,
                    type: 'GET',
                    xhrFields: {
                        withCredentials: true
                    },
                    success (res) {
                        if (res) {
                            resolve(res)
                        } else {
                            if (count < 10) {
                                count ++
                                round()
                            } else {
                                resolve()
                            }
                        }
                    }
                })
            }
            round()
        })
    }
}