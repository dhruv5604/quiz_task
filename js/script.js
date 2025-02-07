let answers = JSON.parse(localStorage.getItem("answers")) || []

document.getElementById("form1").addEventListener("submit", (e) => {
    e.preventDefault();
    // let option = document.getElementsByName("que1");
    // for(i=0 ; i<option.length;i++){
    //     if(option[i].checked){
    //         console.log(option[i].value);
    //     }
    // }


    let cl = document.getElementsByClassName("ques");

    for (let cla of cl) {
        let name = cla.name;
        let option = document.getElementsByName(name);
        for (i = 0; i < option.length; i++) {
            if (option[i].checked) {
                console.log(option[i].value);
            }
        }
    }
})
