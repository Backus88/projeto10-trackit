import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Footer(props){
    return(
        <FooterDiv>
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <h1>Hábitos</h1>
            </Link>
            {props.children}
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <h1>Histórico</h1>
            </Link>
        </FooterDiv>
    );

}


const FooterDiv = styled.div `
    z-index: 1;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 70px;
    bottom: 0;
    left: 0;
   background-color: #FFFFFF;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        text-align: center;
        color: #52B6FF;
    }
`