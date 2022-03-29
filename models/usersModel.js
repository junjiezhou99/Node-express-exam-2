import users from '../data/user.js';

class User {

    createUser(user) {
        console.log(`---> userModel::createUser ${user.username}`);
        
        users.push(user);
        return users.find(element => element.username == user.username);


    }

    loginUser(user) {
        console.log(`---> userModel::loginUser ${user.username}`);

        return users.find(element => (element.username == user.username))
    }

    getUser(user) {
        const userGrant = users.find(element => (element.username == user));

        return userGrant;
    }

    addGrants(user){
        const userGrant = users.find(element => (element.username == user.username));

        if (userGrant != undefined){
            userGrant.grants = user.grants;
        }
        
        return userGrant;
    }

    changeGrants(user){
        const userGrant = users.find(element => (element.username == user.username));

        if (userGrant != undefined){
            user.grants.forEach(element => {
                if (!userGrant.grants.includes(element)){
                    userGrant.grants.push(element);
                }
            });
        }

        return userGrant;
    }

    deleteGrants(user){
        const userGrant = users.find(element => (element.username == user.username));

        if (userGrant != undefined){
            user.grants.forEach(element => {
                const index = userGrant.grants.indexOf(element);
                if (index != -1){
                    userGrant.grants.splice(index, 1);
                }
            });
        }

        return userGrant;
    }

    newPass(user){
        const userGrant = users.find(element => (element.username == user.username));

        if (userGrant != undefined){
            userGrant.password = user.newpassword;
        }

        return userGrant;
    }

    deleteUser(user){
        const userGrant = users.find(element => (element.username == user.username));

        if (userGrant != undefined){
            userGrant.active = 0;
        }

        return userGrant;
    }

    activateUser(user){
        const userGrant = users.find(element => (element.username == user.username));

        if (userGrant != undefined){
            userGrant.active = 1;
        }

        return userGrant;
    }
}

export default new User();