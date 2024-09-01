import { styled } from "@stitches/react";
import { Link, useLocation } from "react-router-dom";

const StyledHeader = styled("header", {});
const StyledHeaderDiv = styled("div", {});
const StyledNav = styled("nav", {});
const StyledUl = styled("ul", {});

const StyledLink = styled(Link, {
    color: "#FFF"
})


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
                        {
                            location.pathname == "/" ?

                                <StyledLink
                                    accessKey="1"
                                    as={"a"}
                                    href="#list"
                                >
                                    Lista
                                </StyledLink>
                                :
                                <StyledLink
                                    accessKey="1"
                                    to={"/"}
                                >
                                    Lista
                                </StyledLink>
                        }


                    </li>
                    <li>
                        {
                            location.pathname == "/Register" ?
                                <StyledLink
                                    accessKey="2"
                                    href="#register"
                                    as="a"
                                >
                                    Registrar
                                </StyledLink>
                                :
                                <StyledLink
                                    accessKey="2"
                                    to={"/Register"}>
                                    Registrar
                                </StyledLink>
                        }

                    </li>
                </StyledUl>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header;