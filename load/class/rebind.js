export default () => {
    $(document).off("click", ".menu li").on("click", ".menu li", function () {
        // 临时禁用这个按钮
        $(this).find("button").attr("disabled", "disabled").delay(100).animate({ disabled: '' });
        // 在 ztoAjax 中用到
        var index = $(this).index();
        // 单号 类似于 630644632616_0 这个数据是绑定在按钮上的
        var bill = $(this).find("button").attr("data-bill");
        // 忽略这两个按钮
        if ($(this).find("button").html() === "登记所有查询记录" || $(this).find("button").html() === "单号轨迹") {
            return
        }
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
                    const doIt = () => {
                        ztosec.billQueryPreauth({
                            bill: queryParms.id,
                            billType: queryParms.type
                        }, function (params) {
                            ticket = params.ticket
                        })
                        setTimeout(() => {
                            if (ticket) {
                                resolve(ticket)
                            } else {
                                doIt()
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