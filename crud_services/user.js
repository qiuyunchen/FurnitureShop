const db = require('./dbConnect');
const UserService = {};
module.exports = UserService;

UserService.create = ({username, email, full_name, phone, address}) =>{
    const sql = `
    INSERT INTO users (username, email, full_name, phone, address) VALUES
    ($[username], $[email], $[full_name], $[phone], $[address])
    `;
    return db.none(sql, {username, email, full_name, phone, address});
}

//test
// UserService.create({username: 'test', email: 'test@test.com', updatedAt: 'today'})
// .then( result =>{console.log(result)})
// .catch(e =>{console.log('error!!!: ', e)});

UserService.read = (username) =>{
    const sql =`
    SELECT
        *
    FROM users
    WHERE
        LOWER(username)=$[username]
    `;
    return db.one(sql, {username: username.toLowerCase()});
}

//test
// UserService.read('mo')
// .then(user =>console.log(user))
// .catch(e =>console.log('error: ', e))

UserService.update = ({user_id, username, email, full_name, phone, address}) =>{
    const sql = `
    UPDATE users
    SET
        username=$[username],
        email=$[email],
        full_name=$[full_name],
        phone=$[phone],
        address=$[address],
        updatedAt=$[updatedAt]
    WHERE
        user_id=$[user_id]
    `;
    const updatedAt = new Date();
    return db.none(sql, {user_id, username, email, full_name, phone, address, updatedAt});
}

//test
// UserService.update({user_id: 10, address: 'addr', phone: 12345, username: 'haha', full_name:'yeah right', email: 'test@test.com'})
// .then(result =>{console.log(result)})
// .catch(e => console.log('error: ', e))

UserService.delete = (user_id) =>{
    const sql = `
    DELETE FROM stores WHERE user_id=$[user_id];
    DELETE FROM users WHERE user_id=$[user_id];
    `;
    return db.none(sql, {user_id});
}
  
// test
UserService.delete(1)
.then(result =>{ console.log('success: ', result)})
.catch(e =>{console.log('error: ', e)});
