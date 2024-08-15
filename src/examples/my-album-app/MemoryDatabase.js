const memoryDatabase = () => {
    const albums = [];

    const add = ({ photo, author, album, recordLabel, gender }) => {
        const id = new Date().getTime();

        albums.push({
            id,
            photo,
            author,
            album,
            recordLabel,
            gender
        });
    }

    const get = () => albums;

    const getById = id => albums.find(album => album.id == id);

    return {
        add,
        get,
        getById
    }
}

export default memoryDatabase;