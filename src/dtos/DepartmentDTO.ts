export default function(department:DepartmentI, mode?:string):DepartmentDTOI{
    const departmentDTO:DepartmentDTOI = {
        id: department._id,
        name: department.name,
        isAdmin: department.isAdmin
    }

    if(mode && mode==='personal') departmentDTO.localKey = department.localKey

    return departmentDTO
}