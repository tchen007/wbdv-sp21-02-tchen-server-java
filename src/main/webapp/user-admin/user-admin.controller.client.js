// Controller handling user events and rendering dynamic portions of user admin page
(function () {
    var $usernameFld, $passwordFld;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn, $updateBtn;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    var users, editIndex, selectedUserId, selectedUser;
    $(main);

    function main() {
        $usernameFld = $("#usernameFld");
        $passwordFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");

        $createBtn = $(".wbdv-create");
        $createBtn.click(createUser);
        $updateBtn = $(".wbdv-update");
        $updateBtn.click(updateUser);

        $userRowTemplate = $(".wbdv-template");
        $tbody = $('.wbdv-tbody');

        users = userService.findAllUsers()
            .then(function (serverUsers) {
                users = serverUsers;
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
                    clearSelected();
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
        var editBtn = $(event.target);
        editIndex = editBtn.attr("id").split('-')[1];
        selectedUserId = users[editIndex]._id;
        try {
            userService.findUserById(selectedUserId)
                .then(function (userInfo) {
                    console.log("userInfo from findUserById", userInfo);
                    $usernameFld.val(userInfo.username);
                    $passwordFld.val(userInfo.password);
                    $firstNameFld.val(userInfo.firstName);
                    $lastNameFld.val(userInfo.lastName);
                    $roleFld.val(userInfo.role);
                    selectedUser = userInfo;
                });
        }
        catch (err) {
            console.log(err.name + ": " + err.message);
        }
    }

    // For the checkmark icon to update existing record
    function updateUser() {
        try {
            selectedUser.username = $usernameFld.val();
            selectedUser.password = $passwordFld.val();
            selectedUser.firstName = $firstNameFld.val();
            selectedUser.lastName = $lastNameFld.val();
            selectedUser.role = $roleFld.val();
            userService.updateUser(selectedUserId, selectedUser)
                .then(function (userServerInfo) {
                    users[editIndex] = selectedUser;
                    renderUsers(users);
                    resetInputFields();
                    clearSelected();
                });
        }
        // In future could catch null error or could grey out checkmark icon.
        catch (err) {
            console.log(err.name + ": " + err.message);
        }
    }

    // Renders the table of current users
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

    // Helper to clear selected after add or update
    function clearSelected() {
        selectedUser = null;
        selectedUserId = null;
        editIndex = null;
    }

}) ()