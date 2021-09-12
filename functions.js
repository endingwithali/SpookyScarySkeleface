$('#submit').click(function(){
    var file = document.getElementById("fileUpload").files[0]
    const reader = new FileReader();
    if (file) {
        reader.onerror = function(e){
            //handle error
        }  
        reader.onloadend = function (e) {
            console.log(e.target.result)

            // process image to aws lambda function
            document.getElementById("fileUpload").value = ""

        }
        reader.readAsDataURL(file);
    }
})


