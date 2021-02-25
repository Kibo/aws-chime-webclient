module.exports = function( grunt ) {
	
	// Dynamically load npm tasks	
	require('load-grunt-tasks')(grunt);
		
	grunt.initConfig( {			
		pkg: grunt.file.readJSON( 'package.json' ),
					
	less: {												
		compile: {
		    	options: {
		    		strictMath: true,
          			sourceMap: true,
          			outputSourceFiles: true,
          			sourceMapURL: "apps.css.map",
          			sourceMapFilename: "public/css/app.css.map"			     	   
		    	},
		    	files: {
		    		"public/css/app.css": "public/less/app.less"
		    	}
		  	}
		},
		
	cssmin:{
      		combine:{
        		files:{
          			"public/css/all.min.css": [
          				"public/vendor/bootstrap/bootstrap-4.5.0-dist/css/bootstrap.css",
          				"public/vendor/font-awesome/v4_7_0/css/font-awesome.css",
          				"public/vendor/Magnific-Popup/dist/magnific-popup.css",
          				"public/css/app.css"]
          		}
         	}
        },

	babel: {
	    options: {
	      sourceMap: true,
	      presets: ['@babel/preset-env']
	    },
	    dist: {
	      files: {
	        'public/js/app.babel.js': 'public/js/app.js',
	        'public/js/socket.io.client.babel.js': 'public/js/socket.io.client.js',
	        'public/js/socket.io.admin.babel.js': 'public/js/socket.io.admin.js',
	        'public/js/socket.io.observer.babel.js': 'public/js/socket.io.observer.js',
	      }
	    }
	  }, 

	uglify : {				
	    dist : {
			files : {
			    'public/js/all.min.js' : [
			    	'public/vendor/jquery/jquery-3.5.1.min.js',
			    	'public/vendor/Magnific-Popup/dist/jquery.magnific-popup.min.js',
			    	'public/vendor/underscore/v1-10-2/underscore-min.js',
			    	'public/vendor/bootstrap/bootstrap-4.5.0-dist/js/bootstrap.min.js',
			    	'public/js/app.babel.js']
			}
	    }	    	  	 
	},
			     
  	watch: {
		scripts: {
			files: [
				 "public/less/*.less",
      			 "public/less/**/*.less"
			],
			tasks: [ 'dev' ],
			options: {
  				spawn: true,
			},
		},
	},
				      
								             				    	   	    
	});
	
	grunt.registerTask( 'dev', [
							
	]);
	  
  	grunt.registerTask("build", [    	   
   		
  	]);
	
	grunt.registerTask( 'demo', [
							
	]);	
};