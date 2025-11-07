import { Avatar, Button } from 'antd';
import { Container } from 'react-bootstrap';

function Session({agenda,locale}){
    
    return(<div id='session' className=' bg-dark' style={{padding: '6rem 0'}}>
        <Container className='text-dark py-3'>
            <div className='d-flex justify-content-center'>
                <div className='rounded' style={{width:'820px',height:'400px',background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',zIndex:0}} >
                    <h1 className='py-5 text-center text-light'>{locale?('Session Summary'):'議程摘要'}</h1>
                </div>
            </div>
            <Container className="rounded bg-light text-dark p-3" style={{maxWidth:'700px',marginTop:'-270px',position:'relative'}}>
                {agenda.map((item)=>(
                        <div key={item.id} className='p-3 m-3 border' style={{position:'relative',backgroundColor:'white'}}>
                            <p>{item.title}</p>
                            {item.speaker?(item.speaker.map((value)=>(
                                value.member.map((element)=>(
                                    <Avatar src={element.src} alt={element.chinese_name} key={element.id} />
                                ))
                            ))):null}
                            <div 
                                className="d-flex" 
                                    style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '-20px'
                                }}
                            >
                                <div className="px-3 py-2 text-light" style={{ background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)' }}>
                                    {item.time}
                                </div>
                            </div>
                        </div>
                    
                ))}
                <div className='text-center'>
                    <Button type='text' size={'large'} onClick={() => window.open("/agenda", "_blank")}>
                        查看更多
                    </Button>
                </div>
            </Container>
            {/* <TimeLine 
                locale={locale} 
                timeline={agenda} 
                date={locale?'Forum Date 2023/11/12 (Tuesday)':'論壇日期 2024/11/12 (星期二)'} 
                time={locale?'Forum Time 09:00 ~ 18:10':'論壇時間 09:00 ~ 18:10'} 
            /> */}
        </Container>
    </div>)
}

function TimeLine({timeline,date,time,id,locale}){
    return(
        <Container className="rounded bg-light text-dark p-3" style={{maxWidth:'700px',marginTop:'-270px',position:'relative'}}>
            <div style={{paddingTop:'40px',paddingLeft:'40px',paddingRight:'40px'}}>
                <h4>{date}</h4>
                <h4>{time}</h4>
            </div>
            {/* <Timeline style={{paddingTop:'10px',paddingBottom:'40px',paddingLeft:'40px',paddingRight:'40px'}}>
            {timeline.map((item,i)=>(
                <Timeline.Item key={i} style={{minHeight:'80px'}}>
                    <h6 className='text-muted'>{item.time}</h6>
                    <h5><span dangerouslySetInnerHTML={{__html:item.title}} /></h5>
                </Timeline.Item>
            ))}
            </Timeline> */}
            <div className="text-end my-3" id='application'>
                <Button className='nav-btn shadow border-0 px-3 text-light' size={'md'} style={{background:'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)'}} onClick={()=>window.location.href=`/agenda${locale?(`?locale=${locale}`):''}`}>{locale?(`More`):'查看更多'}</Button>
            </div>
        </Container>
    )
}

export default Session;
