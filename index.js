//Get the fingerprint of the browser
function getFingerprint() {
    return new Promise(function(fulfill, reject) {
        biri()
        .then(resp=> {
            fulfill(resp)
        })
        .catch(err => {
            reject(err)
        })
    });
}

//Retrieve data associated with the fingerprint from the server
function retrieveFingerprintData(fingerprint) {
    return new Promise(function (fulfill, reject){
        fetch(`http://155.138.150.105:1222/retrieveData/${fingerprint}`)
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
        $("#docList").append(`<h2 class="documents" id="${docName}">${docName}</h2>`);
    }
    $(`.documents`).click(function() {
        $("#pdfBox").attr("src", "")
        reqDoc(this.id)
    });
}

//Redeem a key
async function redeemKey(key) {
    fingerprint = localStorage.getItem("fingerprint")
    fetch(`http://155.138.150.105:1222/redeemKey/${fingerprint}/${key}`)
    location.reload()
}

//Request a document
async function reqDoc(docName) {
    fingerprint = localStorage.getItem("fingerprint")
    $("#pdfBox").attr("src", `http://155.138.150.105:1222/retrieveDocument/${fingerprint}/${docName}#toolbar=0`)
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