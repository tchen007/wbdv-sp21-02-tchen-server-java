// Implements the user service client encapsulating all data communication with server
// function will be class in

function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    // this.url = 'https://wbdv-generic-server.herokuapp.com/api/tchen007/users';
    this.url = 'https://wbdv-generic-server.herokuapp.com/api/jannunzi/users';
    var self = this;
    function createUser(user) {}

    function findAllUsers() {
        return fetch(self.url)
            .then(function (response) {
            return response.json();
        })
    }

    function findUserById(userId) {}
    function updateUser(userId, user) {}
    function deleteUser(userId) {}
}
