const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required: true,
        trim:true,
        lowercase:true,
    },
    hash_password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    }
}, {timestamps:true})

//mongoose provide this functinality, not in mongo db
userSchema.virtual('password')
.set(function(password){
    //https://www.npmjs.com/package/bcrypt
    this.hash_password = bcrypt.hashSync(password, 10);
});


userSchema.methods = {
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}


module.exports = mongoose.model('User', userSchema);

// const dummyUser = new User({ email: 'sandeep.yadav@incedoinc.com' });
// dummyUser.password = 'Test';
// console.log('testing');
// console.log(dummyUser.authenticate('Test'));


//module.exports.User = User;
