import Link from '@mui/material/Link';


const LinkExample = () => (
    <>
        <Link href="#">Link</Link>
        <br />
        <br />
        <Link href="#" color="inherit">
            {'color="inherit"'}
        </Link>
        <br />
        <br />
        <Link href="#" variant="body2">
            {'variant="body2"'}
        </Link>
    </>
)

export default LinkExample;