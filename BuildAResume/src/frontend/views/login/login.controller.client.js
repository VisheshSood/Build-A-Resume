(function () {

    angular
        .module("ResumeBuilder")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService, RecruiterService) {

            var vm = this;

            function init() {
                vm.error = null;

                //functions
                vm.login = login;

            }

            init();

            function login(user) {

                if(null == user || null == user.username || null == user.password){
                    vm.error = "Empty username/password.";
                    return;
                }

                var promise = UserService.findUserByCredentials(user.username, user.password);

                promise.success(onLoginSuccess);
                promise.error(onLoginFailure);
            }

            
            /* Promise handlers*/

            function onLoginSuccess(response) {

                var user = response;


                if(user){
                    if(user.role == "ADMIN"){
                        $location.url("/admin/" + user._id + "/dashboard")
                    } else {
                        $location.url("/user/" + user._id + "/dashboard");
                    }

                } else{
                    vm.error = "Invalid Credentials.";
                }

            }

            function onLoginFailure(response) {
                vm.error = "Could not find user. Incorrect password.";
            }

    }
})();