Handlebars.getTemplate = function(name) {
    if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
        $.ajax({
            url : 'templates/' + name + '.html',
            success : function(data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {};
                }
                Handlebars.templates[name] = Handlebars.compile(data);
            },
            async : false
        });
    }
    return Handlebars.templates[name];
};

// Classes
class User {

    // Methods - Display
    static UsersToSideNavHtml(photos) {
        var sideNavUsers = Handlebars.getTemplate('side-nav-users');
        var html = sideNavUsers(photos);
        return html;
    }
}
class PhotoAlbum {

    // Methods - Display
    static AlbumToCardHtml(album) {
        var albumCard = Handlebars.getTemplate('photo-album-card');
        return albumCard(album);
    }
    static PhotosToThumnails(photos) {
        photos = photos.slice(0,16);
        var thumbnails = Handlebars.getTemplate('photo-album-card-thumnails');
        var html = thumbnails(photos);
        return html;
    }
    static PhotosToCardsHtml(photos) {
        var photoCards = Handlebars.getTemplate('photo-cards');
        var html = photoCards(photos);
        return html;
    }
}

class App {
    constructor() {
        // Check URL for querystring parameters
        const urlParams = new URLSearchParams(window.location.search);

        // Pick action based on parameters
        if(urlParams.has('albumId'))
        {
            // Show images for album
            const albumId = urlParams.get('albumId');
            this.LoadAlbum(albumId);
        }else // Display Albums
        {
            this.LoadAlbums();
            this.LoadUsers();
        }
    }

    // Properties
    get MainContentArea() {
        return $("#main-content");
    }
    get SideContentArea() {
        return $("#side-nav");
    }

    // Methods
    async LoadAlbums() {
        var html = "";
        var albums = await PhotosApiClient.GetAlbums();
        albums.forEach(album => {
            html += PhotoAlbum.AlbumToCardHtml(album);
        });
        this.MainContentArea.html(html);
        this.SideContentArea.show();

        // Lazy load thumnbails, after cards
        $(".album-card").each(async function () {
            var albumId = $(this).attr("albumId");
            var albumPhotos = await PhotosApiClient.GetPhotos(albumId);
            var thumbnailsHtml = PhotoAlbum.PhotosToThumnails(albumPhotos);
            $(this).find("#album-thumbnails").html(thumbnailsHtml);
        })
        
        console.log("LoadAlbums");
    }
    async LoadUsers() {
        var users = await PhotosApiClient.GetUsers();
        console.log(users.length);
        var html = User.UsersToSideNavHtml(users);
        this.SideContentArea.html(html);

        //Enable hiding of albums
        $(".side-nav-user").click(this.ShowUserAlbums);
        console.log("LoadUsers");
    }
    async LoadAlbum(albumId) {
        var album = await PhotosApiClient.GetAlbum(albumId);
        var photos = await PhotosApiClient.GetPhotos(albumId);
        var input = {
            "album": album,
            "photos": photos
        };
        var html = PhotoAlbum.PhotosToCardsHtml(input);
        this.MainContentArea.html(html);
        this.SideContentArea.hide();
    }

    // Methods - Interactions
    ShowUserAlbums(event) {
        var userId = $(this).attr("userId");
        $(`.album-card`).parent().show();
        $(`.album-card:not([userId=${userId}])`).parent().hide();
    }
}

// Main
$( document ).ready(async function() {
    app = new App();
    console.log('Ready');
});