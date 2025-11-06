import { Container } from "react-bootstrap";

function About({locale}) {

    const about={
        english:`
            <div style='margin-top:1rem;margin-bottom:1rem'>The world is confronting multiple challenges including extreme climate change, social inequality, and digital transformation. The United Nations Environment Programme has identified 2025 as a pivotal year for the “Triple Planetary Crisis”—encompassing climate change, biodiversity loss, and the degradation of nature. Simultaneously, the rapid penetration of generative AI into finance, healthcare, education, and public governance presents a global imperative: establishingtrustworthy, verifiable, and inclusive AI development models that uphold human-centered principles, data security, and societal trust. This has become a critical international challenge demanding solutions.</div>
            <div style='margin-top:1rem;margin-bottom:1rem'>This forum aims to build consensus among industry, government, academia, and research sectors to provide effective policy recommendations for the nation. On one hand, it will explore trustworthy AI talent education policies with domestic and international representatives, focusing on constructing an AI ecosystem that integrates ethical, transparent, and sustainable values. Additionally, it seeks to explore how financial institutions can leverage innovative tools to effectively advance natural capital and sustainable development goals. This aims to create a new industry value chain oriented toward environmental sustainability, social inclusion, and transparent governance, thereby promoting finance for good and propelling enterprises and nations toward a net-zero and inclusive future.</div>
            <div style='margin-top:1rem;margin-bottom:1rem'>Now in its sixth iteration, this international forum serves not only as a platform for dialogue and action among global experts but also shoulders the critical mission of advancing responsible finance and inclusive AI principles across policy, industry practice, and educational outreach. We sincerely invite all to join us in elevating Taiwan&#39;s international visibility and academic influence in responsible finance and trustworthy AI applications and governance.</div>
        `,
        chinese:`
            <div style='margin-top:1rem;margin-bottom:1rem'>全球正面對極端氣候變遷、社會不平等與數位轉型等種種挑戰。聯合國環境規劃署指出2025年是氣候變遷、生物多樣性喪失、自然界破壞的「三重星球危機」（Triple Planetary Crisis）關鍵年。而當前全世界亦面臨生成式AI快速滲透至金融、醫療、教育及公共治理等領域，如何建立可被信任、可被驗證且具包容性的AI發展模式，使其符合人本精神、資料安全與社會信任，已成國際至為關鍵的懸找解方議題。</div>
            <div style='margin-top:1rem;margin-bottom:1rem'>本屆論壇希冀凝聚產官學研各界共識，提供國家有效的政策建言。一方面與海內外代表探討可信任人工智慧人才教育政策，並致力於如何建構兼具倫理、透明與永續價值的AI生態系方式。另方面更希望探索金融機構未來應如何善用創新工具，以利有效推動自然資本與永續發展目標實現，打造環境永續、社會包容與治理透明，促進金融向善的嶄新產業價值鏈導向，進而推動企業與國家共同邁向淨零與包容的未來。</div>
            <div style='margin-top:1rem;margin-bottom:1rem'>本次國際論壇已邁向第六屆籌辦，不僅係國內外專家對話與行動合作的平台，更是承擔促進責任金融發展及具包容性AI理念在政策、產業實務與教育推廣間的落實與深化重任。我們誠摯期待有志者一同與會，讓我們一起努力提高台灣於責任金融及可信任AI應用與治理領域的國際能見度及學術影響力。</div>
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