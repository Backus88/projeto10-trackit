import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useContext } from 'react';
import { MainContext } from './App';

export default function Footer(){
    //Receive the value of the progressbar via context
    const {countHabitDone} = useContext(MainContext);

    return(
        <FooterDiv>
            <Link to={"/habitos"} style={{ textDecoration: 'none' }} >
                <h1>Hábitos</h1>
            </Link>
            <Link to={"/hoje"} style={{ textDecoration: 'none' }} >
                <ProgressBarDiv>
                        <CircularProgressbar value={countHabitDone} background={true} backgroundPadding={6} text={'Hoje'}  styles={{
                            root:{},
                            text :{
                                // To centralize the text 
                                transform:' translate(-24px, 6px)',
                            },
                            path:{
                                stroke: `#fff`,
                                strokeLinecap: 'round',
                                // The animation
                                transition: 'stroke-dashoffset 0.6s ease 0.6s',
                            },
                            background: {
                                fill: '#52B6FF',
                            },
                            trail :{
                                // Trail is the cointainer of all path so use transparent to make trail === background color
                                stroke: 'transparent',
                            },
                        }         
                        } />
                    </ProgressBarDiv>
                </Link>
            <Link to={"/historico"} style={{ textDecoration: 'none' }} >
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

const ProgressBarDiv = styled.div `
    width: 91px;
    height: 91px;
    background-color: rgb(255 255 255 0);
    margin-bottom: 60px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 22px;
    fill: #FFFFFF;
`