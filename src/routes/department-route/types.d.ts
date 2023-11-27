declare type AddDepartment = Pick<DepartmentRouteGeneral, 'auth' | 'name' | 'isAdmin'>

declare type EditDepartment = Pick<DepartmentRouteGeneral, 'departmentID' | 'name'>

declare type DeleteDepartment = Pick<DepartmentRouteGeneral, 'departmentID'>

interface DepartmentRouteGeneral {
    departmentID: import('mongoose').Schema.Types.ObjectId,
    name: string,
    auth:{
        password: string,
        login: string
    },
    isAdmin: boolean
}