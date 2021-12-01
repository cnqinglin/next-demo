import { createConnection, getConnectionManager } from "typeorm";


const promise = (async function () {
    const manager = getConnectionManager()
    const hasConnection = manager.has('default')
    
    if (hasConnection) {
        const current = manager.get('default')
        if (current.isConnected) {
            return current
        } else {
            return createConnection();
        }
    } else {
        return createConnection();   
    }
 })()

export const getDataBaseConnection = async ()=>{
    const connection =  promise;
    return connection;
}
