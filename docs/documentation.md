# Introduction
**Snowie** Docs is a tool to generate single page html files from your documentation. It is **light weight** easy to use CLI app. It generates a single html, with no js or css files attached which you can edit and you can host anywhere, like Github Pages.

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
```
{
    "title": "Basic-Snowie-Docs",
    "name": "Basic Snowie Docs",
    "description": "a basic snowie doc template",
    "markdown_engine": "markdown-it",
    "render_engine": "md",
    "markup": "md",
    "out": "output",
    "in": "index.md",
    "files": "./files",
    "links": [
        "Basic-Snowie-Markdown-file"
    ]
}
```
### options
#### title
`type=string`
the title of the project
#### name
`type=string`
the title for the output file
#### description
`type=string`
the description of the project