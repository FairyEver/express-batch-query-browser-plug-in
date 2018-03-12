export default () => {
    $(document).off("click", ".menu li").on("click", ".menu li", function () {
        console.log('这是新的哦')
        $(this).find("button").attr("disabled", "disabled").delay(100).animate({ disabled: '' });
        var index = $(this).index();
        var bill = $(this).find("button").attr("data-bill");
        if ($(this).find("button").html() != "登记所有查询记录" && $(this).find("button").html() != "单号轨迹") {
            if (!$(this).hasClass("curr")) {
                
                var url = $(this).find("button").attr("data-url");
                var id = $(this).find("button").attr("data-id");
                var text = $(this).find("button").text().trim();
                var queryParms = getUrlParmas(url);

                var currentButton = this;
                ztosec.billQueryPreauth({ bill: queryParms.id, billType: queryParms.type }, function (params) {
                        ztoAjax({
                            url: url + "&queryTicket=" + params.ticket,
                            type: "get",
                            data: "",
                            index: index,
                            bill: bill,
                            id: id,
                            text: text
                        });

                        $(currentButton).addClass("curr");

                    }
                );
                
            } else {
                $(this).removeClass("curr");
                var id = $(this).find("button").attr("data-id");
                if ($(this).find("button").html() != "修改记录") {
                    $("." + id).remove();
                } else {
                    $("." + id).removeClass("curr");
                }
            }
        }
    });
}