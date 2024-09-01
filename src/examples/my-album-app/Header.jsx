import { styled } from "@stitches/react";
import { Link, useLocation } from "react-router-dom";
import { default as ELink} from "../../lib/links/link";

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
                display: "flex",
                justifyContent: "space-between"
            }}>
                My Album App

                <span>
                    <ELink css={{color: "#FFF"}} href="#content" accessKey="c">
                        Conteúdo
                    </ELink>
                </span>
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
                        <StyledLink
                            accessKey="1"
                            to={"/"}
                        >
                            Lista [1]
                        </StyledLink>


                    </li>
                    <li>
                        <StyledLink
                            accessKey="2"
                            to={"/Register"}>
                            Registrar [2]
                        </StyledLink>
                    </li>
                </StyledUl>
            </StyledNav>
        </StyledHeader>
    )
}

export default Header;