const AWS = require('aws-sdk');
// require('dotenv')
// AWS.config(process.env.AWS)


exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));
    const eventBody = JSON.parse(event.body)
    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        switch (event.httpMethod) {
            case 'POST':
                body = process(eventBody.image);
                break;
            default:
                throw new Error(`Unsupported method "${event.httpMethod}"`);
        }
    } catch (err) {
        statusCode = '400';
        body = err.message;
    } finally {
        body = JSON.stringify(body);
    }

    return {
        statusCode,
        body,
        headers,
    };
};

var process = async function(img){
    var rekognition = new AWS.Rekognition();
    var params = {
        Image: {
            Bytes: img
        },
        Attributes: [
            'BoundingBox',
        ]
    };
    return boundingbox = await rekognition.detectFaces(params, function(err, response){
        if (err){
            console.error(err);
            throw "Sparrow!";
        }
        var faces = []
        response.FaceDetails.forEach(data => {
            var faceInfo = {}
            faceInfo.width = data.BoundingBox.Width
            faceInfo.height = data.BoundingBox.Height
            faceInfo.left = data.BoundingBox.Left
            faceInfo.right = data.BoundingBox.Top
            faces.push(faceInfo)
        })
        return faces
    })
}

