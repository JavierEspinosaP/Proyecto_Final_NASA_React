function handleClick() {
    /* Save value of myText to input variable */
    var input = document.getElementById("myText").value;
   
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(input);
     
    alert("Copied Text: " + input);
}

module.exports = {handleClick}