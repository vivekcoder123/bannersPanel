var baseUrl="http://localhost/test/bannersPanel";
let browser=""; 
let ip="";
let current_ad_id="";
let website=location.hostname;
$(document).ready(function(){

    let userAgentString = navigator.userAgent;
    let chromeAgent = userAgentString.indexOf("Chrome") > -1;
    let firefoxAgent = userAgentString.indexOf("Firefox") > -1;
    let windows = navigator.appVersion.indexOf("Win")!=-1;
    let android = navigator.appVersion.indexOf("Android")!=-1;
    let macOS = navigator.appVersion.indexOf("Mac")!=-1;
    let safariAgent = userAgentString.indexOf("Safari") > -1;
    let iphone = navigator.appVersion.indexOf("like Mac") != -1;
    let operaAgent = userAgentString.indexOf("OP") > -1;         
    
    
    function detectDevice() {
    
        if ((chromeAgent) && (operaAgent))  
        chromeAgent = false;
    
        if ((chromeAgent) && (safariAgent))  
                    safariAgent = false;
    
        if(chromeAgent && windows) {  //chrome from windows
            browser = 'windows_chrome'
        } else if(chromeAgent && android) {  //chrome from android
            browser = 'android_chrome'
        } else if (firefoxAgent && windows) {  //firefox from windows
            browser = 'windows_firefox'
        } else if (firefoxAgent && android) {  // firefox from android
            browser = 'android_firefox'
        } else if (safariAgent && macOS) {  //safari from macOS
            browser = 'mac_safari'
        } else if (chromeAgent && macOS) { //chrome from macOS
            browser = 'mac_chrome'
        } else if (firefoxAgent && macOS) {  //firefox from macOS
            browser = 'mac_firefox'
        } else if(operaAgent && android) {
            browser = 'android_opera';
        } else if(operaAgent && windows) {
            browser = 'windows_opera'
        } else{
            browser = "not_defined"
        }
    
    }
    
    function gfg_Run() { 
        
        var iOS =  
            /iPad|iPhone|iPod/.test(navigator.userAgent) && 
            !window.MSStream; 
    
        
        if( iOS && chromeAgent) {
            browser ='iphone_chrome'
        }if ((chromeAgent) && (safariAgent))  
            safariAgent = false; 
        else if (iOS && firefoxAgent) {
            browser ='iphone_firefox'
        } else if(iOS && safariAgent) {
            browser ='iphone_safari'
        }
        
    } 
    
    detectDevice()
    
    gfg_Run();

    getIp();
    
      $('.popup').popover({
            placement : 'top',
            trigger : 'manual',
            html: true
      }).on('mouseenter', ()=>$(".popup").popover("show"));
    
        $('body').on('click', function (e) {
        $('.popup').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
                myFunction1();
            }
        });
    });
    });
    
    $(document).on("click",".popover",function(){
      $('.popup').each(function () {
                goTo1();
                $(this).popover('hide');
                myFunction1();
                $(this).popover('show');
            });
    });
    var url1="";

    async function getIp(){

        let ads_data=await $.ajax({
      
          url:`${baseUrl}/get_ip.php`
      
        }).then(response=>{
            ip=response;
            myFunction1();
        });
      }
      
      async function submit_tracking_data(int_type){
        return await $.ajax({
      
          url:`${baseUrl}/submit_tracking_data.php?ad_type=popover&interaction_type=${int_type}&website=${website}&ip_address=${ip}&ad_id=${current_ad_id}`
      
        });
      }
      
      async function getAdsData(ad_type){
      
        let ads_data=await $.ajax({
      
          url:`${baseUrl}/get_ads_data.php?ad_type=${ad_type}&browser=${browser}&ip_address=${ip}`
      
        });
        return ads_data;
      }
    
    function myFunction1() {
      
    
      /*
    
        In randomArray in each line , first one is image link , second one is title , third one is description and fourth one is link to open on click.
    
        [image url , title , description , link]
    
      */
    
     var get_ads_request=getAdsData("popover");
     get_ads_request.then(res=>{
       var ad_data=JSON.parse(res);
       url1=ad_data.link;
       current_ad_id=ad_data.id;
       var html=`<div class='htmlPopover'>
    
                <img src='${ad_data.image}'>
                <h5>${ad_data.title}</h5>
                <p >${ad_data.description}</p>
    <hr class='newhr'>
                <a class='btn btn-primary'>Read More</a>
                </div>`;
      $('.popup').attr("data-content",html);
       submit_tracking_data("view");
     });
    
    }
    
    function goTo1(){
        submit_tracking_data("click").then(data=>{

            window.open(url1,"_blank");
      
          }).catch(error=>{
      
            console.log('error',error);
      
          });
    }