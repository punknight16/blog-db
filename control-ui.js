function openReplyContainer(id){
  var modal = document.getElementById("replyContainer");
  modal.style.display = "block";
  document.getElementById("articleId").value = id;
}

function uploadReply(){
  var replyInp = document.getElementById("replyInp").innerHTML;
  var emailAddr = AppContext.emailAddr;
  var domain = window.location.hostname;
  var articleId = document.getElementById("articleId").value;

  fetch('https://6y3bnx93ub.execute-api.us-west-2.amazonaws.com/prod/add', {
      method: 'POST', // or 'PUT'
      body: JSON.stringify({
        EmailAddr: emailAddr,
        DomainName: domain,
        PublishDate: articleId,
        ReplyString: replyInp
      }),
    })
      .then((response) => {
        console.log(response)
        var modal = document.getElementById("replyContainer");
        modal.style.display = "none";
        alert('refresh page to see your reply posted');
      }) 
}
