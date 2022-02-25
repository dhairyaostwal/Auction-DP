function submitData(){
    var aadhar = document.getElementById("aadhar").value
    var first = document.getElementById("first").value
    var gender = document.getElementById("gender").value
    var age = document.getElementById("age").value
    var state = document.getElementById("state").value
    var city = document.getElementById("city").value
    var pincode = document.getElementById("pincode").value

    var data = JSON.stringify({
        "aadhar": aadhar,
        "first": first,
        "gender": gender,
        "age": age,
        "state": state,
        "city": city,
        "pincode": pincode
      });
      console.log(data)
      
      var xhr = new XMLHttpRequest();
    //   xhr.withCredentials = true;
      
      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
          console.log(this.responseText);
        }
      });
      
      xhr.open("POST", "https://dp-auction.herokuapp.com/api/new");
      xhr.setRequestHeader("Content-Type", "application/json");
      
      xhr.send(data)
    
          window.location.replace('./table.html')
}

function getData(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://dp-auction.herokuapp.com/api/all", requestOptions)
        .then(response => response.text())
        .then(result => {
            var table = document.getElementById('dvTable');
            var tr = document.createElement('tr');   

            var td1 = document.createElement('th');
            var td2 = document.createElement('th');
            var td3 = document.createElement('th');
            var td4 = document.createElement('th');
            var td5 = document.createElement('th');
            var td6 = document.createElement('th');
            var td7 = document.createElement('th');
            var td8 = document.createElement('th');
            var text1 = document.createTextNode("aadhar");
            var text2 = document.createTextNode("age");
            var text3 = document.createTextNode("city");
            var text4 = document.createTextNode("state");
            var text5 = document.createTextNode("first");
            var text6 = document.createTextNode("gender");
            var text7 = document.createTextNode("pincode");
            var text8 = document.createTextNode("id");
        
            td1.appendChild(text1);
            td2.appendChild(text2);
            td3.appendChild(text3);
            td4.appendChild(text4);
            td5.appendChild(text5);
            td6.appendChild(text6);
            td7.appendChild(text7);
            td8.appendChild(text8);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td5);
            tr.appendChild(td6);
            tr.appendChild(td7);
            tr.appendChild(td8);

            result = JSON.parse(result)
for (var i = 0; i < result.data.length; i++){
    console.log(result.data[i])
    var tr = document.createElement('tr');   

    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    var td8 = document.createElement('td');
    

    var text1 = document.createTextNode(result.data[i].aadhar);
    var text2 = document.createTextNode(result.data[i].age);
    var text3 = document.createTextNode(result.data[i].city);
    var text4 = document.createTextNode(result.data[i].state);
    var text5 = document.createTextNode(result.data[i].first);
    var text6 = document.createTextNode(result.data[i].gender);
    var text7 = document.createTextNode(result.data[i].pincode);
    var text8 = document.createTextNode(result.data[i].id);

    td1.appendChild(text1);
    td2.appendChild(text2);
    td3.appendChild(text3);
    td4.appendChild(text4);
    td5.appendChild(text5);
    td6.appendChild(text6);
    td7.appendChild(text7);
    td8.appendChild(text8);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td6);
    tr.appendChild(td7);
    tr.appendChild(td8);

    table.appendChild(tr);
}
document.body.appendChild(table);
        })
        .catch(error => console.log('error', error));
}