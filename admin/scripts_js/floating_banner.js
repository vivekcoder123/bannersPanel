var body=document.querySelector("body");

var url="";
let browser=""; 
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

  setTimeout(function(){
    $("body").prepend('<div id="snackbar"><div onclick="goTo()" style="cursor: pointer;"><img src="" alt="image" id="image"></div><div style="text-align: left;margin-left:2%;cursor: pointer;" onclick="goTo()"><p class="p1" style="font-weight: bold;" id="title"></p><p class="p1" id="description"></p></div><span onclick="hideSnackbar()" style="cursor: pointer;position: relative;top: -0.5em;height:1em; ">&times;</span></div>');
    myFunction();
    $( "#snackbar" ).effect( "bounce", { times: 3 }, "slow" );
  },2000);
}

async function getAdsData(ad_type){

  let ads_data=await $.ajax({

    url:`http://localhost/test/bannersPanel/get_ads_data.php?ad_type=${ad_type}&browser=${browser}`

  });
  return ads_data;
}

function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";
  console.log('data fetching',browser);
  var get_ads_request=getAdsData("floating_banner");
  get_ads_request.then(res=>{
    var randomArray=JSON.parse(res);
    var random=randomArray[Math.floor(Math.random()*randomArray.length)];
    document.getElementById("image").src=random.image;
    document.getElementById("title").innerHTML=random.title;
    document.getElementById("description").innerHTML=random.description;
    url=random.link;
  });

}

function hideSnackbar(){
	var x = document.getElementById("snackbar");
  x.className = "";
}

function goTo(){
  let website=location.hostname;
  let ip="";
  $.ajax({

    url:"http://localhost/test/bannersPanel/get_ip.php"

  }).then(res=>{

    ip=res;
    $.ajax({

      url:`http://localhost/test/bannersPanel/submit_tracking_data.php
      ?ad_type=floating_banner&interaction_type=click&website=${website}&ip_address=${ip}`

    }).then(data=>{

      window.open(url,"_blank");
      myFunction();

    }).catch(error=>{

      console.log('error',error);

    });

  }).catch(err=>{

    console.log('err',err);

  });
}