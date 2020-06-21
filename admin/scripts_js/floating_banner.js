var floating_bannerCss = document.createElement('link'); 
floating_bannerCss.rel="stylesheet";
floating_bannerCss.type="text/css";
floating_bannerCss.href="http://localhost/test/bannersPanel/admin/scripts_css/floating_banner.css";
document.head.appendChild(floating_bannerCss);
if(typeof jQueryScript=="undefined"){
  var jQueryScript = document.createElement('script');  
  jQueryScript.setAttribute('src','https://code.jquery.com/jquery-3.5.1.min.js');
  jQueryScript.async=false;
  document.body.appendChild(jQueryScript);
  var jqueryUiScript=document.createElement('script');
  jqueryUiScript.setAttribute('src','https://code.jquery.com/ui/1.12.0/jquery-ui.min.js');
  jqueryUiScript.async=false;
  document.body.appendChild(jqueryUiScript);
}
if(typeof Popper=="undefined"){
  var popperScript = document.createElement('script');
  popperScript.setAttribute('src','https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js');
  popperScript.async=false;
  document.body.appendChild(popperScript);
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
  document.body.appendChild(bootstrapScript);
}
if(typeof fontAwesome=="undefined"){
  var fontAwesome = document.createElement('link'); 
  fontAwesome.rel="stylesheet";
  fontAwesome.type="text/css";
  fontAwesome.href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css";
  document.head.appendChild(fontAwesome);
}
var body=document.querySelector("body");
var baseUrl="https://dlmonitize.com";

var url="";
var browser=""; 
var ip="";
var current_ad_id="";
var website=location.hostname;

if(!window.jquery){
  
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

  detectDevice()

  gfg_Run();

  getIp();

  setTimeout(function(){
    $("body").prepend('<div id="snackbar" style="display:none"><div style="cursor: pointer;" class="clickSnackbar"><img src="" alt="image" id="image"></div><div style="text-align: left;margin-left:4%;cursor: pointer;" class="clickSnackbar"><p class="p1" style="font-weight: bold;" id="title"></p><p class="p1" id="description"></p></div><span id="hideSnackbar" style="cursor: pointer;position: relative;top: -0.5em;height:1em; ">&times;</span></div>');
    myFunction();
  },2000);

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

async function getIp(){

  let ads_data=await $.ajax({

    url:`${baseUrl}/get_ip.php`

  }).then(response=>{
      ip=response;
  });
}

async function submit_tracking_data_floating(int_type){
  return await $.ajax({

    url:`${baseUrl}/submit_tracking_data.php?ad_type=floating_banner&interaction_type=${int_type}&website=${website}&ip_address=${ip}&ad_id=${current_ad_id}`

  });
}

async function getAdsData(ad_type){

  let ads_data=await $.ajax({

    url:`${baseUrl}/get_ads_data.php?ad_type=${ad_type}&browser=${browser}&ip_address=${ip}`

  });
  return ads_data;
}

function myFunction() {
  
  var x = document.getElementById("snackbar");
  x.className = "show";
  var get_ads_request=getAdsData("floating_banner");
  get_ads_request.then(res=>{
    var ad_data=JSON.parse(res);
    if(ad_data){
        $("#snackbar").show();
      $( "#snackbar" ).effect( "bounce", { times: 3 }, "slow" );
      document.querySelector("#snackbar #image").src=ad_data.image;
      document.querySelector("#snackbar #title").innerHTML=ad_data.title;
      document.querySelector("#snackbar #description").innerHTML=ad_data.description;
      url=ad_data.link;
      current_ad_id=ad_data.id;
      submit_tracking_data_floating("view");
    }else{
      $("#snackbar").hide();
    }
  });

}

$(document).on("click","#hideSnackbar",function(){
	var x = document.getElementById("snackbar");
  x.className = "";
});

$(document).on("click",".clickSnackbar",function(){

    window.open(url,"_blank");
    submit_tracking_data_floating("click").then(data=>{

      console.log('data saved');
      myFunction();

    }).catch(error=>{

      console.log('error',error);

    });
});

  },5000);

}