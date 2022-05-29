import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import styled from 'styled-components';
import { MainContext } from "./App";
import axios from "axios";
import ok from '../assets/ok.svg'


export default function Today(){
    const location = useLocation();
    const {image} = location.state;
    const [countHabitDone, setCountHabitDone]= useState(0);
    const [habitControler, setHabitControler]= useState(false);
    const[habitData, SetHabitData]= useState([]);
    const {token} = useContext(MainContext);
    const dayjs = require('dayjs');

    const config ={
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }

    useEffect(()=>{
        var updateLocale = require('dayjs/plugin/updateLocale');
        dayjs.extend(updateLocale);
        dayjs.updateLocale('pt', {
            weekdays: [
              "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabádo"
            ]
        });
    },[]);

    useEffect(()=>{

        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",config);
        promise.then((res)=>{
            console.log("entrou get");
            SetHabitData(res.data);
        })

    },[habitControler]);

    function changeHabitStatus(done, id){
        if(done){
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, config);
            promise.then(()=>{
                console.log("desmarcou")
                setHabitControler(!habitControler);
            });
        }else{
            const promessa = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`, config);
            promessa.then(()=>{
                console.log("marcou")
                setHabitControler(!habitControler);
            });
        }
    }

    function mountHabitsDay(){
        if(habitData > 0){
            habitData.map((item, index) =>{
                const {id, name, done, currentSequence, highestSequence} = item;
                if(done) setCountHabitDone(countHabitDone +1);
                return(
                    <TodayHabit>
                        <ColumnDiv>
                            <h1>{name}</h1>
                            <h2>Sequência atual:{currentSequence}</h2>
                            <h2>Seu recorde:{highestSequence}</h2>
                        </ColumnDiv>
                        <ButtonHabit>
                            <img src={ok} alt="eae" />
                        </ButtonHabit>
                    </TodayHabit>
                )
            })

        }
    }
   
    const habits = mountHabitsDay();
    return(
        <>
            <Header image = {image}/>
            <BodyDiv>
                <h2>{dayjs(new Date(), 'pt', true).format('dddd, DD/MM', 'pt', true)}</h2>
                {(countHabitDone ===0)?
                    <h5>Nenhum hábito concluído ainda</h5>
                    :
                    null
                }
                { habitData.map((item, index) =>{
                const {id, name, done, currentSequence, highestSequence} = item;
                if(done) setCountHabitDone(countHabitDone +1);
                return(
                    <TodayHabit>
                        <ColumnDiv>
                            <h1>{name}</h1>
                            <h2>Sequência atual:{currentSequence}</h2>
                            <h2>Seu recorde:{highestSequence}</h2>
                        </ColumnDiv>
                        <ButtonHabit done = {done}>
                            <img src={ok} alt="eae" />
                        </ButtonHabit>
                    </TodayHabit>
                )
            })}
            </BodyDiv>
            <Footer image ={image}/>
        </>
    );

}

export const BodyDiv = styled.div `
    box-sizing: border-box;
    height: auto;
    width: 100%;
    min-height: 700px;
    background-color: #F2F2F2;
    margin: 72px 0;
    padding-bottom: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 25px;
        line-height: 29px;
        color: #126BA5;
        margin-left: 17px;
        padding-top: 28px;
    }
    h3{
        box-sizing: border-box;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #666666;
        padding: 19px;
        word-break: break-word;
    }
    h5{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 17.976px;
        line-height: 22px;
        color: #BABABA;
        margin-left: 17px;
        padding-top: 7px;
    }
`

const TodayHabit= styled.div`
    box-sizing: border-box;
    width: 340px;
    height: 94px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-left: 15px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

const ButtonHabit = styled.div`
    width: 69px;
    height: 69px;
    background:${props => props.done ? "#8FC549": "#EBEBEB"} ;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const ColumnDiv = styled.div `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 53px;
    margin-left: 13px;
    h1{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        padding: 0;
        padding-bottom: 10px;
    }
    h2{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
        padding: 0;
        margin: 0;
    }
`

