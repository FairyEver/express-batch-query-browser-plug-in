export default () => {
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