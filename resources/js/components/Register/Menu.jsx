import { Button, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function Menu(){
    const searchParams = new URLSearchParams(document.location.search);
    const locale=searchParams.get("locale")

    const link=[
        {
            chinese_name:'首頁',
            english_name:'Home',
            href:locale!==null?(`/?locale=${locale}`):'/'
        }
    ]

    const toggle=(value)=>{
        setTimeout(() => {
            if(value){
                window.location.href=window.location.pathname+'?locale=en'
            }else{
                window.location.href=window.location.pathname
            } 
        }, 800);        
    }

    return(
        <Navbar sticky="top" id='menu' style={{backgroundColor:'#212529',zIndex:999}} expand="lg" variant='dark' className="px-3">
            <Navbar.Brand href={locale!==null?(`/?locale=${locale}`):'/'}>
                <img style={{maxHeight:'100px',maxWidth:'100px'}} src='https://forum.2023.hub-fintech-ncku.tw/assets/partner/new-fintech-logo.png' alt='fintech logo' />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {link?(<Nav style={{fontSize:'12pt'}} className="justify-content-end flex-grow-1 pe-3 align-items-center">
                    {link.map((item,i)=>(
                        <Nav.Link key={i} className='nav-btn' href={locale!==null?(`?locale=${locale}`+item.href):item.href}>{locale?(item.english_name):item.chinese_name}</Nav.Link>
                    ))}
                    <NavDropdown title={locale!==null?("Other"):"相關連結"} id="nav-dropdown">
                        <NavDropdown.Item href='https://annual-event.hub-fintech-ncku.tw'>{locale!==null?('2024 Annual Event'):'2024 國際年會'}</NavDropdown.Item>
                        <NavDropdown.Item href='https://conference.2024.hub-fintech-ncku.tw'>{locale!==null?('2024 ESGFT Conference'):'2024 學術研討會'}</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href={`/register${locale?(`?locale=${locale}`):''}`} id='registry'>
                        <Button className='nav-btn border-0' style={{backgroundColor:'#2F58CD'}}>{locale!=null?('Register Now'):'按此報名'}</Button>
                    </Nav.Link>
                    <Nav.Link href={`/check${locale?(`?locale=${locale}`):''}`} id='registry'>
                        <Button className='nav-btn border-0' style={{backgroundColor:'#3ccd2fff'}}>{locale!=null?('Check Result'):'報名結果查詢'}</Button>
                    </Nav.Link>
                    <Nav.Link onClick={()=>toggle(false)}>中</Nav.Link><span className='text-light'>｜</span><Nav.Link onClick={()=>toggle(true)}>En</Nav.Link>
                </Nav>):null}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu;