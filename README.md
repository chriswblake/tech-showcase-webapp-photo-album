# Showcase - WebApp - PhotoAlbum

This is a simple javascript application to demonstrate making HTTP GET requests and use of templates. It displays albums and their associated images.

The startpoint is `index.html`, which loads `index.js`. On startup, it loads retrieves a list of all albums. Using templating, it also retrieves some of the album's images to decorate the card. Finally, it loads the list of users in the side bar, to use as a filter.


- A template is used for displaying an album's card.
- A template is used for displaying each image thumbnail/card.
- A template is used for displaying the users.

### Requirements
There are no end-user requirements for running this application. All required files are already included in the `lib` folder.

- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/download/) - v5.2.3
- [JQuery](https://jquery.com/download/) - v3.3.1
- [Handlebars](https://handlebarsjs.com/installation/#downloading-handlebars) - v4.7.7
- [FontAwesome-free](https://fontawesome.com/v6/download) - v6.1.1


## Developer Notes
This project was developed using VS Code. However, none of the debugger tools were used. Simply the "Live Server" extension.

### Extensions
- Live Server [(ritwickdey.LiveServer)](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)

### Architecture
The application is simple, but here are the important parts.
- **index.html** - The startpoint/main program. 
- **index.js** - The main program.
- **templates/*.html** - Templates for the albums/photos/users.


# How to Run

## How to Run -- With a normal browser
This project does not require any building to run.
Simply open `index.html` with a browser such as Safari or Chrome.

## How to Run -- Using Live Server
Running with Live Server (in VS Code) enables instant feedback of changes.
1. Ensure the `Live Server` extention is enabled.
1. Within VS Code, in the bottom right of the status bar, look for "Go Live" and press it.
    - A web browser should appear and automatically navigate to the current page.
> Tip: Try chaninging something in a file. You should notice the result in the browser immediately!


# Testing
No Unit Tests were made for this project. The goal was playing with templates. ;)