import Header from "./Header"
import Footer from "./Footer"
import Body from "./Body"
import { useLocation } from "react-router-dom"

export default function Today(){
    const location = useLocation();
    const {image} = location.state;

    return(
        <>
            <Header>
                <h1>TrackIt</h1>
                <img src={image} alt="omg" />
            </Header>
            <Body>

            </Body>
            <Footer>

            </Footer>
        </>
    )

}