$(document).ready(function () {
    employee = new EmployeeJS();
})

/**
 * Class Quản lý function cho trang Employee
 * Author: TDNAM (28/09/2020)
 * Edit: TDNAM (28/09/2020) 
 * */
class EmployeeJS extends BaseJS {
    constructor(name) {
        var Getbutton;
        super();
    }
    /**
     *  Hàm lấy data của Employee
     * Author: TDNAM (29/09/2020)
     * */
    getData() {
        this.Data = data;
    }
    /**
    * Hàm click Edit Employee
    * Author: TDNAM (29/09/2020)
    * */
    btnEditOnClick() {
        debugger;
        this.Getbutton = 2;
        var self = this;
        var empEdit;
        //Lấy dữ liệu của nhân viên tương ứng đã chọn
        //1. Xác định nhân viên nào dã được chọn
        var trSelected = $("#tbEmployee tr.row-selected");
        //2. Lấy thông tin theo mã nhân viên
        if (trSelected.length > 0) {
            //Hiển thị form chi tiết:
            this.showDialogDetail();
            var employeeId = $(trSelected).children()[0].textContent
            $.each(data, function (index, item) {
                if (item.EmployeeId == employeeId) {
                    empEdit = item;
                }
            })
            // binding các thông tin của nhân viên lên form
            $("#txtEmployeeId").val(empEdit.EmployeeId);
            $("#txtEmployeeName").val(empEdit.EmployeeName);
            $("#txtDateOfBirth").val(empEdit.DateOfBirth.toISOString().substring(0, 10));
            $("#txtEmail").val(empEdit.Email);

            //chỉnh sửa thông tin trên form
        } else {
            alert('Bạn chưa chọn nhân viên nào, Vui lòng chọn để sửa');
        }
    }

    /**
    * Hàm lưu dữ liệu của Employee
    * Author: TDNAM (29/09/2020)
    * */
    btnSaveOnClick() {
        //validate dữ liệu trên form( Kiểm tra dữ liệu nhập trên form có dúng hay không)
        var inputRequired = $("[required]");
        var isValid = true;
        var isDuplicate = true;
        var self = this;
        /*
         * Kiểm tra mã nhân viên có trùng không trước khi thêm vào
         * Author: TDNAM (29/09/2020)
         * */
        var empId = $("#txtEmployeeId").val();
        $.each(data, function (index, item) {
            if (item.EmployeeId == empId) {
                isDuplicate = false;
            }
        })
        /*
         * Kiểm tra các trường bắt buộc không được rỗng
         * Author: TDNAM (29/09/2020)
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
                debugger;
                if (isDuplicate) {
                    var employee = {};
                    employee.EmployeeId = $("#txtEmployeeId").val();
                    employee.EmployeeName = $("#txtEmployeeName").val();
                    employee.Email = $("#txtEmail").val();
                    employee.DateOfBirth = new Date($("#txtDateOfBirth").val());
                    //Lưu trữ thông tin trên form vào database
                    data.push(employee);
                    //load lại form
                    this.loadData();
                    this.Refresh();
                    this.hideDialogDetail();
                } else {
                    alert('Mã nhân viên đã trùng lặp, vui lòng nhập lại!');
                    $('#txtEmployeeId').val('');
                    $('#txtEmployeeId').focus();
                }
            }
            else if (this.Getbutton == 2) {
                debugger;
                var index = $("#txtEmployeeId").val();
                var objIndex = data.findIndex((obj => obj.EmployeeId == index));
                data[objIndex].EmployeeId = $("#txtEmployeeId").val();
                data[objIndex].EmployeeName = $("#txtEmployeeName").val();
                data[objIndex].DateOfBirth = new Date($("#txtDateOfBirth").val());
                data[objIndex].Email = $("#txtEmail").val();
                this.loadData();
                this.Refresh();
                this.hideDialogDetail();
            }
        }
    }
    /**
     * Viết hàm click vao button Xóa Employee
     * Author: TDNAM (29/09/2020)
     * 
     * */
    btnDeleteOnClick() {
        debugger;
        var empDelete;

        //Lấy dữ liệu của nhân viên tương ứng đã chọn
        //1. Xác định nhân viên nào dã được chọn
        var trSelected = $("#tbEmployee tr.row-selected");
        //2. Lấy thông tin theo mã nhân viên
        if (trSelected.length > 0) {
            var employeeId = $(trSelected).children()[0].textContent
            $.each(data, function (index, item) {
                if (item.EmployeeId == employeeId) {
                    empDelete = item;
                }
            })

            //Xóa thông tin Customer đã chọn
            for (var i = 0; i < data.length; i++) {
                if (data[i] === empDelete) {
                    data.splice(i, 1);
                    this.loadData();
                }
            }
        } else {
            alert('Bạn chưa chọn nhân viên nào, Vui lòng chọn để xóa');
        }
    }
}


var data = [
    {
        EmployeeId: "NV9248484",
        EmployeeName: "Phạm Minh Sang",
        Gender: "Nam",
        DateOfBirth: new Date('1998-03-17'),
        Email: "sang2378@gmail.com",
        PositionName: "Giám đốc",
        DepartmentName: "Phòng đào tạo",
        Salary: 20000000,
        WorkStatus: "Đang làm việc"
    },
    {
        EmployeeId: "NV9499434",
        EmployeeName: "Trịnh Đình Nam",
        Gender: "Nam",
        DateOfBirth: new Date('1998-08-16'),
        Email: "nam168@gmail.com",
        PositionName: "Phó Giám đốc",
        DepartmentName: "Phòng đào tạo",
        Salary: 21200000,
        WorkStatus: "Đang làm việc"
    }, {
        EmployeeId: "NV48384343",
        EmployeeName: "Hoàng Phi Hùng",
        Gender: "Nam",
        DateOfBirth: new Date('1998-09-17'),
        Email: "hunghp123@gmail.com",
        PositionName: "Trưởng phòng",
        DepartmentName: "Phòng đào tạo",
        Salary: 16000000,
        WorkStatus: "Đang làm việc"
    }, {
        EmployeeId: "NV4834344",
        EmployeeName: "Lê Thị Tuyết",
        Gender: "Nữ",
        DateOfBirth: new Date('1998-02-17'),
        Email: "tuyetd13@gmail.com",
        PositionName: "Nhân viên",
        DepartmentName: "Phòng đào tạo",
        Salary: 12000000,
        WorkStatus: "Đang làm việc"
    },
]

