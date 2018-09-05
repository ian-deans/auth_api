const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    facebookId: { type: String, require: true }
}, { timestamps: true } );

UserSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        facebookId: this.facebookId,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    }
};


mongoose.model( 'User', UserSchema );