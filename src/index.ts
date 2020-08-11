import {Chart, Arc,BarController,BubbleController,CategoryScale,DoughnutController,Filler,Interaction,Legend,Line,LineController,LinearScale,LogarithmicScale,PieController,Point,PolarAreaController,RadarController,RadialLinearScale,Rectangle,Scale,ScatterController,Ticks,TimeScale,TimeSeriesScale,Title,Tooltip}  from 'chart.js';
import {h} from 'vue';

Chart.register(
	LineController, Line, Point, LinearScale, CategoryScale, Title, Tooltip, Filler, Legend,
	BarController, Rectangle,
	RadarController, RadialLinearScale,
	PieController, Arc,
	PolarAreaController,
	BubbleController,
	ScatterController);

class data {
	static canvas = null as unknown as HTMLCanvasElement;
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
			canvas : null as unknown as HTMLCanvasElement,
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
		_this.canvas = _this.$el.childNodes[0] as HTMLCanvasElement;
		const ctx = _this.canvas.getContext('2d');

		if(ctx == null){
			console.error('Could not acquire context from canvas: ', _this.canvas);
			return;
		}
		
		console.log(_this.canvas, _this.canvas.getContext('2d'), _this.type, _this.chartData, { labels: _this.labels, datasets: _this.datasets }, _this.options);
		if(_this.canvas.getContext('2d') != null)
		_this.chart = new Chart(ctx, {
			type: _this.type,
			data: _this.labels ? { labels: _this.labels, datasets: _this.datasets } : _this.chartData,
			options: _this.options
		});
	},
	render: function () {
		const _this = (this as unknown as t);
		return h('div', {
			style : {width: _this.width,height: _this.height}
		},h('canvas'));
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