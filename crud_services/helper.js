const writeMyCRUDForMePlzImTired = (tableName, [arr1,arr2,arr3,arr4] ) =>{
    return `
        ${tableName}Service.create = (${arr1.join(', ')}) =>{
            const sql = \`
                INSERT INTO ${tableName.toLowerCase()}s (${arr1.join(', ')}) VALUES
                (${arr1.map(e => `$[${e}])`).join(', ')})
            \`;
            return db.none(sql, {${arr1.join(', ')}});
        }

        ${tableName}Service.read = (${arr2[0]}) =>{
            const sql =\`
            SELECT
                *
            FROM ${tableName.toLowerCase()}s
            WHERE
                LOWER(${arr2[0]})=$[${arr2[0]}]
            \`;
            return db.one(sql, {${arr2[0]}: ${arr2[0]}.toLowerCase() });
        }

        ${tableName}Service.update = ({${arr3.join(', ')}}) =>{
            const sql = \`
                UPDATE ${tableName.toLowerCase()}s
                SET
                    ${arr3.reduce( (acc,e) => acc+`${e}=$[${e}], \n`,'')}
                    updatedAt=$[updatedAt]
                WHERE
                    ${tableName.toLowerCase()}_id=$[${tableName.toLowerCase()}_id]
            \`;
            const updatedAt = new Date();
            return db.none(sql, {${arr3.join(', ')}, updatedAt});
        }

        ${tableName}Service.delete = (${arr4[0]}) =>{
            const sql = \`
            DELETE FROM ${tableName.toLowerCase()}s WHERE ${arr4[0]}=$[${arr4[0]}]
            \`;
            return db.none(sql, {${arr4[0]}});
        }
    `;
}

const arr1 = ['store_id','product_name','product_desc','product_price','product_imgs'];
const arr2 = ['product_id'];
const arr3 = ['product_id'];
const arr4 = ['product_id'];

console.log(writeMyCRUDForMePlzImTired('Product', [arr1, arr2, arr3, arr4]));