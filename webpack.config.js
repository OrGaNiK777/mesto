// webpack.config.js
const path = require("path"); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Мы не подключаем скрипты в конце body. Да и сам HTML-файл пока не попадает в сборку. Этим и займётся «Вебпак». Для этого нужен специальный плагин — html-webpack-plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // Нам нужен плагин, который будет каждый раз при сборке проекта удалять содержимое папки dist.
// подключите к проекту mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: { main: "./src/pages/index.js" },
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "main.js",
		publicPath: "",
	},
	mode: "development", // добавили режим разработчика
	devServer: {
		static: path.resolve(__dirname, "./dist"), // путь, куда "смотрит" режим разработчика
		compress: true, // это ускорит загрузку в режиме разработки
		port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт

		open: true, // сайт будет открываться сам при запуске npm run dev
	},
	module: {
		rules: [
			// rules — это массив правил
			// добавим в него объект правил для бабеля
			{
				// регулярное выражение, которое ищет все js файлы
				test: /\.js$/,
				// при обработке этих файлов нужно использовать babel-loader
				use: "babel-loader",
				// исключает папку node_modules, файлы в ней обрабатывать не нужно
				exclude: "/node_modules/",
			},
			// добавили правило для обработки файлов

			{
				test: /\.(png|svg|jpg|jpeg|gif)$/,
				type: "asset/resource",
				generator: {
					filename: "images/[name].[hash][ext]",
				},
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name].[hash][ext]",
				},
			},

			// {
			// 	// регулярное выражение, которое ищет все файлы с такими расширениями
			// 	test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
			// 	type: "asset/resource",
			// },
			{
				// применять это правило только к CSS-файлам
				test: /\.css$/,
				// при обработке этих файлов нужно использовать
				// MiniCssExtractPlugin.loader и css-loader
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						// добавьте объект options
						options: { importLoaders: 1 },
					},
					// Добавьте postcss-loader
					"postcss-loader",
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html", // путь к файлу index.html
		}),
		new CleanWebpackPlugin(), // использовали плагин
		new MiniCssExtractPlugin(), // подключение плагина для объединения файлов
	], // добавьте массив
};

// переписали точку выхода, используя утилиту path
// указали в какой файл будет собираться весь js и дали ему имя

// указали первое место, куда заглянет webpack, — файл index.js в папке src

// module.exports — это синтаксис экспорта в Node.js
