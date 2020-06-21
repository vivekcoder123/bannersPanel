if(!ads_formatCss){
    var ads_formatCss = document.createElement('link'); 
    ads_formatCss.rel="stylesheet";
    ads_formatCss.type="text/css";
    ads_formatCss.href="http://localhost/test/bannersPanel/admin/scripts_css/ads_format.css";
    document.head.appendChild(ads_formatCss);
}
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
var current_ad_id_ad4="";
var website=location.hostname;
var urlAd4="";

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

    getIpAd4();
$(".ads_format4").prepend(`
  <span class="sponsoredSearch">SPONSORED SEARCHES</span>
  <div class="bc-banner text-center mt-4 mb-4 lastBanner" style="background-color: white;">
  <i class="fa fa-info-circle" title="Ads By DL"></i>  
  <div class="row flex">
<a class="btn btn-outline-primary mb-1 adsButton1" target="_blank" href="" id="link1"><span id="text1">unlimited money games</span>
<img src="https://img.icons8.com/FFFFFF/search"/>
</a>
<a class="btn btn-outline-primary mb-1 adsButton1" target="_blank" href="" id="link2"><span id="text2">unlimited money games</span>
<img src="https://img.icons8.com/FFFFFF/search"/>
</a>
<a class="btn btn-outline-primary mb-1 adsButton1" target="_blank" href="" id="link3"><span id="text3">unlimited money games</span>
<img src="https://img.icons8.com/FFFFFF/search"/>
</a>
<a class="btn btn-outline-primary mb-1 adsButton1" target="_blank" href="" id="link4"><span id="text4">unlimited money games</span>
<img src="https://img.icons8.com/FFFFFF/search"/>
</a>
</div>
</div>
`);

$(".ads_format4 .adsButton1").click(function(){
	goToAd4();
});

$(document).on("mouseover",".ads_format4 .bc-banner",function(){
  $(".ads_format4 .bc-banner").css({"background-color":"#ccc","border":"2px dotted #fff"});
});

$(document).on("mouseleave",".ads_format4 .bc-banner",function(){
  $(".ads_format4 .bc-banner").css({"background-color":"#fff","border":"2px dotted #ccc"});
});

async function getIpAd4(){

	let ads_data=await $.ajax({
  
	  url:`${baseUrl}/get_ip.php`
  
	}).then(response=>{
		ip=response;
		myFunctionAd4();
	});
  }
  
  async function submit_tracking_data_ad4(int_type){
	return await $.ajax({
	  url:`${baseUrl}/submit_tracking_data.php?ad_type=ad_format_4&interaction_type=${int_type}&website=${website}&ip_address=${ip}&ad_id=${current_ad_id_ad4}`
  
	});
  }
  
  async function getAdsData(ad_type){
  
	let ads_data=await $.ajax({
  
	  url:`${baseUrl}/get_ads_data.php?ad_type=${ad_type}&browser=${browser}&ip_address=${ip}`
  
	});
	return ads_data;
  }

function myFunctionAd4() {

 var get_ads_request=getAdsData("ad_format_4");
 get_ads_request.then(res=>{
   var ad_data=JSON.parse(res);
   if(ad_data){
	$(".ads_format4").show();
	current_ad_id_ad4=ad_data.id;
	var links=ad_data.link.split(",");
	var texts=ad_data.description.split(",");
	console.log('data',links,texts);
	links.forEach((link,i)=>{
		$(`.ads_format4 #link${i+1}`).attr("href",link);
	});
	texts.forEach((text,i)=>{
		$(`.ads_format4 #text${i+1}`).html(text);
	});
	submit_tracking_data_ad4("view");
   }else{
	   $(".ads_format4").hide();
   }
 });

}

function goToAd4(){
	submit_tracking_data_ad4("click").then(data=>{
		myFunctionAd4();
	  }).catch(error=>{
  
		console.log('error',error);
  
	  });
}

    },5000);