# charts.vue
[![npm][npm-img]][npm-url]

Simple wrapper for [Chart.js 3][chartjs-url]

This version only works with Vue3!!

If you want a version that works with Vue 2 go to [Charts.vue2](https://github.com/tritiumcl/charts.vue2)

## Installation
```sh
npm i chart.js@next charts.vue
```

## Simple usage:
```html
<chart type="bar" :labels="labels" :datasets="dataset" :options="options" />
```
```js
import Chart from 'charts.vue';
...
components : {Chart}
...
//data:
labels : ['1','2','3'],
dataset : [{
	label: 'My Dataset',
	backgroundColor: '#f87979',
	data: [1,2,3]
}],
options: {
	responsive: true,
	maintainAspectRatio: false,
}
```

For a full guide of the options you can go to [Chart.js][chartjs-url]

[npm-img]: https://img.shields.io/npm/v/charts.vue.svg
[npm-url]: https://npmjs.com/package/charts.vue
[chartjs-url]: https://www.chartjs.org/docs/next/index