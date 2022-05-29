import Header from "./Header";
import Footer from "./Footer";
import { BodyDiv } from "./Today";
import styled from "styled-components";
import { FormStyle } from "./Login";
import { MainContext } from "./App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import garbage from '../assets/garbage.svg';
import { InfinitySpin } from "react-loader-spinner";
import { ThreeDots } from "react-loader-spinner";


export default function Habits (){
    const [addHabit, setAddHabit] = useState(false); 
    const miniDays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const[daysChoosed, setDaysChoosed] = useState([]);
    const[listHabit, setListHabit]= useState([]);
    const[nameHabit, setNameHabit]= useState("");
    const[getController, setGetController]= useState(false);
    const[loadingPost, setLoadingPost]= useState(false);
    const habitNone = "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!";
    const {token} = useContext(MainContext);
    const [getHabit, setGetHabit]= useState(false);

    const config ={
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }

    function sendHabit(event){
        event.preventDefault();
        setLoadingPost(true);
        const body = {
            name: nameHabit,
            days: daysChoosed
        } 
        if(daysChoosed.length > 0){
            const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
            promise.then(()=>{
                setGetController(!getController);
                setLoadingPost(false);
                setNameHabit(" ");
                setDaysChoosed([...[]]);
                setAddHabit(false);
            })
            promise.catch((error)=>{
                alert(error.response.data.details);
                setLoadingPost(false);
            })
        }else{
            alert("Selecione ao menos um dia");
            setLoadingPost(false);
        }
        
    }
    useEffect(()=>{
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config);
        promise.then((res)=>{
            setListHabit([...res.data]);
            setGetHabit(true);
        })
        promise.catch(()=>{
            setGetHabit(true);
        })
    },[getController])

    function selectDay(index){
        if(daysChoosed.some((item)=>  index === item) ){
            setDaysChoosed(...[daysChoosed.filter((item)=> item !==index)]);
        }else{
            setDaysChoosed([...daysChoosed, index]);
        }  
    }

    function deleteHabit(id){
        const willDelete = window.confirm("Deseja mesmo deletar?")
        if(willDelete){
            const promise = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`, config);
            setGetController(!getController);
            promise.then(()=>{
            })
            promise.catch(()=>{
            })
        }     
    }
    return (
        <>
            <Header />
            {(getHabit)?
            <BodyDiv>
                <HabitsHeader >
                    <h2> Meus Hábitos</h2>
                    <AddHabitDiv role={"button"} onClick={() => setAddHabit(true)}>
                        +
                    </AddHabitDiv>
                </HabitsHeader>
                {(addHabit) ?
                    <CreatHabit >
                        {(loadingPost)?
                        <FormStyle enable={false}>
                            <form onSubmit={sendHabit}>
                                <input type="text" placeholder="nome do hábito" onChange={e => setNameHabit(e.target.value)} disabled />
                                <RowDiv>
                                    {miniDays.map((item, index) =>
                                        <MiniDayDiv disabled selected={daysChoosed.some((item) => item === index)} key={index} onClick={() => selectDay(index)}>{item}</MiniDayDiv>
                                    )}
                                </RowDiv>
                                <RowDivEnd>
                                    <CancelButton onClick={() => setAddHabit(false)} disabled >Cancelar</CancelButton>
                                    <MiniLoader>
                                        <ThreeDots heigth="35" width="35" color="white" ariaLabel="loading" />
                                    </MiniLoader>
                                </RowDivEnd>
                            </form>
                        </FormStyle>
                        :
                        <FormStyle enable={true}>
                            <form onSubmit={sendHabit}>
                                <input type="text" placeholder="nome do hábito" value={nameHabit} onChange={e => setNameHabit(e.target.value)} required />
                                <RowDiv>
                                    {miniDays.map((item, index) =>
                                        <MiniDayDiv selected={daysChoosed.some((item) => item === index)} key={index} onClick={() => selectDay(index)}>{item}</MiniDayDiv>
                                    )}
                                </RowDiv>
                                <RowDivEnd>
                                    <CancelButton onClick={() => setAddHabit(false)}>Cancelar</CancelButton>
                                    <SaveHabit type="submit">Salvar</SaveHabit>
                                </RowDivEnd>
                            </form>
                        </FormStyle>
                        }
                    </CreatHabit>
                    :
                    null
                }
                {(listHabit.length > 0) ?
                    listHabit.map((value, indexHabit) => {
                        const { id, name, days } = value;
                        return (
                            <HabitItem key={indexHabit}>
                                <GarbageButton onClick={() => deleteHabit(id)}>
                                    <ion-icon name="trash-outline"></ion-icon>
                                </GarbageButton>
                                <h4>{name}</h4>
                                <RowDiv>
                                    {miniDays.map((item, index) =>
                                        <MiniDayDiv selected={days.some((item) => item === index)} key={index} >{item}</MiniDayDiv>
                                    )}
                                </RowDiv>
                            </HabitItem>
                        )
                    })
                    :
                    <h3>{habitNone}</h3>
                }
            </BodyDiv>
            :
            <GetHabitLoader>
                    <InfinitySpin color="blue" />
            </GetHabitLoader>
            }
            <Footer  />
        </>
    );

}

const HabitsHeader = styled.div `
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`


const AddHabitDiv = styled.div`
    box-sizing: border-box;
    padding-bottom: 4px;
    margin-top: 25px;
    margin-right: 18px;
    width: 40px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #52B6FF;
    color: #FFFFFF;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 300;
    font-size: 27px;
    line-height: 34px;
    border-radius: 4.63636px;
    cursor: pointer;
`

const CreatHabit = styled.div `
    box-sizing: border-box;
    padding: 18px;
    width: 340px;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-left: 18px;
    margin-top: 20px;
`
const MiniDayDiv = styled.div `
    width: 30px;
    height: 30px;
    background:${props => props.selected? "#D5D5D5" : "#FFFFFF"};
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 300;
    font-size: 19.976px;
    line-height: 25px;
    margin-right: 4px;
    color: ${props => props.selected? "#FFFFFF" : "#D5D5D5"};
`
const RowDiv = styled.div `
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const RowDivEnd = styled.div `
    box-sizing: border-box;
    margin-top: 29px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
`

const CancelButton = styled.button`
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    color: #52B6FF;
    border: none;
    background-color: rgb(0,0,0,0);
`
const SaveHabit = styled.button `
    width: 84px;
    height: 35px;
    border: none;
    margin-left: 20px;
    background: #52B6FF;
    border-radius: 4.63636px;
    font-family: 'Lexend Deca';
    font-style: normal;
    font-weight: 400;
    font-size: 15.976px;
    line-height: 20px;
    text-align: center;
    color: #FFFFFF;
    
`
const HabitItem = styled.div `
    position: relative;
    box-sizing: border-box;
    width: 340px;
    height: 91px;
    padding-left: 15px;
    padding-top: 10px;
    background: #FFFFFF;
    border-radius: 5px;
    margin-left: 15px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    h4{
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        color: #666666;
        margin-bottom: 5px;
    }
`

const GarbageButton = styled.button `
    position: absolute;
    top: 5%;
    right: 4%;
    border: none;
    background-color: rgb(0,0,0,0);
    width: 20px;
    height: 22px;
    cursor: pointer;
    ion-icon{
        width: 20px;
        height: 22px;
    }
`

const GetHabitLoader = styled.div`
    box-sizing: border-box;
    padding-bottom: 20px;
    width: 100%;
    height: 100%;
    min-height: 700px;
    background-color: rgb(255,255,255,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
`
const MiniLoader = styled.div `
    width: 84px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #52B6FF;
`
