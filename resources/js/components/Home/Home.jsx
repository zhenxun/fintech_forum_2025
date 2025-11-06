import { useEffect, useState } from "react";
import Menu from "../Menu";
import About from "./About";
import ContactUs from "./ContactUs";
import Cover from "./Cover";
import Footer from "./Footer";
import KeySpeaker from "./KeySpeaker";
import Location from "./Location";
import Organizers from "./Organizers";
import Session from "./Session";
import Speaker from "./Speaker";

function Home({locale}) {

    const [result,setResult]=useState(null)
    function getData(){
        fetch(`https://admin.forum.hub-fintech-ncku.tw/api/data?locale=${locale}&year=2025`,{
            method:'GET',
        }).then(response=>{
            return response.json()
        }).then(res=>{
            setResult(res.data)
        })
    }
    
    useEffect(()=>{
        getData()
    },[])

    if(!result) return<></>
    return (
        <>
        <Menu />
        <Cover />
        <About locale={locale} />
        <KeySpeaker locale={locale} speaker={result.keynote} />
        <Speaker locale={locale} speaker={result.speaker} />
        <Organizers locale={locale} />
        <Session locale={locale} agenda={result.agenda} />
        <ContactUs locale={locale} />
        <Location locale={locale} />
        <Footer />
        </>
    );
}

export default Home;