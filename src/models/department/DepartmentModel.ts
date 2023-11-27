import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const schema: Schema = new Schema<DepartmentI>(
    {
        name: {
            type: String || null,
            default: null,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false,
            required: true
        },
        auth: {
            password: {
                type: String,
                required: true,
                minLength: 4
            },
            login: {
                type: String,
                required: true,
                minLength: 4
            }
        },
        localKey: {
            key: {
                type: String,
                required: true
            },
            iv: {
                type: String,
                required: true
            },
            algorithm: {
                type: String,
                required: true
            },
            encoding: {
                type: String,
                required: true
            },
            notation: {
                type: String,
                required: true
            }
        }
    },
    { strict: true, strictQuery: true }
)

schema.methods.comparePasswords = async function (hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
  
  schema.pre('save', async function () {
      // Hash password if the password is new or was updated
      if (!this.isModified('auth.password')) return;
  
      // Hash password with costFactor of 12
      this.auth.password = await bcrypt.hash(this.auth.password, 12)
  })

export const DepartmentModel = model<DepartmentI, DepartmentModelI>('Department', schema)