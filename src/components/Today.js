import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useContext, useState } from "react";
import styled from 'styled-components';
import { MainContext } from "./App";
import axios from "axios";
import ok from '../assets/ok.svg'
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { GetHabitLoader } from "./Habits";
import { InfinitySpin } from "react-loader-spinner";



export default function Today(){
    // State that component update by get the information in the API everytime that a post occurs 
    const [habitControler, setHabitControler]= useState(false);
    const [sequenceEqual, setSequenceEqual]= useState([]);
    const [habitData, SetHabitData]= useState([]);
    const [getToday, setGetToday] = useState(false);
    const {token, countHabitDone, setCountHabitDone} = useContext(MainContext);
    

    const config ={
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }

    // useEffect(()=>{
    //     var updateLocale = require('dayjs/plugin/updateLocale');
    //     dayjs.extend(updateLocale);
    //     dayjs.updateLocale('pt', {
    //         weekdays: [
    //           "Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabádo"
    //         ]
    //     });
    // },[]);

    // Everytime that a post occurs this effect triggers
    useEffect(()=>{
        let count = 0
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",config);
        promise.then((res)=>{
            setGetToday(true);
            SetHabitData(res.data);
            const newArr = [];
            res.data.map((item)=>{
                const { done, currentSequence, highestSequence } = item;
                if(currentSequence === highestSequence){
                    newArr.push(true);
                   setSequenceEqual([...newArr]);
                }else{
                    newArr.push(false);
                    setSequenceEqual([...newArr]);
                }
                if(done){
                    count += 1;
                }
                return(true);
            });
            if(count> 0){
                setCountHabitDone(Math.round((count*100)/res.data.length))
            }else{
                setCountHabitDone(0);
            }
        });
    },[habitControler])


    // function used to toggle the status
    function changeHabitStatus(done, id){
        if(done){
            const promise = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`, {id:id} , config);
            promise.then(()=>{
                setHabitControler(!habitControler);
            });
        }else{
            const promessa = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,{id:id}, config);
            promessa.then(()=>{
                setHabitControler(!habitControler);
            });
        }
    }

    // function mountHabitsDay(){
    //     if(habitData > 0){
    //         habitData.map((item, index) =>{
    //             const {id, name, done, currentSequence, highestSequence} = item;
    //             if(done) setCountHabitDone(countHabitDone +1);
    //             return(
    //                 <TodayHabit>
    //                     <ColumnDiv>
    //                         <h1>{name}</h1>
    //                         <h2>Sequência atual:{currentSequence}</h2>
    //                         <h2>Seu recorde:{highestSequence}</h2>
    //                     </ColumnDiv>
    //                     <ButtonHabit>
    //                         <img src={ok} alt="eae" />
    //                     </ButtonHabit>
    //                 </TodayHabit>
    //             )
    //         })

    //     }
    // }
   
    
    return(
        <>
            <Header />
            {(getToday)?
            <BodyDiv selected ={countHabitDone}>
                <TodayHeader>
                    <h2>{dayjs().locale('pt-br').format('dddd, DD/MM')}</h2>
                    {(countHabitDone ===0)?
                        <h5>Nenhum hábito concluído ainda</h5>
                        :
                        <h5> {countHabitDone}% dos hábitos concluídos</h5>
                    }
                </TodayHeader>
                {(habitData) ? habitData.map((item, index) => {
                    const { id, name, done, currentSequence, highestSequence } = item;
                    return (
                        <TodayHabit key={index}>
                            <ColumnDiv done={done} sequence={sequenceEqual[index]}>
                                <h1>{name}</h1>
                                <h2>Sequência atual:  <span>{ currentSequence}{ (currentSequence ===1)? " dia": " dias" }</span> </h2>
                                <h3>Seu recorde:  <span>{ highestSequence }{ (highestSequence ===1)? " dia": " dias" }</span></h3>
                            </ColumnDiv>
                            <ButtonHabit done={done} onClick={()=>changeHabitStatus(done, id)}>
                                <img src={ok} alt="eae" />
                            </ButtonHabit>
                        </TodayHabit>
                    ) 
                })
                :
                null
                }
                
            </BodyDiv>
            :
            <GetHabitLoader>
                <InfinitySpin color="blue" />
            </GetHabitLoader>
            }
            <Footer />
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
    align-items: center;
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
        color: ${props => props.selected > 0 ? "#8FC549": "#BABABA"};
        margin-left: 17px;
        padding-top: 7px;
    }
`

export const TodayHabit= styled.div`
    position: relative;
    box-sizing: border-box;
    width: 340px;
    min-height: 94px;
    height: auto;
    background: #FFFFFF;
    border-radius: 5px;
    margin-left: 0;
    margin-top: 10px;
    padding: 7px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

export const ButtonHabit = styled.div`
    position:absolute;
    top: calc(100%-20px);
    right: 3%;
    width: 69px;
    height: 69px;
    background:${props => props.done ? "#8FC549": "#EBEBEB"} ;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    `

 export const ColumnDiv = styled.div `
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin-right: 5px;
    margin-left: 13px;
    max-width: 228px;
    /* word-break: break-word; */
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
        span{
            color: ${props => props.sequence? "#8FC549": props.done ? "#8FC549": "#666666"};
        }
    }
    h3{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 12.976px;
        line-height: 16px;
        color: #666666;
        padding: 0;
        margin: 0;
        span{
            color: ${props =>props.sequence ? "#8FC549": "#666666" };
        }
    }
`
export const TodayHeader = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
`

