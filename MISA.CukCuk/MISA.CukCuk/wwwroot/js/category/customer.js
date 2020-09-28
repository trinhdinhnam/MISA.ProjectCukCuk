$(document).ready(function () {
    customer = new Customer();
})
/**
 * Class Quản lý function cho trang Customer
 * Author: TDNAM (27/09/2020)
 * */

class Customer extends BaseJS{
    constructor(name) {
        var Getbutton;
        super();
    }
    /** 
     *  Hàm lấy data của Customer
     * Author: TDNAM (27/09/2020)
     * */
    getData() {
        this.Data = data;
    }
    /**
    * Hàm click Edit Customer
    * Author: TDNAM (28/09/2020)
    * */
    btnEditOnClick() {
        debugger;
        this.Getbutton = 2;
        var self = this;
        var cusEdit;
        //Lấy dữ liệu của khách hàng tương ứng đã chọn
        //1. Xác định khách hàng nào dã được chọn
        var trSelected = $("#tbCustomer tr.row-selected");
        //2. Lấy thông tin theo mã khách hàng
        if (trSelected.length > 0) {
            //Hiển thị form chi tiết:
            this.showDialogDetail();
            var customerId = $(trSelected).children()[0].textContent
            $.each(data, function (index, item) {
                if (item.CustomerId == customerId) {
                    cusEdit = item;
                }
            })
            // binding các thông tin của khách hàng lên form
            $("#txtCustomerId").val(cusEdit.CustomerId);
            $("#txtCustomerName").val(cusEdit.CustomerName);
            $("#txtManageName").val(cusEdit.ManageName);
            $("#txtTaxId").val(cusEdit.TaxId);
            $("#txtAddress").val(cusEdit.Address);
            $("#txtPhoneNumber").val(cusEdit.Phone);
            $("#txtEmail").val(cusEdit.Email);
            $("#txtDateOfBirth").val(cusEdit.DateOfBirth);

            //chỉnh sửa thông tin trên form
        } else {
            alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để sửa');
        }
    }
    /**
    * Hàm lưu dữ liệu của Customer
    * Author: TDNAM (22/09/2020)
    * */
    btnSaveOnClick() {
        //validate dữ liệu trên form( Kiểm tra dữ liệu nhập trên form có dúng hay không)
        var inputRequired = $("[required]");
        var isValid = true;
        var isDuplicate = true;
        var self = this;
        /*
         * Kiểm tra mã khách hàng có trùng không trước khi thêm vào
         * Author: TDNAM (22/09/2020)
         * */
        var cusId = $("#txtCustomerId").val();
        $.each(data, function (index, item) {
            if (item.CustomerId == cusId) {
                isDuplicate = false;
            }
        })
        /*
         * Kiểm tra các trường bắt buộc không được rỗng
         * Author: TDNAM (21/09/2020)
         * */
        $.each(inputRequired, function (index, input) {
            var valid = $(input).trigger("blur");
            if (isValid && valid.hasClass("required-error")) {
                isValid = false;
            }
        })

        //Thu thập dữ liệu trên form dialog
        if (isValid) {
            if (this.Getbutton == 1) {
                if (isDuplicate) {
                    var customer = {};
                    customer.CustomerId = $("#txtCustomerId").val();
                    customer.CustomerName = $("#txtCustomerName").val();
                    customer.ManageName = $("#txtManageName").val();
                    customer.TaxId = $("#txtTaxId").val();
                    customer.Address = $("#txtAddress").val();
                    customer.Phone = $("#txtPhoneNumber").val();
                    customer.Email = $("#txtEmail").val();
                    customer.DateOfBirth = new Date($("#txtDateOfBirth").val());
                    //Lưu trữ thông tin trên form vào database
                    data.push(customer);
                    //load lại form
                    this.loadData();
                    this.Refresh();
                    this.hideDialogDetail();
                } else {
                    alert('Mã khách hàng đã trùng lặp, vui lòng nhập lại!');
                    $('#txtCustomerId').val('');
                    $('#txtCustomerId').focus();
                }
            }
            else if (this.Getbutton == 2) {
                var index = $("#txtCustomerId").val();
                var objIndex = data.findIndex((obj => obj.CustomerId == index));
                data[objIndex].CustomerName = $("#txtCustomerName").val();
                data[objIndex].ManageName = $("#txtManageName").val();
                data[objIndex].TaxId = $("#txtTaxId").val();
                data[objIndex].Address = $("#txtAddress").val();
                data[objIndex].Phone = $("#txtPhoneNumber").val();
                data[objIndex].Email = $("#txtEmail").val();
                this.loadData();
                this.Refresh();
                this.hideDialogDetail();
            }
        }
    }
    /**
     * Viết hàm click vao button Xoa Customer
     * Author: TDNAM (28/09/2020)
     * 
     * */
    btnDeleteOnClick() {
        debugger;
        var cusDelete;

        //Lấy dữ liệu của khách hàng tương ứng đã chọn
        //1. Xác định khách hàng nào dã được chọn
        var trSelected = $("#tbCustomer tr.row-selected");
        //2. Lấy thông tin theo mã khách hàng
        if (trSelected.length > 0) {
            var customerId = $(trSelected).children()[0].textContent
            $.each(data, function (index, item) {
                if (item.CustomerId == customerId) {
                    cusDelete = item;
                }
            })

            //Xóa thông tin Customer đã chọn
            for (var i = 0; i < data.length ; i++) {
                if (data[i] === cusDelete) {
                    data.splice(i, 1);
                    this.loadData();
                }
            }
        } else {
            alert('Bạn chưa chọn khách hàng nào, Vui lòng chọn để xóa');
        }
    }
}


var data = [
    {
        CustomerId: "KH9492394",
        CustomerName: "Phạm Minh Sang",
        ManageName: "Viettel",
        TaxId: "28183823",
        Address: "Thường Tín, Hà Nội",
        Phone: "0324004935",
        Email: "sang2378@gmail.com",
        DateOfBirth: new Date('1998-11-18'),
    },
    {
        CustomerId: "KH838284",
        CustomerName: "Hoàng Phi Hùng",
        ManageName: "Viettel",
        TaxId: "94939544",
        Address: "Bách khoa, Hà Nội",
        Phone: "05456567565",
        Email: "hung37273@gmail.com",
        DateOfBirth: new Date('1998-03-17'),

    },
    {
        CustomerId: "KH74737434",
        CustomerName: "Lưu Văn Hoàng",
        ManageName: "SamSung",
        TaxId: "534545666",
        Address: "Lê Thanh Nghị, Hà Nội",
        Phone: "32434",
        Email: "hoang13@gmail.com",
        DateOfBirth: new Date('1998-03-17'),

    },
    {
        CustomerId: "KH848384",
        CustomerName: "Đỗ Trung Kiên",
        ManageName: "BSS",
        TaxId: "343544545",
        Address: "Xã Đàn, Hà Nội",
        Phone: "545454546",
        Email: "kien38284@gmail.com",
        DateOfBirth: new Date('1998-03-17'),

    },
    {
        CustomerId: "KH162661",
        CustomerName: "Phạm Minh Sang",
        ManageName: "Viettel",
        TaxId: "28183823",
        Address: "Thường Tín, Hà Nội",
        Phone: "0324004935",
        Email: "sang2378@gmail.com",
        DateOfBirth: new Date('1998-03-17'),

    },
    {
        CustomerId: "KH8938284",
        CustomerName: "Hoàng Phi Hùng",
        ManageName: "Viettel",
        TaxId: "94939544",
        Address: "Bách khoa, Hà Nội",
        Phone: "05456567565",
        Email: "hung37273@gmail.com",
        DateOfBirth: new Date('1998-03-17'),

    },
    {
        CustomerId: "KH737434",
        CustomerName: "Lưu Văn Hoàng",
        ManageName: "SamSung",
        TaxId: "534545666",
        Address: "Lê Thanh Nghị, Hà Nội",
        Phone: "32434",
        Email: "hoang13@gmail.com",
        DateOfBirth: new Date('1998-03-17'),

    },
    {
        CustomerId: "KH8148384",
        CustomerName: "Đỗ Trung Kiên",
        ManageName: "BSS",
        TaxId: "343544545",
        Address: "Xã Đàn, Hà Nội",
        Phone: "545454546",
        Email: "kien38284@gmail.com",
        DateOfBirth: new Date('1998-03-17'),

    },
]

