#sapui5_template

##Prerequisites :

1. Have node.js installed
2. Have gulp globally installed :
```
npm -install gulp -g
```

##The application is composed with following folders :

- **source** : contain source files
- **build** : contain build files (minified for CSS/HTML/JS)
- **builder** : source code for launching main tasks
- **doc** : contain source documentation
- **exe** : contain Node-Webkit generated executable

##How it works :

- To launch the gulp build process, execute ```Build.bat```
- To launch the node webkit build process, execute ```NodeWebkit.bat```. The executable will be found in the **exe** folder

##What gulp will do for you :

- Minify JS, CSS and HTML files automatically when files are changed
- Generate documentation, using [YUIDOC](http://yui.github.io/yuidoc/#example-class-block) synthax

##What the SAPUI5 application contains :

- Some custom functions in the **ext/DataUtil.js** file
- The [Lodash](https://lodash.com/) tool library
- FR and EN languages properties files
- Two controller/views to have an example of navigation
- An example of data loading for **data/demo.json**
