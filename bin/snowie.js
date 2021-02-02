#!/usr/bin/env node

/*
markdown_engines: markdown-it, showdownjs
render_engine: creamy, html, md
markup: md, creamy, html
*/
const chalk = require('chalk');
const yargs = require("yargs");
const argv = require('yargs/yargs')(process.argv.slice(2)).argv
var path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
var showdown  = require('showdown')
var converter = new showdown.Converter()
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
//text      = '# hello, markdown!',
//html      = converter.makeHtml(text);

var proj_name
var proj_json = {
    title: "Basic Snowie Docs",
    description: "a basic snowie doc template",
    markdown_engine: "markdown-it",
    render_engine: "md",
    markup: "md",
    out: "output",
    in: "index.md"
}
var ver = "1.0.4"

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
      request(url)
        .pipe(fs.createWriteStream(path))
        .on('close', callback)
    })
  }
console.log(chalk.magenta.bold(`
    _         _         _         _         _         _         _         _         _         _         _    
  _( )__    _( )__    _( )__    _( )__    _( )__    _( )__    _( )__    _( )__    _( )__    _( )__    _( )__ 
_|     _| _|     _| _|     _| _|     _| _|     _| _|     _| _|     _| _|     _| _|     _| _|     _| _|     _|
(_ S _ (_ (_ N _ (_ (_ O _ (_ (_ W _ (_ (_ I _ (_ (_ E _ (_ (_   _ (_ (_ D _ (_ (_ O _ (_ (_ C _ (_ (_ S _ (_ 
|_( )__|  |_( )__|  |_( )__|  |_( )__|  |_( )__|  |_( )__|  |_( )__|  |_( )__|  |_( )__|  |_( )__|  |_( )__| 
`))
if (argv._.indexOf("init") > -1) {
    if (argv._[1]) {
        console.log(chalk.green.bold("creating a project..."));
        proj_name = argv._[1]
        init()
    } else {
        console.log(chalk.red.bold("you must provide a name for the project like this:\n") + chalk.blue.bold("snowie init <project-name>") + chalk.red.bold("\ngo to: <docs link> to learn more"));
    }
} else if (argv._.indexOf("build") > -1 || argv._.indexOf("bake") > -1 || argv._.indexOf("b") > -1) {
    console.log(chalk.green.bold("Starting Build Process"))
    startbuild()
} else if (argv._.indexOf("help") > -1) {
    help()
} else if (argv._.indexOf("ver") > -1) {
    console.log(chalk.bold.green("version: " + ver))
} else {
    help()
}
//console.log(argv)

function help() {
    console.log(chalk.cyan.bold(`
Snowie Docs is a tool to turn your documentation into a single html file which you can host or even customize
\nfor documentation on how to use it go to `) + 
chalk.bold.blueBright(`https://github.com/imagineeeinc/Snowie-Docs/#documentation`) + 
`
\n` + 
chalk.bgBlue.yellow.bold("snowie [options]=<inputs>") + 
chalk.cyan.bold(`\n
help:                  output usage information
ver:                   output MWA Builder Version
build, bake, b:        builds the appfrom the directroy run and should include a mwa.build.json
init:                  creates a basic directory with file needed
\n
Thanks for using Snowie Docs`));
}
//console.log(argv);

function init() {
    fs.mkdirSync(proj_name);
    fse.copySync(__dirname + "\\init-folder", path.join(process.cwd() + "/" + proj_name), { overwrite: true }, function (err) {
        if (err) {
            console.log(chalk.red(err))
        } else {
            //console.log(chalk.green.bold("Done Setup!"))
        }
    });
    proj_json.title = proj_name
    /*proj_json = JSON.stringify(proj_json)
    proj_json.replace(",", ",\n")
    console.log(proj_json)
    fs.writeFile(path.join(process.cwd() + "/" + proj_name + "/snowie.build.json"), proj_json, function (err) {
        if (err) return console.log(chalk.red(err));
    });*/
    console.log(chalk.green.bold("Done!"))
}
function startbuild() {
    //console.log(path.join(process.cwd() + "/mwa.build.json"))
    try {
        if (fs.existsSync(path.join(process.cwd() + "/snowie.build.json"))) {
          console.log(chalk.green("Build configration file exists..."))
          var on = get_from_json(path.join(process.cwd() + "/snowie.build.json"))
          build(on, process.cwd())
        } else {
            console.log(chalk.red("Build configration file does not existis?\ngo to: <docs link> to learn more"))
        }
    } catch(err) {
        console.error(err)
    }
    function get_from_json(dir) {
        var obj
        console.log(chalk.green("Getting data from configration file..."))
        try {
            var data = fs.readFileSync(dir, 'utf8');
            obj = data
            console.log(chalk.blue(obj)); 
        } catch(e) {
            console.log(chalk.red.bold('Error:', e.stack));
        }
        try {
            obj = JSON.parse(obj)
        } catch(err) {
            console.error(err)
        }
        console.log(chalk.green("Finished getting data from configration file..."))
        return obj
    }
}
function build(config, dir) {
    //path.join
    console.log(chalk.green("Recived config..."))
    if (!config.out) {
        console.log(chalk.red.bold("You do not have a out directory set up,\n\nto set up put: \n") + 
        chalk.blue.bold("{\n  ...\n    \"out\": \"<out directory name>\"\n   ...\n}") +
        chalk.red.bold("\nto learn more go to <docs link>"))
    } else {
        if (!fs.existsSync(path.join(dir + "/" + config.out))){
            fs.mkdirSync(dir + "/" + config.out);
        }
    }
    var output_dir = path.join(dir + "/" + config.out)
    
    console.log(chalk.green("Made a out directory..."))
    console.log(chalk.green.bold("Starting compiling..."))
    
    var dom
    if (!config.markup) {
        console.log(chalk.red.bold("You do not have a markup languge set up,\n\nto set up put: \n") + 
        chalk.blue.bold("{\n  ...\n    \"markup\": \"<preferd markup lang, options: md, html, creamy>\"\n   ...\n}") +
        chalk.red.bold("\nto learn more go to <docs link>"))
    } else {
        if (config.markup === "md") {
            if (config.render_engine === "md") {
                var text
                mdEngine()
            }
        }
        console.log(chalk.green("Finished Compiling..."))
        dom.window.document.getElementById("data").innerHTML = text
        dom.window.document.getElementById("head").innerHTML = config.name
        dom.window.document.getElementById("list-head").innerHTML = config.name
        dom.window.document.querySelector("title").innerHTML = config.name
        for (i = 0; i < config.links.length; i++) {
            var doc = dom.window.document.createElement("li")
            doc.innerHTML = "<a href='#" + config.links[i] + "'>" + config.links[i] + "</a>"
            dom.window.document.getElementById("menu-list").append(doc)
        }
        fs.writeFile(dir + "/" + config.out + "/index.html", dom.window.document.querySelector( 'html' ).outerHTML, function (err) {
            if (err) return console.log(err);
        });
        console.log(chalk.green("Wrote to html file at: " + dir + "\\" + config.out + "\\index.html"))
        console.log(chalk.greenBright.bold("Finished compiling to Single file with these configurations:\n") +
            chalk.blue.bold(JSON.stringify(config)) +
            chalk.greenBright.bold("\nThank you for using Snowie Docs")
        )
    }
    function mdEngine() {
        try {
            var data = fs.readFileSync(dir + "/" + "\\" + config.in, 'utf8');
            text = data
        } catch(e) {
            console.log(chalk.red.bold('Error:', e.stack));
        }
        if (config.markdown_engine === "markdown-it") {
            var obj
            try {
                var data = fs.readFileSync(__dirname + "\\templating\\md-it.html", 'utf8');
                obj = data
                //console.log(chalk.green(obj)); 
                dom = new JSDOM(obj);
            } catch(e) {
                    console.log(chalk.red.bold('Error:', e.stack));
            }
        } else if (config.markdown_engine === "showdown") {
            var obj
            try {
                var data = fs.readFileSync(__dirname + "\\templating\\showdown.html", 'utf8');
                obj = data
                //console.log(chalk.green(obj)); 
                dom = new JSDOM(obj);
            } catch(e) {
                    console.log(chalk.red.bold('Error:', e.stack));
            }
        }
    }
}