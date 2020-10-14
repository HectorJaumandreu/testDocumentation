"use strict"; 
/**
 *parseInputs(['src/*.js'], {'ignore': [], 'parser': 'dox', 'layout': 'markdown'}).then(content => {});
 * @typedef json
 * @type{object}
 */

/**
 * @typedef configuration
 * @type {object}
 * @property {string} apiKey - Api Key used for authenticate the app against the API provider.
 * @property {number} number - Number of elements retreived by default.
 * @property {string} ingredientImgBasePath_sm  - Base path to retreive small (100x100) ingredient images.
 * @property {string} ingredientImgBasePath_md - Base path to retreive medium (250x250) ingredient images.
 * @property {string} ingredientImgBasePath_lg - Base path to retreive large (500x500) ingredient images.
 * @property {string} apiBasePath - Base path to call the food API.
 * @property {string} recipeDetail - relative Path to call Recipe Detail page.
 * @property {boolean} proxy  - If False Forces to allways call the API. If True tries to get the data from the session.
 * @property {boolean} debug - Indicates wether the debug traces are on.
 * @property {string} debug - Name of the div container where the error messages are going to be displayed.
 */

 /** @type {configuration} */
const config = {
    apiKey : "697ee4aa6e654196b37a285dcb052e1a",
    number : "10",
    ingredientImgBasePath_sm : "https://spoonacular.com/cdn/ingredients_100x100/",
    ingredientImgBasePath_md : "https://spoonacular.com/cdn/ingredients_250x250/",
    ingredientImgBasePath_lg : "https://spoonacular.com/cdn/ingredients_500x500/",
    recipeImgBasePath : "https://spoonacular.com/recipeImages/",
    recipeImgBig : "636x393",
    apiBasePath : "https://api.spoonacular.com/",
    recipeDetail : "pruebas.html",
    proxy: true,
    debug: true,
    alertContainer : "alerts"
    
    
}


/**
 * Logs a text in debug mode.
 * @param {string} text - Text to go in the console.log when the configuration is debug=true
 */
function trace(text) {
    if (config.debug) {
        console.log(text);
    }
}



 /**
 *Returns the location.search (query string, tail part of a URL after the symbol ?) as a JSON object
  * @return {json} The string as a JSON object.
 */
function QueryStringtoJSON() {


    var str = location.search.slice(1);                                     //Slices the heading "?"
    if (str != "") {
        var jsonStr = "{";                                                  //Initialize the string representation of the JSON output.
        var pairsArray = str.split("&");                                    //Array with the pairs Key value comming from the query string.
        for (let x in pairsArray) {
            var pair = pairsArray[x].split("=");                            //Array with two positions 0 is Key, 1 is Value.
            jsonStr += '"' + pair[0] + '"' + ' : ' + '"' + pair[1] + '",';  // Format the pair in JSON format.
        }
        jsonStr = jsonStr.slice(0,-1);                                      // Deletes the last ","
        jsonStr += "}";                                                     //Closes the JSON string with a }

        var jsonObj = JSON.parse(jsonStr);                                  //Parses the string into JSON
        if (config.debug) {
            console.log(jsonObj);                                           //Log the converted object
        }
    }
    else {
        jsonObj = null;                                                     //When the query string is empty we returns null object.
    }
    return jsonObj;
}


/**
 * Displays a Bootstrap alert including the information of the error thrown by the API
 */
function displayBootstrapError(errorText) {
    /**
     * Creates the alert.
     */
    var divAlert = document.createElement('div');
    divAlert.setAttribute("class", "alert alert-warning alert-dismissible fade show");
    divAlert.setAttribute("role", "alert");
    var errorText = document.createTextNode(errorText);
    divAlert.appendChild(errorText);
    /**
     * Adds the button for closing
     */
    var button = document.createElement('button');
    button.setAttribute("type", "button");
    button.setAttribute("class", "close");
    button.setAttribute("data-dismiss", "alert");
    button.setAttribute("aria-label", "Close");
    divAlert.appendChild(button);
    /**
     * Adds the close character to the button.
     */
    var span = document.createElement('span');
    span.setAttribute("aria-hidden", "true");
    var hiddenText = document.createTextNode('×');
    span.appendChild(hiddenText);
    button.appendChild(span);
    /**
     * Append the alert to the alert container.
     */
    var containerDiv = document.getElementById(config.alertContainer);
    containerDiv.appendChild(divAlert);
}
