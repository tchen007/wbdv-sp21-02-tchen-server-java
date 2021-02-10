// Controller handling user events and rendering dynamic portions of user admin page
(function () {
    // var $usernameFld = $("#usernameFld"),
    //     $passwordFld = $("#passwordFld"),
    //     $firstNameFld = $("#firstNameFld"),
    //     $lastNameFld = $("#lastNameFld"),
    //     $roleFld = $("#roleFld");
    // var $removeBtn = $(".wbdv-remove"), // Should remove and edit be vars?
    //     $editBtn = $(".wbdv-edit"),
    //     $createBtn = $(".wbdv-create"),
    //     $updateBtn = $(".wbdv-update"); // Missing the Update button and Search button
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn, $updateBtn;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    var editIndex, selectedUserId, selectedUser;
    $(main);

    var users;
    //     {username: "alice1", firstName: "Alice", lastName: "Meg", role: "Faculty"},
    //     {username: "bob2", firstName: "Bob", lastName: "Yams", role: "Student"},
    //     {username: "kris3", firstName: "Kris", lastName: "Car", role: "Faculty"},
    //     {username: "groot4", firstName: "Groot", lastName: "Avengers", role: "Faculty"},
    //     {username: "git5", firstName: "Git", lastName: "Hub", role: "Admin"}
    // ]

    function main() {
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");

        $createBtn = $(".wbdv-create");
        $createBtn.click(createUser);
        $updateBtn = $(".wbdv-update");
        $updateBtn.click(updateUser)

        $userRowTemplate = $(".wbdv-template");
        $tbody = $('.wbdv-tbody');

        users = userService.findAllUsers()
            .then(function (serverUsers) {
                users = serverUsers;
                console.log(users);
                renderUsers(users);
            });
    }

    // For the + icon on the second row
    function createUser() {
        var newUser = {
            username: $usernameFld.val(),
            password: $passwordFld.val(),
            firstName: $firstNameFld.val(),
            lastName: $lastNameFld.val(),
            role: $roleFld.val()
        };
        try {
            userService
                .createUser(newUser)
                .then(function (userServerInfo) {
                    users.push(userServerInfo);
                    renderUsers(users);
                    resetInputFields();
                });
        }
        catch (err) {
            console.log(err.name + ": " + err.message);
        }
    }

    // For the X icon
    function deleteUser(event) {
        var removeBtn = $(event.target);
        var removeIndex = removeBtn.attr("id").split('-')[1];
        var removeUserId = users[removeIndex]._id;
        try {
            userService
                .deleteUser(removeUserId)
                .then(function () {
                    users.splice(removeIndex, 1);
                    renderUsers(users);
                });
        }
        catch (err) {
            console.log(err.name + ": " + err.message);
        }
    }

    // For the pencil icon, it will autofill the 2nd row to update
    function selectUser(event) {
        console.log("users", users)
        var editBtn = $(event.target);
        editIndex = editBtn.attr("id").split('-')[1];
        selectedUserId = users[editIndex]._id;
        console.log(selectedUserId);
        try {
            userService.findUserById(selectedUserId)
                .then(function (userInfo) {
                    console.log("userInfo from findUserById", userInfo);
                    $usernameFld.val(userInfo.username);
                    $passwordFld.val(userInfo.password);
                    $firstNameFld.val(userInfo.firstName);
                    $lastNameFld.val(userInfo.lastName);
                    $roleFld.val(userInfo.role);
                    selectedUser = userInfo
                });
        }
        catch (err) {
            console.log(err.name + ": " + err.message);
        }
    }

    function updateUser() {
        console.log("updateUser");
        console.log(selectedUserId, editIndex);
        selectedUser.username = $usernameFld.val();
        selectedUser.password = $passwordFld.val();
        selectedUser.firstName = $firstNameFld.val();
        selectedUser.lastName = $lastNameFld.val();
        selectedUser.role = $roleFld.val();
        try {
            console.log('before server update', selectedUser)
            userService.updateUser(selectedUserId, selectedUser)
                .then(function (userServerInfo) {
                    console.log(userServerInfo, "selectedUser", selectedUser)
                    users[editIndex] = selectedUser;

                    renderUsers(users);
                    resetInputFields();
                });
        }
        catch (err) {
            console.log(err.name + ": " + err.message);
        }
    }

    function renderUsers(users) {
        $tbody.empty();
        for(var u = 0; u < users.length; u++) {
            var user = users[u];
            $tbody.append(
                `<tr class="wbdv-template wbdv-user">
                    <td class="wbdv-username pt-4 pl-3">${user.username}</td>
                    <td class="pt-4 pl-3">*****</td>
                    <td class="wbdv-first-name pt-4 pl-3">${user.firstName}</td>
                    <td class="wbdv-last-name pt-4 pl-3">${user.lastName}</td>
                    <td class="wbdv-role pt-4 pl-3">${user.role}</td>
                    <td class="wbdv-actions">
                        <span class="text-nowrap float-right">
                            <button class="btn wbdv-remove fa-2x fa fa-times" id="removeBtn-${u}"></button>
                            <button class="btn wbdv-edit fa-2x fa fa-pencil" id="editBtn-${u}"></button>
                        </span>
                    </td>
                </tr>`
            );
        }
        $removeBtn = $(".wbdv-remove");
        $removeBtn.click(deleteUser);
        $editBtn = $(".wbdv-edit");
        $editBtn.click(selectUser);
    }

    // Helper function to clear input fields
    function resetInputFields() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $roleFld[0].selectedIndex=0;
    }

}) ()