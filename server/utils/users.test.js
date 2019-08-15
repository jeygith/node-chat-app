const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    var users;

    beforeEach(() => {
        users = new Users();

        users.users = [
            {
                id: '1',
                name: 'Jeff',
                room: 'Node Course'
            },
            {
                id: '2',
                name: 'Jane',
                room: 'React Course'
            },
            {
                id: '3',
                name: 'Mary',
                room: 'Node Course'
            }
        ];
    });

    it('should add new user', () => {
        var users = new Users();

        var user = {
            id: '123',
            name: 'jeff',
            room: 'The office fans'
        }

        var resUserv = users.addUser(user.id, user.name, user.room);

        expect(users.users).toMatchObject([user]);
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toMatchObject(['Jeff', 'Mary']);
    });
    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toMatchObject(['Jane']);
    });

    it('should remove a user', () => {
        var userId = '1';

        var user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = '99';

        var user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';

        var user = users.getUser(userId);

        expect(user.id).toBe(userId);

    });

    it('should not find user', () => {
        var userId = '10';

        var user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

})