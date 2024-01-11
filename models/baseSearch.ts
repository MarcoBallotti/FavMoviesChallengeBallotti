export class BaseSearch<T>{

	page!:number;
	results?:Array<T>;
	total_pages!: number;
	total_results!: number;
	loading?:boolean;

	constructor(){
		this.page = 1;
		this.results= [];
	}
}