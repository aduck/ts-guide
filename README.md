# TypeScript文档

## 声明类型

### `any`

可以给`any`类型赋值所有值，不建议使用

* 语法

```ts
// 手动声明，未声明默认为:any
: any
```

* 案例

```ts
let a: any = 1
// 默认为any
let a2
a2 = 123
a2 = 'hello'
// 类型推断，声明并赋值一个未定义类型的变量会进行类型推断
let a3 = 1 // 此时类型推断为number
a3 = '123' // 再次赋值其它类型会报错
// 声明了类型不会进行类型推断
let a4: any = 1
a4 = 'hello'
// 作为函数返回值
function f (): any {}
// 作为参数
function f2 (a: any) {}
```

### 字符串

* 语法

```ts
: string
```

* 案例

```ts
let str: string = 'string'
// 作为返回值
function f (): string {
  return 'hello'
}
// 作为参数
function f2 (x: string): void {}
// 作为属性值(接口)
interface IDemo {
  a: string
}
let o: IDemo = {
  a: '123'
}
```

### 数字

* 语法

```ts
: number
```

* 案例

```ts
let num: number = 1
let num2: number = 0.1
let num3: number = 0xf00d
```

### 布尔

* 语法

```ts
: boolean
```

* 案例

```ts
let bool: boolean = true
let bool2: boolean = Boolean(1)
// 这种是错误的
let bool3: boolean = new Boolean(12)
// 需要改为
let bool3: Boolean = new Boolean(12)
```

### `null`和`undefined`

`null`和`undefined`是所有类型的子类型，不可以把父类型的值赋给子类型，反之可以

* 语法

```ts
: null
: undefined
```

* 案例

```ts
let n: null = null
let u: undefined = undefined
// 这样是不可以的
let n1: null = 123
// 这样是可以的
let n2: number = null
```

### 空`void`

`void`类型只能赋值为`null`或者`undefined`，意义不大，作为函数返回值类型表示没有返回值

* 语法

```ts
: void
```

* 案例

```ts
let v: void = null
// 作为返回值
function f ():void {}
```

### 数组

一般数组值只能为同一类型，`any`除外，其它建议用元组

* 语法

```ts
: type[]
: Array<type>
```

* 案例

```ts
// 用[]方式，建议
let arr: any[] = [1, '2', {}]
let arr2: number[] = [1, 2, 3]
// 用泛型<>方式，不建议
let arr3: Array<string> = ['1', '2']
```

### 元组

越界的(比如通过push)值类型需要为已声明的类型的联合类型

* 语法

```ts
: [type1, type2]
```

* 案例

```ts
let t: [string, number] = ['hello', 1]
// 越界处理
let t2: [number, string] = [2, '1']
t2.push(false) // 会报错，取值只能为number | string
```

### 对象

* 语法

```ts
: object
```

* 案例

```ts
let o: object = {a: 1, b: 'hello'}
let o2: object = [1, 'hello']
let o3: object = null
```

## 联合类型

* 语法

```ts
: type1 | type2 | ...
```

* 案例

```ts
let c: string | number = 2
// 作为参数和返回值
function f (x: string | number): string | number {
  return x
}
// 以上写法有点繁琐，可以用type起个别名
type StringOrNumber = string | number
function f (x: StringOrNumber): StringOrNumber {
  return x
}
// 用以上写法无法表示当值类型为string返回string，number返回number，此时可以利用函数的重载来声明
function f (x: string): string
function f (x: number): number
function f (x: string | number): string | number {
  return x
}
```

## 接口`interface`

用来定义类型的结构，值必须要结构完全一致

* 语法

```ts
interface InterfaceName {
  propertyName: type
}
// 可选属性，具体值在没有该属性时也不会报错
interface InterfaceName2 {
  propertyName: type
  propertyName2?: type
}
// 只读属性，声明阶段赋值不会报错，声明完成后值不允许更改
interface InterfaceName3 {
  propertyName: type
  readonly propertyName3: type
}
// 其它属性，说明：声明了其它属性时，已声明的类型必须为它的子类型
interface InterfaceName4 {
  propertyName: type
  [propName: string]: type
}
```

* 案例

```ts
// 声明个枚举
enum Sex {
  Male = 1,
  FeMale = 2
}
// 声明个接口
interface I {
  name: string
  age?: number
  readonly sex: Sex
}
// 使用
let p: I = {
  name: 'demo',
  sex: Sex.Male
}
p.sex = Sex.FeMale // 会报错，只读类型不允许更改
// 声明
interface I2 {
  // 声明方法
  say: (x: string) => string
  // 声明属性
  name: string
}
// 使用
let p: I2 = {
  name: 'test',
  say: (x) => x
}
```

## 枚举

枚举值默认从0开始，按1递增，值一般为数字也可以是其它类型

* 语法

```ts
enum EnumName {
  key,
  ...
}
// 默认值，当默认值value不是number类型，key2必须要赋值不然会报错
enum EnumName2 {
  key = value,
  key2,
  ...
}
```

* 案例

```ts
enum LogLevel {
  ERROR, WARN, INFO, DEBUG
}
console.log(log.ERROR) // 0
// 使用keyof typeof enum转换为类型
type LogLevelString = keyof typeof LogLevel // 相当于type LogLevelString = 'ERROR' | 'WARN' | 'INFO' | 'DEBUG'
let log:LogLevelString = '111' // 报错，赋值必须为ERROR, WARN, INFO, DEBUG其中一个
// 枚举赋值可以计算
enum Div {
  A = 1,
  B = A * 2,
  C = B * 2,
}
console.log(Div.C) // 4
// 枚举一个key不为数字，下一个key必须要赋值
enum E {
  A = 'hello',
  B // 不赋值会报错
}
// 枚举key和值一一对应
enum E2 {
  A,
  B,
  C
}
console.log(E2[0]) // 'A'
```

## 类型别名`type`

用来给类型起个别名，方便维护

* 语法

```ts
type TypeName = type
type TypeName2 = type | type2
type TypeName3 = value | value2 | ...
```

* 案例

```ts
type T = string | number
type T2 = (a: string) => string
type T3 = T | T2
type T4 = 'A' | 'B' | 'C'
```

## 函数

* 语法

```ts
// 声明
function funcName (param: type): returnType {}
// 表达式
const funcName: (param: type) => returnType = (param: type): returnType => {}
```

* 案例

```ts
function f (x: number): number {
  return Math.abs(x)
}
const f: (x: number) => number = (x: number) => {
  return Math.abs(x)
}
// 可选参数，说明：可选参数必须在必选参数之后
function add (a: number, b?: string): string {
  return a + b
}
// 剩余参数
function push (arr: any[], ...items: any[]) {
  items.forEach(item => {
    arr.push(item)
  })
}
```

## 类`class`

类：同类事物的抽象，包含属性和方法  
对象：类的实例，通过`new`生成  
封装：对数据的操作细节封装，只暴露对外的接口，外界无法更改内部的数据  
继承：子类继承父类，子类拥有父类的所有特性，还可以自定义特性  
多态：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应  
存取器(setter,getter)：用以改变属性的读取和赋值行为  
修饰符：修饰符是一些关键字，用于限定成员或类型的性质，如public(公共，都能访问),private(私有，外部不能访问),protected(受保护的，子类可以访问)  
抽象类：抽象类是供其他类继承的基类，不能被实例化，另外抽象类中的抽象方法必须在子类中被实现  
接口：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

* 语法

```ts
class ClassName {
  public keyname: type
  constructor (keyName: type) {
    ...
  }
  ...
}
```

* 案例

```ts
class Animal {
  public name: string
  // private name: string // 不允许在子类访问
  // protected name: string // 允许在子类访问
  // readonly name: string // 不允许更改
  static sth: string // 可以通过Animal.sth访问
  public constructor (name: string) {
    this.name = name
  }
  public sayHi (): string {
    return `hi, ${this.name}`
  }
}
let ani: Animal = new Animal('ani')
ani.sayHi()
// 抽象类，无法实例化new
abstract class Animal {
  public name
  public constructor (name) {
    this.name = name;
  }
  // 抽象方法，必须在子类实现
  public abstract sayHi();
}
class Cat extends Animal {
  public eat () {
    console.log('eat')
  }
  // 必须要实现
  public sayHi (): string {
    return 'hi'
  }
}
// 实现接口
interface Alarm {
  alert()
}
class Door implements Alarm {
  public alert () {
    console.log('alert')
  }
}
let door: Door = new Door()
door.alert()
// 实现多个接口
interface Alarm {
  alert()
}
interface Light {
  lightOn()
  lightOff()
}
class Car implements Alarm, Light {
  alert () {
    console.log('Car alert')
  }
  lightOn () {
    console.log('Car light on')
  }
  lightOff () {
    console.log('Car light off')
  }
}
// 接口可以继承接口
interface Alarm {
  alert()
}
interface Light extends Alarm {
  lightOn()
  lightOff()
}
// 接口也可以继承类
class Point {
  x: number
  y: number
}
interface Point3d extends Point {
  z: number
}
```

## 类型断言

类型断言可以用来手动指定一个值的类型，一般用来断言联合类型，断言的类型必须为联合类型中的类型

* 语法

```ts
// 类型值方式
<type>value
// as方式，tsx只支持这种方式
value as type
```

* 案例

```ts
function getLength (x: string | number): number {
  // if (x.length) return x.length // 这样写会报错number类型不存在属性length
  if ((x as string).length) return (x as string).length // 或者用<string>x方式
  return x.toString().length
}
```

## 泛型

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

* 语法

```ts
// 函数
function funcName<T> (args1: type, args2: T) {
  ...
}
// 接口
interface InterfaceName<T> {
  ...
}
// 类
class ClassName<T> {
  ...
}
```

* 案例

```ts
// 函数
function createArray<T> (length: number, value: T): Array<T> {
  let result: T[] = []
  for (let i = 0; i < length; i++) {
    result[i] = value
  }
  return result
}
createArray<string>(3, 'x')
// 多个类型参数
function swap<T, U> (tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]]
}
swap<string, number>(['x', 3])
// 接口
interface CreateArrayFunc<T> {
  (length: number, value: T): Array<T>;
}
let t: CreateArrayFunc<string>
// 类
class GenericNumber<T> {
  zeroValue: T
  add: (x: T, y: T) => T
}
let myGenericNumber = new GenericNumber<number>()
// 在版本2.3以后可以为泛型设置默认值<T = string>
// 泛型约束，因为事先不知道具体类型，所有可能有些属性无法访问和操作，需要用到泛型约束
function getLength<T> (arg: T): number {
  return arg.length // 报错，类型T不存在属性length
}
// 需要改为这样，此时参数类型只能为包含length属性的类型
interface Lengthwise {
  length: number
}
function getLength<T extends Lengthwise> (arg: T): number {
  return arg.length
}
```

## 声明文件

## ts配置
