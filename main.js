var form=document.getElementById('addForm')
var msg=document.getElementById('msg')
var editItem=document.getElementById('items')
var deleteItem=document.getElementById('items')
var filter=document.getElementById('filter')
var userItem=document.getElementById('items')

form.addEventListener('submit',onSubmit)

filter.addEventListener('keyup',search)

function onSubmit(e){
    e.preventDefault()

    deleteItem.addEventListener('click',onDelete)
    editItem.addEventListener('click',onEdit)
    
    var expense=document.getElementById('expense').value
    var desc=document.getElementById('desc').value
    var category=document.getElementById('category').value
    var obj={
        exp:expense,
        des:desc,
        cat:category
    }

    if(expense===''||desc===''||category===''){
        msg.innerHTML='Please enter all fields'
        msg.style.color='red'
        setTimeout(()=>msg.remove(),3000)
    }

   

    var li=document.createElement('li')
    li.className='list-group-item'
    li.appendChild(document.createTextNode(expense+'-'+desc+'-'+category))

    var btn=document.createElement('button')
    btn.className='btn btn-danger btn-sm float-right delete'
    btn.innerHTML='DeleteExpense'
    li.appendChild(btn)

    var btnE=document.createElement('button')
    btnE.className='btn btn-primary btn-sm float-right edit'
    btnE.innerHTML='EditExpense'
    li.appendChild(btnE) 

    userItem.appendChild(li)

    //localStorage.setItem(obj.des,JSON.stringify(obj))
    //using axios
    axios.post("https://crudcrud.com/api/3c978aa96d0a40c48e0e38924a0ff967/appointment",obj)
    .then((response)=>{
        console.log(response.data)
    })
    .catch((err)=> console.log(err))
    document.getElementById('expense').value=''
    document.getElementById('desc').value=''
    document.getElementById('category').value=''
    


}

function onDelete(e){
    e.preventDefault()

    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure')){
            var li=e.target.parentElement
            var desc=li.textContent.split('-')[1]
            userItem.removeChild(li)
            localStorage.removeItem(desc)
        }
    }
}



function onEdit(e){
    e.preventDefault()

    if(e.target.classList.contains('edit')){
        
            var li=e.target.parentElement
            var expense=li.textContent.split('-')[0]
            document.getElementById('expense').value=expense
            var desc=li.textContent.split('-')[1]
            document.getElementById('desc').value=desc
            userItem.removeChild(li)
            localStorage.removeItem(desc)
        
    }
}

 function onLoad(){

    for (let i=0;i<localStorage.length;i++){
        const des=localStorage.key(i)
        const show=JSON.parse(localStorage.getItem(des))
        const { exp, cat }=show

    var li=document.createElement('li')
    li.className='list-group-item'
    li.appendChild(document.createTextNode(exp + '-' + des + '-' + cat)) 

    var btn=document.createElement('button') 
    btn.className='btn btn-danger btn-sm float-right delete'
    btn.innerHTML='DeleteExpense'
    li.appendChild(btn)

    var btnE=document.createElement('button')
    btnE.className='btn btn-primary btn-sm float-right edit'
    btnE.innerHTML='EditExpense'
    li.appendChild(btnE) 


    userItem.appendChild(li)

    btn.addEventListener('click',onDelete)
    btnE.addEventListener('click',onEdit)

    } 

}  

function search(e){
    e.preventDefault()
    var text=e.target.value.toLowerCase()
    var name=document.getElementsByTagName('li')

    Array.from(name).forEach(function (item){
        if(item.firstChild.textContent.toLowerCase().indexOf(text)!=-1){
            item.style.display='block'
        }
        else
        item.style.display='none'
    })

}

window.addEventListener('load',onLoad)