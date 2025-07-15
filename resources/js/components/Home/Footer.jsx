import { Col, Row } from 'react-bootstrap';

function Footer() {
    return (
      <footer style={{backgroundColor:'#212529'}}>
        <Row className='p-1'> 
          <Col>
            <div className='text-light ps-2'>Copyright © 2025 Center for Innovative FinTech Business Models, NCKU. All rights reserved.</div>
          </Col>
          <Col className='text-end'>
            <a className="mx-2 text-light" href="https://conference.2023.hub-fintech-ncku.tw/privacy-policy">Privacy Policy</a>
            <a className='mx-2 text-light' href="https://conference.2023.hub-fintech-ncku.tw/terms-of-use">Terms of Service</a>
          </Col>
        </Row>
        {/* <a id='fixedbutton' href='#body' style={{maxWidth:"130px",maxHeight:"130px",transform:'scaleX(-1)'}}>
          <lottie-player src="https://lottie.host/af386e20-b360-4757-a913-be4bcad9d688/IIk0bcdJ6s.json"  background="transparent"  speed="1"  style={{maxWidth:"200px",maxHeight:"200px"}}  loop  autoplay></lottie-player>
        </a> */}
      </footer>
    );
}
export default Footer;