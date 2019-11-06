// 声明文件，以.d.ts为后缀，主要为了声明第三方库
// jQuery.d.ts
declare const $: (selector: string) => any // 不会声明一个变量，只会声明变量的类型

// 声明全局变(常)量
declare var declareA
declare let declareB // 等同于var
declare const declareC // 推荐，一般全局的都是禁止修改的

// 声明全局函数
declare function declareD (params: string): any

// 声明类
declare class declareE {}

// 声明枚举
declare enum declareF {}

// 声明命名空间
declare namespace declareG {}

// npm包 todo