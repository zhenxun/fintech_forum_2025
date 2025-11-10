import { Avatar, Button } from 'antd';
import { Container } from 'react-bootstrap';

const COMPACT_SESSION_TITLES = [
    '中場茶敘休息暨交流',
    '午餐餐敘交流',
];

const COMPACT_SESSION_KEYWORDS = [
    'tea break',
    'networking lunch',
    'lunch networking',
];

const cleanAgendaTitle = (title = '') => title.replace(/<[^>]*>/g, '').trim();

// Identify break-style agenda items so we can render a smaller time badge.
const shouldUseCompactBar = (title = '') => {
    const cleanedTitle = cleanAgendaTitle(title);
    if (!cleanedTitle) return false;
    if (COMPACT_SESSION_TITLES.includes(cleanedTitle)) {
        return true;
    }
    const lowered = cleanedTitle.toLowerCase();
    return COMPACT_SESSION_KEYWORDS.some((keyword) => lowered.includes(keyword));
};

function Session({agenda,locale}){
    
    return(<div id='session' className=' bg-dark' style={{padding: '6rem 0'}}>
        <Container className='text-dark py-3'>
            <div className='d-flex justify-content-center'>
                <div className='rounded' style={{width:'820px',height:'400px',background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',zIndex:0}} >
                    <h1 className='py-5 text-center text-light'>{locale?('Session Summary'):'議程摘要'}</h1>
                </div>
            </div>
            <Container className="rounded bg-light text-dark p-3" style={{maxWidth:'700px',marginTop:'-270px',position:'relative'}}>
                {agenda.map((item)=>{
                    const compactSession = shouldUseCompactBar(item.title);
                    const cardClasses = ['m-3','border','session-card'];
                    if (compactSession) {
                        cardClasses.push('session-card--compact');
                    }
                    const timeBarClasses = ['text-light','session-time-bar'];
                    if (compactSession) {
                        timeBarClasses.push('session-time-bar--compact');
                    }
                    return (
                        <div 
                            key={item.id} 
                            className={cardClasses.join(' ')} 
                            style={{
                                position:'relative',
                                background:compactSession
                                    ?'linear-gradient(135deg, rgba(255,249,242,0.98) 0%, rgba(247,249,255,0.98) 100%)'
                                    :'white',
                                padding:compactSession?'0.85rem 1rem':'1rem 1.25rem',
                                borderColor:compactSession?'#f3e0c7':'#dee2e6',
                                color:'#1f2937'
                            }}
                        >
                            <p className='mb-2' dangerouslySetInnerHTML={{__html:item.title}} />
                            {item.speaker?(item.speaker.map((value)=>(
                                value.member.map((element)=>(
                                    <Avatar src={element.src} alt={element.chinese_name} key={element.id} />
                                ))
                            ))):null}
                            <div 
                                className="d-flex session-time-wrapper"
                            >
                                <div className={timeBarClasses.join(' ')}>
                                    {item.time}
                                </div>
                            </div>
                        </div>
                    )
                })}
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
