$(document).ready(function () {
    baseJS = new BaseJS();
})

class BaseJS {

    constructor(name) {
        debugger;
        try {
            this.getData();
            this.loadData();
            this.initEvent();
        } catch (e) {
            console.log('error');
        }
    }

    getData() {
        this.Data = [];
    }
    /**
     * Hàm load dữ liệu khách hảng
     * Author: TDNAM (21/09/2020)
     * Edit: TDNAM (28/09/2020) Sửa cách đọc dữ liệu theo hướng đói tượng
     * */
    loadData() {
        try {
            // Đọc thông tin các cột dữ liệu
            var fields = $('table thead th');
           
            console.log(fields);
            // Lấy dữ liệu: 
            var data = this.Data;
            var self = this;
            // Đọc dữ liệu:
            $('.grid table tbody').empty();
            $.each(data, function (index, obj) {
                var tr = $(`<tr></tr>`)
                $.each(fields, function (index, field) {
                    debugger;
                    var fieldName = $(field).attr('fieldName');
                    var value = obj[fieldName];
                    var td;
                    if (fieldName == 'DateOfBirth') {
                        td = $(`<td>` + commonJS.formatDate(value) + `</td>`);
                    }
                    else if (fieldName == 'Salary') {
                        td = $(`<td>` + commonJS.formatMoney(value) + `</td>`);

                    }
                    else {

                        td = $(`<td>` + value + `</td>`);
                    }
                    $(tr).append(td);
                })
                // Binding dữ liệu lên UI:
                //debugger
                //var trHTML = self.makeTrHTML(obj);
                $('.grid table tbody').append(tr);
            })
        } catch (e) {
            console.log('error');
        }
    }
    /**
     * Build HTML cho tr:
     * Author: TDNAM (27/09/2020)
     * */
    makeTrHTML(obj) {

    }

    /**
     * Hàm kiểm tra tính duy nhất của index 
     * Author: TDNAM (29/09/2020)
     * */
    //checkUnique(id) {
    //    //lấy dữ liệu để duyệt
    //    var data = this.Data;
    //    $.each(data, function (index, item) {
    //        if (item. == id) {
    //            return false;
    //        }
    //        return true;
    //    })

    //}
    /**
     * Hàm khởi tạo các sự kiện
     * Author: TDNAM (20/09/2020)
     * Edit: TDNAM (27/09/2020) - thêm hàm load dữ liệu
     * */
    initEvent() {
        $('.toolbar-btn-add').click(this.btnAddOnClick.bind(this));
        $('.btn-cancle').click(this.btnCancleOnClick.bind(this));
        $('.fa-times-circle').click(this.btnCancleOnClick.bind(this));
        $('.btn-store').click(this.btnSaveOnClick.bind(this));
        $('input[required]').blur(this.checkRequired);
        $('.toolbar-btn-edit').click(this.btnEditOnClick.bind(this));
        $('.toolbar-btn-del').click(this.btnDeleteOnClick.bind(this));
        //$('#tbCustomer tbody tr').click(this.rowClickTable);
        $("table tbody").on("click", "tr", this.rowClickTable);
        $('#toolbar-btn-load').click(this.btnReloadOnClick.bind(this));


    }
    //#region "Các sự kiện button"
    /**
     * Hàm sự kiện click vào button Thêm
     * Author: TDNAM (21/09/2020)
     * */
    btnAddOnClick() {
        this.Getbutton = 1;
        this.showDialogDetail();
    }
    /**
     * Hàm sự kiện click vào button Hủy
     * Author: TDNAM (21/09/2020)
     * */
    btnCancleOnClick() {
        this.hideDialogDetail();
    }
    /**
     * Hàm sự kiện click vào button Cất
     * Author: TDNAM (22/09/2020)
     * Edit: TDNAM (29/09/2020)
     * */
    btnSaveOnClick() {
        debugger;
    }

    /**
     * Viết hàm load lại dữ liệu
     * Author: TDNAM (27/09/2020)
     * */
    btnReloadOnClick() {
        this.loadData();
    }
    /**
     * Hàm kiểm tra validate dữ liệu
     * Author: TDNAM (22/09/2020)
     * */

    //#endregion "Các sự kiện button";
    checkRequired() {
        var value = this.value;

        if (!value) {
            $(this).addClass("required-error");
            $(this).attr("title", "Bạn phải nhập thông tin này!");
        } else {
            $(this).removeClass("required-error");
            $(this).removeAttr("title");
        }

    }
    /**
     * Hiển thị dialog chi tiết
     * Author: TDNAM (21/09/2020)
     * */
    showDialogDetail() {
        $('.modal').show();
        $('.dialog-form').show();
        $("#txtCustomerId").focus();

    }
    /**
     * Ẩn dialog chi tiết
     * Author: TDNAM (21/09/2020)
     * */
    hideDialogDetail() {
        $('.modal').hide();
        $('.dialog-form').hide();
    }

    /**
     * Refresh lại form dialog sau khi thêm, sửa thành công
     * Author: TDNAM (21/09/2020)
     * */

    Refresh() {
        $("#txtCustomerId").val('');
        $("#txtCustomerName").val('');
        $("#txtManageName").val('');
        $("#txtTaxId").val('');
        $("#txtAddress").val('');
        $("#txtPhoneNumber").val('');
        $("#txtEmail").val('');
    }
    /**
     * Viết hàm lấy đối tượng khi click vào bảng
     * Author: TDNAM (22/09/2020)
     * TODO: Cần sửa lại
     * */

    rowClickTable() {
        debugger;
        $(this).siblings().removeClass("row-selected");
        $(this).addClass("row-selected");
    }
    /**
     * Viết hàm click vao button Sua
     * Author: TDNAM (22/09/2020)
     * Edit: TDNAM  (28/09/2020)
     * TODO: Cần sửa lại
     * 
     * */
    btnEditOnClick() {
        
    }
    /**
     * Viết hàm click vao button Xoa
     * Author: TDNAM (22/09/2020)
     * TODO: Cần sửa lại
     * */
    btnDeleteOnClick() {
        
    }
}




