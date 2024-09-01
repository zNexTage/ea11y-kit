import { styled } from "@stitches/react";
import { Link, useLocation } from "react-router-dom";

const StyledHeader = styled("header", {});
const StyledHeaderDiv = styled("div", {});
const StyledNav = styled("nav", {});
const StyledUl = styled("ul", {});


const Header = () => {
    const location = useLocation();

    return (
        <StyledHeader css={{
            marginBottom: 10,
            color: "#FFF",
        }}>
            <StyledHeaderDiv css={{
                padding: 20,
                backgroundColor: "#03F",
            }}>
                My Album App
            </StyledHeaderDiv>
            <StyledNav css={{
                backgroundColor: "#06F",
                padding: 10
            }}>
                <StyledUl css={{
                    margin: 0,
                    padding: 0,
                    display: "inline",
                    ">li": {
                        display: "inline",
                        margin: 10
                    }
                }}>
                    <li>
                        <Link
                            to={location.pathname == "/" ? "#list" : "/"}
                            style={{ color: "#FFF" }}>
                            Lista
                        </Link>
                    </li>
                    <li>
                        <Link to={location.pathname == "/Register" ? "#register" : "/Register"} style={{ color: "#FFF" }}>
                            Registrar
                        </Link>
                    </li>
                </StyledUl>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header;