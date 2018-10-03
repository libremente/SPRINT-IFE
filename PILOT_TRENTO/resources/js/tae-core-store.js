
 
// $(document).ready(function() {
  var sentences=[];
  var prepareResult=[];
  var globalTextCheckboxVal=false;
  var globalWordCheckboxVal=false;
  var loadFirstTime=true;
  getTextsAndsetSpan();
  //getAPIResults();

  console.log("total sentences:",sentences);
  console.log("Total localPrepareResult:",localPrepareResult);
  
// set in local storage
setTimeout(function(){
    // Check browser support
  if (typeof(Storage) !== "undefined") {
    // Store
    localStorage.setItem("localStorageResult", JSON.stringify(localPrepareResult));
    // Retrieve
    console.log("localStorageResult:",JSON.parse(localStorage.getItem("localStorageResult")));
  } else {
    console.log("localStorageResult:", "Sorry, your browser does not support Web Storage...");
  }
}, 2000);

  $('[data-toggle="tooltip"]').tooltip();
  // $('[data-toggle="tooltip"]').on('click', function () {
  //   $(this).tooltip('hide');
  // });
  
  $('#textTools').on('click', function () {
    //$("#testData").html(JSON.stringify(prepareResult)); 
    if(loadFirstTime){
      //first autoload the text color
      // clickTextCheckbox();
      //first autoload the word color
      // clickWordCheckbox();  
    }
    
    $('#textTools').popover({
      html : true, 
      content: function() {
        $(document.getElementById("textCheckbox")).attr("checked", globalTextCheckboxVal);
        $(document.getElementById("wordCheckbox")).attr("checked", globalWordCheckboxVal); 
        return $("#popoverText").html();
      },
      // title: function() {
      //     return $("#example-popover-title").html();
      // },
      placement: 'top',
      // trigger: 'hover'
    });
    
    $('#textTools').popover('show');
    $('#textTools').tooltip('hide');
  });
$(document).on('click', function (e) {
  $('[data-toggle="popover"],[data-original-title]').each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {                
          (($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
      }

  });
});
// });





/**
* 
*
**/
function getTextsAndsetSpan(){
    
  var elements = document.body.getElementsByTagName("p");
  
  for(var i = 0; i < elements.length; i++) {
    var current = elements[i];
    var val = current.textContent.trim();
    if(current.textContent.trim().length !== 0 && current.textContent.replace(/ |\n/g,'') !== '') {
      sentences.push(val);      
      // current.innerHTML="<span class='"+i+"' id='"+i+"'>"+val+"</span>";
      var index=sentences.length-1;
      $(current).wrapInner("<span class='"+index+"' id='"+index+"'></span>");
    }
  } 
  
  /*
  var tataltexts= $("#main").find('p').text().split(/(?:\n)+/);
  //var tataltexts= $("body").text().split(/(?:\n)+/);
  //var tataltexts= $("p").text().split(/(?:\n)+/);
  console.log("total number of text in the body:",tataltexts);
  //collect all sentances in this page
  $.each(tataltexts, function (index, value){
    if(value.trim()){//remove all extra space
      // if(value.includes(".") && !value.includes("@")){//check sentances with '.' & not contain '@'
      //   var tempSen = value.split('.');// maybe one <p> have more sentances for that split with '.'
      //   var tempAppendSen="<p>";
      //   $.each(tempSen, function(index2, value2){
      //     if(value2.trim() && value2.length>16){//remove extra space & get sentances that more then 16 letter
      //       sentences.push($.trim(value2));	
      //       tempAppendSen=tempAppendSen+"<span id='rap"+sentences.length-1+"'>"+value2+".</span>";
      //       tempAppendSen=tempAppendSen+"<span>"+value2+".</span>";
      //     }
      //   });
      //   if(tempAppendSen.includes("<span>")){
      //     $("p:contains("+value+")").replaceWith(tempAppendSen+"</p>" );
      //   }
      // }
      
      var tempSen = value.split('.');
      $.each(tempSen, function(index2, value2){
        var val = $.trim(value2);
        if($('p:contains("'+val+'")') && val.length>16){
          sentences.push(val);
          var i=sentences.length-1;
          //for p
          if($('p:contains("'+val+'")')){
            $('p:contains("'+val+'")').wrapInner("<span id='"+i+"'></span>");
          }
          if($('ul>li:contains("'+val+'")')){
            $('ul>li:contains("'+val+'")').wrapInner("<span id='"+i+"'></span>"); 
          }
          
            // $('p:contains("'+$.trim(value)+'")').html(function(_, html) {
            //     var valEx='/(+'+$.trim(value)+'$)/g';
            //    return html.replace(valEx, '<span class="smallcaps">$1</span>');
            // });
            // $('p:contains("'+$.trim(value)+'")').html(function(_, html) {
            //     var regex = new RegExp("/" + escapeRegExp($.trim(value)) + "$/g",'gi');
            //     var str = "<span class='smallcaps'>"+$.trim(value)+"</span>";
            //     return  html.replace(regex, str);
            // });
        }
      });
      //if($( "p" ).contents().find( val )){
      
      
      // if($('li:contains("'+$.trim(value)+'")').contents().not($('li').children())){
      //     //$($('li').contents().not($('li').children())).$('li:contains("'+$.trim(value)+'")').wrapInner("<span id='"+i+"'></span>");
      //     console.log("li is=> ",$.trim(value));
      //     console.log("li(not'a')=> ",$('li:contains("'+$.trim(value)+'")').contents().not($('li').children()).text());
      // }
      // if($('nav>ul>li>a:contains("'+$.trim(value)+'")')){
      //     $('nav>ul>li>a:contains("'+$.trim(value)+'")').wrapInner("<span id='"+i+"'></span>");
      // }
      
      //for ul>li
      // if($('ul>li:contains("'+$.trim(value)+'")')){
      //     $('ul>li:contains("'+$.trim(value)+'")').wrapInner("<span id='"+i+"'></span>");
      // }

      //for h3
      // if($('h3:contains("'+$.trim(value)+'")')){
      //     $('h3:contains("'+$.trim(value)+'")').wrapInner("<span id='"+i+"'></span>");
      // }
    }
  });
  */
}

/**
* call api for all sentances and get data
*
**/
function getAPIResults(){
  var textURL="https://simpatico.smartcommunitylab.it/simp-engines/tae/simp";
  $.each(sentences, function (index, value){
    jQuery.getJSON(textURL + "?text=" + value,
      function(jsonResponse) {
        var words=[];
        var syntSimplifiedVersion;
        if(String(jsonResponse.text) != String(jsonResponse.syntSimplifiedVersion)){
          syntSimplifiedVersion=jsonResponse.syntSimplifiedVersion;
        }else{
          syntSimplifiedVersion=null;
        }
        $.each(jsonResponse.simplifications, function(index2, value2){
          words.push({
            "originalWord":value2.originalValue,
            "start":value2.start,
            "end":value2.end,
            "Synonyms":value2.simplification,
            "definition":getDescription(value2.originalValue,jsonResponse.readability.forms),
            "wikilink":getWikiLink(value2.originalValue,jsonResponse.linkings)
          });
        });
        prepareResult.push({
          "elementID":index,
          "originalText":jsonResponse.text,
          "syntSimplifiedVersion":syntSimplifiedVersion,
          "words":words
        });
      });
  });
  // Store
  //localStorage.setItem("localStorageResult", JSON.stringify(sentences));
  //localStorage.localStorageResult=JSON.stringify(prepareResult);
}
/**
* 
*
**/
// Array.prototype.getWikiLink = function( word ){
//   for ( var i in this )
//   {
//     if(this[i].originalText == word){
//       return this[i].page;
//     }
//   }
//   return -1;
// }
function getWikiLink(word, arr){
  for ( var i in arr )
  {
    if(arr[i].originalText == word){
      return arr[i].page;
    }
  }
  return null;
}
/**
* 
*
**/
function getDescription(word, arr){
  var result = null;
  $.each(arr, function( key, value ) {
    if(value.description.forms[0].search(new RegExp(word, 'i')) !== -1){
      result=value.description.description;
      return false;
    }
  });
  return result;
}
/**
* 
*
**/
function clickTextCheckbox(){
  var textElementVal=document.getElementById("textCheckbox");
  if(globalTextCheckboxVal){
    globalTextCheckboxVal=false;
    $(textElementVal).attr("checked", globalTextCheckboxVal);
    onTextSimplification(false);
    console.log("TextCheckbox is unchecked.");
  }else{
    globalTextCheckboxVal=true;
    $(textElementVal).attr("checked", globalTextCheckboxVal);
    onTextSimplification(true);
    console.log("TextCheckbox is checked.");
  }

}

/**
* 
*
**/
function clickWordCheckbox(){
  var wordElementVal=document.getElementById("wordCheckbox");
  if(globalWordCheckboxVal){
    globalWordCheckboxVal=false;
    $(wordElementVal).attr("checked", globalWordCheckboxVal);
    onWordSimplification(false);
    console.log("WordCheckbox is unchecked.");
  }else{
    globalWordCheckboxVal=true;
    $(wordElementVal).attr("checked", globalWordCheckboxVal);
    onWordSimplification(true);
    console.log("WordCheckbox is checked.");
  }

}

/**
* 
*
**/
function onTextSimplification(color){
  
  $.each(localPrepareResult, function (index, value){
    if(color == true){
      if(value['syntSimplifiedVersion']){
        makeColorOfText(value['elementID'],color);
        $('.'+value['elementID']).append("<div id='popup"+value['elementID']+"' class='popupText'><h4>Simplified text</h4><p>"+value['syntSimplifiedVersion']+"</p></div>");
        $('#popup'+value['elementID']).popup({type: 'tooltip'});
        $('.'+value['elementID']).on({
          mouseenter: function(event) {
            if(globalTextCheckboxVal){
              $('#popup'+value['elementID']).popup({
                tooltipanchor: event.target,
                autoopen: true,
                type: 'tooltip',
                opacity:0.5,
                background: true,
                horizontal: 'center',
                vertical:'bottom'
              });
            }
          },
          mouseleave: function() {
            if(globalTextCheckboxVal){
              $('#popup'+value['elementID']).popup('hide');
            }
          }
        });
        // $('#'+value['elementID']).mouseover(function(){
        //   console.log("come in onmouseover");
        // });
      }
    }else if(color == false){
      makeColorOfText(value['elementID'],color);
    }
    
  });
  
 
}

/**
* 
*
**/
function onWordSimplification(color){
  
  $.each(localPrepareResult, function (index, value){
    if(color == true){
      if(value['words']){
        makeColorOfWord(value['elementID'],color,value['words']);
        
      }
    }else if(color == false){
      makeColorOfWord(value['elementID'],color,value['words']);
    }
    
  });
  
 
}
/**
* 
*
**/ 
function makeColorOfText(id,color){

  if(color == true){
    $('.'+id).css('background-color', '#FFFF99');
    console.log("make yellow color");
  }
  else if(color == false){
    $('.'+id).css('background-color', 'transparent');
    console.log("make white color");
  }  
}
/**
* 
*
**/ 
function makeColorOfWord(id,color,arrWord){
  $.each(arrWord, function (index, value){
    if(color== true){
      //$('#'+id).contents().find( value['originalWord'] ).wrap("<span style='background-color:red'></span>");
      //$('#'+id).contents().find( value['originalWord'] ).css( "background-color", "red" );
      //console.log("originalWord:",$('#'+id).contents().find( value['originalWord'] ));
      // $('#'+id).contents().each(function () {
      //   $(this).replaceWith(this.nodeValue.replace(/\w+/g, function (part) {
      //     if(value['originalWord']==part.split("").join("")){
      //       console.log("inside loop(word):",part.split("").join(""));
      //       return '<span style="background-color: red;">' + part.split("").join("") + '</span>';
      //     }
          
      //   }));
      // });
      if(loadFirstTime){
        // word
        var word = value['originalWord'];
        // create a regex
        var re = new RegExp(word, "ig");
        // replace word with color
        var reText = "<span class='wordColor' id='"+id+"-"+index+"'>"+word+"</span>";
        // replace the inner html
        //if($('span:contains("'+word+'")') ){
        var str=document.getElementById(id);
        var res = str.innerHTML.replace(re, reText);
        str.innerHTML = res;
          // $.each(document.getElementsByClassName(id), function (index2, value2){
          //   //here loop because document.getElementsByClassName return an array
          //   var res = value2.innerHTML.replace(re, reText);
          //   value2.innerHTML = res;
          // });
        //};
      }else if(loadFirstTime == false){
        $( "span" ).addClass( "wordColor" );
      }
      
    }else if(color == false){
      $( "span" ).removeClass( "wordColor" );
    }
  });
  
  // if(color == true){
  //   $('#'+id).css('background-color', 'red');
  //   console.log("make red color");
  // }
  // else if(color == false){
  //   $('#'+id).css('background-color', 'transparent');
  //   console.log("make white color");
  // }  
}