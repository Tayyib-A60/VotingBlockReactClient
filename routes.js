const routes = require('next-routes')();

routes
.add('/login', 'login')
.add('/signup', 'signup')
.add('/new', '/new/index')
.add('/elections/:address', '/elections/vote')
.add('/user/:id', 'user')
.add('/forgotPassword', 'forgotPassword')
.add('/resetPassword', 'resetPassword')
.add('/allcontracts', 'allContracts');

module.exports = routes;