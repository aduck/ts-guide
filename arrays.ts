// ts的数组

// type+[]表示法（建议）
let arr: number[] = [] // 定义数组的值只能为number类型
// arr.push('1') // 会报错，只能push number类型

// Array+<type>表示法（数组泛型）
let arrA: Array<number> = [1, 2,]

// 接口interface表示法（不建议，但是用来定义类数组类型必须使用接口表示法）
interface NumberArray {
  [index: number]: number
}
let arrB: NumberArray = [1, 2]

// 类数组（array-like Object），需要使用接口表示法
function arrfuncA () {
  // let arg: number[] = arguments // 报错Type 'IArguments' is missing the following properties from type 'number[]': pop, push, concat, join, and 24 more.
  let arg: IArguments = arguments // 可以使用ts预定义的接口，除此还有Boolean,Error,Date,RegExp,Document,HTMLElement,Event,NodeList，HTMLCollection等,https://github.com/Microsoft/TypeScript/tree/master/src/lib查看所有
}
// 预定义的IArguments接口
// interface IArguments {
//   [index: number]: any;
//   length: number;
//   callee: Function;
// }

// any，表示数组项可以为任意类型
let arrC: any[] = [1, '2', true, {num: 123}]
