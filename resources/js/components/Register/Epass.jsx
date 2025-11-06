import { Button, Card, Divider, Form, Input, message, QRCode } from 'antd';
import { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import Menu from './Menu';

function Epass() {
    const cookie=new Cookies()
    const [messageApi, contextHolder] = message.useMessage();
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const [join,setJoin]=useState(null)
    const [side,setSide]=useState(false)
    const handleFlip=()=> {
        setSide(!side)
    }

    const [form] = Form.useForm();
    const onFinish = (values) => {
        let data=new FormData();
        data.append('register_code',values.code!==undefined?'REG'+values.code:undefined)
        data.append('name',values.name)
        data.append('email',values.email)
        getJoin(data)
    };

    function getJoin(file){
        fetch('https://admin.forum.hub-fintech-ncku.tw/api/check.code',{
            method:'POST',
            body:file,
        }).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                setJoin(res.join)
                messageApi.success(res.message);
                // setResult('有報名成功')
            }else{
                messageApi.error(res.message);
            }
            form.resetFields(['name','email']);
        })
    }

    useEffect(()=>{
        if(cookie.get('code')){
            let data=new FormData();
            data.append('register_code',cookie.get('code'))
            getJoin(data)
        }
    },[])

    const onRemove = () => {
        cookie.remove('code')
        location.reload()
    };

    if (!join) return(
    <>
    <Menu />
    <div style={{height:windowHeight*0.8,overflowX:'hidden',width:'100%'}} className='container'>
        <div className="card-container bg-white rounded p-3">
            <Divider orientation='left'>活動報名查詢</Divider>
            {contextHolder}
            <Form form={form} onFinish={onFinish} autoComplete="off" layout="vertical" id='joined'>
                <Form.Item name="email" label="電郵/Email">
                    <Input id='email' />
                </Form.Item>
                <Form.Item name="name" className='mt-2' label="姓名/Name">
                    <Input id='name' />
                </Form.Item>
                {/* <Divider className='mt-3'>或是</Divider>
                <Form.Item label="請輸入入場序號(英文字母後3碼)">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontWeight: 'bold', fontSize: 16 }}>SFTACK </div>
                        <Form.Item name="code" >
                            <Input.OTP inputMode={'numeric'} length={3} />
                        </Form.Item>
                    </div>
                </Form.Item> */}
                <Button className='my-3' size={'large'} type="primary" block htmlType={'submit'}>查詢</Button>
            </Form>
        </div>
    </div>
    </>)
    return (
        <div style={{height:windowHeight*0.8}} className="d-flex justify-content-center align-items-center m-2">
            <div className="card-container">
                <div className={`card flipped`}>
                    <div className="card-front">
                        <FrontCard item={join} onRemove={onRemove} />
                    </div>
                    <div className="card-back">
                        <BackCard item={join} onRemove={onRemove} logo={'https://sfta.ncku.org.tw/assets/logo/alliancelogo.webp'} />
                    </div>
                </div>
                {/* <div className={`card ${side ? 'flipped' : ''}`} onClick={handleFlip}>
                    <div className="card-front">
                        <FrontCard item={join} onRemove={onRemove} />
                    </div>
                    <div className="card-back">
                        <BackCard item={join} onRemove={onRemove} logo={'https://sfta.ncku.org.tw/assets/logo/alliancelogo.webp'} />
                    </div>
                </div> */}
                <div className='mt-3 text-end'>
                </div>
            </div>
        </div>
    );
}

function FrontCard({item,onRemove}){
    return(
        <div>
            <Card
                style={{
                    margin: 0,
                    padding: 0,
                    border: "none",
                    height: "600px",
                    width: "400px",
                    backgroundImage: 'url("/poster/金質獎識別證模版.png")',
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                }}
                className="rounded position-relative"
                >
                <div style={{
                    position: "absolute",
                    bottom: "80px",
                    left: 0,
                    width: "100%",
                    paddingInline: "16px"
                }}>
                    <div style={{ height: "320px"}} className='rounded-top d-flex justify-content-center align-items-center'>
                        <QRCode size={300} value={JSON.stringify(item.register_code)} />
                    </div>
                    {/* 第一行：靠左 */}
                    <div style={{ textAlign: "center", fontSize: "14pt", marginBottom: "8px" }}>
                    {item.company}-{item.job}
                    </div>

                    {/* 第二行：置中 */}
                    <div style={{ textAlign: "center", fontSize: "24pt", fontWeight: "bold", marginBottom: "8px" }}>
                    {item.name}
                    </div>

                    {/* 第三行：靠右 */}
                    <div style={{ textAlign: "right", marginBottom: "8px" }}>
                    No. {item.register_code}
                    </div>
                </div>
                <div className='position-absolute bottom-0 end-0 m-3'>
                    <Button onClick={()=>onRemove()}>登出</Button>
                </div>
            </Card>
        </div>
    )
}

function BackCard({item,logo,onRemove}){
    // var isPass=true
    // var isFood=true
    return(
        <div>
            <Card style={{ height: "600px",maxWidth:'400px',margin:0,padding:0,border: 'none'}} className='rounded position-relative'>
                
                <div className='d-flex justify-content-center my-3'>
                    <QRCode size={300} value={JSON.stringify(item.register_code)} />
                </div>
                <div className='position-absolute bottom-0 start-0 m-3 text-muted'>
                    <div>姓名：{item.name}</div>
                    <div>序號：{item.register_code}</div>
                    <div>地點：光復校區 管理學院地下1樓 62X05</div>
                    <div>參與方法：{item.place}</div>
                    <div>餐盒類型：{item.food}</div>
                    <div>參與時間：{item.time}</div>
                    <div>報到時間：{item.joined}</div>
                    <div>簽退時間：{item.exited}</div>
                </div>
                <div className='position-absolute bottom-0 end-0 m-3'>
                    <Button onClick={()=>onRemove()}>登出</Button>
                </div>
            </Card>
        </div>
    )
}

export default Epass;