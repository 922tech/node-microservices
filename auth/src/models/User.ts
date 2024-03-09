import { Schema, Model, Document, model,  } from "mongoose";
import Password from "../utils/password";

interface IUser {
    email: string;
    password: string;
}

interface UserDoc extends Document {
    email: string;
    password: string;
}

interface UserModel extends Model<UserDoc> {
    createUser(attrs: IUser): Promise<UserDoc>;
}

const userSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        toJSON: {
            transform(doc, ret, options) {
                ret.id = doc._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            },
        }
    }
)


userSchema.statics.createUser = async (attrs: IUser) => {
    const user =  new User(attrs);
    return user.save();
}

userSchema.pre("save", function(done) {

    if (this.isModified("password")) {
            this.password = Password.hashPassword(this.password); 
            done();
        }
    }
)

const User = model<UserDoc, UserModel>("User", userSchema);
export default User;