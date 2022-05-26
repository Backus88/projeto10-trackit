import styled from 'styled-components'
import { Link } from 'react-router-dom'
import arrow from '../assets/arrow.svg'
import shadow from '../assets/shadow.svg'
import smallBar from '../assets/smallgreen.svg'
import mediumBar from '../assets/mediumred.svg'
import bigBar from '../assets/biggreen.svg'
import { MainDiv } from './Login'
import { BarsDiv } from './Login'

export default function Register(){
    
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
            <input type="text" placeholder='email' />
            <input type="text" placeholder='senha' />
            <input type="text" placeholder='nome' />
            <input type="text" placeholder='fotos' />
            <button> Entrar </button>
            <Link to={"/cadastro"} style={{ textDecoration: 'none' }}>
                <h2>
                    Não tem uma conta? Cadastre-se!
                </h2>
            </Link>
        </MainDiv>
    );

}