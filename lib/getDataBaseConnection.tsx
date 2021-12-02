import { Comment } from "src/entity/Comment";
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";
import { createConnection, getConnectionManager } from "typeorm";
import "reflect-metadata";
import config from 'ormconfig.json'

const create = async function () {
    // @ts-ignore
    return createConnection({
        ...config,
        entities:[Post,User,Comment]
    });
}

const promise = (async function () {
    const manager = getConnectionManager()
    let hasConnection = manager.has('default')
    
    if (!hasConnection) {
        return create()
    } else {
        const current = manager.get('default')
        if (current.isConnected) {
            return current;
        } else {
            return create();
        }  
    }
 })()

export const getDataBaseConnection = async ()=>{
    return promise
}
