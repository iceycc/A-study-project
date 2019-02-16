let xhr = new XMLHttpRequest();
// xhr.open('GET','/api/user',true);
xhr.open('GET','/user',true);
xhr.onload = function(){
    console.log(xhr.response)
}
xhr.send();
