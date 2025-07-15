import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Footer from '../Home/Footer';
import Menu from './Menu';

function Committee({locale}) {
    const [member,setMember]=useState(null)
    function getData(){
        fetch(`http://localhost:8001/api/data?locale=${locale}&year=2025`,{
            method:'GET',
        }).then(response=>{
            return response.json()
        }).then(res=>{
            setMember(res.data.committee)
        })
    }

    useEffect(()=>{
        getData()
    },[])
    
    if(!member) return(<></>)
    return (
        <div>
            <Menu />
            <div className="page-section py-3" id='content'>
                <Container style={{padding: '1rem 0'}} id='member'>
                    <h1 className='text-center pb-3'>{locale?'Committee':'籌備委員會'}</h1>
                    {member.map((item)=>(
                        <div key={item.id}>
                            <Row className='pt-3'>
                                <Col xs={12}><h2 className='py-3 text-center'>{item.name}</h2></Col>
                                {item.committee.map((element,i)=>(
                                    <Col lg={item.id==1 || item.id==2 || item.id==3 ?(12):3} key={i}>
                                        <MemberShip item={element} />
                                    </Col>
                                ))}
                            </Row>
                            <div style={{padding:'1rem 0'}}>
                                <Divider />
                            </div>
                        </div>
                    ))}
                </Container>
            </div>
            <Footer />
        </div>
    );
}

function MemberShip({item}){
    return(
        <div style={{position:'relative',marginTop:'150px'}}>
            <div className='d-flex justify-content-center'>
            <div className='rounded-circle text-center border' style={{backgroundColor:'white',height:'170px',width:'170px',overflow:"hidden",position:'absolute',zIndex:'1',bottom:'115px'}}>
                <Image className='member' src={item.src} alt={item.name} fluid />
            </div>
            <div className='bg-light' shaded bordered bodyFill style={{ display: 'inline-block', width: 300 }}>
                <p className='px-3 d-flex flex-column justify-content-center' style={{paddingTop:'40px',minHeight:'135px'}}>
                    <p className='text-center my-1'>{item.name}</p>
                    <small className='text-center text-muted'>{item.title}</small>
                </p>
            </div>
            </div>
        </div>
    )
}

export default Committee;
