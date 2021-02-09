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
    // var userService = new AdminUserServiceClient();
    $(main);

    const users = [
        {username: "alice1", firstName: "Alice", lastName: "Meg", role: "Faculty"},
        {username: "bob2", firstName: "Bob", lastName: "Yams", role: "Student"},
        {username: "kris3", firstName: "Kris", lastName: "Car", role: "Faculty"},
        {username: "groot4", firstName: "Groot", lastName: "Avengers", role: "Faculty"},
        {username: "git5", firstName: "Git", lastName: "Hub", role: "Admin"}
    ]

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
        renderUsers(users);
    }

    function createUser(user) {
        users.push(user);
        renderUsers(users);
        $usernameFld.val("");
        $passwordFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
        $roleFld[0].selectedIndex=0;
    }

    function deleteUser() { }

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
                            <button class="btn wbdv-remove" id="${u}">
                                <i class="fa-2x fa fa-times fa-fw"></i>
                            </button>
                            <button class="btn wbdv-edit">
                                <i class="fa-2x fa fa-pencil fa-fw"></i>
                            </button>
                        </span>
                    </td>
                </tr>`
            )
            // $removeBtn = $(".wbdv-remove");
            // $removeBtn.click(deleteUser);
            // $editBtn = $(".wbdv-edit")


            // const rowClone = $userRowTemplate.clone();
            // rowClone.find('.wbdv-username').html(user.username);
            // rowClone.find('.wbdv-first-name').html(user.firstName);
            // rowClone.find('.wbdv-last-name').html(user.lastName);
            // rowClone.find('.wbdv-role').html(user.role);
            // $tbody.append(rowClone);
            // rowClone.removeClass('wbdv-hidden');
        };
    }

}) ()