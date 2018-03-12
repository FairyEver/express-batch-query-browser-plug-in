export default (ids) => {
    return new Promise((resolve, reject) => {
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
                                $(`button[data-id='taobaodingdan'][data-bill='${list[0]}_0']`)[0].click()
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