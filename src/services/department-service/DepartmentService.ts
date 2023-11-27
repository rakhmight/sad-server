import { Schema } from "mongoose";
import DepartmentDTO from "../../dtos/DepartmentDTO";
import { DepartmentModel } from "../../models/department/DepartmentModel";
import { generateSymmetricKey } from "../../utils/generateSymmetricKey";

export async function AddDepartment(departmentData: AddDepartment){
    const candidate = await DepartmentModel.findOne({'auth.login': departmentData.auth.login})

    if(candidate) throw Error('user-exist')

    const localKey = await generateSymmetricKey()

    const department = await DepartmentModel.create({ ...departmentData, localKey })

    const departmentDTO = DepartmentDTO(department)

    return departmentDTO
}

export async function EditDepartment(id: Schema.Types.ObjectId, departmentName: string){
    const department = await DepartmentModel.updateOne({ id }, {
        name: departmentName
    })

    return { operation: department, department: { name: departmentName, id } }
}

export async function DeleteDepartment(id: Schema.Types.ObjectId){
    const department = await DepartmentModel.deleteOne({ id })

    return { operation: department }
}

export async function GetAllDepartments(){
    const departments = await DepartmentModel.find()
    const departmentsDTO:Array<DepartmentDTOI> = departments.map((department) => {
        return DepartmentDTO(department)
    })

    return departmentsDTO
}