import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface describes the properties of 
// required to create a new user, 
// to prevent issue #1 of 'using ts with mongoose': 
//      ts ==> mongoose
interface userAttrs {
    email: string;
    password: string;
}

// An interface describes the properties 
// that a User Model has
// to prevent issue #2 of 'using ts with mongoose':
//      mongoose ==> ts
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: userAttrs): UserDoc;
}

// An interface describes the properties 
// that a User Document (of MongoDB) has
interface UserDoc extends mongoose.Document {
    email: string,
    password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {
    if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'));
      this.set('password', hashed);
    }
    done();
});

// every time create a new user, use this function
// instead of the above one
userSchema.statics.build = (attrs: userAttrs) => {
    return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
