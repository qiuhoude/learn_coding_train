interface Point {
    readonly x: number
    y: number
    age?: number
    [propName: string]: any // 其他类型

}
// const p1: Point = { x: 1, y: 2 }
// console.info("p1", p1.x)

// 基础类型 boolean number string void undefined symbol null enum  tuple
let count: number
count = 123
enum Color { Red = 1, Green = 2, Blue = 4 }

// 断言类型 和 golang ().type 一样
// 尖括号”语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// as语法
let strLength2: number = (someValue as string).length


// 解构
// tuple解构
{
    let input: [number, number] = [1, 2];
    let [first, second] = input
    function f1([first, second]: [number, number]) { }
    f1(input)
}
// rest 剩余变量
{
    let [first, ...rest] = [1, 2, 3, 4]
    console.log(first)
    console.log(rest)
    let [, second, , fourth] = [1, 2, 3, 4];

}
// 对象解构
{
    let o = { a: "", b: 12, c: "bar" };
    // ({ a, b } = { a: "baz", b: 101 }); // js的写法
    // let { a, b }: { a: string, b: number } = o; // ts写法

    let { a, ...passthrough } = o; // 剩余值 passthrough.b passthrough.c

    let { a: newName1, b: newName2 } = o; // 属性重命名
    /*
    这里的冒号不是指示类型的，将 a: newName1 读做 "a 作为 newName1"
    等价于 
    let newName1 = o.a; let newName2 = o.b;
    */
}
// 展开
{
    // 数组展开
    let first = [1, 2];
    let second = [3, 4];
    let bothPlus = [0, ...first, ...second, 5];
    // 对象展开
    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { ...defaults, food: "rich" };

    //字符串 Downleveling
    let s = `food: ${defaults.food}`
}

// 默认值,避免undefined 
{
    //方式1 b 可选
    function keepWholeObj1(wobj: { a: string, b?: number }) {
        let { a, b = 100 } = wobj;
    }
    // 方式2 
    type C = { a: string, b?: number } // 别名的方式 b?是可选
    function keepWholeObj2({ a, b }: C) { }
    keepWholeObj2({ a: "" })
    // 方式3 推断a,b可选
    function keepWholeObj3({ a = "", b = 0 } = {}): void { }
    keepWholeObj3() // 可以进行无参数调用
    // 方式4 推断b?是可选
    function keepWholeObj4({ a, b = 0 } = { a: "" }): void { }
}



// 对象类型 {} class function []

// 函数的定义
{
    // 函数的定义方式 1
    const func1 = (str: string): number => {
        return parseInt(str, 10);
    }

    // 函数的定义方式 2
    const func2: (str: string) => number = (str) => {
        return parseInt(str, 10);
    }

}

// 联合体
{
    const arr: (number | string)[] = [1, 2, "3"]
}

{
    // generics
    interface Person {
        name: string
        age: number
        gender: string
    }

    class Teacher {
        constructor(private info: Person) {
        }
        getInfo<T extends keyof Person>(key: T): Person[T] {
            return this.info[key]
        }
    }
    class Test {
        [key: string]: string | undefined
    }
    const t1 = new Teacher({ name: "qiu", age: 8, gender: "male" })
    let field = t1.getInfo("age")
    console.log(field)

    // typescript 类型融合方式可以扩展老的库
}
