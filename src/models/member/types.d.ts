declare interface MemberModelI extends ModelExC<MemberI> {
}

declare interface MemberI extends DocumentExC{
    _id: import('mongoose').Schema.Types.ObjectId,
    fullName: string,
    department: import('mongoose').Schema.Types.ObjectId,
    additionalProperties: MemberAdditionalPropertiesI
}

declare interface MemberAdditionalPropertiesI {
    rank: string,
    position: string
}