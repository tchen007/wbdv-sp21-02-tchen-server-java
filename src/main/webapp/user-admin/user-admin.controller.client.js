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
    $(main);

    var users = [];
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

        // $removeBtn = $(".wbdv-remove"); // Should remove and edit be vars?
        // $editBtn = $(".wbdv-edit");

        $createBtn = $(".wbdv-create");
        $createBtn.click(function () {
                let newUser = {
                    username: $usernameFld.val(),
                    firstName: $firstNameFld.val(),
                    lastName: $lastNameFld.val(),
                    role: $roleFld.val()
                }
                createUser(newUser);
            }
        );
        $updateBtn = $(".wbdv-update");

        $userRowTemplate = $(".wbdv-template");
        $tbody = $('.wbdv-tbody');

        users = userService.findAllUsers()
            .then(function (serverUsers) {
                users = serverUsers
                renderUsers(users);
            });
    }

    function createUser(user) {
        users.push(user);
        renderUsers(users);
        resetInputFields();
    }

    function deleteUser(event) {
        console.log(event.target);
        console.log($removeBtn.attr("class"));

        var removeBtn = $(event.target);
        var removeId = removeBtn.attr("id");
        console.log(removeId);
        users.splice(removeId, 1);
        renderUsers(users);
    }

    function selectUser() { } // WHAT IS THIS SUPPOSE TO DO?
        // It is when the pencil is pressed the 2nd row is populated
    function updateUser() { }

    function renderUsers(users) {
        $tbody.empty();
        for(var u = 0; u < users.length; u++) {
            var user = users[u];
            $tbody.append(
                `<tr class="wbdv-template wbdv-user">
                    <td class="wbdv-username pt-4 pl-3">${user.username}</td>
                    <td>&nbsp;</td>
                    <td class="wbdv-first-name pt-4 pl-3">${user.firstName}</td>
                    <td class="wbdv-last-name pt-4 pl-3">${user.lastName}</td>
                    <td class="wbdv-role pt-4 pl-3">${user.role}</td>
                    <td class="wbdv-actions">
                        <span class="text-nowrap float-right">
                            <button class="btn wbdv-remove fa-2x fa fa-times" id="${u}"></button>
                            <button class="btn wbdv-edit fa-2x fa fa-pencil"></button>
                        </span>
                    </td>
                </tr>`
            );
        }
        $removeBtn = $(".wbdv-remove");
        $removeBtn.click(deleteUser);
        // $editBtn = $(".wbdv-edit")


    }

    function resetInputFields() {
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $roleFld[0].selectedIndex=0;
    }

}) ()