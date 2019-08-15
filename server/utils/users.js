[{
    id: '',
    name: 'Andrew',
    room: ''
}]

// addUser(id, name, room)
// removeUser(id);
// getUser(id);
// getUserList(room);

class Users {

    constructor() {
        this.users = [];
    };

    addUser(id, name, room) {
        var user = {
            id, name, room
        };
        this.users.push(user);
        return user;
    }


    removeUser(id) {

        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) =>{
               return user.id !== id
            });
        }
        return user;

    }

    getUser(id) {
        return this.users.filter((user) => {
            return user.id === id;
        })[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => {
            return user.room === room;
        })
        var namesArray = users.map((user) => {
            return user.name;
        });

        return namesArray;
    }

}


module.exports = {
    Users
}
/*
var me = new User('jeff', 26);
console.log('this.name', me.name);
console.log('this.age', me.age);

var description = me.getUserDescription();
console.log(description);*/
