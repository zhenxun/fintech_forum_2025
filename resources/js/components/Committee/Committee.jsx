import { Divider } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import Footer from '../Home/Footer';
import Menu from './Menu';

const committeePairingRules = [
    {
        key: 'chair',
        names: ['主席', '副主席'],
        label: {
            zh: '主席 / 副主席',
            en: 'Chairman / Vice-Chairman',
        },
    },
    {
        key: 'planner',
        names: ['總策畫', '總策畫副召集人'],
        label: {
            zh: '總策畫 / 總策畫副召集人',
            en: 'General Coordinator / Deputy Convener',
        },
    },
];

const prominentCommitteeIds = new Set([1, 2, 3]);

const getColumnProps = (group) => {
    if (group?.combinedKey) {
        return { xs: 12, md: 6, lg: 6 };
    }
    const baseLg = prominentCommitteeIds.has(Number(group?.id)) ? 12 : 3;
    return { xs: 12, lg: baseLg };
};

const buildCommitteeSections = (groups = [], locale) => {
    if (!Array.isArray(groups)) return [];
    const consumedIds = new Set();

    const sections = [];
    groups.forEach((group) => {
        if (!group || consumedIds.has(group.id)) return;

        const pairingRule = committeePairingRules.find((rule) =>
            rule.names.includes(group.name)
        );

        if (!pairingRule) {
            sections.push(group);
            consumedIds.add(group.id);
            return;
        }

        const pairedGroups = groups.filter(
            (candidate) => pairingRule.names.includes(candidate.name)
        );

        if (!pairedGroups.length) {
            sections.push(group);
            consumedIds.add(group.id);
            return;
        }

        pairedGroups.forEach((paired) => consumedIds.add(paired.id));

        sections.push({
            ...group,
            name: locale ? pairingRule.label.en : pairingRule.label.zh,
            committee: pairedGroups.flatMap((item) => item.committee || []),
            combinedKey: pairingRule.key,
        });
    });

    return sections;
};

function Committee({locale}) {
    const [member,setMember]=useState(null)
    function getData(){
        fetch(`https://admin.forum.hub-fintech-ncku.tw/api/data?locale=${locale}&year=2025`,{
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
    const committeeSections = useMemo(
        () => buildCommitteeSections(member, locale),
        [member, locale]
    );

    if(!committeeSections.length) return(<></>)
    return (
        <div>
            <Menu />
            <div className="page-section py-3" id='content'>
                <Container style={{padding: '1rem 0'}} id='member'>
                    <h1 className='text-center pb-3'>{locale?'Committee':'籌備委員會'}</h1>
                    {committeeSections.map((item)=>(
                        <div key={item.id}>
                            <Row className='pt-3'>
                                <Col xs={12}><h2 className='py-3 text-center'>{item.name}</h2></Col>
                                {item.committee?.map((element,i)=>(
                                    <Col key={i} {...getColumnProps(item)}>
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
            <div className='rounded-circle text-center border' style={{background: 'linear-gradient(180deg, #fdfdfd 0%, #f0f0f0 100%)',height:'170px',width:'170px',overflow:"hidden",position:'absolute',zIndex:'1',bottom:'115px'}}>
                <Image className='committee-member-image' src={item.src} alt={item.name} />
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
