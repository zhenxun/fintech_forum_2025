import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

function Cover({locale}) {
    const targetDate = '2025-11-12T09:00:00';
    return(
        <>
        <div style={{position: "relative",height: "850px",overflow: "hidden"}}>
            <video autoPlay muted loop playsInline  style={{position: "absolute",top: "0",left: "0",width: "100%",height:" 100%",objectFit:'cover',zIndex: "-1"}}>
                <source src="/assets/video/video1.webm" type="video/mp4" />
            </video>
            <div style={{backgroundColor: "rgba(0,0,0,0.5)",height: "100%"}} className="d-flex align-items-center text-light ps-3">
                <div className='px-3' style={{maxWidth:'100%'}}>
                    <div className="title-xlarge">2025</div>
                    <div className="title-xlarge">國立成功大學FinTech商創研究中心</div>
                    <i style={{fontSize:'2cqw'}}>第六屆負責任金融暨可信任AI之國際趨勢與展望實務論壇</i>
                    <CountdownTimer locale={locale} targetDate={targetDate} />
                </div>
            </div>
        </div>
        <div className='bg-dark text-light p-5'>
        <Row className='text-center p-3'>
            <Col md={4}>
                <h4>{locale?'Registration period':'報名期間'}</h4>
                <h2 style={{color:'#ffec00'}}>2025/11/04 ~ 2025/11/12</h2>
            </Col>
            <Col md={4}>
                <h4>{locale?'Forum Date':'論壇日期'}</h4>
                <h2 style={{color:'#ffec00'}}>2025/11/18</h2>
            </Col>
            <Col md={4}>
                <h4>{locale?'Forum Time':'活動時間'}</h4>
                <h2 style={{color:'#ffec00'}}>09:00 ~ 18:00</h2>
            </Col>
        </Row>
        </div>
        </>
    )
}

function CountdownTimer({ targetDate,locale }) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [targetDate]);

    function calculateTimeLeft(targetDate) {
        const endTime = new Date(targetDate).getTime();
        const now = Date.now();
        const remainingTime = Math.max(0, endTime - now);
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        return { days, hours, minutes, seconds };
    }

    return (
        <div className='text-light pb-5'  style={{fontSize:'2cqw',overflow: "hidden"}}>
            <div className='d-flex'>
            <lottie-player src="https://lottie.host/99db16ba-3541-4793-a653-f2fdcb38e19d/IWxKla2qrv.json"  background="transparent"  speed="2"  style={{maxWidth:"50px",maxHeight:"50px"}}  loop  autoplay></lottie-player> 
            <span style={{color:'#ffec00'}}>{timeLeft.days} {locale?"days":'天'} {timeLeft.hours} {locale?"hours":'小時'} {timeLeft.minutes} {locale?"minutes":'分鐘'} {timeLeft.seconds} {locale?"seconds":'秒'}</span>
            </div>
        </div>
    );
}
export default Cover;