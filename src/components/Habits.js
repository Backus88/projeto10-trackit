import Header from "./Header";
import Footer from "./Footer";
import { BodyDiv } from "./Today";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { FormStyle } from "./Login";
import { MainContext } from "./App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import garbage from '../assets/garbage.svg';


export default function Habits (){
    const location = useLocation();
    const {image}= location.state; 
    const [addHabit, setAddHabit] = useState(false); 
    const miniDays = ["D", "S", "T", "Q", "Q", "S", "S"];
    const[daysChoosed, setDaysChoosed] = useState([]);
    const[listHabit, setListHabit]= useState([]);
    const[nameHabit, setNameHabit]= useState(null);
    const[getController, setGetController]= useState(false)
    const habitNone = "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!";
    const {token} = useContext(MainContext);
    const config ={
        headers:{
            "Authorization": `Bearer ${token}`
        }
    }

    function sendHabit(event){
        event.preventDefault();
        const body = {
            name: nameHabit,
            days: daysChoosed
        } 
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config);
        promise.then(()=>{
            alert('deu bom');
            setGetController(!getController);
        })
        promise.catch(()=>{
            alert("deu ruim");
        })
    }
    useEffect(()=>{
        console.log('entrou no get');
        const promise = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",config);
        promise.then((res)=>{
            console.log("deu bom");
            setListHabit([...res.data]);
        })
        promise.catch(()=>{
            console.log("deu ruim");
        })
    },[getController])

    function selectDay(index){
        console.log(index);
        if(daysChoosed.some((item)=>  index === item) ){
            console.log('entrei aqui');
            setDaysChoosed(...[daysChoosed.filter((item)=> item !==index)]);
        }else{
            setDaysChoosed([...daysChoosed, index]);
        }  
    }

    function listingHabits(){
        listHabit.map((value, indexHabit)=>{
            const {id, name, days} = value;

            return(
                <HabitItem key = {indexHabit}>
                    <h4>{name}</h4>
                    <RowDivEnd>
                        {miniDays.map((item, index)=>
                            <MiniDayDiv selected = {days.some((item)=> item ===index)} key = {index} >{item}</MiniDayDiv>
                        )}
                    </RowDivEnd>
                </HabitItem>
            )
        })
    }

    const allHabits = listingHabits();

    console.log(listHabit);
    return(
        <>
            <Header image = {image}/>
            <BodyDiv>
                <HabitsHeader >
                        <h2> Meus Hábitos</h2>
                        <AddHabitDiv role={"button"} onClick={()=>setAddHabit(true)}>
                            +
                        </AddHabitDiv>
                </HabitsHeader>
                {(addHabit) ?
                    <CreatHabit >
                        <FormStyle enable ={true}>
                            <form onSubmit={sendHabit}>
                                <input type="text" placeholder="nome do hábito" onChange={e=> setNameHabit(e.target.value)} required />
                                <RowDiv>
                                    {miniDays.map((item, index)=>
                                            <MiniDayDiv selected = {daysChoosed.some((item)=> item ===index)} key = {index} onClick={()=> selectDay(index)}>{item}</MiniDayDiv>
                                    )}
                                </RowDiv>
                                <RowDivEnd>
                                        <CancelButton onClick={()=>setAddHabit(false)}>Cancelar</CancelButton>
                                        <SaveHabit type="submit">Salvar</SaveHabit>
                                </RowDivEnd>
                            </form>
                        </FormStyle>
                    </CreatHabit>
                   :
                   null
                }
                {(listHabit.length > 0 )?
                  listHabit.map((value, indexHabit)=>{
                    const {name, days} = value;
                    return(
                        <HabitItem key = {indexHabit}>
                            <GarbageButton>
                                <img src={garbage} alt="oi" />
                            </GarbageButton>
                            <h4>{name}</h4>
                            <RowDiv>
                                {miniDays.map((item, index)=>
                                    <MiniDayDiv selected = {days.some((item)=> item ===index)} key = {index} >{item}</MiniDayDiv>
                                )}
                            </RowDiv>
                        </HabitItem>
                    )
                })
                :
                <h3>{habitNone}</h3>
                }
            </BodyDiv>
            <Footer image ={image}/>
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
    padding-top: 5px;
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
    right: 5%;
    border: none;
    background-color: rgb(0,0,0,0);
    width: 13px;
    height: 15px;
    img{
        width: 13px;
        height: 15px;
    }
`
