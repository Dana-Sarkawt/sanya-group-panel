import moment from 'moment';

export namespace Deposit {
	export class Create {
		description: string = '';
		price: number = 0;
		date: Date | string = moment(new Date()).format('YYYY-MM-DD');
		image?: string = '';
		[x: string]: number | string | Date | undefined;
	}

	export class Update {
		id: number = 0;
		description: string = '';
		price: number = 0;
		date: Date | string = moment(new Date()).format('YYYY-MM-DD');
		image?: string = '';
		[x: string]: number | string | Date | undefined;
	}
}
