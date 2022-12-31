class PhotosApiClient {
    static apiOrigin = "https://jsonplaceholder.typicode.com"

    // Users
    static async GetUsers() {
        var albums = undefined;
        await $.get(`${this.apiOrigin}/users`, function( result ) {
            albums = result;
        })
        .fail(function() {
            album = {};
            console.log( "GetUsers: Unable to get users via API.");
        });
        return albums;  
    }
    
    // Albums
    static async GetAlbums() {
        var albums = undefined;
        await $.get(`${this.apiOrigin}/albums`, function( result ) {
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
        await $.get(`${this.apiOrigin}/albums/${albumId}`, function( result ) {
            album = result;
        })
        .fail(function() {
            album = {};
            console.log( "GetAlbum: Unable to get album details via API.");
        });
        return album;
    }

    // Photos
    static async GetPhotos(albumId) {
        var photos = undefined;
        await $.get(`${this.apiOrigin}/photos`, {"albumId": albumId}, function( result ) {
            photos = result;
        })
        .fail(function() {
            photos = [];
            console.log( "GetPhotos: Unable to get album photos via API.");
        });
        return photos;
    }
    static async GetPhoto(photoId) {
        var project = undefined;
        await $.get(`${this.apiOrigin}/photos/${{photoId}}`, function( result ) {
            console.log(`GetPhotos: ${JSON.stringify(result)}`);
        }.bind(this))
        .fail(function() {
            console.log( "GetProjectById: Unable to get project's details via API." );
        });

        return project;
    }
}

