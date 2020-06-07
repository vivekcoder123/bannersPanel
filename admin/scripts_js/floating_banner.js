var body=document.querySelector("body");
var baseUrl="http://localhost/test/bannersPanel";

var url="";
let browser=""; 
let ip="";
let current_ad_id="";
let website=location.hostname;
body.onload=function(){

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

  setTimeout(function(){
    $("body").prepend('<div id="snackbar"><div onclick="goTo()" style="cursor: pointer;"><img src="" alt="image" id="image"></div><div style="text-align: left;margin-left:2%;cursor: pointer;" onclick="goTo()"><p class="p1" style="font-weight: bold;" id="title"></p><p class="p1" id="description"></p></div><span onclick="hideSnackbar()" style="cursor: pointer;position: relative;top: -0.5em;height:1em; ">&times;</span></div>');
    myFunction();
    $( "#snackbar" ).effect( "bounce", { times: 3 }, "slow" );
  },2000);
}

async function getIp(){

  let ads_data=await $.ajax({

    url:`${baseUrl}/get_ip.php`

  }).then(response=>{
      ip=response;
  });
}

async function submit_tracking_data(int_type){
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
    document.getElementById("image").src=ad_data.image;
    document.getElementById("title").innerHTML=ad_data.title;
    document.getElementById("description").innerHTML=ad_data.description;
    url=ad_data.link;
    current_ad_id=ad_data.id;
    submit_tracking_data("view");
  });

}

function hideSnackbar(){
	var x = document.getElementById("snackbar");
  x.className = "";
}

function goTo(){

    submit_tracking_data("click").then(data=>{

      window.open(url,"_blank");
      myFunction();

    }).catch(error=>{

      console.log('error',error);

    });
}