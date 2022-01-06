const CONFIRMAR = document.querySelector('#confirmar')
CONFIRMAR.addEventListener('click',sendGet)

const DELETE = document.querySelector('#button_delete')
DELETE.addEventListener('click',sendDelete)

const inputForm = document.querySelector("#form_input")
inputForm.addEventListener("keyup", showSuggestions);

document.querySelector('form').addEventListener('click',stopDefAction)
function stopDefAction(evt) {
    evt.preventDefault();
}
    let IsTimeout = false
    const  intervalRequest = window.setInterval(()=>IsTimeout = false, 2000);
    function showSuggestions(){
        const inputForm = document.querySelector("#form_input")
        if(IsTimeout) return 
        if(typeData() == 'id'){
            IsTimeout = true
            sendGet()
        }
        else if(inputForm.value.length >=3){
            IsTimeout = true
            sendGet()
        }
    }
    function typeData(){
        const selectElement = document.querySelector('#type_data')        
        const typeData = selectElement.options[selectElement.selectedIndex].value;
        return typeData
    }
    function catData(){
        const inputElement = document.querySelector('#form_input')
        const valueInput = inputElement.value
        return valueInput
    }
    function catIpDelete(){
        const IP = document.querySelector('#form_input_delete')
        return IP.value
    }
    function request(url,requestOptions,callback){
        fetch(url,requestOptions)
            .then(function(response){
                if(!response.ok) throw new Error("Erro ao executar requisição")
                return response.json()
            })
            .then(function(data){
                if(!data){
                    alert('Não a informações valida')
                }else{
                    callback(data)
                }
            })
            .catch(function(error){
                console.error(error.message)
            })
    }
    function createTableFunction(data){
        document.querySelector('.result').innerHTML = ""
        for(let i=0;i<data.length;i++){
            addObj(data[i])
        }
    }
    function defineUrlGet(url){
        const TYPE = typeData()
        const VALUE = catData() 
        const URL = url.concat("?type=",TYPE,"&",TYPE,"=",VALUE)
        console.log("URL é ",URL)
        return URL        
    }
    
    function sendGet(){
        const requestOptions = {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        }
        const url = defineUrlGet('http://localhost:3004/pessoas/')
        request(url,requestOptions,createTableFunction)
    }
    function sendPut(){
        const id = catIpPut()
        
        const newPersonData = {
            "id":id
        };
        const requestOptions={
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPersonData)
        }
        const url = 'http://localhost:3004/pessoas/'.concat(id)
        request(url,requestOptions,createTableFunction)   
    }
    function sendDelete(){
        const id = catIpDelete()
        const requestOptions={
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        }
        const url = 'http://localhost:3004/pessoas/'.concat(id)
        request(url,requestOptions,createTableFunction)   
    }
    function addObj(obj){
        const elementName = document.createElement('ul');
        elementName.setAttribute('class','person_name')
        elementName.innerHTML = obj.name
        
        const elementId = document.createElement('ul');
        elementId.setAttribute('class','person_id')
        elementId.innerHTML = obj.id
        
        const elementEmail = document.createElement('ul');
        elementEmail.setAttribute('class','person_email')
        elementEmail.innerHTML = obj.email
        
        createTable(createPerson(elementName,elementId,elementEmail));
    }
    function createPerson(name,id,email){
        const PERSON = document.createElement('li')
        PERSON.setAttribute('class','person');
        PERSON.append(name);
        PERSON.append(id);
        PERSON.append(email);
        return PERSON
    }
    function createTable(Person){
        const RESULT = document.querySelector('.result')
        RESULT.append(Person);
    }