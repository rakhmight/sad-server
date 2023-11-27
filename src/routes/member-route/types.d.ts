declare type AddMember = Pick<DepartmentRouteGeneral, 'department' | 'fullName' | 'additionalProperties'>

declare type EditMember = Pick<DepartmentRouteGeneral, 'memberID' | 'fullName' | 'additionalProperties'>

declare type DeleteMember = Pick<DepartmentRouteGeneral, 'memberID'>

interface MemberRouteGeneral {
    memberID: import('mongoose').Schema.Types.ObjectId,
    fullName: string,
    additionalProperties: MemberAdditionalPropertiesI,
    department: import('mongoose').Schema.Types.ObjectId
}