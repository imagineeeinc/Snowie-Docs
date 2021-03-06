# Introduction
**Snowie** Docs is a tool to generate single page html files from your documentation. It is **light weight** easy to use CLI app. It generates a single html, with no js or css files attached which you can edit and you can host anywhere, like Github Pages.

# Install
#### Npm:
run `npm i -g snowie-docs` to install

# Documentation
## basics
Firstly Snowie is a CLI app so you will use the command `snowie`.
## cli
### init
Running `snowie init <your project name>`, will create a directory with the basics.
### help
Running `snowie help`, returns commands
### ver
Running `snowie ver`, returns current version
### build
Running `snowie build`, `snowie bake` or `snowie b`, will build the html for you to your output directory
## Build Config
To start of you need a `snowie.build.json` in it this the below will be your basic setup
```json
{
    "title": "Basic-Snowie-Docs",
    "name": "Basic Snowie Docs",
    "description": "a basic snowie doc template",
    "markdown_engine": "markdown-it",
    "render_engine": "md",
    "markup": "md",
    "out": "output",
    "in": "index.md",
    "out_name": "index",
    "files": "./files",
    "links": [
        "Basic-Snowie-Markdown-file"
    ]
}
```
### options
- **title**: \[`type=string`] the title of the project
- **name**: \[`type=string`] the title for the output file.
- **description**: \[`type=string(optional)`] the description of the project
- **markdown_engine**: \[`type=string(optional)`]**Options:** *_[markdown-it](https://github.com/markdown-it/markdown-it) | [showdown](https://github.com/showdownjs/showdown)_*: the compiler that will be used to compile the markdown, choose the one that suits your need, [Read More](#Markdown-engine)
- **render_engine**: \[`type="string`]**Options:** *_md | html_*: the render type that will be use when you load the page, [Read More](#Render-engine)
- **markup**: \[`type: string`]**Options:** *_md | html_*: the markup language you will use to write this documentation, [Read More](#Markup)
- **out**: \[`type="string"`] the output folder
- **in**: \[`type="string"`] the input markup file
- **out_name**: \[`type="string"(optional)`] the output file name
- **files**: \[`type="string"(optional)`] the location of the files that will be bundled with the page, a folder in which for example your images will stay in, [Read More](#Files)
- **links**: \[`type="array"`] a array of links within the page, [Read More](#Links)
- **snowie-engine**: \[`type="string"(optional)`] snowie docs compiler option

### Render-engine
The render engine is how the page will be rendered.

md will give a markdown file to the page which will be compiled the html using the [`markdown_engine`](#Markdown-engine) of your choice and then put on to the page, so it will take some time to compile once the page is loaded.

html will compile the input markup to html and paste it onto the page which will be loaded once the page will be opened, it is more faster but complicated   and long documentation will take time to load for the user specially on slow systems.

### Markdown engine
The markdown engine gives the choice of features you want when you compile your markdown and when using the the markdown. The first, also recommended, is [markdown-it](https://github.com/markdown-it/markdown-it) which uses the [CommonMark Spec](http://spec.commonmark.org/), and then the [showdown](https://github.com/showdownjs/showdown) is used in many places,seen [here](https://github.com/showdownjs/showdown#who-uses-showdown-or-a-fork), so its your choice which to use, but you have to define it if you want to use markdown in the [`render_engine`](#Render-engine). and the Markup

### Links
Links are the links that appear on the side of the page.
for them to link to contents on the page.

**setup**
```
{
	"href": "<the link on the page>",
	"name": "<the name for the link>"
}
```

**example:**
```
{
	...
	"links":
	{
		"href": "example",
		"name": "example link name that will show up in the side bar"
	}
	...
}
```