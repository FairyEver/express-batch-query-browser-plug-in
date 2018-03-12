import domStr from './dom'

import Csv from '../lib/csv'
import ExportCsv from '../lib/csvExport'

export default class X {
    constructor () {
        // 在页面上添加面板
        $('body').append($(domStr))
        // 需要查询的列表
        this.ids = [
            '630644632616',
            '630644632566',
            '630644632458',
            '630644632433',
            '630644632340',
            '630644632256',
            '630644625936',
            '630644625861',
            '630644625714',
            '630644619477',
            '630644619460',
            '630644619452'
        ]
        // 已经完成的
        this.finish = []
        // 注册
        this.cache()
        this.register()
    }
    // 缓存元素
    cache () {
        // 原页面带的元素
        this.$ZTO_input = $('#txtJobNoList')
        // 新增的元素
        this.$panel = $('#panel')
        this.$panelToggleBtn = $('#panelToggleBtn')
        this.$uploader = $('#uploader')
        this.$progress = $('#progress')
        this.$progressTitle = $('#progressTitle')
        this.$progressBar = $('#progressBar')
        this.$control = $('#control')
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
        // Excel载入
        this.$uploader.on('change', () => {
            const file = this.$uploader.get(0).files[0]
            const reader = new FileReader()
            reader.readAsText(file, 'utf-8')
            reader.onload = e => {
                this.ids = e.target.result.split("\n")
                if (this.ids.length > 0) {
                    this.$progress.show()
                    this.$control.show()
                }
            }
        })
        // 开始按钮
        this.$startButton.on('click', () => {
            this.startSearch()
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
    // 更新进度条
    progressUpdate () {
        const n = Math.round(this.finish.length / this.ids.length * 100)
        this.$progressBar.css('width', `${n}%`)
    }
    // 开始搜索数据
    startSearch () {
        $("#txtJobNoList").val(this.ids[0])
        // 校验是否输入框有值
        var txtbill = document.getElementById("txtJobNoList");
        if (txtbill.value.trim() == "") {
            layer.msg('请输入运单号码', 2);
            $(".xubox_main").css({ "border-radius": "0px 0px 0px 0px" });
            return false;
        }
        var listI = txtbill.value.trim().split("\r\n");
        var listF = txtbill.value.trim().split("\n");
        var list = null;
        if (listI.length > listF.length) {
            list = listI;
        } else {
            list = listF;
        }
        if (list.length > 50) {
            $(".xubox_main").css({ "border-radius": "0px 0px 0px 0px" });
            layer.msg('一次最多查询50单', 2);
            return false;
        }
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
                        //loadLayer = layer.load(3);
                        $("#sxubox_layer20").show();
                        //$("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\">数据加载中</div>");
                    },
                    // dataType: "html",
                    dataType: "jsonp",
                    jsonp: "callbackfun",
                    error: function (a, b, c) {
                        // console.log(b);
                        isSearch = true;
                        $("#Button1").removeClass("gray");
                        $("#sxubox_layer20").hide();
                        $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>数据加载出错，刷新页面重新查询一次。联系管理员：林毕成 QQ：1299450042</div>");
                        //$("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>数据加载出错，请重试！</div>");
                    },
                    success: function (rs) {
                        console.log(rs)
                        isSearch = true; 
                        $("#Button1").removeClass("gray");
                        if (rs.n == "" || rs.n == null) {
                            $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>返回结果为空,请联系管理员。</div>");
                        } else {
                            if (rs.n.length < 300) {
                                // console.log(rs.n);
                                $("#ajaxdata").html("<div style=\"text-align:center; width:100%; line-height:150%;margin-top: 130px;\"><img src=\"/images/error.png\" width=\"150\" /><br/>" + rs.n + "</div>");
                            } else {
                                $("#ajaxdata").html(rs.n);
                            }
                            dialogOnresizeparameters();

                        }
                        var date2 = new Date();    //结束时间
                        var date3 = date2.getTime() - date1.getTime();  //时间差的毫秒数
                        $(".totalTime").html("耗时：" + date3 / 1000 + "秒");
                        $("#sxubox_layer20").hide();
                        //myjx.refresh();//刷新吉信状态 
                        setTimeout("getUserState()", 2000);//延时1秒  
                    },
                    complete: function () {
                        isSearch = true;
                        // layer.close(loadLayer);
                        $("#sxubox_layer20").hide();
                    }

                });
            }
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
            data: [
                {
                    name: 'lucy',
                    age: 24
                  },
                  {
                    name: 'bob',
                    age: 26
                  }
            ],
            title: 'table',
            noHeader: false
        }
        // 生成数据
        const data = Csv(_params.columns, _params.data, {}, _params.noHeader)
        // 下载数据
        ExportCsv.download(_params.title, data)
    }
}