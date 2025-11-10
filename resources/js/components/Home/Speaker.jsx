import { Col, Container, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function Speaker({locale,speaker}){
    
    return(<div id='speaker' className='bg-light' style={{padding: '1rem 0'}}>
        <div className='py-3'>
            <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <h1 className='py-5 text-center'>{locale?('Speakers'):'出席嘉賓'}</h1>
                <h6>{!locale?(<div style={{display:"flex", alignItems:"flex-end"}} className='text-muted'>(依場次先後排序)</div>):null}</h6>
            </div>
            <Container>
            <Row className='team' style={{overflow:'hidden'}}>
            {speaker.length!==0?(speaker.map((item,i) => (
                <Col md={6} lg={3} key={i} className=''>
                    <div className="team-member p-3 border shadow">
                        <div className="avatar">
                            <div className='member'>
                                <LazyLoadImage 
                                    effect="blur" 
                                    style={{
                                        width: item.width ? item.width : '100%',
                                        height: item.height ? item.height : '100%',
                                        borderRadius: 10,
                                        objectFit: 'cover'
                                    }} 
                                    src={item.src} 
                                    alt={item.name} 
                                />
                            </div>
                        </div>
                        <h4 className='mt-3'>{item.name}</h4>
                        <div className='d-flex justify-content-center p-2'>
                            <p style={{maxWidth:'230px'}} className="text-muted mb-3"><div dangerouslySetInnerHTML={{__html:item.title}} /></p>
                        </div>
                    </div>
                </Col>
            ))):null}
            </Row>

            </Container>
        </div>
    </div>)
}

export default Speaker;