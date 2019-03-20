const db = require('./dbConnect');
const StoreService = {};
module.exports = StoreService;

StoreService.create = ({user_id, store_name, store_logo, store_desc}) =>{
    const sql = `
    INSERT INTO stores (user_id, store_name, store_logo, store_desc, updatedAt) VALUES
    ($[user_id], $[store_name], $[store_logo], $[store_desc], $[updatedAt])
    `;
    const updatedAt = new Date().toDateString();
    return db.none(sql, {user_id, store_name, store_logo, store_desc, updatedAt});
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
    const updatedAt = new Date.now().toDateString();
    return db.none(sql, {store_id, store_name, store_logo, store_desc, updatedAt});
}
//test MAKE SURE I PASS IN ALL PROPERTIES OR NULL will overwrite some fields
// StoreService.update({store_id:6, store_desc:'mo 3rd store', store_name:'mos 3rd store', store_logo:'mo 3rd store logo url'})
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

