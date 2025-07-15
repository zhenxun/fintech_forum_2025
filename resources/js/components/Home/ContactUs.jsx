import { Col, Image, Row } from "react-bootstrap";

function ContactUs({locale}){
    const data=[
        {
            id:1,
            img:"https://img.icons8.com/?size=100&id=53373&format=png&color=000000",
            chinese_name:'主辦單位',
            english_name:'Organizer',
            chinese_content:'國立成功大學 FinTech 商創研究中心',
            english_content:'Center for Innovative FinTech Business Models, National Cheng Kung University'
        },{
            id:2,
            img:"https://img.icons8.com/?size=100&id=53383&format=png&color=000000",
            chinese_name:'地   址',
            english_name:'Address',
            chinese_content:'701 台南市東區大學路一號(光復校區)雲平大樓東棟6樓 27602 室',
            english_content:'6F (27602), East Block, Yun-diving Building, Kuang-Fu Camdivus No.1, Daxue Rd., East Dist., Tainan City'
        },{
            id:3,
            img:"https://img.icons8.com/?size=100&id=12580&format=png&color=000000",
            chinese_name:'電子郵件',
            english_name:'E-Mail',
            chinese_content:'nckufintech2023@gmail.com',
            english_content:'nckufintech2023@gmail.com'
        },{
            id:4,
            img:"https://img.icons8.com/?size=100&id=9659&format=png&color=000000",
            chinese_name:'聯繫電話',
            english_name:'TEL',
            chinese_content:'06-2757575 #53020',
            english_content:'06-2757575 Ext.53020'
        },
    ]
    return(<div className='text-light' id="contact" style={{backgroundColor:'#212529',paddingTop:'80px',paddingBottom:'80px'}}>
        <div className="container">
            <div className="text-center">
                <h1 className="section-heading text-uppercase">{locale?'Contact Us':'聯絡我們'}</h1>
            </div>
            <div className="text-start container">
                <Row className="mt-4">
                    {data.map((item)=>(
                        <Col className="py-2" key={item.id} style={{minHeight:'170px'}}>
                            <div className="text-center border bg-light text-dark rounded p-3" style={{height:'100%'}}>
                                <Image className="m-2" src={item.img} style={{maxHeight:'40px'}} /> 
                                <h5>{locale?item.english_name:item.chinese_name}</h5>
                                <span className="mx-2"><div dangerouslySetInnerHTML={{__html:locale?item.english_content:item.chinese_content}} /></span>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    </div>)
}

export default ContactUs;