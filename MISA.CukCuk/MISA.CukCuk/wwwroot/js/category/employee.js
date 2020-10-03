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
     *  Hàm InitEvent kế thừa lớp BaseJS
     * Author: TDNAM (03/10/2020)
     * */

    initEvent() {
        super.initEvent();
        $('input[required]').blur(this.validateRequired.bind(this));
    }

    /**
     * Hàm Validate bắt buộc nhập
     * Author: TDNAM (03/10/2020)
     * */
    validateRequired(sender) {
        debugger
        //Nếu chưa nhập thì set border màu đỏ và hiển thị thông báo
        validData.validateRequired(sender.currentTarget);
    }

    
}


var data = [
    {
        EmployeeId: "NV9248484",
        EmployeeName: "Phạm Minh Sang",
        Gender: 1,
        DateOfBirth: new Date('1998-03-17'),
        Phone: "0389285868",
        Email: "sang2378@gmail.com",
        PositionName: "Giám đốc",
        DepartmentName: 1,
        Salary: 20000000,
        WorkStatus: 1
    },
    {
        EmployeeId: "NV9499434",
        EmployeeName: "Trịnh Đình Nam",
        Gender: 1,
        DateOfBirth: new Date('1998-08-16'),
        Phone: "0389285868",

        Email: "nam168@gmail.com",
        PositionName: "Phó Giám đốc",
        DepartmentName: 2,
        Salary: 21200000,
        WorkStatus: 1
    }, {
        EmployeeId: "NV48384343",
        EmployeeName: "Hoàng Phi Hùng",
        Gender: 1,
        DateOfBirth: new Date('1998-09-17'),
        Phone: "0389285868",

        Email: "hunghp123@gmail.com",
        PositionName: "Trưởng phòng",
        DepartmentName: 3,
        Salary: 16000000,
        WorkStatus: 1
    }, {
        EmployeeId: "NV4834344",
        EmployeeName: "Lê Thị Tuyết",
        Gender: 0,
        DateOfBirth: new Date('1998-02-17'),
        Phone: "0389285868",
        Email: "tuyetd13@gmail.com",
        PositionName: "Nhân viên",
        DepartmentName: 2,
        Salary: 12000000,
        WorkStatus: 2
    },
]

