import Header from "./Header"
import Footer from "./Footer"
import Body from "./Body"
import { useLocation } from "react-router-dom"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import styled from 'styled-components'

export default function Today(){
    const location = useLocation();
    const {image} = location.state;

    return(
        <>
            <Header>
                <img src={image} alt="omg" />
            </Header>
            <Body>

            </Body>
            <Footer>
                <ProgressBarDiv>
                    <CircularProgressbar value={60} background={true} backgroundPadding={6} text={'Hoje'}  styles={{
                        root:{},
                        text :{
                            transform:' translate(-23px, 5px)',
                        },
                        path:{
                            stroke: `#ffffff`,
                        },
                        background: {
                            fill: '#52B6FF',
                        },
                        trail :{
                            stroke: 'transparent',
                        },
                    }         
                    } />
                </ProgressBarDiv>
                
            </Footer>
        </>
    )

}

const ProgressBarDiv = styled.div `
    width: 91px;
    height: 91px;
    background-color: rgb(255 255 255 0.00001);
    margin-bottom: 60px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    fill: #FFFFFF;
`