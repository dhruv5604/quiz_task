let result = parseInt(localStorage.getItem("result"));

document.getElementById("ans1").innerHTML = 'correct: ' + result + '<br>Incorrect: ' + (4-result);