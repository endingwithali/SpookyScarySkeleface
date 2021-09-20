function submit(){
    var file = document.getElementById("fileUpload").files[0]
    const reader = new FileReader();
    if (file) {
        console.log(file)
        reader.onerror = function(e){
            console.log(e)
        }  
        reader.onloadend = function (e) {
            console.log(e.target.result)

            // process image to aws lambda function
            document.getElementById("fileUpload").value = ""

        }
        reader.readAsDataURL(file);
    }
}


