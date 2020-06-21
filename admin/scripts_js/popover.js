var popoverCss = document.createElement('link'); 
popoverCss.rel="stylesheet";
popoverCss.type="text/css";
// popoverCss.href="https://dlmonitize.com/admin/scripts_css/popover.css";
popoverCss.href="http://localhost/test/bannersPanel/admin/scripts_css/popover.css";
document.head.appendChild(popoverCss);
if(typeof jQueryScript=="undefined"){
    var jQueryScript = document.createElement('script');  
    jQueryScript.setAttribute('src','https://code.jquery.com/jquery-3.5.1.min.js');
    jQueryScript.async=false;
    document.head.appendChild(jQueryScript);
    var jqueryUiScript=document.createElement('script');
    jqueryUiScript.setAttribute('src','https://code.jquery.com/ui/1.12.0/jquery-ui.min.js');
    jqueryUiScript.async=false;
    document.head.appendChild(jqueryUiScript);
  }
  if(typeof Popper=="undefined"){
    var popperScript = document.createElement('script');
    popperScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js');
    popperScript.async=false;
    document.head.appendChild(popperScript);
  }
  if(typeof argonCss=="undefined"){
    var argonCss = document.createElement('link'); 
    argonCss.rel="stylesheet";
    argonCss.type="text/css";
    argonCss.href="https://dlmonitize.com/admin/scripts_css/argon.css";
    document.head.prepend(argonCss);
  }
  if(typeof bootstrapCss=="undefined"){
    var bootstrapCss = document.createElement('link'); 
    bootstrapCss.rel="stylesheet";
    bootstrapCss.type="text/css";
    bootstrapCss.href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    document.head.prepend(bootstrapCss);
    var bootstrapScript = document.createElement('script');  
    bootstrapScript.setAttribute('src','https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js');
    bootstrapScript.async=false;
    document.head.appendChild(bootstrapScript);
  }
  if(typeof fontAwesome=="undefined"){
    var fontAwesome = document.createElement('link'); 
    fontAwesome.rel="stylesheet";
    fontAwesome.type="text/css";
    fontAwesome.href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css";
    document.head.appendChild(fontAwesome);
  }
var baseUrl="https://dlmonitize.com";
var browser=""; 
var ip="";
var current_ad_id_p="";
var website=location.hostname;

    setTimeout(function(){

        var userAgentString = navigator.userAgent;
    var chromeAgent = userAgentString.indexOf("Chrome") > -1;
    var firefoxAgent = userAgentString.indexOf("Firefox") > -1;
    var windows = navigator.appVersion.indexOf("Win")!=-1;
    var android = navigator.appVersion.indexOf("Android")!=-1;
    var macOS = navigator.appVersion.indexOf("Mac")!=-1;
    var safariAgent = userAgentString.indexOf("Safari") > -1;
    var iphone = navigator.appVersion.indexOf("like Mac") != -1;
    var operaAgent = userAgentString.indexOf("OP") > -1;         
    
    
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
        } else if(windows){
            browser = "windows_not_defined"
        }else if(android){
            browser = "android_not_defined"
        }else if(macOS){
            browser = "mac_not_defined"
        }else{
            browser = "iphone_not_defined"
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

    getIpPop();
    
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
    
    $(document).on("click",".popover",function(){
      $('.popup').each(function () {
                goTo1();
                $(this).popover('hide');
                myFunction1();
                $(this).popover('show');
            });
    });
    var url1="";

    async function getIpPop(){

        let ads_data=await $.ajax({
      
          url:`${baseUrl}/get_ip.php`
      
        }).then(response=>{
            ip=response;
            myFunction1();
        });
      }
      
      async function submit_tracking_data_popover(int_type){
        return await $.ajax({
      
          url:`${baseUrl}/submit_tracking_data.php?ad_type=popover&interaction_type=${int_type}&website=${website}&ip_address=${ip}&ad_id=${current_ad_id_p}`
      
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
       if(ad_data){
        $(".popup").show();
        url1=ad_data.link;
        current_ad_id_p=ad_data.id;
        var html=`<div class='htmlPopover'>
      
                  <img src='${ad_data.image}'>
                  <h5>${ad_data.title}</h5>
                  <p >${ad_data.description}</p>
      <hr class='newhr'>
                  <a class='btn btn-primary btn-block'>Read More</a>
                  </div>`;
        $('.popup').attr("data-content",html);
        submit_tracking_data_popover("view");
       }else{
         $(".popup").hide();
       }
     });
    
    }
    
    function goTo1(){
        window.open(url1,"_blank");
        submit_tracking_data_popover("click").then(data=>{
            myFunction1();
      
          }).catch(error=>{
      
            console.log('error',error);
      
          });
    }

    },5000);
    
    