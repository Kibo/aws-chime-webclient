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
	    },
	    
	    socketClient : {
			files : {
				'public/js/socket.io.client.all.min.js' : [
					'public/vendor/socket.io-client/v3-0-5/socket.io.js',			    	
					'public/js/socket.io.client.babel.js'],
				'public/js/socket.io.admin.all.min.js' : [
					'public/vendor/socket.io-client/v3-0-5/socket.io.js',			    	
					'public/js/socket.io.admin.babel.js'],
				'public/js/socket.io.observer.all.min.js' : [
					'public/vendor/socket.io-client/v3-0-5/socket.io.js',			    	
					'public/js/socket.io.observer.babel.js']	
			}
	    }
	    
	},
		
	cachebreaker: {
	    dev: {
	        options: {
	            match: ['all.min.js', 'all.min.css'],
	        },
	        files: {
	            src: ['app/views/includes/head.ejs', 'app/views/includes/footer.ejs']
	        }
	    }
	},
                      
    nodemon: {
			dev: {
    			script: 'server.js'
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
		
	concurrent:{
      		tasks: [
        		"watch",
        		"nodemon"
      		],
      		options:{
	        	logConcurrentOutput: true
       		}        
       	},
       	
       	
	sftp: {		  		   
			deploy:{
		    	options: {
		      	path: '/var/www/html/TODO',
		      	host: 'TODO',
		      	username: 'git',
		      	port:18900, 
		      	//privateKey: grunt.file.read('/home/TODO/.ssh/id_rsa'),
		      	showProgress: true,
		      	createDirectories: true,
		      	srcBasePath: "/home/jurman/workspace-html/TODO/"
		    	},
		    	files: {		      		
		      		"./": ['app/**', 'public/**', '*.*']
		    	}
		   	}		  
		},
		
	gitadd: {
		    task: {
		      options: {
		      	cwd: "/home/jurman/workspace-html/chat.kibo.cz",
		      	all:true
		      }
		    }
		  },
		  
		gitcommit: {
		    task: {
		        options: {
		            message: 'v<%= pkg.version %>' 	
		            }
		        }
		   },
		   
		gitpush: {
		    your_target: {
		      options: {
		        remote:"origin",
		    	branch:"master"
		      }
		    }
		  },
		  
		shell: {
	      pm2_deploy: {
	        command: 'pm2 deploy production',
	      }
	    }							             				    	   	    
	});

	grunt.registerTask("default", [    	   
   		"concurrent"
  	]);
  	
  	grunt.registerTask("client", [    	   
   		"babel",
   		"uglify"
  	]);
	
	grunt.registerTask( 'dev', [
		"less:compile"					
	]);	
	
	grunt.registerTask( 'git', [
		"gitadd",
		"gitcommit",
		"gitpush"					
	]);	
		
	grunt.registerTask( 'deploy', [
		"less:compile",		
		"cssmin",
		"babel",
		"uglify",		
		"cachebreaker",
		"gitadd",
		"gitcommit",
		"gitpush",
		'shell:pm2_deploy'
	]);
};