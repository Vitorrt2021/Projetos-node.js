
const inputForm = document.querySelector("#form_input")
inputForm.addEventListener("input", showSuggestions);

const button_get = document.querySelector('#button_get')
button_get.addEventListener('click',sendGet)
button_get.addEventListener('click',stopDefAction)

const button_formGet_put = document.querySelector('#button_form_get_post')
button_formGet_put.addEventListener('click',()=>showElement('.form_put'))
button_formGet_put.addEventListener('click',stopDefAction)

createFormButton('post',sendPost)
createFormButton('delete',sendDelete)
createFormButton('put',sendPut)
cancelScreen()
function createFormButton(nameElement,func){
    const element = document.querySelector('#button_'+nameElement)
    element.addEventListener('click',func)
    element.addEventListener('click',stopDefAction)
    element.addEventListener('click',()=>{hideElement('.form_'+nameElement)})
}

function createFormButtonCancel(nameElement){
    const element = document.querySelector('#button_'+nameElement+'_cancel')
    element.addEventListener('click',stopDefAction)
    element.addEventListener('click',()=>{hideElement('.form_'+nameElement)})
}
function cancelScreen(){
    createFormButtonCancel('put')
    createFormButtonCancel('post')
    createFormButtonCancel('delete')
}
function showElement(nameElement){
    const element = document.querySelector(nameElement)
    element.style.display = 'flex'
}
function hideElement(nameElement){
    const element = document.querySelector(nameElement)
    element.style.display = 'none'
}

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
    function getValue(elementSelector){
        const val = document.querySelector(elementSelector)
        return val.value
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
                alert(error.message)
            })
    }
    function createTableFunction(data){
        document.querySelector('#result').innerHTML = ''
        if(data.length < 1) return
        document.querySelector('#result').innerHTML = `
        <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>EMAIL</th>
        </tr>
        `
        for(let i=0;i<data.length;i++){
            createLine(data[i])
        }
    }
    function defineUrlGet(url){
        const TYPE = typeData()
        const VALUE = getValue('#form_input') 
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
    function sendPost(){
        const name = getValue('#form_input_name_post')
        const email = getValue('#form_input_email_post')
        const newPersonData = {
            "name" :name,
            "email": email,
        };
        const requestOptions={
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPersonData)
        }
        const url = 'http://localhost:3004/pessoas/'
        request(url,requestOptions,createTableFunction)   
    }
    function sendPut(){
        const id = getValue('#form_input_id_put')
        const name = getValue('#form_input_name_put')
        const email = getValue('#form_input_email_put')
        const newPersonData = {
            "name" :name,
            "email": email,
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
        const id = getValue('#form_input_delete')
        const requestOptions={
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        }
        const url = 'http://localhost:3004/pessoas/'.concat(id)
        request(url,requestOptions,createTableFunction)   
    }
    function createLine(obj){
        const line = document.createElement('tr')
        line.append(createColumn(obj.id,"id"))
        line.append(createColumn(obj.name,"name"))
        line.append(createColumn(obj.email,"email"))
        line.append(createButtonColumn(showElement,'delete'))
        line.append(createButtonColumn(showElement,'put'))
        const table = document.querySelector('#result')
        table.append(line)
    }
    function createButtonColumn(func,type){
        const column = document.createElement('td')
        const button = document.createElement('button')
        button.setAttribute('class','table_'+type)
        button.addEventListener('click',()=>{func('.form_'+type)})
        button.innerHTML = type
        column.append(button)
        return column
    }
    function createColumn(value,type){
        const column = document.createElement('td')
        column.setAttribute("class", "table_"+type);
        column.innerHTML = value
        return column
    }