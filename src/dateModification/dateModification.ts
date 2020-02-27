import { IDateLeft } from '../interfaces/inderfaces';

class DateModification {
	constructor() {

	}

	date(date) {
		let _date = new Date(date);//2020-02-09T00:00:00.000Z

		return `${_date.getDate()} ${this.monthToString(_date.getMonth())} ${_date.getFullYear()}`;
	}

	monthToString(month) {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	
		return months.filter((item, index) => {
			if(month == index) return item;
		});
	}

	dateLeft(start, end, progress = 0): IDateLeft {
		let _start = new Date(start);
		let _end = new Date(end);
		let _now = Date.now();

		 let sec = (_now - _start.getTime()) / 1000;
		 let min = sec / 60;
		 let hour = min / 60;

		 if( _now >= +_end ) return 'Tardiness!!!';
		 	else if( progress == 100 ) return 'Completed';
		 	else if( Math.floor(hour /24 / 12) > 0 ) return `${Math.floor(hour /24 / 12)} months left`;
		 	else if( Math.floor(hour /24 / 12) == 0 &&  Math.floor(hour /24) == 0
		 			&& Math.floor(hour % 24) == 0 ) return `${Math.floor(min % 60)} minutes left`;
		 	else if( Math.floor(hour /24 / 12) == 0 &&  Math.floor(hour /24) == 0 ) return `${Math.floor(hour % 24)} hour left`;
		 	else if( Math.floor(hour /24 / 12) == 0 ) return `${Math.floor(hour /24)} deys left`;	
	 		
	}

	timeSpend(date: string): string {
		let updatedAt = new Date(date);
		let dateNow = new Date(Date.now());

		return (updatedAt.getDate() == dateNow.getDate() && updatedAt.getMinutes() < 10)? `Today: ${updatedAt.getHours()}:0${updatedAt.getMinutes()}` :
			   (updatedAt.getDate() == dateNow.getDate())? `Today: ${updatedAt.getHours()}:${updatedAt.getMinutes()}`
			   : `${updatedAt.getDate()} ${this.monthToString(updatedAt.getMonth())}`;
	}
}

let dateModification = new DateModification();
export default dateModification;