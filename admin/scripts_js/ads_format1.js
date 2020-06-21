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
var current_ad_id_ad1="";
var website=location.hostname;
var urlAd1="";
 
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

    getIpAd1();

	$(".ads_format1").prepend(`
	<div class="bc-banner text-center mt-4">
	<a>
	<span class="closeBtn" style="float:right;height:1.4rem;width:0.8rem;position:relative;top:-0.5rem;background-color:#fff;color:#39b;font-weight:bold;">&times;</span>
	<div class="bc-banner-body">
	<h4 style="position: relative;top: 1rem;color:white;" id="description">
	Start Collecting More Leads in Minutes</h4>
	<div class="adsDiv">
	<span class="adsText" id="title">NETFLIX</span>
	<span class="btn btn-danger adsButton">CLICK TO JOIN</span></div></div></a></div>
	<div class="row adsDisplay" style="display:none;">
	<a class="col-md-12 btn" style="color:#8a8986;">Ads By <span style="font-size:1.2em;font-weight:600;">DL</span></a>
	<a class="col-md-12 btn btn-primary stopBtn" style="box-shadow:.1px .1px 1px 1px #007bff;margin-bottom:0.5em;">Stop seeing this ad</a>
	<a class="col-md-12 btn" style="box-shadow:.1px .1px 1px 1px #8a8986;color:#8a8986">Why this ad? <i class="fa fa-info-circle" title="Ads By DL"></i></a>
	</div>
	<div class="adsClosed" style="display:none;">
	<a href="" class="col-md-12 btn" style="color:#8a8986;">Ads closed by <span style="font-size:1.2em;font-weight:600;">DL</span></a>
	</div>
	`);

	setInterval(function(){
	 myFunctionAd1(); 
	}, 15000);

	$(".ads_format1 .closeBtn").click(function(){
	$(".ads_format1 .bc-banner").hide();
	$(".ads_format1 .adsDisplay").show();
	});

	$(".ads_format1 .stopBtn").click(function(){
		$(".ads_format1 .adsDisplay").hide();
        $(".ads_format1 .adsClosed").show();
        setTimeout(function(){$(".ads_format1 .adsClosed").fadeOut("slow")},500);
	});

	$(".ads_format1 .adsButton").click(function(){
		goToAd1();
	});

	async function getIpAd1(){

        let ads_data=await $.ajax({
      
          url:`${baseUrl}/get_ip.php`
      
        }).then(response=>{
            ip=response;
            myFunctionAd1();
        });
      }
      
      async function submit_tracking_data_ad1(int_type){
        return await $.ajax({
      
          url:`${baseUrl}/submit_tracking_data.php?ad_type=ad_format_1&interaction_type=${int_type}&website=${website}&ip_address=${ip}&ad_id=${current_ad_id_ad1}`
      
        });
      }
      
      async function getAdsData(ad_type){
      
        let ads_data=await $.ajax({
      
          url:`${baseUrl}/get_ads_data.php?ad_type=${ad_type}&browser=${browser}&ip_address=${ip}`
      
        });
        return ads_data;
      }
    
    function myFunctionAd1() {
    
     var get_ads_request=getAdsData("ad_format_1");
     get_ads_request.then(res=>{
       var ad_data=JSON.parse(res);
       if(ad_data){
        $(".ads_format1").show();
        urlAd1=ad_data.link;
        current_ad_id_ad1=ad_data.id;
        $(".ads_format1 #title").html(ad_data.title);
        $(".ads_format1 #description").html(ad_data.description);
        submit_tracking_data_ad1("view");
       }else{
        $(".ads_format1").hide();
       }
     });
    
    }
    
    function goToAd1(){
        window.open(urlAd1,"_blank");
        submit_tracking_data_ad1("click").then(data=>{
            myFunctionAd1();
      
          }).catch(error=>{
      
            console.log('error',error);
      
          });
    }

    },5000);
