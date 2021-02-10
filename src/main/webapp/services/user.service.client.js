// Implements the user service client encapsulating all data communication with server

function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/tchen007/users';
    var self = this;

    const POST = 'POST', DELETE = 'DELETE', PUT = 'PUT';
    const HEADER = {'content-type': 'application/json'}

    function createUser(user) {
        return fetch(self.url, {
            method: POST,
            headers: HEADER,
            body: JSON.stringify(user)
        }).then(function (response) {
            return response.json();
        }).catch(function () {
            throw new Error('Failed to create new user');
        });
    }

    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
                return response.json();
            })
            .catch(function () {
                throw new Error('Could not load users');
            });
    }

    function findUserById(userId) {
        return fetch(`${self.url}/${userId}`)
            .then(function (response) {
                console.log("finduserById");
                return response.json();
            })
            .catch(function () {
                throw new Error('Could not retrieve user info');
            });
    }

    function updateUser(userId, user) {
        return fetch(`${self.url}/${userId}`, {
            method: PUT,
            headers: HEADER,
            body: JSON.stringify(user)
        })
        .catch(function () {
            throw new Error('Failed to update user');
        });
    }

    function deleteUser(userId) {
        return fetch(`${self.url}/${userId}`, {
            method: DELETE
        })
            .catch(function () {
                throw new Error('Failed to delete user');
            });
    }
}
