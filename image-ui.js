$("#imgInp").change(function(){
  console.log('imgInp changed');
  readURL(this);
});

$("#uploadImgBtn").click(function(){
  uploadImage(document.getElementById("imgInp"), function(err, msg){
    if(err) {
      var modal = document.getElementById("profileContainer");
      modal.style.display = "none";
      alert(err);
    } else {
      var modal = document.getElementById("profileContainer");
      modal.style.display = "none";
      alert(msg);
    }
  });
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var img = input.files[0];
    var reader = new FileReader();
      
    reader.onload = function (e) {
        $('#image').attr('src', e.target.result);
        
    }
    
    reader.readAsDataURL(input.files[0]);
  }
  
}

var s3 = new AWS.S3({
  "region": "us-west-2",
  "accessKeyId": AWS.config.credentials.accessKeyId,
  "secretAccessKey": AWS.config.credentials.secretAccessKey
});

var bucket = "unwyre-user"

function uploadImage(input, cb) {
    
  if (input.files && input.files[0]) {
    var img = input.files[0];
    var filename = getFilename(input);
    var identityId = AWS.config.credentials.identityId;
    console.log('identityId: ', identityId );
    console.log("Filename: " + img.name);
    console.log("Type: " + img.type);
    console.log("Size: " + img.size + " bytes");
    

    var params = {
      Bucket: bucket,
      Key: "profile-image/"+identityId+"/"+filename,
      ACL: "public-read",
      ContentType: img.type,
      Body: img
    };
    s3.putObject(params, function(err, data) {
      if (err) {
        return cb(err);
      } else {
        var msg = 'Your image is hosted at <https://unwyre-user.s3-us-west-2.amazonaws.com/profile-image/';
        msg+= identityId;
        msg+="/";
        msg+=filename.replace(/%20/g,"+");
        msg+=">";
        return cb(null, msg);
      }
    });
  }
}

function getFilename(input){
  var fullPath = input.value;
  if (fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1);
      }
      return filename
  }
}