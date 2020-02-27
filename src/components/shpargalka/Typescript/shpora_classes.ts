// === Classes ===
class Typescript {
	version: string;

	constructor(version: string) {
		this.version = version
	}

	info(name: string) {
		return `[${name}]: Typescript version is ${this.version}`;
	}
}

class Car {
	readonly model: string;
	readonly numberOfWheels: number = 4;

	constructor(theModel: string) {
		// readonly можно перезаписать только внутри конструктора
		this.model = theModel
	}
}

// короткая запись
/*class Car {
	readonly numberOfwheels: numver = 4;
	constructor(readonly model: string) {
		this.model = theModel
	}
}*/

// === можно применить ООП в классах ===
class Animal {
	protected voice: string = '';
	public color: string = 'black';

	private  go() {
		console.log('Go')
	}
}

class Cat extends Animal {
	public setVoice(voice: string): void {
		this.voice = voice  
	}
}

// const cat = new Cat();
// cat.setVoice('test');
// console.log(cat.color);
// console.log(cat.voice)


// === Абстрактные классы === 
abstract class Component {
	abstract render(): void;
	abstract info(): string;
}

// Классы которые наследуются от абстрактных классов, так же являются абстрактными
// и не компелируются в js код, а являются только вспомогательными
class AppComponent extends Component {
	render(): void {
		console.log('Component on render');
	}

	info(): string {
		return 'Warning';
	}
}

let app = new AppComponent();
//console.log('App', app.render()); //App undefined