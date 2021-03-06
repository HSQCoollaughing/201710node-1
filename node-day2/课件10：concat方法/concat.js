var  buffer = Buffer.from([1,2,3])
var newBuffer = buffer.slice(0,1)
newBuffer[0]=100
console.log(buffer);//<Buffer 64 02 03>
//copy

var buffer1 = Buffer.from('hello ')
var buffer2 = Buffer.from('world')
var buff = Buffer.alloc(11)
console.log(buff.length);
console.log(buffer1.length);
console.log(buffer2.length);
//拷贝Buffer(copy)
 buffer1.copy(buff,0)
buffer2.copy(buff,6)
 console.log(buff.toString())//hello world

//concat:连接Buffer  按command键看其实现  默认就是二者的长度
console.log(Buffer.concat([buffer1,buffer2]).toString());//hello world
console.log(Buffer.concat([buffer1,buffer2],200).toString());//hello world                                                                                                                                                                                             
Buffer.MyConcat= function (list,totalLength) {
    //1、判断长度是否传递了，如果传递了用传的，如果没传就自己算一个总长度
    if (typeof  totalLength ==='undefined')
    {
       totalLength = list.reduce((prev,next)=>prev+next.length,0)
    }
    //2、通过长度创建一个Buffer
     let buffer = Buffer.alloc(totalLength)
    //再循环list、将每一项copy到大Buffer上  用copy方法
    let offset = 0;
     list.forEach(buff=>{
         if (!Buffer.isBuffer(buff)) throw new Error('not buffer')
         buff.copy(buffer,offset)
         offset+=buff.length
     })
    //4、如果长度过长，把剩下的清空  fill  或者可以采用slice截取有效长度

    //5、返回一个新的buffer
    return buffer.slice(0,offset)
}

console.log(Buffer.MyConcat([buffer1, buffer2]).toString());//hello world
console.log(Buffer.MyConcat([buffer1, buffer2],100).toString());//hello world
console.log(Buffer.MyConcat([buffer1, buffer2,1],100).toString());//not buffer

//判断是不是Buffer  Buffer.isBuffer
























