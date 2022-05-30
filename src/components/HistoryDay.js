import Header from "./Header";
import Footer from "./Footer";
import { BodyDiv } from "./Today";
import { useLocation } from "react-router-dom";
import { ColumnDiv, TodayHabit, ButtonHabit, TodayHeader } from "./Today";
import { useState } from "react";
import dayjs from "dayjs";
import { useEffect } from "react";
import styled from 'styled-components'
import ok from '../assets/ok.svg'

export default function HistoryDay(){
    const location = useLocation();
    const {dataDay}= location.state;
    const {day, habits}= dataDay;
    const[habitDay, setHabitDay]= useState([])

    useEffect(()=>{
        setHabitDay(habitDay);
    },[])

    return(
        <>
            <Header/>
            <BodyDiv>
                <TodayHeader>
                    <h2> Histórico do dia: {day}</h2>
                </TodayHeader>
                {(habits) ? habits.map((item, index) => {
                    const {done, name} = item;
                    return (
                        <TodayHabit key={index}>
                            <ColumnDay done={done}>
                                <h1>{name}</h1>
                            </ColumnDay>
                            <ButtonDay done={done} >
                                {(done)? <img src={ok} alt="eae" /> : <ion-icon name="close-circle"></ion-icon>}
                            </ButtonDay>
                        </TodayHabit>
                    ) 
                })
                :
                null
                }
            </BodyDiv>
            <Footer/>
        </>
        
    )
}

const ColumnDay = styled.div `
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 5px;
    margin-left: 13px;
    max-width: 228px;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: ${props => props.done ? "#8FC549": "red"} ;;
        padding: 0;
        padding-bottom: 10px;
    }

`

const ButtonDay = styled.div`
    position:absolute;
    top: calc(100%-20px);
    right: 3%;
    width: 69px;
    height: 69px;
    background:${props => props.done ? "#8FC549": "red"} ;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    ion-icon{
        width: 69px;
        height: 69px;
        fill: red;
        background: white;
    }
`