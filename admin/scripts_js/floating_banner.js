var body=document.querySelector("body");

var url="";
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
let browser="";        


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
    myFunction();
    $( "#snackbar" ).effect( "bounce", { times: 3 }, "slow" );
  },2000);
}
$("body").prepend('<div id="snackbar"><div onclick="goTo()" style="cursor: pointer;"><img src="" alt="image" id="image"></div><div style="text-align: left;margin-left:2%;cursor: pointer;" onclick="goTo()"><p class="p1" style="font-weight: bold;" id="title"></p><p class="p1" id="description"></p></div><span onclick="hideSnackbar()" style="cursor: pointer;position: relative;top: -0.5em;height:1em; ">&times;</span></div>');
function myFunction() {
  var x = document.getElementById("snackbar");
  x.className = "show";

  /*

	In randomArray in each line , first one is image link , second one is title , third one is description and fourth one is link to open on click.

	[image url , title , description , link]

  */

  var randomArray=[

  ['https://i.picsum.photos/id/808/200/200.jpg','You have 1 new message!','10,000$ credited to your demo account','https://google.com'],

  ['https://i.picsum.photos/id/809/200/200.jpg','You received 3 bitcoins!','Register to acccept the transfer into your account','https://facebook.com'],

  ['https://i.picsum.photos/id/810/200/200.jpg','New craiglist buyer!','Read using this link','https://youtube.com'],

  ['https://i.picsum.photos/id/811/200/200.jpg','Congratulations!','Claim your free $100 gift-card','http://instagram.com'],

  ['https://i.picsum.photos/id/813/200/200.jpg','You paypal account suspended!','Please contact us immediately to solve this issue','https://twitter.com'],
['https://i.picsum.photos/id/813/200/200.jpg','Happy!','Stay happy','https://twitter.com'],

  ];

  var random=randomArray[Math.floor(Math.random()*randomArray.length)];
  document.getElementById("image").src=random[0];
  document.getElementById("title").innerHTML=random[1];
  document.getElementById("description").innerHTML=random[2];
  url=random[3];

}

function hideSnackbar(){
	var x = document.getElementById("snackbar");
  x.className = "";
}

function goTo(){
  let website=location.hostname;
  let ip="";
  $.ajax({

    url:"http://localhost/bannersPanel/get_ip.php"

  }).then(res=>{

    ip=res;
    $.ajax({

      url:"http://localhost/bannersPanel/submit_tracking_data.php"

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