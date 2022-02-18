import * as mangoose from 'mongoose';
export const userSchema = new mangoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    }

});

// middleware for bycrt for password
// userSchema.pre("save", function (next) {
//     const user = this
  
//     if (this.isModified("password") || this.isNew) {
//       bcrypt.genSalt(10, function (saltError, salt) {
//         if (saltError) {
//           return next(saltError)
//         } else {
//           bcrypt.hash(user.password, salt, function(hashError, hash) {
//             if (hashError) {
//               return next(hashError)
//             }
  
//             user.password = hash
//             next()
//           })
//         }
//       })
//     } else {
//       return next()
//     }
//   })