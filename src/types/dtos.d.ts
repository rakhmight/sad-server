declare interface DepartmentDTOI {
    id: import('mongoose').Schema.Types.ObjectId,
    name: string,
    isAdmin: boolean,
    localKey?: SymmetricKey
}

declare interface MemberDTOI {
    id: import('mongoose').Schema.Types.ObjectId,
    fullName: string,
    department: import('mongoose').Schema.Types.ObjectId
}

declare interface OrderDTOI {
    id: import('mongoose').Schema.Types.ObjectId,
    department: import('mongoose').Schema.Types.ObjectId,
    members: Array<OrderMemberDataI>,
    createdAt: import('mongoose').Schema.Types.Date
}