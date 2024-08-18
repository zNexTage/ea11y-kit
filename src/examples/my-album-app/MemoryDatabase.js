const memoryDatabase = () => {
    let albums = [
        {
            id: "1",
            photo: "https://static.qobuz.com/images/covers/40/29/0825646912940_600.jpg",
            author: "Enya",
            album: "Shepherd Moons",
            recordLabel: "WEA",
            gender: "New Age, Celta"
        },
        {
            id: "2",
            photo: "https://i.scdn.co/image/ab67616d0000b2734c12e9d03345de00b98be695",
            author: "Enya",
            album: "Clouds",
            recordLabel: "WEA",
            gender: "New Age, Celta"
        },
        {
            id: "3",
            photo: "https://i.scdn.co/image/ab67616d0000b27343ad3b367f6f54c767cc7021",
            author: "Saint Saens",
            album: "Melodies sans parole",
            recordLabel: "-",
            gender: "Música clássica"
        },
        {
            id: "4",
            photo: "https://i.scdn.co/image/ab67616d0000b27370dd4e18b9c3431ee7a9b8a1",
            author: "Enya",
            album: "A day without rain",
            recordLabel: "Warner Music UK",
            gender: "New age, Música celta"
        },
        {
            id: "5",
            photo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEji8CXcUeRGF6GrzbPr77rnABYQFlr28mAg8RtJ43TleAf8ct2TmZRx-7VEDG_PlxVDF_LkiExKctTNkTG-KdtksV1JytIF3hRFtpptx2GaCHh-LYViIxsCWGDaqAjx2lfnnQTF1RdHP4BB/s1600/mirror+mirror.jpg",
            author: "Blind Guardian",
            album: "Mirror Mirror",
            recordLabel: "Twilight Hall Studios, Karo Studios, Sweet Silence Studios, Vox Studios, Air-Edel Studios",
            gender: "Power Metal, Metal progressivo"
        },
        {
            id: "6",
            photo: "https://www.blind-guardian.com/wp-content/uploads/1998/04/1992-somewhere-far-beyond-400x400.jpg",
            author: "Blind Guardian",
            album: "Somewhere far beyond",
            recordLabel: "Karo Studios",
            gender: "Power metal, Speed Metal"
        },
        {
            id: "7",
            photo: "https://cdns-images.dzcdn.net/images/cover/0c4b765da922f865f5ab09544bd56efd/500x500.jpg",
            author: "Asian Kung-fu generation",
            album: "Sol-fa",
            recordLabel: " Sony Music Labels",
            gender: "Rock alternativo, Indie rock, Power pop, Post-hardcore"
        },
        {
            id: "8",
            photo: "https://upload.wikimedia.org/wikipedia/en/5/58/Asian_Kung-fu_Generation_Fanclub.jpg",
            author: "Asian Kung-fu generation",
            album: "Fanclub",
            recordLabel: "Kioon / Okami",
            gender: "Indie rock, alternative rock"
        },
    ];

    const add = ({ photo, author, album, recordLabel, gender }) => {
        const id = new Date().getTime();

        const data = {
            id,
            photo,
            author,
            album,
            recordLabel,
            gender
        }

        albums.push({
            ...data
        });

        return data;
    }

    const get = () => albums;

    const getById = id => albums.find(album => album.id == id);

    const remove = id => {
        const newList = albums.filter(album => album.id !== id);

        albums = [...newList];
    }

    const update = (albumId, newData) => {

        let albumUpdate = getById(albumId);

        albumUpdate = {
            ...albumUpdate,
            ...newData
        }

        albums = albums.map(album => {
            if (album.id === albumId) {
                return albumUpdate;
            } else {
                return album;
            }
        });

        return albumUpdate;
    }

    return {
        add,
        get,
        getById,
        remove,
        update
    }
}

export default memoryDatabase;