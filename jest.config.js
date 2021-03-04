module.exports = {
    "verbose": true,
    rootDir: './tests/',
    "moduleFileExtensions": [
      "vue",
      "js"
    ],
    "transform": {
	"^.+\\.js$": "babel-jest",
	".*\\.(vue)$": "vue-jest"
    },
    transformIgnorePatterns: ["/node_modules/(?!vue-awesome)"],
}
