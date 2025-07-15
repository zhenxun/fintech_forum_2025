import { Button, Form, Input, message, QRCode, Typography } from 'antd';
import { useState } from 'react';
import Menu from './Menu';

const { Title,Paragraph,Text} = Typography;
function Check() {
    const [join,setJoin]=useState(null)
    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();
    const onFinish = (values) => {
        let data=new FormData();
        data.append('email',values.email)
        data.append('name',values.name)
        getChecked(data)
    };

    function getChecked(file){
        fetch('http://localhost:8001/api/check.code',{
            method:'POST',
            body:file,
            headers: {
                'X-FP-API-KEY': 'iphone', //it can be iPhone or your any other attribute
            }
        }).then(response=>{
            return response.json()
        }).then(res=>{
            messageApi.success(res.message);
            if(res.result){
                setJoin(res.join)
                // setResult('有報名成功')
            }
            form.resetFields(['name','email']);
        })
    }

    return(
    <>
        <Menu />        
        <div className="my-5">
            <Typography className="container mt-5 p-5 border rounded">
            <div className='text-center mb-5'>
                {/* <img style={{maxHeight:'200px'}} src='https://sfta.ncku.org.tw/assets/logo/alliancelogo.webp' /> */}
                <Title className='d-flex align-items-center justify-content-center'>本次活動報名查詢</Title>
            </div>
            {contextHolder}
            
            <Form form={form} onFinish={onFinish} layout="horizontal" autoComplete="off">
                <Form.Item rules={[{required:true,message:'必填'}]} name="email" label="電郵">
                    <Input id='email' />
                </Form.Item>
                <Form.Item rules={[{required:true,message:'必填'}]} name="name" label="姓名">
                    <Input id='name' />
                </Form.Item>
                <Button className='my-3' size={'large'} type="primary" block htmlType={'submit'}>查詢</Button>
            </Form>
            
            </Typography>
            <Typography className="container mt-5 p-5 border rounded">
                <Title className='d-flex align-items-center justify-content-center'>查詢結果</Title>
                {join?(
                    <Paragraph className='m-3 p-3'>
                        <Text className='p-2'>報名序號 : {join.register_code}</Text>
                        <Text className='p-2'>報名結果 : {join.pass==1?'審核通過':join.pass==2?'審核不通過':'審核中'}</Text>
                        <Text className='p-2'>午餐餐盒 : {join.food}</Text>
                        <Text className='p-2'>參與時間 : {join.time}</Text>
                        <Text className='p-2'>參與方式 : {join.place}</Text>
                        <div><QRCode value={join.register_code} /></div>
                    </Paragraph>
                ):null}
            </Typography>
        </div>
    </>
    )
}

export default Check;