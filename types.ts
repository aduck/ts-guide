// 类型别名type，常用来定义联合类型的别名或者字面量类型的别名

// 定义别名
type TypeA = string

// 定义联合类型
type TypeB = string | number

// 定义函数类型
type TypeC = (a: number, b: string) => string

// 定义字面量类型，规定只能在这几个字面量之间取值
type TypeD = 'a' | 'b' | 3

// 定义type类型
type TypeE = TypeA | TypeC

// 使用type
function typeFuncA (a: TypeA): TypeB {
  return a
}