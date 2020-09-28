$(document).ready(function () {
    var employee = new EmployeeJS();
})

/**
 * Class Quản lý function cho trang Employee
 * Author: TDNAM (28/09/2020)
 * Edit: TDNAM (28/09/2020) 
 * */
class EmployeeJS extends BaseJS {
    constructor(name) {
        super();
    }

    getData() {
        this.Data = data;
    }
    //makeTrHTML(item) {
    //    var trHTML = $(`<tr class = "table-row">
    //                  <td>`+ item.EmployeeId + `</td>
    //                  <td>`+ item.EmployeeName + `</td>
    //                  <td>`+ item.Gender + `</td>
    //                  <td>`+ commonJS.formatDate(item.DateOfBirth) + `</td>
    //                  <td>`+ item.PositionName + `</td>
    //                  <td>`+ item.DepartmentName + `</td>
    //                  <td>`+ item.Email + `</td>
    //                  <td>`+ item.Salary.formatMoney() + `</td>
    //                  <td>`+ item.WorkStatus + `</td>

    //                  </tr>`);
    //    return trHTML;
    //}

    
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

