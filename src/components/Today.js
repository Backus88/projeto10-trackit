import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import styled from 'styled-components';

export default function Today(){
    const location = useLocation();
    const {image} = location.state;
    const dayjs = require('dayjs');
    useEffect(()=>{
        var updateLocale = require('dayjs/plugin/updateLocale')
        dayjs.extend(updateLocale);
        dayjs.updateLocale('pt', {
            weekdays: [
              "Doming", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabádo"
            ]
          })
    },[])

    return(
        <>
            <Header image = {image}/>
            <BodyDiv>
                <h2>{dayjs().format('dddd, DD/MM', 'pt', true )}</h2>
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
`