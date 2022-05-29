import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useContext } from 'react';
import { MainContext } from './App';

export default function Footer({image}){
    const {countHabitDone} = useContext(MainContext);

    return(
        <FooterDiv>
            <Link to={"/habitos"} style={{ textDecoration: 'none' }} state={{image}}>
                <h1>Hábitos</h1>
            </Link>
            <Link to={"/hoje"} style={{ textDecoration: 'none' }} state={{image}}>
                <ProgressBarDiv>
                        <CircularProgressbar value={countHabitDone} background={true} backgroundPadding={6} text={'Hoje'}  styles={{
                            root:{},
                            text :{
                                transform:' translate(-24px, 6px)',
                            },
                            path:{
                                stroke: `#fff`,
                                strokeLinecap: 'round',
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
                </Link>
            <Link to={"/"} style={{ textDecoration: 'none' }} state={{image}}>
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