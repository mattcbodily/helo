const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        let newUser = await db.register({user: username, pass: hash})
        newUser = newUser[0];
        session.user = {...newUser};
        res.status(201).send(session.user);
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const { session } = req;
        const db = req.app.get('db');
        let user = await db.login({user: username})
        user = user[0];
        if(!user){
            return res.sendStatus(400);
        }
        const foundUser = bcrypt.compareSync(password, user.password)
        if(foundUser){
            delete user.password;
            session.user = user;
            res.status(200).send(session.user);
        } else {
            res.status(401).send('Authentication Failed');
        }
    },
    getPosts: (req, res) => {
        req.app.get('db').getAllPosts()
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send({errorMessage: 'Error'}, console.log(err)))
    },
    getUserPosts: (req, res) => {
        const { params } = req;
        req.app.get('db').getUserPosts(params.id)
        .then(posts => res.status(200).send(posts))
        .catch(err => res.status(500).send({errorMessage: 'Error'}, console.log(err)))
    }
}