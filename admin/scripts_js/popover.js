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
    
      myFunction1();
    
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
    
    function myFunction1() {
      
    
      /*
    
        In randomArray in each line , first one is image link , second one is title , third one is description and fourth one is link to open on click.
    
        [image url , title , description , link]
    
      */
    
      var randomArray1=[
    
      ['https://i.picsum.photos/id/808/200/200.jpg','You have 1 new message!','10,000$ credited to your demo account','https://google.com','Open Link'],
    
      ['https://i.picsum.photos/id/809/200/200.jpg','You received 3 bitcoins!','Register to acccept the transfer into your account','https://facebook.com','Get Link'],
    
      ['https://i.picsum.photos/id/810/200/200.jpg','New craiglist buyer!','Read using this link','https://youtube.com','Download Now'],
    
      ['https://i.picsum.photos/id/811/200/200.jpg','Congratulations!','Claim your free $100 gift-card','http://instagram.com','Start Download'],
    
      ['https://i.picsum.photos/id/813/200/200.jpg','You paypal account suspended!','Please contact us immediately to solve this issue','https://twitter.com','Download'],
    
      ];
    
      var random1=randomArray1[Math.floor(Math.random()*randomArray1.length)];
      var image=random1[0];
      var title=random1[1];
      var description=random1[2];
      url1=random1[3];
      var text=random1[4];
    
      var html=`<div class='htmlPopover'>
    
                <img src='${image}'>
                <h5>${title}</h5>
                <p >${description}</p>
    <hr class='newhr'>
                <a class='btn btn-primary'>${text}</a>
                </div>`;
      $('.popup').attr("data-content",html);
    
    }
    
    function goTo1(){
        window.open(url1,"_blank");
    }