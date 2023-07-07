////var controls = $('[lang]');
var data = {};
////for (var i in controls) {
////    try {
////        var key = controls[i].getAttribute('lang');
////        //var ctrl = document.getElementById(id);
////        var ctrl = $("[lang=" + key + "]")[0];
////        var val = ctrl.innerHTML;
////        val = (val == undefined || val == null) ? '' : val;
////        if (key != null && key != undefined) {
////            data[key] = val;
////        }
////    }
////    catch (error) {

////    }
////}

////$("[langid]").each(function (index) {
////    var k = $(this).attr("langid");
////    var tmp = k.split("-").pop();
////    var v = $(this).attr(tmp);
////    v = (v == undefined || v == null) ? '' : v;
////    if (k != null && k != undefined) {
////        data[k] = v;
////    }
////});


function DownloadJSON() {
    if ((jQuery.isEmptyObject(data))) {
        return;
    }
    var host = window.location.host;
    if (host == null || host == undefined || !(host.includes("localhost"))) {
        return;
    }

    var json = JSON.stringify(data, null, 2);

    json = [json];
    var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });

    //Check the Browser.
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "lang.json");
    } else {
        var url = window.URL || window.webkitURL;
        link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "lang.json";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

function DisplayJSON() {
    if ((jQuery.isEmptyObject(data))) {
        return;        
    }
    var host = window.location.host;
    if (host == null || host == undefined || !(host.includes("localhost"))) {
        return;
    }
    var t = JSON.stringify(data, null, 2);
    var text = document.createTextNode(t);

    var $dialog = $('<textarea readonly style="width: 680px; min-width: 439px; max-height: none; height: 439px; margin: 0px;"></textarea>')
        .html("Danh sách lang key")
        .dialog({
            modal: true,
            width: 800,
            height: 600,
            resizable: false,
        });
    $dialog.dialog('open');
    $dialog.html(text);
}

function XuLyJSON() {
    data = {};
    $("[lang]").each(function (index) {
        var key = $(this).attr("lang");
        var val = $(this).html();
        val = (val == undefined || val == null) ? '' : val;

        if (key != null && key != undefined) {
            data[key] = val;
        }
    });

    $("[langid]").each(function (index) {
        var k = $(this).attr("langid");
        var attr = k.split("-").pop();
        var v = null;
        var tmp = String(attr).trim();
        switch (tmp) {
            case "combobox":
                v = $(this).find("option:first-child").html();
                break;
            case "kendocombobox":
                var ctrlID = $(this).attr("id");
                var comboBox = $('#' + ctrlID).data("kendoComboBox");
                if (comboBox) {
                    v = $(comboBox.input).attr('placeholder');
                }
                break;
            default:
                v = $(this).attr(attr);
        }


        //if (String(tmp).trim() === "combobox") {
        //    v = $(this).find("option:first-child").html();
        //}
        //else {
        //    v = $(this).attr(tmp);
        //}

        v = (v == undefined || v == null) ? '' : v;
        if (k != null && k != undefined) {
            data[k] = v;
        }
    });

    //
    DownloadJSON();
}


