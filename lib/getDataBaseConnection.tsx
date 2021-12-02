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

    const current = manager.has('default') && manager.get('default')
    if (current) { await current.close() }
    return create()
    // if (!hasConnection) {
    //     return create()
    // } else {
    //     const current = manager.get('default')
    //     if (current.isConnected) {
    //         await current.close()
    //         // return current;
    //         return create();
    //     } else {
    //         return create();
    //     }  
    // }
 })()

export const getDataBaseConnection = async ()=>{
    return promise
}
