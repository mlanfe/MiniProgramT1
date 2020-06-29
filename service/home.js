import request from './network'

export function getHomeMultiData(){
    return request({url:'/home/multidata'})
}
export function getHomeGoods(type,page){
    return request({
        url:"/home/data",
        data:{type,page}
    })
}