
var AppRouter = Backbone.Router.extend({
    routes: {
        '': 'homeView',
        'signup': 'signupView',
        'login': 'loginView',
        'logout': 'logoutView',
        'profile': 'profileView',
        'customers': 'customersView',
        'customers/:customer_id/summary' : 'summaryView'
    },
    homeView: function () {
        var landingView = new LandingView({ el: ".landing" })
    },
    loginView: function () {
        var login_view = new LoginView({ el: '#content' })
    },
    logoutView: async function () {
        const user = new UserModel()
        await user.save(null, {
            url: "http://localhost:3060/users/logout",
            headers: { 'auth-token': localStorage.getItem('khata-token') },
            success: function (response) {
                localStorage.removeItem('khata-token')
            },
            error: function (error, response) {
                console.log(response)
            }
        })
        router.navigate('', {trigger:true})
    },
    signupView: function () {
        var signup_view = new SignupView({ el: "#content" })
    },
    profileView: function () {
        if (!localStorage.getItem('khata-token')) {
            $('.before-auth').show()
            $('.after-auth').hide()
            window.location = '#'
        } else {
            $('.before-auth').hide()
            $('.after-auth').show()
            var profile_view = new ProfileView({ el: "#content" })
        }
    },
    customersView: function () {
        if (!localStorage.getItem('khata-token')) {
            $('.before-auth').show()
            $('.after-auth').hide()
            window.location = '#'
            window.alert("Please Login to continue...")
        } else {
            $('.before-auth').hide()
            $('.after-auth').show()
            var customers_view = new CustomersView({ el: "#content" })
            customers_view.render()
        }
    },
    summaryView : function (customer_id) {
        if (!localStorage.getItem('khata-token')) {
            $('.before-auth').show()
            $('.after-auth').hide()
            window.location = '#'
            window.alert("Please Login to continue...")
        } else {
            var customer = new CustomerModel({ customer_id : customer_id })
            var view = new SummaryView({ model: customer, el: '#content' })
        }
    }

})
