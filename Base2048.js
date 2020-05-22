(function($) // début du pluggin
{
    $.fn.game2048 = function() //function game2048 du pluggin
    {
        let conditions = false;
        let loseDown = false;
        let loseLeft = false;
        let loseRight = false;
        let loseUp = false;
        let score = 0;
        
        // génération du tableau (table, tr, td) vide (rempli de zéros)
        function generateMap()
        {
            let table = $('<table></table>');
            for (let y = 0; y < 4; y++)
            {
                let line = $('<tr></tr>');
                for (let x = 0; x < 4; x++)
                {
                    let cell = $('<td>0</td>').attr('x', x).attr('y', y).attr('nbr', 0);
                    line.append(cell);
                }
                table.append(line);
            }
            return table;
        }

        // génération d'un certain nombre de cases (argument cases) aléatoirement placées sur les cases d'attribut 'nbr=0'
        function generateCell(cells)
        {
            for (let i = 0; i < cells; i++)
            {
                let empty = false;

                while (empty === false) // tant que la case récupéré aléatoirement n'est pas vide
                {
                    let x = Math.floor((Math.random() * 4));
                    let y = Math.floor((Math.random() * 4));
                    var elem = $('[x="' + x + '"][y="' + y + '"][nbr=0]');

                    if (elem[0])
                        empty = true;
                }

                let value =  2 * (Math.floor((Math.random() * 2) + 1));
                if (value === 4 && Math.random() > 0.5)
                    value = 2;


                elem.attr('nbr', value);
                elem.text(value);
            }
        }
             
        function condition(x,y,moveX, moveY){
            console.log("x,y",x,y);
            let elem = $('[x="' + x + '"][y="' + y + '"]');
            let nextElem = $('[x="' + parseInt(x+moveX) + '"][y="' + parseInt(y+moveY) + '"]');
            let value = elem.attr("nbr");
            let valueNext = nextElem.attr("nbr");
            console.log("value",value);
            if (value == 0 || value == valueNext){
                console.log("YAS");
                console.log("nextElemX",nextElem.attr("x"));
                console.log("nextElemY",nextElem.attr("y"));
                let valueNew = parseInt(elem.attr("nbr")) + parseInt(nextElem.attr("nbr"));
                if(value!=0){
                    score = valueNew + score;
                    $(".Score").text("Score = "+score);
                }
                console.log("valueNew :",valueNew);
                elem.attr("nbr", valueNew);
                elem.text(valueNew);
                nextElem.attr("nbr", 0);
                nextElem.text("0");
                conditions = true;
                if(valueNew == 2048){
                    alert("Tu n'es pas si nul que ça, tu vois!");
                    return endGame();
                }
            }
            else {
                console.log("DONOTHING");
            }
        }

     function endGame() {
        $(".Games").hide();
        $(".FinishScreen").show();
    }

    function gameOver() {
        $(".Games").hide();
        $(".GameOver").show();
    }

    function loseReset() {
        loseDown = false;
        loseLeft = false;
        loseRight = false;
        loseUp = false;

    }

    /*
    function createCookie(name,cookieValue,date) {
        if (date) {
            var date = new Date();
            date.setTime(date.getTime()+(date*24*60*60*7));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+cookieValue+expires+"; path=/";
    }
    
    function readCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    
    function eraseCookie(name) {
        createCookie(name,"",-1);
    }
    */

        // fonction de gestion des évenements (appuie de touches)
        $('html').keydown(function(event) {
        
            switch (event['key']) {
        
                case 'ArrowLeft':
                    console.log("Left");
                    conditions = false;
                   
             for(let i=0; i<3; i++){
                 for (let y = 0; y < 4; y++){
                     for (let x = 0; x < 3; x++){
                        condition(x,y,1,0);
                     }
                     
                 }    
             }

             if(conditions === true){
             generateCell(1);
             loseReset();
             }
             else {
                loseLeft = true; 
                alert("Essaye un autre coté, tu vois pas que ça fonctionne pas?!");
            }
            
                    break;
                case 'ArrowUp':
                    // insérer algo move up
                    console.log("Up");
                    conditions = false;

                    for(let i=0; i<3; i++){
                        for (let y = 0; y < 3; y++){
                            for (let x = 0; x < 4; x++){
                               condition(x,y,0,1);
                            } 
                        }    
                    }
                    if(conditions === true){
                    generateCell(1);
                    loseReset();
                    }
                    else {
                        loseUp = true; 
                        alert("Essaye un autre coté, tu vois pas que ça fonctionne pas?!");
                    }


                    break;
                case 'ArrowRight':
                    // insérer algo move right

                    console.log("Right");
                    conditions = false;

                    for(let i=0; i<3; i++){
                        for (let y = 0; y < 4; y++){
                            for (let x = 1; x < 4; x++){
                               condition(x,y,-1,0);
                            }
                            
                        }    
                    }
                    if(conditions === true){
                    generateCell(1);
                    loseReset();
                    }
                    else {
                        loseRight = true;
                        alert("Essaye un autre coté, tu vois pas que ça fonctionne pas?!");
                    }

                    break;
                case 'ArrowDown':
                    // insérer algo move down
                    console.log("Down");
                    conditions = false;

                    for(let i=0; i<3; i++){
                        for (let y = 1; y < 4; y++){
                            for (let x = 0; x < 4; x++){
                               condition(x,y,0,-1);
                            }
                            
                        }    
                    }
                    if(conditions === true){
                        generateCell(1);
                        loseReset();
                    }
                    else {
                        loseDown = true;
                        alert("Essaye un autre coté, tu vois pas que ça fonctionne pas?!");
                    }
                    
                    break;
                }

        if(loseDown && loseLeft && loseRight && loseUp){

            return gameOver();
        }
            
        });

        // début du code lancé
        $(this).append(generateMap()); // génération du tableau vide
        generateCell(2); // génération aléatoire de deux cases pleines (2 ou 4)
    
        }

})(jQuery); // fin du pluggin