import { Chart, Arc, BarController, BubbleController, CategoryScale, DoughnutController, Filler, Interaction, Legend, Line, LineController, LinearScale, LogarithmicScale, PieController, Point, PolarAreaController, RadarController, RadialLinearScale, Rectangle, Scale, ScatterController, Ticks, TimeScale, TimeSeriesScale, Title, Tooltip } from 'chart.js';
import { IChartData, IChartDataset, IChartConfiguration, IChartOptions } from 'chart.js';
import { h, defineComponent } from 'vue';

Chart.register(
	LineController, Line, Point, LinearScale, CategoryScale, Title, Tooltip, Filler, Legend,
	BarController, Rectangle,
	RadarController, RadialLinearScale,
	PieController, Arc,
	PolarAreaController,
	BubbleController,
	ScatterController);

export default defineComponent({
	props: {
		type: {type: String, default: 'line' },
		labels: {type: Array }, //as unknown as ChartData["labels"]
		datasets!: {type: Array}, // as unknown as ChartData["datasets"] | IChartDataset[],
		chartData!: {type: Object}, // as unknown as ChartData,
		options!: {type: Object}, // as ChartOptions,
		width!: {
			type: String,
			default: '100%'
		},
		height!: {
			type: String,
			default: '400px'
		},
	},
	data() {
		return {
			canvas: null as unknown as HTMLCanvasElement,
			chart: null as unknown as Chart
		};
	},
	watch: {
		'chartData': {
			deep: true,
			handler() {
				this.chart.data = this.chartData;
				this.update();
			}
		},
		'type': {
			handler() {
				this.chart.config.type = this.type;
				this.update();
			}
		},
		'labels': {
			handler() {
				this.chart.data.labels = this.labels as string[];
				this.update();
			}
		},
		'datasets': {
			deep: true,
			handler() {
				this.chart.data.datasets = this.datasets as ChartData["datasets"];
				this.update();
			}
		},
		'options': {
			deep: true,
			handler() {
				this.chart.options = this.options;
				this.update();
			}
		},
		'width': { handler() { this.update() } },
		'height': { handler() { this.update() } }
	},
	methods: {
		update() {
			this.chart.update();
		}
	},
	mounted: function () {
		this.canvas = this.$el.childNodes[0] as HTMLCanvasElement;
		const ctx = this.canvas.getContext('2d');

		if (ctx == null) {
			console.error('Could not acquire context from canvas: ', this.canvas);
			return;
		}

		//console.log(this.canvas, this.canvas.getContext('2d'), this.type, this.chartData, { labels: this.labels, datasets: this.datasets }, this.options);
		if (this.canvas.getContext('2d') != null)
			this.chart = new Chart(ctx, {
				type: this.type,
				data: (this.labels ? { labels: this.labels, datasets: this.datasets } : this.chartData) as IChartData,
				options: this.options
			});
	},
	render: function () {
		return h('div', {
			style: { width: this.width, height: this.height }
		}, h('canvas'));
	}
});

type cdatasets = IChartDataset;

export interface ChartDatasets extends cdatasets {
	readonly data: cdatasets["data"];
}

export interface ChartData extends IChartData {
	readonly labels: IChartData["labels"];
	readonly datasets: IChartData["datasets"];
}

export interface ChartOptions extends IChartOptions {

}

export interface ChartConfiguration extends IChartConfiguration {

}