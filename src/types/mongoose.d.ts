declare type ModelExC<T> = import('mongoose').Model<T>
declare type DocumentExC = import('mongoose').Document

declare interface Models {
    DepartmentModel: DepartmentModelI;
    MemberModel: MemberModelI;
    OrderModel: OrderModelI;
}

declare interface Db {
    models: Models;
}
// define options
declare interface MyPluginOptions {
}