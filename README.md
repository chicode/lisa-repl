# Lisa REPL

## Installation

```sh
yarn global add @chicode/lisa-repl
# or
npm i -g @chicode/lisa-repl
```

## Usage

```js
$ lisa-repl
> 9
9
> "hello"
'hello'
> (defunc fib (n)
... (var a 0) (var b 1) (var f 1)
... (var i 2)
... (while (<= i n)
..... (set f (+ a b))
..... (set a b)
..... (set b f)
..... (set i (+ i 1))
..... (log i f)
..... f))
> (fib 10)
{ type: 'num', value: 3 } { type: 'num', value: 1 }
{ type: 'num', value: 4 } { type: 'num', value: 2 }
{ type: 'num', value: 5 } { type: 'num', value: 3 }
{ type: 'num', value: 6 } { type: 'num', value: 5 }
{ type: 'num', value: 7 } { type: 'num', value: 8 }
{ type: 'num', value: 8 } { type: 'num', value: 13 }
{ type: 'num', value: 9 } { type: 'num', value: 21 }
{ type: 'num', value: 10 } { type: 'num', value: 34 }
{ type: 'num', value: 11 } { type: 'num', value: 55 }
55
```

## License

This project is licensed under the GPLv3. Please see the [LICENSE](LICENSE) file
for more details.
