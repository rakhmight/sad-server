declare type AddOrder = Pick<DepartmentRouteGeneral, 'department' | 'members'>

declare type EditOrder = Pick<DepartmentRouteGeneral, 'orderID' | 'members'>

declare type DeleteOrder = Pick<DepartmentRouteGeneral, 'orderID'>

interface OrderRouteGeneral {
    orderID: import('mongoose').Schema.Types.ObjectId,
    department: import('mongoose').Schema.Types.ObjectId,
    members: Array<OrderMemberDataI>
}