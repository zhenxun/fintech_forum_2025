import { Button, Card, Checkbox, Col, Descriptions, Divider, Form, Input, message, Radio, Row, Select, Space, Typography } from 'antd';
import { useState } from 'react';
import Menu from './Menu';
const { Title, Paragraph, Text, Link } = Typography;
const { TextArea } = Input;
function Register() {
    const [form] = Form.useForm();
    const emailValue=Form.useWatch('email', form)

    const [code,setCode]=useState('1111')
    const [countdown, setCountdown] = useState(0); // 倒计时秒数
    const [isDisabled,setIsDisabled]=useState(false)
    
    const onFinish = (values) => {
        let create_data=new FormData();
        create_data.append('name',values.name)
        create_data.append('email',values.email)
        create_data.append('company',values.company)
        create_data.append('sector',values.sector)
        create_data.append('job',values.job)
        create_data.append('phone',values.phone)
        create_data.append('year',2025)
        create_data.append('food',values.food)
        create_data.append('place',values.place)
        create_data.append('time',values.time)
        create_data.append('role',values.role) 
        create_data.append('isSfta',values.isSFTA)
        create_data.append('mark',values.mark)
        
        create(create_data)
    }
    function create(file){
      fetch('https://admin.forum.hub-fintech-ncku.tw/api/join.create',{
        method:'POST',
        body:file,
      }).then(response=>{
        return response.json()
      }).then(res=>{
        form.resetFields()
        setCode('1111')
        if(res.result){
          message.success(res.message)
        }else{
          message.error(res.message)
        }
      })
    }
    
    const onValidate = (email) => {        
        if(!email){
            message.error('請輸入電郵');            
        }else{
            let data=new FormData();
            data.append('email',email)
            sendValidate(data)
            setIsDisabled(true)
            setCountdown(10); // 设置倒计时为 60 秒
            const interval = setInterval(() => {
                setCountdown((prev) => {
                  if (prev <= 1) {
                    clearInterval(interval); // 倒计时结束，清除定时器
                    setIsDisabled(false)
                    return 0;
                  }
                    return prev - 1; // 每秒减 1
                });
              }, 1000);
        }
    };
    function sendValidate(file){
        fetch('https://admin.forum.hub-fintech-ncku.tw/api/mail.register',{method:'POST',body:file}
        ).then(response=>{
            return response.json()
        }).then(res=>{
            if(res.result){
                message.success('寄信成功，請至電郵收取驗證碼');
                setCode(res.code)
            }
        })
    }

    return (
        <>
        <Menu />
        <div className='container py-3' style={{maxWidth:'1200px'}}>
            <Card cover={<img alt="register banner" src="/assets/img/2025國際實務論壇海報FINAL_1101.jpg" />}>
                <h1>活動報名</h1>
                <Descriptions column={4} className='mb-3'>
                    <Descriptions.Item className='my-1' label='報名日期 ' span={4}>2025-11-04 (星期二) 凌晨00:00 ~ 2025-11-12 (星期三) 中午12:00 ，因本活動席次有限，故將採審核制確認報名資格，待審核通過後，將個別通知報名結果。</Descriptions.Item>
                    <Descriptions.Item className='my-1' label='報名結果通知 ' span={4}>2025-11-13 (星期四) 22:00前</Descriptions.Item>
                    <Descriptions.Item className='my-1' label='活動期間 ' span={4}>2025-11-18 (星期二)</Descriptions.Item>
                    <Descriptions.Item className='my-1' label='進行方式' span={4}>採「現場實體」進行，另提供線上直播方式參與。</Descriptions.Item>
                    <Descriptions.Item className='my-1' label='活動地點' span={4}>台南市東區大學路1號(成大光復校區) 管理學院地下1樓62X05國際演講廳。</Descriptions.Item>
                    <Descriptions.Item className='my-1' label='活動費用' span={4}>全程免費（感謝成功大學、國科會經費補助；更特別感謝各合辦機構提供各項人、物、資力的活動贊助支持）</Descriptions.Item>
                </Descriptions>
                <Form form={form} onFinish={onFinish} className='my-3' layout={'vertical'}>
                    <Row gutter={12}>
                        <Col xs={24} md={24} lg={24}>
                            <Form.Item name="role" rules={[{ required: true, message: '必填' }]} label="身份" >
                                <Radio.Group
                                    options={[
                                        { value: '本校教職員生', label: '本校教職員生' },
                                        { value: '校外嘉賓', label: '校外(產官學界)嘉賓' },
                                        { value: '活動人員', label: '活動服務人員' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={24}>
                            <Form.Item name="place" rules={[{ required: true, message: '必填' }]} label="預計參與方式" >
                                <Radio.Group
                                    options={[
                                        { value: '實體', label: '親自實體場次與會(採限額、審核制)' },
                                        { value: '線上', label: '線上參與' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={24}>
                            <Form.Item name="time"  rules={[{ required: true, message: '必填' }]} label="請選擇參加時段" >
                                <Radio.Group
                                    options={[
                                        { value: '全天', label: '全天場次 (09:00-18:10)' },
                                        { value: '上午', label: '上午場次 (09:00-12:30)' },
                                        { value: '下午', label: '下午場次 (14:00-18:10)' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={24}>
                            <Form.Item name="food"  rules={[{ required: true, message: '必填' }]} label="請選擇午餐餐盒種類(僅供親自實體參與者填寫)" >
                                <Radio.Group
                                    options={[
                                        { value: '葷', label: '葷食' },
                                        { value: '素', label: '素食' },
                                        { value: '無', label: '無須準備午餐' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={12}>
                        <Col xs={24} md={12} lg={12}>
                            <Form.Item rules={[{required:true,message:'必填'}]} name={'name'} label={'姓名'}>
                                <Input id='name' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <Form.Item rules={[{required:true,message:'必填'}]} className='px-1' name={'company'} label={'公司/學校'}>
                                <Input placeholder='例如：成功大學' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <Form.Item rules={[{required:true,message:'必填'}]} name={'sector'} label={'部門/系所'}>
                                <Input placeholder='例如：資工系' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <Form.Item rules={[{required:true,message:'必填'}]} name={'job'} label={'職稱'}>
                                <Input placeholder='例如：學生' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <Form.Item rules={[{required:true,message:'必填'}]} name={'phone'} label={'聯絡電話'}>
                                <Input placeholder='0912345678' />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <Form.Item rules={[{required:true,message:'必填'}]}  name={'isSFTA'} label={'是否為永續金融科技產學小聯盟會員代表'}>
                                <Select
                                    options={[
                                        { value: 0, label: '否' },
                                        { value: 1, label: '是' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={24}>
                            <Form.Item name={'mark'} label={'備註'}>
                                <TextArea showCount maxLength={100} placeholder="" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <Form.Item initialValue={emailValue} rules={[{required:true,message:'必填'}]} name="email" label="電郵" >
                                <Space.Compact block>
                                    <Input type='email' id='email' placeholder='student@example.com'/>
                                    <Button onClick={()=>onValidate(emailValue)} disabled={isDisabled}>{isDisabled ? `請稍候 (${countdown})` : "發送驗證碼"}</Button>
                                </Space.Compact>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={12}>
                            <Form.Item rules={[{required:true,validator: (_, value) =>value==code ? Promise.resolve() : Promise.reject(new Error('驗證碼不一致！')),}]} name="otp" label="驗證碼"><Input.OTP length={4} /></Form.Item>
                        </Col>
                    </Row>
                    <Form.Item initialValue={false} name="agree" className='my-5 text-center' rules={[{required:true,validator: (_, value) =>value==true ? Promise.resolve() : Promise.reject(new Error('必填')),}]}  valuePropName="checked" label="" >
                        <Checkbox id='agree' >本人已確認上述內容正確</Checkbox>
                    </Form.Item>
                    <Form.Item className="text-end">
                        <Button type="primary" block htmlType="submit">報名</Button>
                    </Form.Item>
                </Form>
                <div className='my-3'>
                    <Divider>注意事項</Divider>
                    <ol>
                        <li>本次活動全程免費，基於環安衛考量及席次有限，請各界嘉賓把握機會、報名從速，本活動主辦單位保留報名資格審核、活動議程異動之權利。</li>
                        <li>活動單位在收到您的申請報名資料後三天內(不含假日)，將寄發電郵驗證碼到您的指定報名信箱(務必留意您的垃圾信件匣)，以期確認您所填報資料並進行有效性驗證，此信函僅代表活動單位已經接獲報名資料，並非代表您已經成功獲得活動入場資格。</li>
                        <li>活動單位預計114-11-13 (星期四) 22:00前，將以電郵通知您關於<strong className='text-danger'>本次報名是否成功獲參與的最終結果確認函</strong>(電郵包含您的專屬入場資格Q-rcode)，若本活動報名踴躍以致席次不足、或其他環安衛考量，可能造成您報名失敗的遺珠之憾，關於活動報名若造成您的不便之處，望祈見諒！</li>
                        <li>國際實務論壇活動報名實體場次參與者，請於當天08:30 ~ 09:00報到時間，<strong className='text-danger'>務必持 (1)成功報名通知電郵函及入場Q-rcode報到、且 (2)足以識別是您本人的身分佐證證件</strong>，提示予會場報到處的服務人員核實身分，裨益順利完成報到程序。惟若因您攜帶資料或證件有缺漏者，將視為入場資格不符，請恕無法放行進入活動會場。</li>
                        <li>請報名實體場次的貴賓，與會前留意自身健康狀況，必要時請務必自行攜帶口罩入場，並建議您當日會場活動(除用餐時段以外)全程攜帶口罩，落實防程序以保障自身與他人公衛安全。</li>
                        <li>活動主辦單位保留相關講者、議程變動之權利。</li>
                        <li>活動諮詢專線： (06)2757575 # 53020 成功大學FinTech商創研究中心。</li>
                    </ol> 
                </div>
            </Card>
        </div>
        </>
    );
}

export default Register;
