import { Col, Image, Row } from "react-bootstrap";

function Organizers({locale}) {

    return (
        <div id='organizers' className="container" style={{padding: '4rem 0',backgroundColor:'rgba(255,255,255,0)'}}>
            <h1 className='py-5 text-center'>{locale?'Curator':'策辦單位'}</h1>
            <h2 className="text-center pt-5 pb-3" style={{fontWeight:'bold'}}>{locale?'Directed by':'指導單位'}</h2>
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'400px'}} alt="國立成功大學" src='/assets/logo/ncku.png' fluid/>
                    </div>
                </Col>
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'400px'}} alt="國家科學及技術委員會" src='/assets/logo/nstc.jpg' fluid/>
                    </div>
                </Col>
            </Row>
            <h2 className="text-center pt-5 pb-3" style={{fontWeight:'bold'}}>{locale?'Organizer':'主辦單位'}</h2>
            <Row className="d-flex justify-content-center align-items-center">
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'320px'}} alt="成功大學FinTech商創研究中心" src='/assets/logo/fintech.png' fluid/>
                    </div>
                </Col>
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image alt="永續金融科技產學小聯盟" src='/assets/logo/sfta.png' fluid/>
                    </div>
                </Col>
            </Row>
            <h2 className="text-center pt-5 pb-3" style={{fontWeight:'bold'}}>{locale?'Co-Organizer':'合辦單位(依筆畫順序列之)'}</h2>
            <Row className="d-flex justify-content-start align-items-center">
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'320px'}} alt="上海商業儲蓄銀行" src='/assets/partner/上海銀行.png' fluid/>
                    </div>
                </Col>
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'320px'}} alt="中租控股股份有限公司" src='/assets/partner/中租.png' fluid/>
                    </div>
                </Col>
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxHeight:'60px'}} alt="兆豐金融控股公司" src='/assets/partner/兆豐金融控股.svg' fluid/>
                    </div>
                </Col>
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'320px'}} alt="京城商業銀行" src='/assets/partner/京城銀行.png' fluid/>
                    </div>
                </Col>
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'320px'}} alt="南山人壽保險股份有限公司" src='/assets/partner/南山.png' fluid/>
                    </div>
                </Col>
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'320px'}} alt="康和證券集團" src='/assets/partner/康和證券.png' fluid/>
                    </div>
                </Col>
                <Col className="p-2" xs={12} xl={3}>
                    <div className='d-flex align-items-center justify-content-center' style={{height:'200px'}}>
                        <Image style={{maxWidth:'320px'}} alt="成功大學管理學院" src='/assets/partner/成功大學管理學院.png' fluid/>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default Organizers;