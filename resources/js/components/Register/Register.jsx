import { Button, Card, Checkbox, Col, Descriptions, Divider, Form, Input, message, Radio, Row, Select, Space, Typography } from 'antd';
import { useState } from 'react';
import Menu from './Menu';

const { Title, Paragraph, Text, Link } = Typography;
const { TextArea } = Input;

const optionTemplates = {
    role: [
        { key: 'ncku', value: '本校教職員生' },
        { key: 'guest', value: '校外嘉賓' },
        { key: 'staff', value: '活動人員' },
    ],
    place: [
        { key: 'onsite', value: '實體' },
        { key: 'online', value: '線上' },
    ],
    time: [
        { key: 'full', value: '全天' },
        { key: 'morning', value: '上午' },
        { key: 'afternoon', value: '下午' },
    ],
    food: [
        { key: 'meat', value: '葷' },
        { key: 'vegetarian', value: '素' },
        { key: 'none', value: '無' },
    ],
    sfta: [
        { key: 'no', value: 0 },
        { key: 'yes', value: 1 },
    ],
};

const translations = {
    zhTW: {
        pageTitle: '活動報名',
        descriptions: [
            {
                label: '報名日期',
                content: '2025-11-04 (星期二) 凌晨00:00 ~ 2025-11-12 (星期三) 中午12:00 ，因本活動席次有限，故將採審核制確認報名資格，待審核通過後，將個別通知報名結果。',
            },
            {
                label: '報名結果通知',
                content: '2025-11-13 (星期四) 22:00前',
            },
            {
                label: '活動期間',
                content: '2025-11-18 (星期二)',
            },
            {
                label: '進行方式',
                content: '採「現場實體」進行，另提供線上直播方式參與。',
            },
            {
                label: '活動地點',
                content: '台南市東區大學路1號(成大光復校區) 管理學院地下1樓62X05國際演講廳。',
            },
            {
                label: '活動費用',
                content: '全程免費（感謝成功大學、國科會經費補助；更特別感謝各合辦機構提供各項人、物、資力的活動贊助支持）',
            },
        ],
        labels: {
            role: '身份',
            place: '預計參與方式',
            time: '請選擇參加時段',
            food: '請選擇午餐餐盒種類(僅供親自實體參與者填寫)',
            name: '姓名',
            company: '公司/學校',
            sector: '部門/系所',
            job: '職稱',
            phone: '聯絡電話',
            isSFTA: '是否為永續金融科技產學小聯盟會員代表',
            mark: '備註',
            email: '電郵',
            otp: '驗證碼',
        },
        placeholders: {
            company: '例如：成功大學',
            sector: '例如：資工系',
            job: '例如：學生',
            phone: '0912345678',
        },
        options: {
            role: {
                ncku: '本校教職員生',
                guest: '校外(產官學界)嘉賓',
                staff: '活動服務人員',
            },
            place: {
                onsite: '親自實體場次與會(採限額、審核制)',
                online: '線上參與',
            },
            time: {
                full: '全天場次 (09:00-18:10)',
                morning: '上午場次 (09:00-12:30)',
                afternoon: '下午場次 (14:00-18:10)',
            },
            food: {
                meat: '葷食',
                vegetarian: '素食',
                none: '無須準備午餐',
            },
            sfta: {
                no: '否',
                yes: '是',
            },
        },
        email: {
            sendCode: '發送驗證碼',
            waiting: '請稍候',
        },
        checkbox: '本人已確認上述內容正確',
        submit: '報名',
        divider: '注意事項',
        notes: [
            <>本次活動全程免費，基於環安衛考量及席次有限，請各界嘉賓把握機會盡速報名，主辦單位保留報名資格審核及活動議程異動之權利。</>,
            <>活動單位在收到您的申請資料後三天內(不含假日)，將寄發電郵驗證碼到您的指定信箱(務必留意垃圾信件匣)，以確認您所填報資料的有效性；此信函僅表示已接獲報名資料，並非代表您已獲得入場資格。</>,
            <>活動單位預計114-11-13 (星期四) 22:00前，以電郵通知您<strong className='text-danger'>本次報名是否成功的最終結果確認函</strong>（信件內含專屬入場 Qrcode）。若報名踴躍或因環安衛考量致席次不足，敬請見諒。</>,
            <>報名實體場次者，請於當天 08:30 ~ 09:00 報到時間，<strong className='text-danger'>務必攜帶 (1) 成功報名通知電郵及入場 Qrcode，與 (2) 可識別身分的證件</strong>供現場服務人員核對，缺件者將視為資格不符。</>,
            <>實體場次貴賓請留意自身健康狀況，必要時自行攜帶口罩，除用餐外建議全程配戴，以保障彼此健康。</>,
            <>活動主辦單位保留相關講者及議程變動之權利。</>,
            <>活動諮詢專線：(06)2757575 #53020 成功大學 FinTech 商創研究中心。</>,
        ],
        messages: {
            required: '必填',
            emptyEmail: '請輸入電郵',
            sendSuccess: '寄信成功，請至電郵收取驗證碼',
            otpMismatch: '驗證碼不一致！',
        },
    },
    en: {
        pageTitle: 'Event Registration',
        descriptions: [
            {
                label: 'Registration Window',
                content: '00:00 Tue, Nov 4, 2025 ~ 12:00 Wed, Nov 12, 2025. Seats are limited, so registrations will be reviewed and approved individually.',
            },
            {
                label: 'Result Notification',
                content: 'By 22:00 Thu, Nov 13, 2025.',
            },
            {
                label: 'Event Date',
                content: 'Tue, Nov 18, 2025.',
            },
            {
                label: 'Format',
                content: 'On-site conference with livestream option.',
            },
            {
                label: 'Venue',
                content: 'B1, College of Management, NCKU Kuang-Fu Campus (No. 1, University Rd., East Dist., Tainan).',
            },
            {
                label: 'Fee',
                content: 'Free of charge (supported by NCKU, NSTC, and partner organizations).',
            },
        ],
        labels: {
            role: 'Role',
            place: 'Preferred Participation Mode',
            time: 'Select Time Slot',
            food: 'Lunch Preference (on-site attendees only)',
            name: 'Full Name',
            company: 'Company / School',
            sector: 'Department / Program',
            job: 'Job Title',
            phone: 'Phone Number',
            isSFTA: 'Member of the Sustainable FinTech Alliance?',
            mark: 'Notes',
            email: 'Email',
            otp: 'Verification Code',
        },
        placeholders: {
            company: 'e.g., National Cheng Kung University',
            sector: 'e.g., Department of Computer Science',
            job: 'e.g., Student',
            phone: 'e.g., 0912345678',
        },
        options: {
            role: {
                ncku: 'NCKU faculty / student',
                guest: 'External guest (industry / government / academia)',
                staff: 'Event staff',
            },
            place: {
                onsite: 'On-site participation (limited seats, subject to review)',
                online: 'Online participation',
            },
            time: {
                full: 'Full day (09:00-18:10)',
                morning: 'Morning session (09:00-12:30)',
                afternoon: 'Afternoon session (14:00-18:10)',
            },
            food: {
                meat: 'Meat-based lunch',
                vegetarian: 'Vegetarian lunch',
                none: 'No lunch needed',
            },
            sfta: {
                no: 'No',
                yes: 'Yes',
            },
        },
        email: {
            sendCode: 'Send OTP',
            waiting: 'Please wait',
        },
        checkbox: 'I confirm the above information is correct.',
        submit: 'Submit',
        divider: 'Important Notes',
        notes: [
            <>The forum is free to attend. Due to safety requirements and limited seats, please register early. The organizer reserves the right to review eligibility and adjust the agenda.</>,
            <>Within three business days after receiving your registration (excluding holidays), you will receive a verification email (check your spam folder). This email only confirms receipt of your data and is not an admission guarantee.</>,
            <>By Thu, Nov 13, 2025 at 22:00, we will email you a <strong className='text-danger'>final confirmation letter regarding your admission status</strong> (including your personal entry QR code). Should seats be unavailable due to high demand or safety limits, we appreciate your understanding.</>,
            <>On-site attendees must check in between 08:30 and 09:00 with <strong className='text-danger'>(1) the successful registration email and QR code, and (2) personal identification</strong> for verification. Missing documents may result in denied entry.</>,
            <>Please monitor your health before attending on-site. Bring your own mask if needed and consider wearing it throughout the event (except during meals) to protect yourself and others.</>,
            <>The organizer reserves the right to adjust speakers and sessions.</>,
            <>For inquiries, please call +886-6-2757575 #53020 (NCKU FinTech Innovation Center).</>,
        ],
        messages: {
            required: 'Required',
            emptyEmail: 'Please enter your email',
            sendSuccess: 'Verification email sent. Please check your inbox.',
            otpMismatch: 'Verification code mismatch!',
        },
    },
};

function Register({ locale }) {
    const [form] = Form.useForm();
    const emailValue = Form.useWatch('email', form);

    const [code, setCode] = useState('1111');
    const [countdown, setCountdown] = useState(0); // 倒计时秒数
    const [isDisabled, setIsDisabled] = useState(false);

    const urlLocale = new URLSearchParams(window.location.search).get('locale');
    const currentLocale = (locale || urlLocale) === 'en' ? 'en' : 'zhTW';
    const t = translations[currentLocale];

    console.log('Current Locale:', currentLocale);

    const mapOptions = (type) =>
        optionTemplates[type].map((option) => ({
            value: option.value,
            label: t.options[type][option.key],
        }));

    const roleOptions = mapOptions('role');
    const placeOptions = mapOptions('place');
    const timeOptions = mapOptions('time');
    const foodOptions = mapOptions('food');
    const sftaOptions = mapOptions('sfta');

    const onFinish = (values) => {
        const createData = new FormData();
        createData.append('name', values.name);
        createData.append('email', values.email);
        createData.append('company', values.company);
        createData.append('sector', values.sector);
        createData.append('job', values.job);
        createData.append('phone', values.phone);
        createData.append('year', 2025);
        createData.append('food', values.food);
        createData.append('place', values.place);
        createData.append('time', values.time);
        createData.append('role', values.role);
        createData.append('isSfta', values.isSFTA);
        createData.append('mark', values.mark);

        create(createData);
    };

    function create(file) {
        fetch('https://admin.forum.hub-fintech-ncku.tw/api/join.create', {
            method: 'POST',
            body: file,
        })
            .then((response) => response.json())
            .then((res) => {
                form.resetFields();
                setCode('1111');
                if (res.result) {
                    message.success(res.message);
                } else {
                    message.error(res.message);
                }
            });
    }

    const onValidate = (email) => {
        if (!email) {
            message.error(t.messages.emptyEmail);
        } else {
            const data = new FormData();
            data.append('email', email);
            sendValidate(data);
            setIsDisabled(true);
            setCountdown(10); // Set countdown to 10 seconds
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsDisabled(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    function sendValidate(file) {
        fetch('https://admin.forum.hub-fintech-ncku.tw/api/mail.register', { method: 'POST', body: file })
            .then((response) => response.json())
            .then((res) => {
                if (res.result) {
                    message.success(t.messages.sendSuccess);
                    setCode(res.code);
                }
            });
    }

    return (
        <>
            <Menu />
            <div className='container py-3' style={{ maxWidth: '1200px' }}>
                <Card cover={<img alt="register banner" src="/assets/img/2025國際實務論壇海報FINAL_1101.jpg" />}>
                    <h1>{t.pageTitle}</h1>
                    <Descriptions column={4} className='mb-3'>
                        {t.descriptions.map((item) => (
                            <Descriptions.Item key={item.label} className='my-1' label={item.label} span={4}>
                                {item.content}
                            </Descriptions.Item>
                        ))}
                    </Descriptions>
                    <Form form={form} onFinish={onFinish} className='my-3' layout='vertical'>
                        <Row gutter={12}>
                            <Col xs={24} md={24} lg={24}>
                                <Form.Item name='role' rules={[{ required: true, message: t.messages.required }]} label={t.labels.role}>
                                    <Radio.Group options={roleOptions} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                <Form.Item name='place' rules={[{ required: true, message: t.messages.required }]} label={t.labels.place}>
                                    <Radio.Group options={placeOptions} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                <Form.Item name='time' rules={[{ required: true, message: t.messages.required }]} label={t.labels.time}>
                                    <Radio.Group options={timeOptions} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                <Form.Item name='food' rules={[{ required: true, message: t.messages.required }]} label={t.labels.food}>
                                    <Radio.Group options={foodOptions} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={12}>
                            <Col xs={24} md={12} lg={12}>
                                <Form.Item rules={[{ required: true, message: t.messages.required }]} name='name' label={t.labels.name}>
                                    <Input id='name' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <Form.Item rules={[{ required: true, message: t.messages.required }]} className='px-1' name='company' label={t.labels.company}>
                                    <Input placeholder={t.placeholders.company} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <Form.Item rules={[{ required: true, message: t.messages.required }]} name='sector' label={t.labels.sector}>
                                    <Input placeholder={t.placeholders.sector} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <Form.Item rules={[{ required: true, message: t.messages.required }]} name='job' label={t.labels.job}>
                                    <Input placeholder={t.placeholders.job} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <Form.Item rules={[{ required: true, message: t.messages.required }]} name='phone' label={t.labels.phone}>
                                    <Input placeholder={t.placeholders.phone} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <Form.Item rules={[{ required: true, message: t.messages.required }]} name='isSFTA' label={t.labels.isSFTA}>
                                    <Select options={sftaOptions} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={24} lg={24}>
                                <Form.Item name='mark' label={t.labels.mark}>
                                    <TextArea showCount maxLength={100} placeholder='' />
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <Form.Item initialValue={emailValue} rules={[{ required: true, message: t.messages.required }]} name='email' label={t.labels.email}>
                                    <Space.Compact block>
                                        <Input type='email' id='email' placeholder='student@example.com' />
                                        <Button onClick={() => onValidate(emailValue)} disabled={isDisabled}>
                                            {isDisabled ? `${t.email.waiting} (${countdown})` : t.email.sendCode}
                                        </Button>
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                            <Col xs={24} md={12} lg={12}>
                                <Form.Item
                                    rules={[
                                        {
                                            required: true,
                                            validator: (_, value) =>
                                                value === code ? Promise.resolve() : Promise.reject(new Error(t.messages.otpMismatch)),
                                        },
                                    ]}
                                    name='otp'
                                    label={t.labels.otp}
                                >
                                    <Input.OTP length={4} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            initialValue={false}
                            name='agree'
                            className='my-5 text-center'
                            rules={[
                                {
                                    required: true,
                                    validator: (_, value) =>
                                        value === true ? Promise.resolve() : Promise.reject(new Error(t.messages.required)),
                                },
                            ]}
                            valuePropName='checked'
                            label=''
                        >
                            <Checkbox id='agree'>{t.checkbox}</Checkbox>
                        </Form.Item>
                        <Form.Item className='text-end'>
                            <Button type='primary' block htmlType='submit'>
                                {t.submit}
                            </Button>
                        </Form.Item>
                    </Form>
                    <div className='my-3'>
                        <Divider>{t.divider}</Divider>
                        <ol>
                            {t.notes.map((note, index) => (
                                <li key={index}>{note}</li>
                            ))}
                        </ol>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Register;
