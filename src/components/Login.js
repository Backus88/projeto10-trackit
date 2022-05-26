import styled from 'styled-components'
import { Link } from 'react-router-dom'
import arrow from '../assets/arrow.svg'
import shadow from '../assets/shadow.svg'
import smallBar from '../assets/smallgreen.svg'
import mediumBar from '../assets/mediumred.svg'
import bigBar from '../assets/biggreen.svg'

export default function Login(){
    
    
    return(
        <MainDiv>
            <BarsDiv>
                <img src={smallBar} alt="https://hugocalixto.com.br/wp-content/uploads/sites/22/2020/07/error-404-1.png" />
                <img src={mediumBar} alt="https://hugocalixto.com.br/wp-content/uploads/sites/22/2020/07/error-404-1.png" />
                <img src={bigBar} alt="https://hugocalixto.com.br/wp-content/uploads/sites/22/2020/07/error-404-1.png" />
            </BarsDiv>
            <img src={arrow} alt="https://hugocalixto.com.br/wp-content/uploads/sites/22/2020/07/error-404-1.png" />
            <img src={shadow} alt="https://hugocalixto.com.br/wp-content/uploads/sites/22/2020/07/error-404-1.png" />
            <h1>TrackIt</h1>
            <FormStyle enable ={true}>
                <form>
                    <input type="text"  placeholder='email'/>
                    <input type="text" placeholder='senha' />
                    <button> Entrar </button>
                </form>
            </FormStyle>
            <Link to={"/cadastro"} style ={{textDecoration:'none'}}>
                <h2>
                    Não tem uma conta? Cadastre-se!
                </h2>
            </Link>
        </MainDiv>
    );
    
}


export const MainDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    h1{
        font-family: 'Playball';
        font-style: normal;
        font-weight: 400;
        font-size: 68.982px;
        line-height: 86px;
        color: #126BA5;

    }
    img:nth-child(2){
        z-index: 1;
        margin-bottom: -10px;
    }
    
    button{
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 20.976px;
        line-height: 26px;
        text-align: center;
        color: #FFFFFF;
    }

    h2{
        margin-top: 25px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 13.976px;
        line-height: 17px;
        color: #52B6FF;
        text-decoration-line: underline;
    }

`

export const FormStyle = styled.div `
     form{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input{
        box-sizing: border-box;
        width: 303px;
        height: 45px;
        left: 36px;
        top: 279px;
        background:${props =>props.enable? "#FFFFFF" : "#F2F2F2" };
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin-bottom: 6px;
        font-family: 'Lexend Deca';
        font-style: normal;
        font-weight: 400;
        font-size: 19.976px;
        line-height: 25px;
        padding-left: 11px;
        ::placeholder{
            color: #D5D5D5;
        }
    }
`

export const BarsDiv = styled.div `
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -20px;
    margin-right: 8px;
    margin-top: 68px;
    img:nth-child(1){
        margin-right: 5px;
        margin-bottom: -7px;
    }
    img:nth-child(2){
        margin-right: 5px;
        margin-bottom: -7px;
    }
    img:nth-child(3){
        margin-bottom: -7px;
    }
`
export const MainLoader = styled.div `
    width: 303px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #52B6FF;
`
