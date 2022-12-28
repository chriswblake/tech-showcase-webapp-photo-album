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
apiOrigin = "https://jsonplaceholder.typicode.com"
class PhotoAlbum {
    // Methods - Queries
    static async GetAlbums() {
        var albums = undefined;
        await $.get(`${apiOrigin}/albums`, function( result ) {
            albums = result;
        })
        .fail(function() {
            album = {};
            console.log( "GetAlbums: Unable to get photo albums via API.");
        });
        return albums;  
    }
    static async GetAlbum(albumId) {
        var album = undefined;
        await $.get(`${apiOrigin}/albums/${albumId}`, function( result ) {
            album = result;
        })
        .fail(function() {
            album = {};
            console.log( "GetAlbum: Unable to get album details via API.");
        });
        return album;
    }
    static async GetPhotos(albumId) {
        var photos = undefined;
        await $.get(`${apiOrigin}/photos`, {"albumId": albumId}, function( result ) {
            photos = result;
        })
        .fail(function() {
            photos = [];
            console.log( "GetPhotos: Unable to get album photos via API.");
        });
        return photos;
    }

    // Methods - Display
    static albumCard = Handlebars.getTemplate('photo-album-card');
    static thumbnails = Handlebars.getTemplate('photo-album-card-thumnails');
    static AlbumToCardHtml(album) {
        return this.albumCard(album);
    }
    static PhotosToThumnails(photos) {
        photos = photos.slice(0,16);
        return this.thumbnails(photos);
    }
}

// Main
$( document ).ready(async function() {
    // Load Albums
    var html = "";
    var albums = await PhotoAlbum.GetAlbums();
    albums.forEach(album => {
        html += PhotoAlbum.AlbumToCardHtml(album);
    });
    $("#main-content").html(html);

    // Lazy load thumnbails, after cards
    $(".album-card").each(async function () {
        var albumId = $(this).attr("albumId");
        var albumPhotos = await PhotoAlbum.GetPhotos(albumId);
        var thumbnailsHtml = PhotoAlbum.PhotosToThumnails(albumPhotos);
        $(this).find("#album-thumbnails").html(thumbnailsHtml);
        console.log(thumbnailsHtml);
    })
    console.log('Ready');
});