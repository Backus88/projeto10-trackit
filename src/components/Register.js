import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ThreeDots } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import arrow from '../assets/arrow.svg'
import shadow from '../assets/shadow.svg'
import smallBar from '../assets/smallgreen.svg'
import mediumBar from '../assets/mediumred.svg'
import bigBar from '../assets/biggreen.svg'
import { MainDiv } from './Login'
import { BarsDiv } from './Login'
import { MainLoader } from './Login'
import { FormStyle } from './Login'

export default function Register(){
    const[email, setEmail] = useState("");
    const[pwd, setPwd]= useState("");
    const[name, setName]= useState("");
    const[photo, setPhoto]= useState("");
    const[disabled, setDisabled]= useState(false);
    const navigate = useNavigate();

    function register (event){
        event.preventDefault();
        setDisabled(true);
        
        const promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
            {
                email: email,
                name : name,
                image: photo,
                password: pwd
            }
        );
        setTimeout(() => {
            promise.then((res)=>{
                navigate("/");
                setDisabled(false);
            });
    
            promise.catch(()=>{
                alert("deu ruim");
                setDisabled(false);
            })
        }, 10000);
       
    }
    

    
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
            {(disabled)?
                <FormStyle enable ={false}>
                    <form >
                        <input type="text" placeholder='email' value={email} onChange={e => setEmail(e.target.value)} disabled={true} />
                        <input type="password" placeholder='senha' value={pwd} onChange={e => setPwd(e.target.value)} disabled={true} />
                        <input type="text" placeholder='nome' value={name} onChange={e => setName(e.target.value)} disabled={true} />
                        <input type="text" placeholder='fotos' value={photo} onChange={e => setPhoto(e.target.value)} disabled={true} />
                        <MainLoader>
                            <ThreeDots heigth="70" width="70" color="white" ariaLabel="loading" />
                        </MainLoader>
                    </form>
                </FormStyle>    
            :
                <FormStyle enable ={true}>
                    <form onSubmit={register}>
                        <input type="text" placeholder='email' value={email} onChange={e =>setEmail(e.target.value)} required  />
                        <input type="password" placeholder='senha' value={pwd} onChange={e =>setPwd(e.target.value)} required />
                        <input type="text" placeholder='nome'  value={name} onChange={e =>setName(e.target.value)} required  />
                        <input type="text" placeholder='fotos'  value = {photo} onChange={e =>setPhoto(e.target.value)} required  />
                        <button type='submit'> Cadastrar </button>
                    </form>
                </FormStyle>
            }
            <Link to={"/"} style={{ textDecoration: 'none' }}>
                <h2>
                    Não tem uma conta? Cadastre-se!
                </h2>
            </Link>
        </MainDiv>
    );

}