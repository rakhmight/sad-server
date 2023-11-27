import { Schema, model } from 'mongoose'

const schema: Schema = new Schema<MemberI>(
    {
        fullName: {
            type: String,
            required: true
        },
        department:{
            type: Schema.Types.ObjectId,
            ref: 'Department',
            required: true,
        },
        additionalProperties: {
            rank:{
                type: String,
                required: true
            },
            position: {
                type: String,
                required: true
            }
        }
    },
    { strict: true, strictQuery: true }
)

export const MemberModel = model<MemberI, MemberModelI>('Member', schema)