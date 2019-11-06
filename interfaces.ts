// 接口，用来定义对象的类型
interface Person {
  a: string
  b: number
}
// 声明变量为Person类型，默认情况需要严格遵守类型格式，属性和类型都要一一对应
let person: Person = {
  a: '1', // 不能缺少这个属性，同时赋值类型必须为string
  b: 2,
  // c // 多个属性也是不被允许的
}
// 可选属性，接口属性定义时加个?
interface A {
  a?: string
}
// 任意属性，允许拥有任意属性，接口添加[propName: string]即可
interface B {
  a: string
  b?: number
  // [propName: string]: string; // 注意，如果声明允许任意属性，则接口所有属性值类型必须为该类型的子集，b?: number会报错
  [propName: string]: any
}
let interB: B = {
  a: 'a',
  c: 'c' // 可以定义c属性了
}
// 只读属性，接口属性添加readonly，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
interface C {
  readonly a?: string
  b: number
}
let interC: C = {
  a: '1', // 这里不会报错，给属性赋值
  b: 2
}
// interC.a = '2' // 第一次给对象赋值，会报错，只读属性不允许更改
// 接口的具体实现，通过implements关键词
class Demo implements Person {
  a: string = 'a'
  b: number = 2
}
// 被编译为
// var Demo = /** @class */ (function () {
//   function Demo() {
//       this.a = 'a';
//       this.b = 2;
//   }
//   return Demo;
// }());
