import AlbumForm from "./AlbumForm";
import Header from "./Header";
const Main = styled("main", {});

const Edit = () => {
    return (
        <>
            <Header />
            <Main css={{ margin: 5, padding: 5 }}>
                <h1>
                    Editar álbum
                </h1>
                <br />
                <AlbumForm onSubmit={onSubmit} />

            </Main>
        </>
    )
}

export default Edit;