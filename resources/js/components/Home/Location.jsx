
function Location({locale}){
    const address={
        address:{
            chinese:'<div><strong>地址 : </strong> 台南市東區大學路1號(光復校區)</div>',
            english:'<div><strong>Address : </strong> No. 1, Daxue Rd., East Dist., Tainan City 701, Taiwan (R.O.C.) (Kuang-Fu Campus)</div>'
        },
        place:{
            chinese:'<div><strong>地點 : </strong> 管理學院地下1樓 62X05</div>',
            english:'<div><strong>Place : </strong> College of Management basement 62X05</div>'
        }
        
    }
    return(<div id="location" style={{paddingTop:'80px',paddingBottom:'80px'}}>
        <h1 className='my-3 text-center text-light'>{locale?'Location':'活動地點'}</h1>
        <div className='p-3 rounded bg-light container' style={{marginTop:'50px'}}>
            <div className='d-flex flex-row justify-content-between'>
                <div dangerouslySetInnerHTML={{__html:locale?address.address.english:address.address.chinese}} />
                <div dangerouslySetInnerHTML={{__html:locale?address.place.english:address.place.chinese}} />
            </div>
            <iframe className='mt-3 rounded' style={{border:"0",minWidth:'100%',minHeight:'510px'}} src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBZbzpTOW4PjiVK2xVlyBviQ_2IB2HQOmc&amp;q=place_id:ChIJEd5csJJ2bjQRFP1paiSDZbM&amp;zoom=18" allowFullScreen=""></iframe>
        </div>
    </div>)
}

export default Location;