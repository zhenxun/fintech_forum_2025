import { Col, Container, Row } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function KeySpeaker({locale,speaker}){
    return(<div id='keynote_speaker' style={{padding: '1rem 0'}}>
        <Container className='py-3'>
            <h1 className='py-5 text-center'>{locale?('Keynote Speaker'):'專題講者'}</h1>
            <Row className='team d-flex justify-content-center' style={{overflow:'hidden'}}>
            {speaker.length!==0?(speaker.map((item,i) => (
                <Col md={6} lg={3} key={i} >
                    <div className="team-member p-3 border shadow" style={{position:'relative'}}>
                        <div className="avatar">
                            <div className='member'>
                                <LazyLoadImage 
                                    effect="blur" 
                                    style={{ width: item.width?item.width:'100%', height: item.height?item.height:'100%' }} 
                                    src={item.src} 
                                    alt={item.name} 
                                />
                            </div>
                        </div>
                        <h4 className='mt-3'>{item.name}</h4>
                        <div className='d-flex justify-content-center p-2'>
                            <p style={{maxWidth:'230px'}} className="text-muted mb-3"><div dangerouslySetInnerHTML={{__html:item.title}} /></p>
                        </div>
                        <div 
                            className="d-flex" 
                            style={{
                                position: 'absolute',
                                bottom: '20px',
                                right: '-20px'
                            }}
                        >
                            <div className="px-3 py-2 text-dark" style={{ backgroundColor: 'gold' }}>
                                KEYNOTE
                            </div>
                        </div>

                    </div>
                </Col>
            ))):null}
            </Row>
        </Container>
    </div>)
}

export default KeySpeaker;