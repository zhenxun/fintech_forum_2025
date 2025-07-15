import { Container } from "react-bootstrap";

function About({locale}) {

    const about={
        english:`
            <div style='margin-top:1rem;margin-bottom:1rem'>Sustainable FinTech is an emerging and integrated application of financial innovation and sustainability initiatives, with core FinTech technologies including Artificial Intelligence (AI), Blockchain, Big Data Analytics, Cloud Computing, Data Mining, Machine Learning and Mobile Payments (ABCDM technologies). These core technologies have been widely applied in various financial services to provide customers with an innovative experience of future financial services, but the resulting security risks and disputes over compliance with laws and regulations continue to be a RegTech challenge that countries around the world need to confront.</div>
            <div style='margin-top:1rem;margin-bottom:1rem'>Sustainable development initiatives emphasize environmental friendliness, social responsibility and corporate governance obligations in addition to the pursuit of profits. Green finance and circular economy have become the new significant economic phenomenon. As financial frameworks or ESG financial investment products are introduced gradually, corporations are showing great willingness to invest in circular economy business models. Particularly, carbon reduction strategies in the industrial supply chain are increasingly being emphasized as they will not only affect the resilience of core businesses but also determine the competitiveness of products in the marketplace. We believe that it is a good time to address the issues in Sustainable FinTech and Green Supply Chain Management.</div>
        `,
        chinese:`
            <div style='margin-top:1rem;margin-bottom:1rem'>永續金融科技是金融創新和永續倡議領域的一個新興整合性應用主題。近年FinTech核心技術(含人工智慧、區塊鏈、大數據分析、雲端運算、資料探勘、機器學習及行動支付..等技術)已被廣泛地應用於各類金融場域，提供客戶體驗未來金融服務創新感受，隨之衍生的資安風險及法令遵循衝突爭議，持續成為全球各國亟需嚴正面對的RegTech挑戰。</div>
            <div style='margin-top:1rem;margin-bottom:1rem'>全球永續發展倡議強調負責任的企業不僅應追求利潤，更須承擔環境友善、社會責任與企業治理等公益義務。當前綠色金融與循環經濟已儼然成為全球最重要的新經濟顯學，隨著越來越多綠色金融框架或ESG金融投資商品問世，企業展現極高意願擬積極導入循環經濟商業模式的相關投資。尤其，產業供應鏈的減碳積極行動策略益發受到各界重視，除影響核心企業存續韌性更將決定其市場競爭力。</div>
            <div style='margin-top:1rem;margin-bottom:1rem'>最後，我們深信本次實務論壇活動舉辦的此時，將是最佳時刻與各界嘉賓傳遞與分享關於全球及我國金融科技、遵循科技與永續金融的共識凝聚平台機會，誠摯期待本活動提高台灣於永續金融科技領域的國際能見度及學術影響力。</div>
        `
    }
    return (
        <>
        <div id='vision' className='bg-light' style={{padding: '6rem 0', fontSize:'17pt'}}>
            <Container className='py-3'>
                <h1 className='my-3 text-center'>{locale?('Our Vision'):'活動願景'}</h1>
                <div style={{fontSize:"2cqh",textAlign:"justify"}}>
                    <div dangerouslySetInnerHTML={{__html:locale?(about.english):about.chinese}} />
                </div>
            </Container>
        </div>
        </>
    );
}

export default About;