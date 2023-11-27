import { Schema, model } from 'mongoose'

const schema: Schema = new Schema<OrderI>(
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
        members: [{
            id: {
                type: Schema.Types.ObjectId,
                ref: 'Member'
            },
            status: {
                type: String
            }
        }]
    },
    { timestamps: true, strict: true, strictQuery: true }
)

export const OrderModel = model<OrderI, OrderModelI>('Order', schema)