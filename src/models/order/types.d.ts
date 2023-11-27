declare interface OrderModelI extends ModelExC<OrderI> {
}

declare interface OrderI extends DocumentExC{
    _id: import('mongoose').Schema.Types.ObjectId,
    fullName: string,
    department: import('mongoose').Schema.Types.ObjectId,
    members: Array<OrderMemberDataI>,
    createdAt: import('mongoose').Schema.Types.Date
}

declare interface OrderMemberDataI {
    id: import('mongoose').Schema.Types.ObjectId,
    status: OrderMemberStatus
}

type OrderMemberStatus = 'present' | 'ill' // etc..