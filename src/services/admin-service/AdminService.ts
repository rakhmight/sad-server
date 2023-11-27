import { DepartmentModel } from "../../models/department/DepartmentModel";

export async function checkIsAdmin(departmentData:DepartmentDTOI){
    const department = await DepartmentModel.findById(departmentData.id)

    if(department)
    return department.isAdmin
}