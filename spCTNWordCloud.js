var spCTNWordCloud = {
    wordHash: {},
    loadedRequests: new Array(),
    loadRequests: function (restSystemLocation, callback) {
        $.getJSON(restSystemLocation, {}, function (data) {
            var modelArray = new Array();
            for (var c = 0; c < data.d.results.length; c++) {
                var tempHoldId = data.d.results[c].Id;
                //var et = data.da.results._metadata.etag;
                loadedRequests.push({ Id: tempHoldId, request: data.d.results[c].RequestDescription });


            }
            callback();

        });

    },
    buildFrequencyHash: function (strToUse, callback) {
        var currentArray = strToUse.toLowerCase().split(/[\s*\.*\,\;\+?\#\|:\-\/\\\[\]\(\)\{\}$%&0-9*]/);
       
        for (i in currentArray) {
            if (currentArray[i].length > 1) {
                var isCommon = false;
                for (var y = 0 ; y < common_Words.length; y++) {

                    if (currentArray[i] == common_Words[y].word) {
                        isCommon = true;
                    }

                }
                if (isCommon == false) {
                    wordHash[currentArray[i]] ? wordHash[currentArray[i]] += 1 : wordHash[currentArray[i]] = 1;
                }
            }
        }
        

    },
    makeDiv: function (whereToPut) {
        // vary size for fun
        var divsize = ((Math.random() * 100) + size).toFixed();
        // vary color for not fun               
        var color = '#' + Math.round(0xffffff * Math.random()).toString(16);
        $newdiv = $('<div/>').html("<span style='color:" + color + "'>" + wordToUse + "</span>");
        // make position sensitive to size and document's width
        var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
        var posy = (Math.random() * ($(document).height() - divsize)).toFixed();

        $newdiv.css({
            'position': 'absolute',
            'left': posx + 'px',
            'top': posy + 'px',
            'font-size': (divsize / 5) + 'px'

        }).appendTo('#' + whereToPut);

    }




}
