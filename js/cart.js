const countUpBtn = document.querySelectorAll('.count-up');
const countDownBtn = document.querySelectorAll('.count-down');
let countNum = document.querySelectorAll('.quantity');
let deleteItem =  document.querySelectorAll('.delete-item')
let items = [...document.querySelectorAll('.product')]
let father = document.querySelector('.items')
 
countUpBtn.forEach(btn=>{
    btn.addEventListener('click', (e)=>{
        let id = (e.target.dataset.id);
        countNum.forEach((num)=>{
            let numId= (num.dataset.id);
            if(numId === id){
                (num.innerText++);
            }
        })
    })
})
countDownBtn.forEach( btn => {
    btn.addEventListener('click', (d) =>{
        let id = (d.target.dataset.id);
        countNum.forEach(num => {
            let numId = (num.dataset.id);
            if(numId === id){
                (num.innerText -= 1);
            }    
        })
    })
    
});

deleteItem.forEach(del => {
    del.addEventListener('click', (e)=>{
        e.target.parentElement.parentElement.remove()
    
    })
    
});