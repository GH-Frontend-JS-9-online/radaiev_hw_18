// Создание интерфейсов

// readonly - пометка, только для чтения
// ? знак (необязательный параметр) как в регулярках

interface Rect {
	readonly id: string
	color?: string
	size: {
		width: number
		height: number
	}
}

const rect1: Rect = {
	id: '1234',
	size: {
		width: 20,
		height: 30
	},
	color: '#c4c4c4'
}

const rect2 = {} as Rect;
const rect3 = <Rect>{};


// ========= Наследование интерфейсов =======

interface RectWithArea extends Rect {
	getArea: () => number
}

const rect5: RectWithArea = {
	id: '12345',
	size: {
		width: 20,
		height: 20
	},
	getArea(): number {
		return this.size.width * this.size.heigth
	}
}

// ==== Взаимодействие с классами
interface ICloc {
	time: Date;
	setTime(date: Date): void
}

class Clock implements ICloc {
	time: Date = new Date()

	setTime(date: Date): void {
		this.time = date
	}
}

// === краткая запись интерфейса для множества свойств с одинаковым типом данных ===
interface IStyles {
	[key: string]: string
}

const css: IStyles = {
	border: '1px solid black',
	marginTop: '2px',
	borderRadius: '5px'
}