
 
// $(document).ready(function() {
  var sentences=[];
  var apiResults=[];
  var prepareResult=[];
  var globalTextCheckboxVal=true;
  var globalWordCheckboxVal=true;

  getTexts();
  getAPIResults();


  // if(jQuery.isEmptyObject(localStorage.dateOfBirth)){
  //       localStorage.weight=80;
  // }
  console.log("total sentences:",sentences);
  console.log("Total result:",apiResults);
  console.log("Total localPrepareResult:",localPrepareResult);
  

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
  $('[data-toggle="tooltip"]').on('click', function () {
    $(this).tooltip('hide');
  });
  $('#textTools').on('click', function () {
    //$("#testData").html(JSON.stringify(prepareResult));    
    $(this).popover({
      html : true, 
      content: function() {
        $(document.getElementById("textCheckbox")).attr("checked", globalTextCheckboxVal);
        $(document.getElementById("wordCheckbox")).attr("checked", globalWordCheckboxVal);
        return $("#popoverText").html();
      }
      // title: function() {
      //     return $("#example-popover-title").html();
      // }
    });
  });
// });





/**
* 
*
**/
function getTexts(){
  var tataltexts= $("#main").find('p').text().split(/(?:\n)+/);
  //var tataltexts= $("body").text().split(/(?:\n)+/);
  //var tataltexts= $("p").text().split(/(?:\n)+/);
  console.log("total number of text in the body:",tataltexts);
  /*collect all sentances in this page*/
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
}
function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
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
        apiResults.push({"domID":index,"domValue":jsonResponse});
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
          "syntSimplifiedVersion":jsonResponse.syntSimplifiedVersion,
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
  return -1;
}
/**
* 
*
**/
function getDescription(word, arr){
  var result = -1;
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
  
  $.each(prepareResult, function (index, value){
    if(color == true){
      if(String(value['originalText']) != String(value['syntSimplifiedVersion'])){
        makeColorOfText(value['elementID'],color);
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
  
  $.each(prepareResult, function (index, value){
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
    $('#'+id).css('background-color', '#FFFF99');
    console.log("make yellow color");
  }
  else if(color == false){
    $('#'+id).css('background-color', 'transparent');
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
      // word
      var word = value['originalWord'];
      // create a regex
      var re = new RegExp(word, "ig");
      // replace word with color
      var reText = "<span style='background-color: red;'>"+word+"</span>";
      // replace the inner html
      if($('p:contains("'+word+'")') ){
        console.log("value:",word,"id:",id);
        var str = document.getElementById(id).innerHTML;
        var res = str.replace(re, reText);
        document.getElementById(id).innerHTML = res;
      };
      
      //var replacedHTML = $('#'+id).html().replace(re, reText);
      // replace
      //$('#'+id).html(replacedHTML);
    }else if(color == false){
      $('#'+id).contents().find( value['originalWord'] ).css( "background-color", "transparent" );
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