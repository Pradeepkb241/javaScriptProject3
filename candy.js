const API_URL = "https://crudcrud.com/api/1aeefa1239b84212a985edc3c01c4f6e";
window.onload = ()=>{
    
    axios.get(API_URL+"/addToItem")
    .then(res=>{
        console.log(res);
        for(const e of res.data){
        showOnUserScreen(e);
        }
    }).catch(err=>console.log(err));
   
}

function addItem(event) {
    event.preventDefault();

    let candy = event.target.candy.value;
    let description = event.target.description.value;
    let price = event.target.price.value;
    let quantity = document.getElementById('table');
    let value = quantity.value;
    var text = quantity.options[quantity.selectedIndex].text;
    

    let obj = {
        Candy: candy,
        Description: description,
        Price: price,
        Quantity: text,
        Value:value
    
    }

    axios.post(API_URL+"/addToItem", obj)
    .then(res=> {
        showOnUserScreen(obj);
       
    })
    .catch(err=>console.log(err));

    event.target.reset();

}

function showOnUserScreen(obj) {
    let parentELement = document.getElementById('listOfItem');
    let childElement = document.createElement('li');
    childElement.textContent = obj.Candy + '- ' + obj.Description + '- ' + obj.Price +'- '+obj.Value;
    parentELement.appendChild(childElement);

    let btn1 = document.createElement('button');
    btn1.textContent = 'Buy 1';
    childElement.appendChild(btn1);

    let btn2 = document.createElement('button');
    btn2.textContent = 'Buy 2';
    childElement.appendChild(btn2);

    let btn3 = document.createElement('button');
    btn3.textContent = 'Buy 3';
    childElement.appendChild(btn3);

    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    childElement.appendChild(deleteBtn);

    btn1.addEventListener('click', function () {
            const id = obj._id;
            let remains = obj.Value - 1;
            axios.put(API_URL+`/addToBill/${id}`, { Value: remains })
            .then(res=>{
                obj.Value = remains;
                childElement.textContent = `${obj.Candy} - ${obj.Description} - ${obj.Price} - ${obj.Value}`;
                // console.log(res);
            }).catch(err=>console.log(err));
           
        
    });
    btn2.addEventListener('click', function () {
            const id = obj._id;
            let remains = obj.Value - 2;
            axios.put(API_URL+`/addToBill/${id}`, { Value: remains })
            .then(res=>{
                obj.Value = remains;
                childElement.textContent = `${obj.Candy} - ${obj.Description} - ${obj.Price} - ${obj.Value}`;
                // console.log(res);
            }).catch(err=>console.log(err));
           
        
    });
    btn3.addEventListener('click', function () {
            const id = obj._id;
            let remains = obj.Value - 3;
            axios.put(API_URL+`/addToBill/${id}`, { Value: remains })
            .then(res=>{
                obj.Value = remains;
                childElement.textContent = `${obj.Candy} - ${obj.Description} - ${obj.Price} - ${obj.Value}`;
                // console.log(res);
            }).catch(err=>console.log(err));
           
        
    });

    
    deleteBtn.addEventListener('click', function () {
        removeList(childElement);
            const id = obj._id;

            axios.delete(API_URL+`/addToItem/${id}`)
            .then(res=>{
                console.log(res);
            }).catch(err=>console.log(err));
           
        
    });
   
 }



    function removeList(listItem) {
        let parentList = listItem.parentElement;
        parentList.removeChild(listItem);
    }


