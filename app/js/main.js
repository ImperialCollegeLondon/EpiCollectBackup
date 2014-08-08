(function(){
	var module = angular.module('EpiCollectBackup', []),
		app = module.controller('FileHandler',function($scope){
			$scope.files={};
			$scope.records = {};

			$scope.orderProp = 'SC_code';
			$scope.csvData = 'Data Will appear Here';

			$scope.displayTable = function(table)
			{
				var headers = [],
					row = [];
					csvData = '',
					raw_data = $scope.records[table],
					record = {};

				for( var i = 0; i < raw_data.length; i++ )
				{

					record = raw_data[i];

					for( var field in record)
					{
						if( !field.match(/^ec/) && headers.indexOf(field) == -1 )
						{
							headers.push(field);
						}


					}
				}

				for( var i = 0; i < raw_data.length; i++ )
				{
					row = [];
					record = raw_data[i];

					for( var j = 0; j < headers.length; j++ )
					{
						if(record[headers[j]])
						{
							row[j] = record[headers[j]];
						}
						else
						{
							row[j] = '';
						}
					}

					csvData += '"' + row.join('","') + '"\n';
				}

				csvData = headers.join(',') + '\n' + csvData;

				$scope.csvData = csvData;
			}

			$scope.countLines = function(contents){
				return contents.split('\n').length;
			}

			$scope.recordSummary = function(filename)
			{
				var summary = {},
					records = $scope.files[filename];

				for( var form in records )
				{
					summary[form] = records[form].length;
				}

				return summary;
			}

			$scope.setOrder = function(prop)
			{
				console.log(prop);
				$scope.orderProp = prop;
			}

			$scope.addFile = function(filename, contents)
			{
				var lines = contents.split('\n'),
					parts,
					formName,
					records = $scope.records,
					new_record;

				for (var i = 0; i < lines.length; i++)
				{
					if(lines[i] == '') continue;

					parts = lines[i].split('\t');
					formName = parts[0];
					new_record = {};

					for ( var j = 1; j < parts.length; j +=2 )
					{
						new_record[parts[j]] = parts[j+1];
					}

					if(! records[formName] )
					{
						records[formName] = [new_record];
					}
					else
					{
						records[formName].push(new_record)
					}
				}

				$scope.records = records;
			}

		}),


		dir = app.directive('dropzone', function(){

			return {
				restrict : 'A',
				link : function(scope, element)
				{
					element.bind('drop', function(evt){
						evt.stopPropagation();
                		evt.preventDefault();

						var files = evt.dataTransfer.files;

						for ( var i = 0; i < files.length; i++ )
						{
							var reader = new FileReader();
							reader.onload = function(file)
							{
								return function(e){
									scope.addFile(file.name, e.srcElement.result);
									scope.$apply();
								}
							}(files[i])

							reader.readAsText(files[i]);
						}

					});

					element.bind('dragover', function(evt){
						evt.dataTransfer.dropEffect = 'copy';
						evt.preventDefault();
					});
				},
				template: 'Drop Files Here'
			}
		});
})();
