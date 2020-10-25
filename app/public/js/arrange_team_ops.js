function applyFilterBtnClick(event){
    console.log("dsadsadsadsadsa");
    var teamSelect = document.getElementById("Team_Option");
    var posSelect = document.getElementById("Position_Option");
    var teamId = teamSelect[teamSelect.selectedIndex].value;
    var posId = posSelect[posSelect.selectedIndex].value;
    console.log("teamId: " + teamId);
    console.log("posId: " + posId);
    if(teamId != 0 && posId != 0)
        window.location.href='/team/arrange/tId/' + teamId + '/pId/' + posId;
    else if(teamId != 0){
        window.location.href='/team/arrange/tId/' + teamId;
    }
    else if(posId != 0){
        window.location.href='/team/arrange/pId/' + posId;
    }
    else{
        window.location.href='/team/arrange';
    }    
}

function addFootballerOnClick(footballerId){
    console.log("footballerId: " + footballerId);
    if(footballerId != 0 && footballerId != "")
        window.location.href='/team/add_footballer/fId/' + footballerId;
}