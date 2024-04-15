import { Client, ClientConfig } from "pg";

type User ={
    name:string
    surname: string
    phone: string
}

const config: ClientConfig = {
    connectionString:'postgresql://isnaddinov:5052929@localhost:5432/practice'
}

const client = new Client(config)

client.connect(err =>{
    if(err == null){
        console.log('Connected to database');
    }
    else{
        console.log('Connecting eror: ' + err);
        
    }
})

function createUserTable(){
    const sql:string = `CREATE TABLE IF NOT EXISTS users(
        name VARCHAR (90),
        surname VARCHAR(90),
        phone VARCHAR (90)
    );`
    client.query(sql, (err, result)=>{
        if(err == null){
            console.log('TABLE CREATED');
        }
        else{
        console.log('ERROR WITH CREATE TABLE: ' + err);
        
        }
    }) 
}
function writeTable(user:User){
    const sql:string = `INSERT INTO users(name, surname, phone)
    VALUES ($1, $2, $3);`
    const values:any[]=[user.name, user.surname, user.phone]

    client.query(sql, values, (err, result)=>{
        if(err == null){
            console.log(result);
        }
        else{
            console.log('Write error: ' + err);
            
        }
    })
}
const user:User ={
    name: 'Otabek',
    surname: 'Isnaddinov',
    phone: '+998914580107'
}

const showUser = () => {
    const sql:string = `SELECT * FROM users;`

    client.query(sql, (err, result)=>{
        if(err == null){
            console.table(result.rows);
        }
        else{
            console.log('ERROR SHOW USERS: ' + err);
            
        }
    })
}
showUser()