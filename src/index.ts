import { Chart, LineElement, BarController, BarElement, BubbleController, CategoryScale, DoughnutController, Filler, Interaction, Legend, LineController, LinearScale, LogarithmicScale, PieController, Point, PolarAreaController, RadarController, RadialLinearScale, Scale, ScatterController, Ticks, TimeScale, TimeSeriesScale, Title, Tooltip, PointElement } from 'chart.js';
import * as chart from 'chart.js'; 
import { h, defineComponent } from 'vue';

Chart.register(
	LineController, LineElement, LinearScale, CategoryScale, Title, Tooltip, Filler, Legend,
	BarController, BarElement,
	RadarController, RadialLinearScale,
	PieController,
	PointElement,
	PolarAreaController,
	BubbleController,
	ScatterController);

declare type ChartType = "line" | "bar" | "bubble" | "doughnut" | "pie" | "polarArea" | "radar" | "scatter";

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
				this.chart.data = this.chartData as ChartData;
				this.update();
			}
		},
		'type': {
			handler() {
				this.chart.config.type = this.type as ChartType;
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
				this.chart.options = this.options as chart.ChartOptions;
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
				type: this.type as ChartType,
				data: (this.labels ? { labels: this.labels, datasets: this.datasets } : this.chartData) as chart.ChartData,
				options: this.options
			});
	},
	render: function () {
		return h('div', {
			style: { width: this.width, height: this.height }
		}, h('canvas'));
	}
});

type cdatasets = chart.ChartDataset;

export interface ChartData extends chart.ChartData {
	readonly labels: chart.ChartData["labels"];
	readonly datasets: chart.ChartData["datasets"];
}

export interface ChartConfiguration extends chart.ChartConfiguration {

}