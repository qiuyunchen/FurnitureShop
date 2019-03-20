const db = require('./dbConnect');
const StoreService = {};
module.exports = StoreService;

StoreService.create = ({user_id, store_name, store_logo, store_desc}) =>{
    const sql = `
    INSERT INTO stores (user_id, store_name, store_logo, store_desc) VALUES
    ($[user_id], $[store_name], $[store_logo], $[store_desc])
    `;
    return db.none(sql, {user_id, store_name, store_logo, store_desc});
}
//test
// StoreService.create({user_id:2,store_name:'mos 2nd store',store_desc:'selling more Pursuit chairs'})
// .then(res =>console.log('success: ', res))
// .catch(e => console.log('error!... ', e))

StoreService.read = (store_name) =>{
    const sql =`
    SELECT
        *
    FROM stores
    WHERE
        LOWER(store_name)=$[store_name]
    `;
    return db.one(sql, {store_name: store_name.toLowerCase() });
}
//test
// StoreService.read('mos 3rD store')
// .then(res =>console.log('success: ', res))
// .catch(e => console.log('error!... ', e))


StoreService.update = ({store_id, store_name, store_logo, store_desc}) =>{
    const sql = `
    UPDATE stores
    SET
        store_name=$[store_name],
        store_logo=$[store_logo],
        store_desc=$[store_desc],
        updatedAt=$[updatedAt]
    WHERE
        store_id=$[store_id]
    `;
    const updatedAt = new Date();
    return db.none(sql, {store_id, store_name, store_logo, store_desc, updatedAt});
}
//test MAKE SURE I PASS IN ALL PROPERTIES OR NULL will overwrite some fields
// StoreService.update({store_id:2, store_desc:'Managed By Mo', store_name:'Managed By Mo'})
// .then(res =>console.log('success: ', res))
// .catch(e => console.log('error!... ', e))



StoreService.delete = (store_id) =>{
    const sql = `
    DELETE FROM stores WHERE store_id=$[store_id]
    `;
    return db.none(sql, {store_id});
}

//test
// StoreService.delete(5)
// .then(res =>console.log('success: ', res))
// .catch(e => console.log('error!... ', e))

