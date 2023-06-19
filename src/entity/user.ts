import { model, Schema } from 'mongoose'
import { PlayerStatus } from '../types/status'

export interface IUser {
    _id: string
    username: string
    password: string
    status: PlayerStatus
}

export const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(PlayerStatus),
            default: PlayerStatus.ACTIVE,
        },
    },
    {
        timestamps: true,
    },
)

export const UserModel = model('users', UserSchema)
