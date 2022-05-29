import Header from "./Header";
import Footer from "./Footer";
import { BodyDiv } from "./Today";
import { useLocation } from "react-router-dom";

export default function History(){

    const location = useLocation();
    const {image} = location.state;

        return(
            <>
                <Header image={image}  />
                <BodyDiv>
                    <h2>Histórico</h2>
                    <h5>Em breve você poderá ver o histórico dos seus hábitos aqui</h5>
                </BodyDiv>
                <Footer image ={image} />
            </>
        )
}