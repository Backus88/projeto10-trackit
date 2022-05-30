import Header from "./Header";
import Footer from "./Footer";
import { BodyDiv } from "./Today";
import { Calendar } from "react-calendar";


export default function History(){



        return(
            <>
                <Header   />
                <BodyDiv>
                    <h2>Histórico</h2>
                    <h5>Em breve você poderá ver o histórico dos seus hábitos aqui</h5>
                </BodyDiv>
                <Footer  />
            </>
        )
}