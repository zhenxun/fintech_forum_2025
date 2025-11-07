import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Menu from './Menu';
import './agenda.css';

const sponsorLogos = [
    { alt: '上海商業儲蓄銀行', src: '/assets/partner/上海銀行.png' },
    { alt: '中租控股股份有限公司', src: '/assets/partner/中租.png' },
    { alt: '兆豐金融控股公司', src: '/assets/partner/兆豐金融控股.svg' },
    { alt: '京城商業銀行', src: '/assets/partner/京城銀行.png' },
    { alt: '南山人壽保險股份有限公司', src: '/assets/partner/南山.png' },
    { alt: '康和證券集團', src: '/assets/partner/康和證券.png' },
];


function Agenda({locale}) {

    const [agenda,setAgenda]=useState(null)
    function getData(){
        fetch(`https://admin.forum.hub-fintech-ncku.tw/api/data?locale=${locale}&year=2025`,{
            method:'GET',
        }).then(response=>{
            return response.json()
        }).then(res=>{
            setAgenda(res.data.agenda)
        })
    }

    useEffect(()=>{
        getData()
    },[])

    return (
        <div>
            <Menu />
            <div className="page-section pb-3 justify-content-center align-items-center d-flex" id='content' style={{minHeight:'80vh',paddingTop:'10px'}}>
            <Container id='agenda'>
                <div className='d-flex flex-row justify-content-between align-items-center ps-2 pb-3'>
                    <h1 className='text-center pb-3'>{locale?'Agenda':'當日議程'}</h1>
                </div>
                <Time timeline={agenda} />
            </Container>
            </div>
        </div>
    );
}

function Time({timeline}){

    if(timeline==null) return null;

    return (
        <div className='agenda-timeline'>
            {timeline ? timeline.map((value,i)=> (
                <div key={i} className='mb-4 timeline-item'>
                    <div className='d-flex align-items-start'>
                        {value.time ? (
                            <div className='me-3 time-badge'>
                                <h5 className='border rounded p-3 shadow bg-light text-dark d-inline-flex'>{value.time}</h5>
                            </div>
                        ) : null}
                        <div className='flex-grow-1'>
                            <h5 className='border rounded p-3 mx-3 shadow bg-light text-dark agenda-title'>
                                <span dangerouslySetInnerHTML={{__html:value.title}} />
                            </h5>
                            {value.speaker ? (
                                <div className='border rounded p-3 shadow m-3 bg-dark agenda-card'>
                                    <div>
                                        {value.subtitle ? <h4 style={{color:'gold'}}>《{value.subtitle}》</h4> : null}
                                    </div>
                                    {value.speaker ? value.speaker.map((element,j)=>(
                                        <div key={j} className='mt-3'>
                                            <h4 style={{color:'gold'}}>{element.thema}</h4>
                                            <h6>{element.title}</h6>
                                            {element.member.map((item,k)=> (
                                                <div key={k} className='d-flex justify-content-start flex-row align-items-center py-3'>
                                                    {/* image: remove avatar css and constrain size to avoid oversized images */}
                                                    <div className='member px-3 member-avatar' style={{width:'80px', minWidth:'80px', height:'80px', overflow:'hidden', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                                        <LazyLoadImage effect="blur" style={{width:'80px', height: '80px', objectFit:'cover'}} src={item.src} alt={item.name} />
                                                    </div>
                                                    <div className='member-info'>
                                                        <div className='ps-3' style={{fontSize:'20pt'}}>{item.name}</div>
                                                        <div className='ps-3' style={{fontSize:'18pt'}}>{item.title}</div>
                                                        {element.sponsors ? (
                                                            <div className='d-flex flex-wrap align-items-start justify-content-start px-3 pt-2 sponsor-list'>
                                                                {sponsorLogos.map((logo) => (
                                                                    <div key={logo.src} className='sponsor-card'>
                                                                        <LazyLoadImage alt={logo.alt} src={logo.src} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )) : null}
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            )) : null}
        </div>
    )
}

export default Agenda;
