module.exports = function(grunt, options)
{
	return {
		dev:{
			files : {
				"app/css/main.css" : "app/less/main.less"
			}
		}
	}
}
