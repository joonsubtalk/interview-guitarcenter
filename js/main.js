var items = [];

function insertNewArrival (items){
  var dom = document.getElementById('newArrival');
  //clear
  dom.innerHTML = '';

  var imgDom = document.createElement('div');
  var imgContent = document.createElement('img');
  imgContent.src = items[0];
  imgDom.className = 'img';
  imgDom.appendChild(imgContent);

  var detailsDom = document.createElement('div');
  var detailsContentName = document.createElement('div');
  var detailsContentDescription = document.createElement('div');
  var detailsContentExtra = document.createElement('div');
  var detailsContentLink = document.createElement('a');
  var detailsContentLinkText = document.createTextNode('Link to somewhere..');

  detailsDom.className = 'details';
  detailsContentName.className = 'name';
  detailsContentDescription.className = 'description';
  detailsContentExtra.className = 'extra';

  detailsContentName.innerHTML = items[1];
  detailsContentDescription.innerHTML = items[2];

  detailsDom.appendChild(detailsContentName);
  detailsDom.appendChild(detailsContentDescription);
  detailsDom.appendChild(detailsContentExtra);
  detailsContentLink.appendChild(detailsContentLinkText);
  detailsContentLink.href = items[3];
  detailsContentExtra.appendChild(detailsContentLink);


  dom.appendChild(imgDom);
  dom.appendChild(detailsDom);
}


document.getElementById("sideMenu").addEventListener('click', function(e){
  if (e.target && e.target.matches('.link')) {
    $('#'+(e.target.innerHTML).toLowerCase()).toggleClass('show');
  }
}, true);

document.getElementById("tabMenu").addEventListener('click', function(e){
  if (e.target && e.target.matches('.tab')) {
    clearActiveTab();
    $('#'+e.target.id).addClass('active');
    showActiveTab(e.target.id);
  }
});

function clearActiveTab() {
  $('#tab1').removeClass('active');
  $('#tab2').removeClass('active');
  $('#tab3').removeClass('active');
}
function clearActiveContent() {
  $('#deals').removeClass('show');
  $('#arrival').removeClass('show');
  $('#sign').removeClass('show');
}

function showActiveTab(tab){
  clearActiveContent();
  switch(tab) {
    case 'tab1' :
      $('#deals').addClass('show');
      break;
    case 'tab2' :
      $('#arrival').addClass('show');
      if (items.length < 1) {
        fetchArrival();
      }
      break;
    case 'tab3' :
      $('#sign').addClass('show');
      break;
    default :
  }
}
function fetchArrival(){
  $.getJSON( "../json/new-arrivals.json", function( data ) {
    $.each( data.newArrivals[0], function( key, val ) {
      items.push(val);
    });
    insertNewArrival (items)
  });
}


function insertDaysToSelection(){
  var dom = document.getElementById('days');
  var selectOption;

  for(var i=1; i<=31; i++){
   selectOption = document.createElement('option');
   selectOption.innerHTML = i;
   dom.appendChild(selectOption);
  }
}

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function insertMonthsToSelection(){
  var dom = document.getElementById('months');
  var selectOption;

  monthNames.forEach(function(month){
     selectOption = document.createElement('option');
     selectOption.innerHTML = month;
     dom.appendChild(selectOption);
  })
}
insertMonthsToSelection();
insertDaysToSelection();
