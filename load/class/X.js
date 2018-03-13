import domStr from './dom'

import Csv from '../lib/csv'
import ExportCsv from '../lib/csvExport'

export default class X {
    constructor () {
        // 重新注册事件
        this.rebind()
        // 在页面上添加面板
        $('#ajaxdata').before($(domStr))
        // 需要查询的列表
        this.ids = [
            '630644632616',
            '630644632566',
            // '630644632458',
            // '630644632433',
            // '630644632340',
            // '630644632256',
            // '630644625936',
            // '630644625861',
            // '630644625714',
            // '630644619477',
            // '630644619460',
            // '630644619452'
        ]
        // 当前正在查的ID的index
        this.idIndex = 0
        // 已经完成的
        this.finish = []
        // 注册
        this.cache()
        this.register()
        // 开发测试
        // this.startSearch()
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
                            $('#log').text(`${_this.idIndex + 1} / ${_this.ids.length} 获取凭证 单号：${queryParms.id} 第${count}次`)
                            ztosec.billQueryPreauth({
                                bill: queryParms.id,
                                billType: queryParms.type
                            }, function (params) {
                                ticket = params.ticket
                                $('#log').text(`${_this.idIndex + 1} / ${_this.ids.length} 获取凭证 单号：${queryParms.id} 成功 凭证：${ticket} 共查询${count}次`)
                                resolve(ticket)
                            })
                            setTimeout(() => {
                                if (ticket === '') {
                                    $('#log').text(`${_this.idIndex + 1} / ${_this.ids.length} 获取凭证 单号：${queryParms.id} 失败`)
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
                        setTimeout(() => {
                            _this.getDataFromTable(queryParms.id)
                            _this.idIndex ++
                            if (_this.idIndex < _this.ids.length) {
                                _this.startSearch()
                            } else {
                                _this.exportCSV()
                                $('#log').text(`${_this.ids.length}个订单信息查询完成 结果已导出`)
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
                yundanbianhao: tds[0].innerHTML,
                dingdanbianhao: tds[1].innerHTML,
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
    search (id = '') {
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
                $('#log').text(`导入${this.ids.length}个订单查询任务 现在可以点击[开始]按钮开始自动处理`)
            }
        })
        // 开始按钮
        this.$startButton.on('click', () => {
            if (this.ids.length === 0) {
                alert('请先导入待处理的单号文件')
                return
            }
            this.startSearch()
        })
        // 帮助按钮
        this.$helpButton.on('click', () => {
            alert(`
1
2
3
4
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
    // 开始搜索数据
    startSearch () {
        const id = this.ids[this.idIndex]
        this.search(id)
            .then(() => {
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