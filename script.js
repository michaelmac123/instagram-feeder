// Don't mess with other window.onload functions
function myPluginLoadEvent(func) {
  // assign any pre-defined functions on 'window.onload' to a variable
  var oldOnLoad = window.onload;
  // if there is not any function hooked to it
  if (typeof window.onload != 'function') {
    // you can hook your function with it
    window.onload = func
  } else { // someone already hooked a function
    window.onload = function () {
      // call the function hooked already
      oldOnLoad();
      func();
    }
  }
}

// Calculate Time from tweet converts from created_date
function parseTwitterDate(tdate) {
  var system_date = new Date(Date.parse(tdate));
  var user_date = new Date();

  var diff = Math.floor((user_date - system_date) / 1000);
  if (diff <= 1) {return "~just now";}
  if (diff < 20) {return "~" + diff + " seconds ago";}
  if (diff < 60) {return "~less than a minute ago";}
  if (diff <= 90) {return "~one minute ago";}
  if (diff <= 3540) {return "~" + Math.round(diff / 60) + " minutes ago";}
  if (diff <= 5400) {return "~ 1 hour ago";}
  if (diff <= 86400) {return "~" + Math.round(diff / 3600) + " hours ago";}
  if (diff <= 129600) {return "~1 day ago";}
  if (diff < 604800) {return "~" + Math.round(diff / 86400) + " days ago";}
  if (diff <= 777600) {return "~1 week ago";}
  return "on " + system_date;
}

// Create div container for widget
function addFeederWidget(addElementBefore, elementToAdd) {
  var el1 = document.createElement("div");
  el1.setAttribute("id", elementToAdd);
  el1.className = "feeder-widget";

  // Add title content to widget
  var spanEl = '<span>Recent images:</span>';
  el1.innerHTML = '<h5 class="widget-title">' + spanEl + '</h5>';

  // Get Reference element
  var el2 = document.getElementById(addElementBefore);

  // Get reference to the parent element
  var parentElement = el2.parentNode;

  parentElement.insertBefore(el1, el2);
}

function addHr() {
  var el1 = document.createElement("hr");
  el1.className = "slot-hr desktop-ad-atf-hr";

  // Get Reference element
  var el2 = document.getElementById("desktop-sidekick-1");

  // Get reference to the parent element
  var parentElement = el2.parentNode;

  parentElement.insertBefore(el1, el2);
}

// Get Json feed
function get_jsonp_feed() {
  // Use URL to return JSON data
  // Set Feed URL
  var feed_url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20data.link%2C%20data.images%2C%20data.caption%20FROM%20json%20where%20url%3D'https%3A%2F%2Fapi.instagram.com%2Fv1%2Ftags%2Famazon%2Fmedia%2Frecent%3Fclient_id%3Db38645e1032e4e368beb71810b7e2e41%26callback%3D%3F'&format=json&diagnostics=true&callback=?";

  // Set amount of tweets to return
  var feed_count = 15;
  $.ajax({
    url: feed_url,
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'callback',
    jsonpCallback: 'cbfunc',
    error: function(xhr, status, error) {
      alert(xhr.responseText);
    },
    success: function(data) {
      // We know that the data we want is contained inside statues
      var itemList = data.query.results.json;
      console.log(itemList);
      // Add UL to append li
      $('#desktop-sidekick-feeder').append('<div id="feeder-window"></div>');
      $('#feeder-window').append('<ul class="fed-elements"></ul>');
      // Loop through list of results
      for (var i = 0; i < feed_count; i++) {
        var fullName = itemList[i].data.caption.from.full_name;
        var userImg = itemList[i].data.caption.from.profile_picture;
        var imgCaption = itemList[i].data.caption.text;
        var imgLink = itemList[i].data.images.standard_resolution.url

        var nameSpan = '<span class="widget-username">'+fullName+'</span>';
        var profilePicSpan ='<span class="widget-profilepic"><img class="widget-img" src="'+ userImg +'"></span>'
        var imgSpan = '<img class="widget-text" src="'+ imgLink +'">';
        var captionSpan = '<span class="widget-caption">'+ imgCaption + '</span>';
        $('#desktop-sidekick-feeder ul').append(
          '<li class="shown-widget hidden"><span class="header-title">'+profilePicSpan+nameSpan+'</span>'+imgSpan+captionSpan+'</li>');
      }
      slide('.shown-widget');
    }
  });
}

function slide(element) {
  // Add prev/next buttons
  $('#desktop-sidekick-feeder').prepend(
    '<button class="control_next"><span></span></button><button class="control_prev"><span></span></button>'
  );

  var $slideElement = $(element);

  var i = 0;

  $(element+':first-child').addClass('active');
  $(element+':first-child').removeClass('hidden');

  $('button.control_next').on('click', function(){
    i = (i + 1) % $slideElement.length;
    $slideElement.removeClass('active').addClass('hidden').eq(i).addClass('active').removeClass('hidden');
  });

  $('button.control_prev').on('click', function(){
    i = (i - 1) % $slideElement.length;
    $slideElement.removeClass('active').addClass('hidden').eq(i).addClass('active').removeClass('hidden');
  });

}


// ADD font library
WebFontConfig = {
  google: { families: [ 'Lato:100,300,300italic,500,700:latin' ] }
};

// From fonts.google.com
(function() {
  var wf = document.createElement('script');
  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  wf.type = 'text/javascript';
  wf.async = 'true';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(wf, s);
})();

// pass the function you want to call at 'window.onload', in the function defined above
myPluginLoadEvent(function(){
  addFeederWidget("desktop-sidekick-1" ,"desktop-sidekick-feeder");
  get_jsonp_feed();
  addHr();
});