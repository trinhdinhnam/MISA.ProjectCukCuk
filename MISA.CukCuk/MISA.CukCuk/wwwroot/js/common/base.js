$(document).ready(function () {
})
class BaseJS {

    constructor(name) {
        debugger;
        try {
            var formMode;
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
                    var td;
                    var value;
                    switch (fieldName) {
                        case 'DateOfBirth':
                            value = commonJS.formatDate(obj[fieldName]);

                            break;
                        case 'Salary':
                            value = commonJS.formatMoney(obj[fieldName]);
                            break;

                        default:
                            value = obj[fieldName];
                            break;
                    }
                    //value = obj[fieldName];

                    td = $(`<td>` + value + `</td>`);

                    $(tr).append(td);
                })
                // Binding dữ liệu lên UI:
                //debugger
                //var trHTML = self.makeTrHTML(obj);
                $('.grid table tbody').append(tr);
                $(this).siblings().removeClass("row-selected");

            })
        } catch (e) {
            console.log('error');
        }
    }
    /**
     * Build HTML cho tr:
     * Author: TDNAM (27/09/2020)
     * @param {object} đối tượng
     * */
    makeTrHTML(obj) {

    }


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
        $("table tbody").on("click", "tr", this.rowClickTable);
        $('#toolbar-btn-load').click(this.btnReloadOnClick.bind(this));
        $('#iconbar').click(this.btnCloseMenu.bind(this));

    }
    //#region "Các sự kiện button"
    /**
     * Hàm sự kiện click vào button Thêm
     * Author: TDNAM (21/09/2020)
     * */
    btnAddOnClick() {
        this.formMode = 1;
        this.showDialogDetail();
    }

    /**
    * Hàm click Edit Customer
    * Author: TDNAM (28/09/2020)
    * Edit: TDNAM (02/10/2020)
    * */
    btnEditOnClick() {
        debugger;
        this.formMode = 2;
        var self = this;
        var objEdit = {};
        //Lấy dữ liệu của row tương ứng đã chọn
        //1. Xác định đối tượng nào đã được chọn nào dã được chọn
        var trSelected = $("table tr.row-selected");
        //2. Lấy thông tin theo mã đối tượng
        if (trSelected.length > 0) {
            //Hiển thị form chi tiết:
            self.showDialogDetail();
            var inputId = $('.indexObj');
            var objectId = $(trSelected).children()[0].textContent
            var fieldNameId = $(inputId).attr('fieldName');

            $.each(data, function (index, item) {
                if (item[fieldNameId] == objectId) {
                    objEdit = item;
                }
            })
            // binding các thông tin của đối tượng lên form dialog
            var inputs = $('input[fieldName], select[fieldName]');
            $.each(inputs, function (index, input) {
                var fieldName = $(input).attr('fieldName');
                if (fieldName == 'DateOfBirth') {
                    $(input).val(objEdit[fieldName].toISOString().substring(0, 10));
                } else {
                    $(input).val(objEdit[fieldName]);

                }
            })
        } else {
            alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để sửa');
        }
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
        //validate dữ liệu trên form( Kiểm tra dữ liệu nhập trên form có dúng hay không)
        //1. Kiểm tra các trường bắt buôc nhập trên form dialog
        var isValid = true;
        var inputRequired = $('input[required]');
        $.each(inputRequired, function (index, input) {
            if (!validData.validateRequired(input)) {
                isValid = false;
            }
        })
        //2. Kiểm tra index có trùng với index có trong database không
        var isDuplicate = true;
        var inputId = $('.indexObj');
        var fieldNameId = $(inputId).attr('fieldName');
        $.each(data, function (index, item) {
            if (item[fieldNameId] == inputId.val()) {
                isDuplicate = false;
            }
        })

        //3. Kiểm tra tính chính xác của email nhập vào
        var inputEmail = $('#txtEmail');
        var isCheckEmail = validData.validateEmail(inputEmail);
        var self = this;
        var inputRequired = $('input[required]');




        if (isValid) {
            debugger
            if (isCheckEmail) {
                if (this.formMode == 1) {
                    //Khi giá trị của formMode la 1 thì nút cất là Thêm
                    if (isDuplicate) {
                        debugger
                        //Build Object cần lưu:
                        var inputs = $('input[fieldName], select[fieldName]');
                        var objAdd = {};
                        $.each(inputs, function (index, input) {
                            var fieldName = $(input).attr('fieldName');
                            var value = $(input).val();
                            if (fieldName == 'DateOfBirth') {
                                objAdd[fieldName] = new Date(value);
                            }
                            else {
                                objAdd[fieldName] = value;
                            }
                        })
                        debugger
                        //Gọi service thực hiện lưu dữ liệu:
                        data.push(objAdd);
                        //Xử lý sau khi lưu dữ liệu:
                        self.getData();
                        self.loadData();
                        self.Refresh();
                        self.hideDialogDetail();
                    } else {
                        alert('Mã của bản nhập vào đã bị trùng!');

                    }
                }
                else if (this.formMode == 2) {
                    //Khi giá trị của formMode la 2 thì nút cất là Update

                    var inputId = $('.indexObj');
                    var fieldNameId = $(inputId).attr('fieldName');
                    var inputs = $('input[fieldName], select[fieldName]');
                    //Thực hiện lưu dữ liệu trên form về Database
                    var objIndex = data.findIndex((obj => obj[fieldNameId] == inputId.val()));
                    $.each(inputs, function (index, input) {
                        var fieldName = $(input).attr('fieldName');
                        var value = $(input).val();
                        if (fieldName == 'DateOfBirth') {
                            data[objIndex][fieldName] = new Date(value);
                        }
                        else {
                            data[objIndex][fieldName] = value;
                        }
                    })

                    //Xử lý sau khi lưu dữ liệu:
                    self.getData();
                    self.loadData();
                    self.Refresh();
                    self.hideDialogDetail();
                }

            } else {
                alert('Bạn phải nhập đúng địa chỉ email hợp lệ.\nExample@gmail.com');
            }
        }
        else {
            alert('Bạn hãy kiểm tra lại các trường bắt buộc phải được nhập!');
        }

    }

    /**
     * Viết hàm load lại dữ liệu
     * Author: TDNAM (27/09/2020)
     * */
    btnReloadOnClick() {
        this.loadData();
    }

    /**
     * Hiển thị dialog chi tiết
     * Author: TDNAM (21/09/2020)
     * */
    showDialogDetail() {
        $('.modal').show();
        $('.dialog-form').show();
        var inputId = $('.indexObj');

        inputId.focus();
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
     * Edit: TDNAM (02/10/2020) Sửa thành hàm dùng chung
     * */

    Refresh() {
        var inputs = $('input[fieldName]');
        $.each(inputs, function (index, input) {
            $('input[fieldName]').val('');
        })
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
     * Viết hàm click vao button Xoa dữ liệu Object
     * Author: TDNAM (1/10/2020)
     * 
     * */
    btnDeleteOnClick() {
        debugger;
        var objDelete = {};

        //Lấy dữ liệu của khách hàng tương ứng đã chọn
        //1. Xác định khách hàng nào dã được chọn
        var trSelected = $("table tr.row-selected");
        //2. Lấy thông tin theo mã khách hàng
        if (trSelected.length > 0) {
            var inputId = $('.indexObj');
            var objectId = $(trSelected).children()[0].textContent
            var fieldNameId = $(inputId).attr('fieldName');

            $.each(data, function (index, item) {
                if (item[fieldNameId] == objectId) {
                    objDelete = item;
                }
            })

            //Xóa thông tin Customer đã chọn
            for (var i = 0; i < data.length; i++) {
                if (data[i] === objDelete) {
                    data.splice(i, 1);
                    this.loadData();
                }
            }
        } else {
            alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để xóa');
        }
    }
    /**
     * Viết hàm đóng menu khi click vào iconbar
     * Author: TDNAM (03/10/2020)
     * */
    btnCloseMenu() {
        $('.menu').hide();
    }

}




