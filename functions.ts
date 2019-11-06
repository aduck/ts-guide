// 函数，限制函数的输入（参数）输出

// 函数声明
function funcA (a: number, b: number): number {
  return a + b
}
// funcA(1, 2, 3) // 参数个数和类型不匹配会报错

// 函数表达式，这种只定义了函数右侧（匿名函数）的类型，左侧funcB是推断出来的，不推荐这种写法
const funcB = function (a: number, b: number): number {
  return a + b
}
// (a: number, b: number)参数，必须加括号 => number函数输出，推荐这种，好麻烦啊！！！
const funcC: (a: number, b: number) => number = function (a: number, b: number): number {
  return a + b
}

// 用接口interface定义函数，这种貌似更方便
interface FuncA {
  (a: number, b: number): boolean
}
let funcD: FuncA = function (a: number, b: number): boolean {
  return a > b
}

// 可选参数（参数后用?）
function funcE (a: number, b?:number): number {
  return a + b
}
funcE(1, 2) // 不会报错
// 可选参数后不允许有必选参数，下面会报错
// function funcF (a?: number, b: number): number {
//   return a + b
// }

// 剩余参数rest，items为数组可用any[]声明，注意：rest只能是最后一个参数
function funcF (arr: any[] = [], ...items: any[]): any[] {
  items.forEach(item => {
    arr.push(item)
  })
  return arr
}
// console.log(funcF([1], 2, 3, 4)) // [1, 2, 3, 4]

// 利用函数重载定义函数输入和输出类型
function reverse (x: number): number // 只是定义
function reverse (x: string): string // 只是定义
// 具体实现
function reverse (x: number | string): number | string {
  if (typeof x === 'number') {
    return x.toString().split('').reverse().join('')
  } else if (typeof x === 'string') {
    return x.split('').reverse().join('')
  }
}
// reverse(true)
// No overload matches this call.
// Overload 1 of 2, '(x: number): number', gave the following error.
//   类型“true”的参数不能赋给类型“number”的参数。
// Overload 2 of 2, '(x: string): string', gave the following error.
//   类型“true”的参数不能赋给类型“string”的参数。