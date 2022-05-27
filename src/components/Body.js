import styled from 'styled-components';

export default function Body(props){
    return(
        <BodyDiv>
             {props.children}
        </BodyDiv>
    );
}

const BodyDiv = styled.div `
    height: 100vh;
    width: 100%;
    background-color: #F2F2F2;
    margin: 70px 0;
    min-height: 700px;
`