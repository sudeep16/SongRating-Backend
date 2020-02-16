const User = require("../models/usersModel");
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/AppTesting';
beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('User Registeration Testing', () => {
    var id = '';
    it('Register User', ()=>{
        const user = {
            "Username": "uniqueSudeep1222",
            "Password":"sudeep123",
            "Email":"sudeep@gmail.com",
            "Phone": "9805652585",
            "Address":"Kathmandu",
            "Gender": "Male",
            "Image": "sudep.jpg"
        };
        return User.create(user)
        .then((user_res)=>{
            id=user_res._id;
            expect(user_res.Username).toEqual('uniqueSudeep1222');

        });
    })

    // Update User

    it('Updateuser Testing', () => {
        const updateUser = {
            Username: 'sudeep23'
        }
        console.log(id)
        return User.findByIdAndUpdate(id, updateUser, {
            new: true
        }).then((updateUser) => {
            expect(updateUser.Username).toEqual('sudeep23');
        });
    });

    //user delete

    it('User delete testing', async ()=>{
        const status = await
        User.deleteMany({
            Username: 'uniqueSudeep'
        });
        expect(status.ok).toBe(1);
    })

})