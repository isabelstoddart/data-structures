# Weekly Assignment 6
### For data structures at Parsons School of Design

## Process
The purpose of this assignment was to finish parsing and cleaning the the rest of the data in all zones, and update/replace the PostgreSQL table with the new data.

For this assignment I worked with Amina Brown and James Troxel. We started with parsing the rest the html files to get out the data we wanted. We ended up parsing the floor info, group name, details, if there is wheelchair access, day, start time, end time, special interest, zip, address, building, and meeting type for each meeting. The code we used is included below:

      $("td[style='border-bottom:1px solid #e3e3e3; width:260px']").each(function(i, elem) {
          if ($(elem).html().search(" NY") != -1){
            floorInfo.push($(elem).html().split(',').splice(1,$(elem).html().split(',').length).join(',').split('NY')[0].replace('\n\t\t\t\t\t\t<br>','').replace('<br>','').replace("&apos;","'").replace("&amp;","&").trim());
    } else {
        floorInfo.push($(elem).html().split(',').splice(1,$(elem).html().split(',').length).join(',').split('100')[0].replace('\n\t\t\t\t\t\t<br>','').replace('<br>','').replace("&apos;","'").replace("&amp;","&").trim());
    }
    zip.push($(elem).html().split('<br>')[3].trim().slice(- 5));
    address.push($(elem).html().split('<br>')[2].trim().split(',')[0].trim());
    if ($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0] == "125 - TWO FOR ONE - </b>"){
        groupName.push("125 - TWO FOR ONE");
    } else if ($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0].split('-')[0].replace("&apos;","'").replace("\'","'").trim() == "ANNEX                               (:I)"){
        groupName.push("ANNEX (:I)");
    } else if ($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0].split('-')[0].replace("&apos;","'").replace("\'","'").trim() == "ANNEX    (:II)"){
        groupName.push("ANNEX (:II)");
    } else if ($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0].split('-')[0].replace("&apos;","'").replace("\'","'").trim() == "PARK BENCH   (:I)"){
        groupName.push("PARK BENCH (:I)");
    } else if ($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0].split('-')[0].replace("&apos;","'").replace("\'","'").trim() == "NINTH AVENUE           (:I)"){
        groupName.push("NINTH AVENUE (:I)");
    } else if ($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0].split('-')[0].replace("&apos;","'").replace("\'","'").trim() == "FIRESIDE  (:I)  WEEKDAY MEETINGS ONLY"){
        groupName.push("FIRESIDE (:I) WEEKDAY MEETINGS ONLY");
    } else {
        groupName.push($(elem).html().split('<b>')[1].trim().split('<br>')[0].trim().split(',')[0].split('-')[0].replace("&apos;","'").replace("\'","'").trim());
    }
    if ($(elem).html().search("detailsBox") != -1){
        details.push($(elem).html().split('div')[1].split('\t')[1].split('\n')[0].replace("&apos;","'").replace("&amp;","&").replace("<br>","").replace("\'","'").trim());
    } else {
        details.push('');
    }
    if ($(elem).html().split('img').length == 2){
        wcAccess.push(1)
    } else {
        wcAccess.push(0)
    }
});
    var seperate = []
$("td[style='border-bottom:1px solid #e3e3e3;width:350px;']").each(function(i, elem) {
    seperate = $(elem).html().split('<br>\n                    \t<br>');
    var daytimes = [];
    for (let i = 0; i < seperate.length-1; i++){
        var daytimeobject = {
            day: "",
            startTime: "",
            endTime: "",
            meetingType: "",
            specialInterest: ""
        }
        daytimeobject.day = seperate[i].trim().split('From')[0].trim().split('<b>')[1];
        daytimeobject.startTime = seperate[i].trim().split('</b>')[1].trim().split('to')[0].split('<b>')[0].trim();
        daytimeobject.endTime = seperate[i].trim().split('<br>')[0].trim().split('</b>' + ' ')[2];
        if (seperate[i].trim().split('</b>').length == 5){
            daytimeobject.specialInterest = seperate[i].trim().split('</b>')[4].trim().split(' \n')[0];
            daytimeobject.meetingType = seperate[i].trim().split('</b>')[3].trim().split('<br>')[0];
        } else if (seperate[i].trim().split('</b>').length == 4){
            daytimeobject.meetingType = seperate[i].trim().split('</b>')[3].trim().split(' \n')[0];
        };
        daytimes.push(daytimeobject);
    }
    dayTime.push(daytimes);
    console.log(daytimes);
});
