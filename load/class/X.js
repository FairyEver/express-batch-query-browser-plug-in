import domStr from './dom'

import Csv from '../lib/csv'
import ExportCsv from '../lib/csvExport'

export default class X {
    constructor () {
        this.play = false
        // 重新注册事件
        this.rebind()
        // 在页面上添加面板
        $('#ajaxdata').before($(domStr))
        // 需要查询的列表
        this.ids = [
            '630808830478',
            '630808830485',
            '630808830508',
            '630358323368',
            '630506310243',
            '630808830609',
            '630506310256',
            '630808830616',
            '630598531107',
            '630598531975',
            '630598531476',
            '630598532152',
            '630598531215',
            '630598531463',
            '630598531710',
            '630598531759',
            '630598531786',
            '630598531842'
        ]
        // 当前正在查的ID的index
        this.idIndex = 0
        // 已经完成的
        this.finish = []
        // 注册
        this.cache()
        this.register()
        // hack
        this.hackPage()
        // 开发测试
        // this.startSearch()
    }
    hackPage () {
        $('#Panel1').html('')
        $('.taskBar').hide()
    }
    // 重新绑定事件
    rebind () {
        let _this = this
        $(document).off("click", ".menu li").on("click", ".menu li", function () {
            // 临时禁用这个按钮
            $(this).find("button").attr("disabled", "disabled").delay(100).animate({ disabled: '' });
            // 在 ztoAjax 中用到
            var index = $(this).index();
            // 单号 类似于 630644632616_0 这个数据是绑定在按钮上的
            var bill = $(this).find("button").attr("data-bill");
            // 忽略这两个按钮
            if ($(this).find("button").html() === "登记所有查询记录" || $(this).find("button").html() === "单号轨迹") { return }
            // 需要处理事件的按钮
            if (!$(this).hasClass("curr")) {
                // 从这个按钮上获取数据
                var url = $(this).find("button").attr("data-url");
                var id = $(this).find("button").attr("data-id");
                var text = $(this).find("button").text().trim();
                var queryParms = getUrlParmas(url);
                var currentButton = this;
                // 给我刷！
                const billQueryPreauthFn = () => {
                    return new Promise((resolve, reject) => {
                        let ticket = ''
                        let count = 1
                        const doIt = () => {
                            $('#log').text(`第${_this.idIndex + 1}个 / 共${_this.ids.length}个 单号：${queryParms.id} 获取Ticket 第${count}次 正在请求`)
                            ztosec.billQueryPreauth({
                                bill: queryParms.id,
                                billType: queryParms.type
                            }, function (params) {
                                ticket = params.ticket
                                $('#log').text(`第${_this.idIndex + 1}个 / 共${_this.ids.length}个 单号：${queryParms.id} 获取Ticket 第${count}次 成功 Ticket：${ticket}`)
                                resolve(ticket)
                            })
                            setTimeout(() => {
                                if (ticket === '') {
                                    $('#log').text(`第${_this.idIndex + 1}个 / 共${_this.ids.length}个 单号：${queryParms.id} 获取Ticket 第${count}次 失败`)
                                    setTimeout(() => {
                                        count += 1
                                        doIt()
                                    }, 300)
                                }
                            }, 1000)
                        }
                        doIt()
                    })
                }
                billQueryPreauthFn()
                    // 好 刷到了
                    .then(ticket => {
                        $('#log').text(`第${_this.idIndex + 1}个 / 共${_this.ids.length}个 单号：${queryParms.id} 开始请求订单信息`)
                        ztoAjax({
                            url: url + "&queryTicket=" + ticket,
                            type: "get",
                            data: "",
                            index: index,
                            bill: bill,
                            id: id,
                            text: text
                        });
                        $(currentButton).addClass("curr");
                        // 上面的操作结束后，如果有结果的话 就该到页面里了
                        setTimeout(() => {
                            // 分析表格数据
                            $('#log').text(`第${_this.idIndex + 1}个 / 共${_this.ids.length}个 单号：${queryParms.id} 开始分析表格数据`)
                            _this.getDataFromTable(queryParms.id)
                            _this.idIndex ++
                            // 判断是否还要继续
                            if (_this.play) {
                                if (_this.idIndex < _this.ids.length) {
                                    _this.startSearch()
                                } else {
                                    _this.exportCSV()
                                    $('#log').text(`${_this.ids.length}个订单信息查询完成 结果已导出`)
                                }
                            } else {
                                _this.exportCSV()
                                $('#log').text(`第${_this.idIndex + 1}个 / 共${_this.ids.length}个 单号：${queryParms.id} 暂停`)
                            }
                        }, 1000);
                    })
            } else {
                $(this).removeClass("curr");
                var id = $(this).find("button").attr("data-id");
                if ($(this).find("button").html() != "修改记录") {
                    $("." + id).remove();
                } else {
                    $("." + id).removeClass("curr");
                }
            }
        })
    }
    // 从页面上获取数据
    getDataFromTable (id) {
        const ul = $(`#route${id}_0`)
        const trs = ul.find('.curr.taobaodingdan table').children(1).children()
        for (let index = 1; index < trs.length; index++) {
            const tds = $(trs[index]).children()
            const row = {
                yundanbianhao: "\t" + tds[0].innerHTML,
                dingdanbianhao: "\t" + tds[1].innerHTML,
                dingdanshijian: tds[2].innerHTML,
                fajianrendianhua: tds[3].innerHTML,
                fajianrendizhi: tds[4].innerHTML,
                shoujianrendianhua: tds[5].innerHTML,
                shoujianrendizhi: tds[6].innerHTML,
                lanjianren: tds[7].innerHTML,
                shoujianwangdian: tds[8].innerHTML,
                dingdanlaiyuan: $(tds[9]).text()
            }
            this.finish.push(row)
        }
    }
    // 搜索 这一步只是返回列表
    search (id = '') {
        $('#log').text(`第${this.idIndex + 1}个 / 共${this.ids.length}个 单号：${id} 开始请求列表`)
        return new Promise((resolve, reject) => {
            $("#txtJobNoList").val(id)
            var txtbill = document.getElementById("txtJobNoList");
            var list = txtbill.value.trim().split("\n");
            ztosec.queryReport({ bill_ids: list }, function () {
                var billcode = $("#txtJobNoList").val();
                $("#Panel1,.xubox_layer").hide();
                var showdiv = $("#showdiv").val();
                var history = "";
                if (document.getElementById("chkzidou2").checked) {
                    history = "true";
                }
                $(".taskBar li,.xubox_layer").removeClass("curr");
                $(".docBubble").remove();
                var date1 = new Date();  //开始时间
                var loadLayer;
                if (isSearch) {
                    if (reqScanTips) {
                        reqScanTips.abort();
                        isSearch = true;
                    }
                    reqScanTips = $.ajax({
                        type: "post",
                        cache: false,
                        timeout: 60000,
                        url: "bills2.aspx",
                        data: {
                            Bill: billcode, showdiv: showdiv, history: history
                        },
                        beforeSend: function () {
                            isSearch = false;
                            $("#Button1").addClass("gray");
                            $("#sxubox_layer20").show();
                        },
                        // dataType: "html",
                        dataType: "jsonp",
                        jsonp: "callbackfun",
                        error: function (a, b, c) {
                            isSearch = true;
                            $("#Button1").removeClass("gray");
                            $("#sxubox_layer20").hide();
                            $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>数据加载出错，刷新页面重新查询一次。联系管理员：林毕成 QQ：1299450042</div>");
                        },
                        success: function (rs) {
                            isSearch = true; 
                            $("#Button1").removeClass("gray");
                            if (rs.n == "" || rs.n == null) {
                                $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>返回结果为空,请联系管理员。</div>");
                            } else {
                                if (rs.n.length < 300) {
                                    $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>" + rs.n + "</div>");
                                } else {
                                    $("#ajaxdata").html(rs.n);
                                    resolve()
                                }
                                dialogOnresizeparameters();
                            }
                            var date2 = new Date();    //结束时间
                            var date3 = date2.getTime() - date1.getTime();  //时间差的毫秒数
                            $(".totalTime").html("耗时：" + date3 / 1000 + "秒");
                            $("#sxubox_layer20").hide();
                            setTimeout("getUserState()", 2000);//延时1秒  
                        },
                        complete: function () {
                            isSearch = true;
                            $("#sxubox_layer20").hide();
                        }
                    });
                }
            })
        })
    }
    // 缓存元素
    cache () {
        // 原页面带的元素
        this.$ZTO_input = $('#txtJobNoList')
        // 新增的元素
        this.$panel = $('#panel')
        this.$panelToggleBtn = $('#panelToggleBtn')
        this.$uploader = $('#uploader')
        this.$helpButton = $('#helpButton')
        this.$startButton = $('#startButton')
        this.$pauseButton = $('#pauseButton')
        this.$goonButton = $('#goonButton')
        this.$downloadButton = $('#downloadButton')
    }
    // 注册事件
    register () {
        // 切换显示隐藏面板
        this.$panelToggleBtn.on('click', () => {
            if (this.$panel.is(":hidden")) {
                this.panelShow()
            } else {
                this.panelHide()
            }
        })
        // 载入
        this.$uploader.on('change', () => {
            const file = this.$uploader.get(0).files[0]
            const reader = new FileReader()
            reader.readAsText(file, 'utf-8')
            reader.onload = e => {
                this.ids = e.target.result.split("\n")
                $('#log').text(`导入${this.ids.length}个订单查询任务 现在可以点击 [开始] 按钮开始自动处理`)
            }
        })
        // 开始按钮
        this.$startButton.on('click', () => {
            if (this.ids.length === 0) {
                alert('请先导入待处理的单号文件')
                return
            }
            this.play = true
            this.startSearch()
        })
        // 暂停按钮
        this.$pauseButton.on('click', () => {
            this.play = false
        })
        // 继续按钮
        this.$goonButton.on('click', () => {
            if (this.ids.length === 0) {
                alert('请先导入待处理的单号文件')
                return
            }
            this.play = true
            this.startSearch()
        })
        // 帮助按钮
        this.$helpButton.on('click', () => {
            alert(`
1. 点击“选择文件”，将保存有单号的记事本文件加载进来
2. 加载完成后会显示单号条数
3. 确认无误后点击开始按钮
4. 全部查询完毕后会自动导出表格，也可以手动导出
5. 刷新页面可重置插件
            `.trim())
        })
        // 下载按钮
        this.$downloadButton.on('click', () => {
            this.exportCSV()
        })
    }
    // 显示面板
    panelShow () {
        this.$panel.show()
        this.$panelToggleBtn.text('隐藏')
    }
    // 隐藏面板
    panelHide () {
        this.$panel.hide()
        this.$panelToggleBtn.text('显示')
    }
    // 搜索数据
    startSearch () {
        const id = this.ids[this.idIndex]
        this.search(id).then(() => {
            // 点击查询按钮
            $(`button[data-id='taobaodingdan'][data-bill='${id}_0']`)[0].click()
        })
    }
    // 将数据以CSV形式导出
    exportCSV () {
        // 合并参数
        const _params = {
            columns: [
                {label: '运单编号', prop: 'yundanbianhao'},
                {label: '订单编号', prop: 'dingdanbianhao'},
                {label: '订单时间', prop: 'dingdanshijian'},
                {label: '发件人(电话)', prop: 'fajianrendianhua'},
                {label: '发件人地址', prop: 'fajianrendizhi'},
                {label: '收件人(电话)', prop: 'shoujianrendianhua'},
                {label: '收件人地址', prop: 'shoujianrendizhi'},
                {label: '揽件人', prop: 'lanjianren'},
                {label: '收件网点', prop: 'shoujianwangdian'},
                {label: '订单来源', prop: 'dingdanlaiyuan'}
            ],
            data: this.finish,
            title: 'table',
            noHeader: false
        }
        // 生成数据
        const data = Csv(_params.columns, _params.data, {}, _params.noHeader)
        // 下载数据
        ExportCsv.download(_params.title, data)
    }
}