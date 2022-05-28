import styled from 'styled-components'

export default function Header({image}){
    return (
        <HeaderDiv>
            <h1>TrackIt</h1>
            <img src={image} alt="omg" />
        </HeaderDiv>
    );
}

const HeaderDiv = styled.div `
    box-sizing: border-box;
    z-index: 1;
    position: fixed;
    width: 100%;
    height: 70px;
    left: 0px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    padding: 0 18px;
    h1{
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    
    img{
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
    }
    `