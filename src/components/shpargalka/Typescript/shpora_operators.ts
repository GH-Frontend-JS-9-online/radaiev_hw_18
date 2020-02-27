interface Person {
	name: string
	age: number
}

type PersonKeys = keyof Person // 'name' | 'age'

let key: PersonKeys = 'name';
key = 'age';


type User = {
	_id: number
	name: string
	email: string
	createdAt: Date
}

//отделяем ненужные поля
type UserKeysNoMeta1 = Exclude<keyof User, '_id' | 'createdAt'> // 'name' | 'email'

//выбераем только нужные поля
type UserKeysNoMeta2 = Pick<User, 'name' | 'email'> // 'name' | 'email'