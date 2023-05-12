# 1. 정의

- Typescript는 마이크로소프트에서 개발, 유지중인 오픈소스 프로그래밍 언어
- Typescript로 프로그래밍을 하면 자바스크립트로 컴파일 되어 실행된다
- 타입이 없어 고통받는 Javascript 업계를 위해  만들어졌습니다
- 환경설정
    - npm install -g typescript
- 컴파일
    - tsc 파일.ts
- 실행
    - 컴파일 된 Javascript 파일 실행

---

# 2. 변수

## 2.1 String

- 문자열로도 알려진 일련의 텍스트. 그 값이 문자열이라는 것을 나타내기 위해서는 인용부호로 둘러싸야 합니다.

    ```tsx
    let myName:string = "dahan"
    ```


## 2.2 Number

- 숫자를 나타낸다

    ```tsx
    let three:number = 3
    ```


## 2.3 Array

- 배열

    ```tsx
    let num_list:number[] = [1, 2, 3]
    ```


## 2.4 Any

- Typescript에는 any라는 특별한 타입이 있다
- 특정 타입을 원하지 않을 때 타입 체킹 에러를 피하고자 사용할 수 있다
- 단 이것은 타입스크립트보다 환경을 더 안다고 간주하는 것이니 함부로 사용하지 말자
- with great power comes great responsibility

    ```tsx
    let obg:any = { name:'wow' };
    obj.method();
    obj();
    obj.number = 100;
    obj = "hello";
    const n:number = obg;
    ```


## 2.5 Type Annotations

- string, number 등은 선언 시 타입을 정해주지 않아도 값을 통해 인식한다

    ```tsx
    let myName = "asd";s
    ```


## 2.6 Parameter Type Annotations

- 파라미터의 타입을 맞추어야 한다

    ```tsx
    function greet(name: string) {
    	console.log("Hello, " + name);
    }
    greet(42)// -> 실패
    ```


## 2.7 Return Type Annotations

- 리턴 타입을 지정할 수 있다

    ```tsx
    function getString() : string {
    	return 'wow';
    }
    ```


## 2.8 Annonymous Functions

- 익명함수 사용 시, 파라미터의 타입이 자동으로 주어진다
- 아래와 같은 경우 배열의 아이템 s의 파라미터가 반복문 내에서 주어지지 않았지만, Typescript가 처리해줬다

    ```tsx
    // No type annotations here, but Typescirpt can spot the bug
    const names = ["one", "two", "three"];
    
    // Contextual typing for function
    names.forEach(function(s) {
    	console.log(s.toUpperCase());
    }
    
    // Contextual typing also applies to arrow functions
    names.forEach((s) => {
    	console.log(s.toUpperCase());
    }
    ```


## 2.9 Object Types

- Object 타입 선언 시, `;` 로 구분하여 객체 내 값(property)들을 정할 수 있다

    ```tsx
    function addLocation(pt: { x: number; y: number} ) {
    	console.log("the location's x value is" + pt.x);
    	console.log("the location's y value is" + pt.y);
    }
    
    addLocation({ x: 3, y: 7});
    ```


## 2.10 Optional Properties

- Property는 옵셔널로 선언할 수 있다
- 값이 전달되지 않은 옵셔널 property를 읽을때는 undefined가 호출된다

    ```tsx
    function addLocation(pt: { x: number; y?:number }) {
    	console.log("the location's x value is" + pt.x);
    	console.log("the location's y value is" + pt.y);
    }
    addLocation({ x:3});
    ```

    - 값이 전달되지 않으면 undefined로 호출이 된다

## 2.11 Union Types

- Union Type은 여러 개의 타입을 property로 가져갈 수 있는 형태이다

    ```tsx
    function myNicName(nickname: number | string) {
    	console.log("Your Nickname is : " + nickname);
    }
    ```

- Union type을 사용할 때는 주의해야한다

    ```tsx
    function myNickname(nickname: number | string) {
    	if(typeof nickname === 'number') {
    		console.log('number type');
    	} else {
    		console.log('string type');	
    	}
    }
    ```


# 2. Type

## 2.1 Type Aliases ( 별칭 )

- Type을 직접 선언해서 사용할 수 있다

    ```tsx
    type Point = {
    	x: number;
    	y: number;
    };
    
    function addLocation(pt: Point) {
    	console.log(pt.x);
    	console.log(pt.y);
    }
    
    addLocation({ x: 3})// fail
    ```


## 2.2 Interfaces

- object type을 선언할 수 있는 또 다른 방법이다

    ```tsx
    interface Point {
    	x: number;
    	y: number;
    }
    
    function addLocation(pt: Point) {
    	console.log(pt.x);
    	console.log(pt.y);
    }
    
    addLocation({ x: 3, y:10})// success
    ```


## 2.3 Type과 Interface의 차이

<aside>
💡 Type은  Property를 추가 하기 위해 다시 선언할 수 없다

</aside>

## 2.4 Enum

- enum은 Typescript에서 몇 안되는 javascript의 type-level 확장 내용이 아니다
  - 결론적으로 tsc로 컴파일 되는 요소에서 제외된다는 의미
- 아래와 같은 경우 auto-increment가 적용된다

```tsx
enum Direction {
	Up = 1,
	Down,
	Left,
	Right,
}
```

- 문자열로도 선언이 가능하다

```tsx
enum Direction {
	Up = "UP",
	Down = "DOWN",
	Left = "LEFT",
	Right = "RIGHT"
}
```

# 3. Function

## 3.1 Function Type Expressions

- 함수 타입을 지정할 수 있다

```tsx
// 하나의 파라미터를 가진 함수라는 의미의 타입
// fn이라는 콜백함수를 인자로 받고 있음
function hello( fn: (a: string) => void) {
	fn("hello, world");
}

function log(s: string) {
	console.log(s);
}

hello(log);
```

- type으로도 함수를 지정할 수 있다

    ```tsx
    type callFunction = (a: string) => void;
    function hello(fn: callFuncion) { 
    	// ...
    }
    ```


## 3.2 Constuctor Signatures

- new 연산자를 활용해 object를 생성할 수 있다

    <aside>
    💡 내가 부족한 건 new Set(), new Map()

    </aside>

    ```tsx
    class SomeObject {
    	constuctor(public s: string) {
    		console.log('ctor invoked : ', s);	
    	}
    }
    
    type ConstructorObject = {
    	new (s: string): SomeObject;
    };
    
    function fn(ctor: ConstructorObject) {
    	return new ctor("hello");
    }
    
    fn(SomeObject)
    ```


# 4. Class Members

```tsx
class Point {
	x: number;
	y: number;
}

const pt = new Point();
pt.x = 0;
pt.y = 0;

// console.log(pt) -> { x:0, y:0 }
```

- 생성자 활용

```tsx
class Greeter {
	name : string;
	
	constructor() {
		this.name = "hello";
	}
}

const greeter = new Greetor()
console.log(greeter.name) // hello
```

```tsx
class Greeter2 {
	name: string;

	constructor(name:string) {
		this.name = name;
	}
	
	const greeter = new Greeter("how are you")
	console.log(greeter.name)// how are you
}
```

- typescript는 멤버변수의 readonly 설정이 가능하다
  - 외부에서 접근하지 못하게 설정할 수 있다

```tsx
class Greeter {
	readonly name: string = "world";
	constructor(otherName?: string) {
		if (otherName !== undefined) {
			this.name = otherName;
		}
	}
}

const greeter = new Greeter();
greeter.name = "new name"; // 읽기 전용 변수이기 때문에, 값을 할당할 수 없다 -> compile error
```

## 4.1 super call

- 부모 클래스에 선언되어있는 매개변수를 불러오기 위해서는 super call을 쓰지 않으면 this를 쓸 수 없다

```tsx
class Car {
	window = 4;
}

class BMW extends Car {
	constructor() {
		super();
		console.log(this.window);
	}
}

let bmw = new BMW()
console.log(bmw.window); // 4
```
# 기타

- 접근지정자
  - 클래스 외부에서 변수를 수정할 수 없게 객체지향적인 코드를 짜는 것
  - protected는 확장된 클래스에서 참조가 가능하다