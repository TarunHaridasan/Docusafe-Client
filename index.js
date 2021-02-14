//Get the fingerprint of the browser client
function getFingerprint() {
    return new Promise(function(fulfill, reject) {
        biri()
        .then(resp=> {
            fulfill(resp);
        })
        .catch(err => {
            reject(err);
        })
    });
}
//Print catalogue
function print(data) {
    for (i=0; i<data.documents.length; i++) {
        docName =  data.documents[i].name
        $("#docList").append(`<h2 class="document" id="${docName}">${docName}</h2>`);
    }
    $(`.document`).click(function() {
        $("#pdfBox").attr("src", "")
        reqDoc(this.id)
    });
}
//Retrieve data associated with the fingerprint from the server
function retrieveData(fingerprint) {
    return new Promise(function (fulfill, reject){
        $.post("./PHP/retrieveData.php", {"fingerprint": fingerprint}, function(data) {
            fulfill(data);
        }, "json");
    });    
}
//Redeem a key under a fingerprint
function redeemKey(key) {
    fingerprint = localStorage.getItem("fingerprint");
    $.post("./PHP/redeemKey.php", {"key": key, "fingerprint": fingerprint}, function(data) {
        console.log(data);
        location.reload()
    }, "json");
}
//Request a document
async function reqDoc(docName) {
    fingerprint = localStorage.getItem("fingerprint")
    $.post("./PHP/requestDoc.php", {"fingerprint": fingerprint, "docName": docName}, function(data){
        $("#pdfBox").attr("src", data);
    });    
}
//Event Listners
$(document).ready(function(){
    $("#btnSubmit").click(function(){
        key = $("#keyBox").val()
        if (!key) {
            return alert("No key entered")
        }
        redeemKey(key)
    });  
    $(window).keyup(function(key) {
        if (key.which==44) {
            document.execCommand("copy");
        }
    })
    document.addEventListener('copy', function(e) {
        console.log("Copied")
        e.clipboardData.setData('text', "Copy is restricted")
        e.preventDefault();
    });
});
//Main function
async function main() {
    fingerprint = await getFingerprint()
    localStorage.setItem("fingerprint", fingerprint);
    data = await retrieveData(fingerprint);
    print(data)
}
//Main Code
main()

