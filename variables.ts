// 基本类型 string number boolean null undefined symbol
let a: string
let b: number
let c: boolean
let d: null
let e: undefined
let f: void // 只能复制null和undefined
let g: any // 任意值，未声明或类型为any，声明时未被赋值不会再进行类型推断
// g = 1
// g = 'hello'
// console.log(g) ==> 'hello'
let h = 1 // 声明时未加类型会在赋值时类型推断，相当于let h: number = 1
// h = 'hello' // 会报错，因为h类型被推断为number
let i: string | number // 联合类型，声明赋值类型为string或者number，赋值时会进行推断
// i = 'hello'; console.log(i.length) // 赋值推断为string类型，可以访问length属性
// i = 4; console.log(i.length) // 推断为number，报错
// console.log(i.length) // 未赋值，访问属性或者方法有限制，只能访问共同拥有的属性或者方法不然会报错
// console.log(i.toString()) // ok
// 联合类型访问不共同的属性或者方法时，需要手动断言，注意不能断言为联合类型之外的类型
function varA (x: string | number): number {
  // return x.length // 报错，number没有length属性
  // 需要使用断言，语法：<type>var
  if ((<string>x).length) {
    return (<string>x).length
  } else {
    return x.toString().length
  }
}
// 断言另一种语法as
function varB (x: string | number): number {
  if ((x as string).length) {
    return (x as string).length
  } else {
    return x.toString().length
  }
}
