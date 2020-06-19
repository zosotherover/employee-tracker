const connetion = require("./connection");

const Database {

    constructor(connection) {
        this.connection = connection;
    }

    createDepartment() {
        return this.connection.query(
            SELECT 
        );
    }    
    createEmployee() {
        return this.connection.query(
            SELECT 
        );
    }        
    createRole() {
        return this.connection.query(
             SELECT  
        );
    }
}




module.exports = new Database(connetion);