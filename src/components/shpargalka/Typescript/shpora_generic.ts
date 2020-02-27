// ==== Generic ====
const arrayOfNumbers: Array<number> = [1,1,2,3,5,8,13];
const arrayOfstrings: Array<string> = ['Hello', 'Typescript'];

function reverse<T>(array: T[]): T[] {
	return array.reverse();
}

reverse(arrayOfNumbers);
reverse(arrayOfstrings);