import { HeadersSchema } from "../generalSchemas";

export const AddDepartmentSchema = { // TODO:
    summary: 'Add new department',
    description: 'Add new department',
    tags: ['Department route'],
    headers: HeadersSchema,
    body: {},
    response: {}
}

export const EditDepartmentSchema = { // TODO:
    summary: 'Edit department',
    description: 'Edit some department dataset',
    tags: ['Department route'],
    headers: HeadersSchema,
    body: {},
    response: {}
}

export const DeleteDepartmentSchema = { // TODO:
    summary: 'Delete department',
    description: 'Delete department (+ reset all users from this department)',
    tags: ['Department route'],
    body: {},
    response: {}
}

export const GetDepartmentsSchema = { // TODO:
    summary: 'Get departments list',
    description: 'Get departments list',
    headers: HeadersSchema,
    tags: ['Department route'],
    response: {}
}