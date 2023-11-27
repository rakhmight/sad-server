declare interface DepartmentModelI extends ModelExC<DepartmentI> {
}

declare interface DepartmentI extends DocumentExC{
    _id: import('mongoose').Schema.Types.ObjectId,
    name: string,
    isAdmin: boolean,
    auth: DepartmentAuthDataI,
    localKey: SymmetricKey,
    comparePasswords(hashedPassword: string, candidatePassword: string): boolean,
}

interface DepartmentAuthDataI {
    password: string,
    login: string
}