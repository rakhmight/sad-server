import { AlreadyExistError, BadRequestError, AccessDeniedError, InternalServerError, LockedError, HeadersSchema, WithoutAuthHeaderSchema } from "../generalSchemas"

export const DepartmentLoginSchema = { // TODO:
    summary: 'Login',
    description: 'Login (enter to system)',
    tags: ['Auth route'],
    headers: WithoutAuthHeaderSchema,
    body: {

    },
    response: {

    }
}

export const DepartmentLogoutSchema = { // TODO:
    summary: 'Logout',
    description: 'Logout (exit from system)',
    tags: ['Auth route'],
    headers: HeadersSchema,
    body: {

    },
    response: {

    }

}

export const DepartmentRefreshSchema = { // TODO:
    summary: 'Refresh token',
    description: 'Refresh token',
    tags: ['Auth route'],
    headers: WithoutAuthHeaderSchema,
    body: {

    },
    response: {

    }
}