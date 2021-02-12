let server = "http://127.0.0.1:5000/";
server = "https://codetrinkets.ca:1222/";

//Get the fingerprint of the browser
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
//Retrieve data associated with the fingerprint from the server
function retrieveFingerprintData(fingerprint) {
    return new Promise(function (fulfill, reject){
        fetch(`${server}/retrieveData/${fingerprint}`)
        .then(resp => {
            fulfill(resp.json());
        })
        .catch(err=> {
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

//Redeem a key
async function redeemKey(key) {
    fingerprint = localStorage.getItem("fingerprint")
    fetch(`${server}/redeemKey/${fingerprint}/${key}`)
    location.reload()
}

//Request a document
async function reqDoc(docName) {
    fingerprint = localStorage.getItem("fingerprint") ///viewer/web/viewer.html?file=http://127.0.0.1:5000/retrieveDocument/1234/ATS
    $("#pdfBox").attr("src", `/Viewer/web/viewer.html?file=${server}/retrieveDocument/${fingerprint}/${docName}`)
}

//Event Listners
$(document).ready(function(){
    $("#btnSubmit").click(function(){
        key = $("#keyBox").val()
        console.log(key)
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
    console.log(fingerprint)
    localStorage.setItem("fingerprint", fingerprint)
    data = await retrieveFingerprintData(fingerprint)
    console.log(data)
    print(data)
}

//Main Code
main()


