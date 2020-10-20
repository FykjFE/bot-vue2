module.exports = {
	// set your styleguidist configuration here
	title: '组件使用文档',
	defaultExample: false, // 是否使用默认样例
	usageMode: 'expand', // 是否展开用法
	exampleMode: 'expand', // 是否展开示例代码
	styleguideDir: 'styleguide', // 打包的目录
	codeSplit: true, // 打包时是否进行分片
	skipComponentsWithoutExample: false, // 是否跳过没有样例的组件
	sections: [{
			name: '项目特有的组件库',
			components: 'src/components/*/*.vue'
		},
		{
			name: '逻辑组件库',
			components: 'src/components-moon/moon-*/moon-*.vue'
		},
		{
			name: '业务组件库',
			components: 'src/components-service/service-*/service-*.vue'
		}
	],
	// webpackConfig: {
	//   // custom config goes here
	// },
}
