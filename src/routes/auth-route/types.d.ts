declare interface DepartmentLogin {
    auth: {
        password: string,
        login: string
    }
}

declare interface DepartmentLogout {
    departmentID: import('mongoose').Schema.Types.ObjectId
}

declare interface DepartmentRefresh {
    departmentID: import('mongoose').Schema.Types.ObjectId
}