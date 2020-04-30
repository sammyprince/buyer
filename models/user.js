const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectId;

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        require: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true,
            index: true
        },

        device_modal : {
            type : String,
            default : ""
        },

        time_zone: String,
        device_token: String,
        platform: String,
    }],
    confirmation_code : {
        type: String,
        default: '0000'
    },

    reset_password_code: String,
    confirmed: {
        type: Boolean,
        default: false
    },
    first_name: {
        type: String,
        default: ''
    },
    last_name: {
        type: String,
        default: ''
    },
   
    account_type: {
        type: String,
        default: false
    },



    bank_details : [{
        bank_name : {
            type : String,
            default : ""
        },
        account_name : {
            type : String,
            default : ""
        }
    }],

    ph_no : {
        type : String,
        default : ''
    },
    address : {
        type : String,
        default : ''
    },
    name : {
        type : String,
        default : ''
    },
    business_name : {

        type : String,
        default : ''

    },
    referal_id : {

        type : String,
        default : ''

    },
    plan : [{

        subscription_id : {
            type : String,
            default : ''
        },
        active_plan : {
            type: Boolean,
           default: false
        },
        sub_type : {
            type : String,
            default : ''
        },
        expires : {
            type : String,
            default : Date.now()
        }
    }],

    dp_active_file: {
        type : String,
        default : ""
    },

});

UserSchema.plugin(timestamps);

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    const userJson = _.pick(userObject, ['_id', 'email','name','buyer','merchant', 'account_type' ,'bank_details', 'ph_no'  ]);
    userJson.dp_active_file =  userObject.dp_active_file;

    return userJson;
};

UserSchema.methods.tomerchantJson = function () {
    const user = this;
    const userObject = user.toObject();

    const userJson = _.pick(userObject, ['_id', 'email', 'name' , 'ph_no' , 'first_name' , 'last_name' , 'address' , 'business_name' , 'plan' , 'referal_id','account_type' , 'merchant' ]);
    userJson.dp_active_file =  userObject.dp_active_file;

    return userJson;
};


UserSchema.methods.tobuyerJson = function () {
    const user = this;
    const userObject = user.toObject();

    const userJson = _.pick(userObject, ['_id', 'email', 'name',  'ph_no' , 'first_name' , 'last_name' , 'address' , 'business_name' , 'plan' , 'referal_id', 'account_type' , 'buyer' ]);
    userJson.dp_active_file =  userObject.dp_active_file;

    return userJson;
};


UserSchema.methods.validated_pin = function () {
    const user = this;
    return user.update({
        $set: {
            confirmed: true
        }
    });
};

UserSchema.methods.adminJson = function () {
    const user = this;
    const userObject = user.toObject();

    const adminJson = _.pick(userObject, ['_id', 'name', 'bank_details']);
    return adminJson;
};


UserSchema.methods.profileJson = function () {
    const user = this;
    const userObject = user.toObject();

    const adminJson = _.pick(userObject, ['_id', 'email', 'first_name' , 'last_name' , 'address' , 'business_name' , 'plan' , 'referal_id' , 'ph_no']);
    adminJson.dp_active_file =  userObject.dp_active_file;
    return adminJson;
};


UserSchema.methods.generateAuthToken = function (deviceInfo) {
    const user = this;
    const access = 'auth';
    const token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();

    const { device_token, platform , time_zone , device_modal} = deviceInfo;

    user.tokens.push({access, token, device_token, platform , time_zone , device_modal});

    return user.save().then(() => {
        return token;
    });
};


UserSchema.methods.removeToken = function (token) {
    const user = this;

    return user.update({
        $pull: {
            tokens: {token}
        }
    });
};


UserSchema.methods.removeAllTokens = function () {
    const user = this;

    return user.update({
        $set: {
            tokens: []
        }
    });
};


UserSchema.statics.getAllLogins = function () {
    const User = this;
    return User.find({"tokens" : { $ne : [] }
    });
};


UserSchema.statics.findDaysOfWeek = function () {
    const User = this;
    return User.aggregate(
        [
            {
                $project:
                    {
                        dayOfWeek: { $dayOfWeek: "$createdAt" }
                    }
            }
        ]
    )
};

UserSchema.statics.countByLastMonth= function () {
    const User = this;
    let today = new Date();
    return User.aggregate([
        {
        $match: {
            createdAt: {
                $gte: new Date(new Date(today.getTime() - (24*30 * 60 * 60 * 1000)))
            }
        }
    }, {
        $group: {
            _id: {
                "year":  { "$year": "$createdAt" },
                "month": { "$month": "$createdAt" },
                "day":   { "$dayOfMonth": "$createdAt" }
            },
            count:{$sum: 1}
        }
    }
    ]);
};



UserSchema.statics.updateReport = function (id, updates) {
    const User = this;
    return User.findOneAndUpdate(
        {
            _id: ObjectId(id)
        },
        {
            $set: {'report' : updates}
        },
        {
            new: true
        }
    );
};

UserSchema.statics.updateBankDetails = function (id, updates) {
    const User = this;
    return User.findOneAndUpdate(
        {
            _id: ObjectId(id)
        },
        {
            $set: updates
        },
        {
            new: true
        }
    );
};


UserSchema.statics.getAll = function () {
    const User = this;
    return User.find({});
};



UserSchema.statics.updateProfile = function (id, updates) {
    const User = this;
    console.log("Awais")
    return User.findOneAndUpdate(
        {
            
            _id: ObjectId(id)
        },
        {
            $set: updates
         },
        {
            new: true
        }
        );
};

UserSchema.statics.userCount = function () {
    const User = this;
    return User.count();
};


UserSchema.statics.findUserByEmail = function (email) {
    const User = this;
    return User.findOne({email: email});
};

UserSchema.statics.findById = function (id) {
    console.log('find user==>', id);
    const User = this;
    return User.findOne({_id: ObjectId(id)});
};

UserSchema.statics.findAllMerchants = function () {
    const User = this;
    return User.find({account_type: "merchant"});
};

UserSchema.statics.findAllBuyer = function () {
    const User = this;
    return User.find({account_type: "buyer"});
};

UserSchema.statics.findByCompanyId = function (id) {
    console.log('find employees==>', id);
    const User = this;
    return User.find({company: ObjectId(id)});
};


UserSchema.statics.updateToken = function (token, session_id) {
    const user = this;

    return user.update({"tokens._id": ObjectId(session_id)},
        {$set: { "tokens.$.device_token": token}
        });
};


UserSchema.statics.getAllReported = function () {
    const User = this;
    return User.find({"report" : { $ne : null }});
};


UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;
    console.log("Awais")
    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject({message: 'InValid Email Entered'});
        }

        return new Promise((resolve, reject) => {
            // Use bcrypt.compare to compare password and user.password
            console.log("Awais")
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject({message: 'InValid Password Entered'});
                }
            });
        });
    });
};


UserSchema.statics.deleteAccount = function (id) {
    const User = this;
    return User.remove({ _id : ObjectId(id)});
};

UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
