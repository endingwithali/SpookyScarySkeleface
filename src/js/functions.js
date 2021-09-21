async function submit(){
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
        const imageData = reader.readAsDataURL(file);
        await modifyImage(imageData)
    }
    
}

async function modifyImage(imageData){
    //${process.env.NETLIFY_URL}/.netlify/functions/aws-rekog
    await fetch(`/.netlify/functions/aws-rekog`, {
        method: 'post',
        body: JSON.stringify({
            image: imageData,
        }),
        headers: { 'Content-Type': 'application/json' },
    })
    .then((res) => res.json())
    // .then((response) => {
    // });
}
