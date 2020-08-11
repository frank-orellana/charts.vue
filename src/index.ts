import Chart from 'chart.js';
import {h} from 'vue';

class data {
	static ctx = null as unknown as HTMLCanvasElement;
	static chart = null as unknown as Chart;
}

const params = {
	type!: String as unknown as string,
	labels: Array as unknown as ChartData["labels"],
	datasets!: Array as unknown as ChartData["datasets"] | ChartDataSets[],
	chartData!: Object as unknown as ChartData,
	options!: Object as ChartOptions,
	width!: {
		type: String,
		default: '400'
	},
	height!: {
		type: String,
		default: '400'
	},
};

interface methods {
	update() : void;
}

//Only needed attributes to get type inference without importing vue
interface vue {
	$el: any;
	$attrs : any;
}

declare type t = typeof params & typeof data & methods & vue;

export default {
	props: {
		type!: String as unknown as string,
		labels: Array as unknown as ChartData["labels"],
		datasets!: Array as unknown as ChartData["datasets"] | ChartDataSets[],
		chartData!: Object as unknown as ChartData,
		options!: Object as ChartOptions,
		width!: {
			type: String,
			default: '400px'
		},
		height!: {
			type: String,
			default: '400px'
		},
	},
	data() {
		return {
			ctx : null as unknown as HTMLCanvasElement,
			chart : null as unknown as Chart
		};
	},
	watch: {
		'chartData': {
			deep: true,
			handler() {
				const _this = (this as unknown as t);
				_this.chart.data = _this.chartData;
				_this.update();
			}
		},
		'type': {
			handler() {
				const _this = (this as unknown as t);
				_this.chart.config.type = _this.type;
				_this.update();
			}
		},
		'labels': {
			handler() {
				const _this = (this as unknown as t);
				_this.chart.data.labels = _this.labels;
				_this.update();
			}
		},
		'datasets': {
			deep: true,
			handler() {
				const _this = (this as unknown as t);
				_this.chart.data.datasets = _this.datasets as ChartData["datasets"];
				_this.update();
			}
		},
		'options': {
			deep: true,
			handler() {
				const _this = (this as unknown as t);
				_this.chart.options = _this.options;
				_this.update();
			}
		},
		'width': { handler() { (this as unknown as t).update() } },
		'height': { handler() { (this as unknown as t).update() } }
	},
	methods: {
		update() {
			(this as unknown as t).chart.update();
		}
	},
	mounted: function () {
		const _this = (this as unknown as t);
		_this.ctx = _this.$el as HTMLCanvasElement;
		
		console.log(_this.ctx, _this.type, _this.chartData, _this.options);
		_this.chart = new Chart(_this.ctx, {
			type: _this.type,
			data: _this.labels ? { labels: _this.labels, datasets: _this.datasets } : _this.chartData,
			options: _this.options
		});
	},
	render: function () {
		const _this = (this as unknown as t);
		return h('canvas', {
			style : {width: _this.width,height: _this.height}
		});
	}
};

type cdatasets = Chart.ChartDataSets;

export interface ChartDataSets extends cdatasets {
	readonly data: cdatasets["data"]; 
}

export interface ChartData extends Chart.ChartData {
	readonly labels: Chart.ChartData["labels"];
	readonly datasets: Chart.ChartData["datasets"];
}

export interface ChartOptions extends Chart.ChartOptions {

}

export interface ChartConfiguration extends Chart.ChartConfiguration {

}