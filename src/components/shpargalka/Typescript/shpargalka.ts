import './shpora_interfaces.ts';
import './shpora_enum.ts';
import './shpora_classes.ts';
import './shpora_guards.ts'; 
import './shpora_generic.ts';
import './shpora_operators.ts';
//=== learn TypeScript ======

// === Переменные  TypeScript ====
let isFetching: boolean = true;
const isLoading: boolean = false;

let int: number = 42;
let float: number = 4.2;
let num: number = 3e10;

let message: string = "hello Typescript";


// === Массивы TypeScript ====

// указываем что массивы состоят только из чисел
const numberArray: number[] = [1,1,2,3,5,6,13];
const numberarray2: Array<number> = [1,1,2,3,5,7,13];

// массив строк
const words: string[] = ['hello', 'Typescript'];

// Tuple - спус тип, для указания множества разных типов
const contact: [string, number] = ['string', 123456];

// Any - дает возможность переопределить переменную другим типом данных
let variable: any = 42;
variable = 'new string';


// === Functions ======
// void - помечает функцию, которая ничего не возвращает
function SayMyName(name: string): void{
 console.log(name);
}
//SayMyName('Guberd')

//функция должна возвращать только указанный тип данных
function add(a: number, b: number): number {
	return a + b;
}

function toUpperCase(str: string): string {
	return str.trim().toUpperCase();
}


// Never - помечает функцию, которая выкидывает ошибку.
function throwError(message: string): never {
	throw new Error(message);
}

function inginite(): never {
	while (true) {

	}
}

// интерфейс для функций
interface MyPosition {
	x: number | undefined
	y: number | undefined
}

interface MyPositionWithDefault extends MyPosition {
	default: string
}

function position(): MyPosition; //*
function position(a: number): MyPositionWithDefault;//**
function position(a: number, b: number): MyPosition;//***

function position(a?: number, b?: number) {
	if(!a && !b) {//*
		return {x: undefined, y: undefined}
	}

	if(a && !b) {//**
		return {x: a, y: undefined, default: a.toString()}
	}

	return {x: a, y: b}//***
}

//console.log('Empty: ', position() );// Empty:  {x: undefined, y: undefined}
//console.log('One param: ', position(42) );// One param:  {x: 42, y: undefined, default: "42"}
//console.log('Two params: ', position(10, 15) );// Two params:  {x: 10, y: 15}
	
// Type - создание своих пользовательских типов
type Login = string;
const login: Login = 'admin';
// const login2: Login = 2; Error

type ID = string | number;
const id1: ID = 1235;
const id2: ID = '12345';
//const is3: ID = true;  Error

type SomeType = string | null | undefined;





