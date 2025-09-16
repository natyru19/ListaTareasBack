import UsersModel from '../models/user.model.js';
import { createHash } from '../utils/util.js';


class UsersManager{

    async getByEmail(email){
        try {
            const user = await UsersModel.findOne({email: email}).lean();
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(firstName, lastName, email, password, role){        

        try {
            const newUser = await UsersModel.create({firstName, lastName, email, password: createHash(password), role});
            return newUser;
        } catch (error) {
            throw error;
        }
    }
}

export default UsersManager;