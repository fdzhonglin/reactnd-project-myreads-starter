# Myreads

This is a project for Udacity's React Fundamentals course, developed by Johnny Zhang. I use it to learn React and React Router. 

# Documentation

You can use following step to see what I have finished.

## Install

```
$ git clone https://github.com/fdzhonglin/reactnd-project-myreads-starter.git
$ cd reactnd-project-myreads-starter
$ npm install
```
## Run

Suppose you are in the root directory of project.

```
$ npm run
```
The web browser will open url `localhost:3000` as my project root url, if not, please open yourself. You will see the library page.

## Usage
The project contains two main page. One is Library page which is the home page. The other one is Search page which user can search book from an online API provided by udacity.

### Library page
The books will be showed into three shelfs, 'Currently Reading', 'Want to Read', 'Read'. The book can be drag and drop between each shelf. You can also use action button at the right down corner of each book to move the book to other shelf or remove it when you set shelf name to none.

### Search page
You can type several acceptable term on search bar to find the book. After you get the response, you can add book into the shelf you want.

## NOTICE
Although the project is running on local machine, to make search page work, the local machine **MUST** have internet connection.

## Know issues
The drag and drop use the library [react-dnd](http://react-dnd.github.io/react-dnd/). It may only support for desktop web browser. For mobile user, it may not work well.

## Contributing
This repository is using the starter code from Udacity. Great thanks to Udacity team. 

