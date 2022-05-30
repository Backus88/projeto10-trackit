import Header from "./Header";
import Footer from "./Footer";
import { BodyDiv, TodayHeader } from "./Today";
import { Calendar } from "react-calendar";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import './History.css';
// import 'react-calendar/dist/Calendar.css';
import { MainContext } from "./App";
import axios from "axios";
import dayjs from "dayjs";



export default function History(){

    const [value, setValue] = useState(new Date());
    const {token} = useContext(MainContext);
    const [historyData, setHistoryData]= useState(null);
    const [data, setData] = useState([]);
    const[habitsDone, setHabitDone]= useState([]);
    const navigate = useNavigate();
    const config ={
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }

    function onChange(nextValue) {
      setValue(nextValue);
    }

    useEffect(()=>{
        const dataAux =[];
        const habitAux = [];
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily", config);
        promise.then((res)=>{
            setHistoryData([...res.data]);
            res.data.map((item,index)=>{
                let aux = true;
                const {day , habits} = item;
                dataAux.push(day);
                setData([...dataAux])
                habits.map((value)=>{
                    const{done} = value
                    if(done === false) aux = false;
                    return;
                })
                habitAux.push(aux);
                return (setHabitDone([...habitAux]));
            });
        })
    },[]);

    function dayClick(day){
        if(data.some((itens) => itens === dayjs(day).format('DD/MM/YYYY'))){
            const dataDay= historyData.find((element)=> element.day ===dayjs(day).format('DD/MM/YYYY'));
            // console.log(dataDay);
            navigate("/diahistorico", {state: {dataDay}});
        }else{
            alert('Não existem habitos nesse dia');
        }
    }

    // console.log(habitsDone);
    // console.log(data);
        return(
            <>
                <Header   />
                <CalendarDiv>
                    <TodayHeader>
                        <h2>Histórico</h2>
                    </TodayHeader>
                    <Calendar
                        onChange={onChange}
                        value={value}
                        calendarType ={'US'}
                        onClickDay ={(day) => dayClick(day)}
                        tileClassName={(date) => data.map((value, index) => {
                            if (value === dayjs(date.date).format('DD/MM/YYYY')) {
                                if (habitsDone[index] === true) {
                                    return "done"
                                } else {
                                    return "not-done"
                                }
                            } else {
                                return "";
                            }
                        }
                        )
                        }
                    />

                        
                        {/* <h5>Em breve você poderá ver o histórico dos seus hábitos aqui</h5> */}
                    </CalendarDiv>
                <Footer  />
            </>
        )
}


const CalendarDiv = styled.div`
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