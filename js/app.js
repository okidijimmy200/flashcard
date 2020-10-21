
//create func responsible for event listeners
function eventListeners(){
    const showBtn = document.getElementById("show-btn");
    const questionCard = document.querySelector(".question-card");
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("question-form");
    const feedback = document.querySelector(".feedback");
    const questionInput = document.getElementById("question-input");
    const answerInput = document.getElementById("answer-input");
    const questionList = document.getElementById("questions-list");
    let data = []; //wherre we keep our qtns
    let id = 1;
// new UI istance
    const ui = new UI();
    // method on UI to show the actual qtn(show qtn form)
    showBtn.addEventListener('click', function(){
        ui.showQuestion(questionCard)
    });
    //hide qtn form
    closeBtn.addEventListener('click', function(){
        ui.hideQuestion(questionCard)
    })
    //form submission of add question
    form.addEventListener('submit', function(event){
        //prevent default behaviour
        event.preventDefault();

//select values we have in the form
        const questionValue = questionInput.value;
        const answerValue = answerInput.value;

          //check if the question value is == ''
    if(questionValue === '' || answerValue === ''){
        feedback.classList.add('showItem', 'alert-danger');
        //text content for feedback
        feedback.textContent = 'Cannot add empty values'
        //settimeout func
        setTimeout(function(){
            feedback.classList.remove('alert-dnger', 'showItem')
        },4000)
    }
    //incase of values
    else {
        //use the Question Constructor func
        //new instance of constructor func
        const question = new Question(id, questionValue, answerValue)
         //push data into empty array
         data.push(question)
         id++;
         ui.addQuestion(questionList, question)
         //run 2 func after submitting func successfully
         //1_if successfully answer qtn, clear input form
        ui.clearFields(questionInput, answerInput) 

        //2) add of question to list

        
    }

    })
    //work with question edits and delete
    questionList.addEventListener('click',function(event){
        event.preventDefault();
        //elisten to delete target
        if(event.target.classList.contains('delete-flashcard')){
            //delete qtn from DoM
            let id = event.target.dataset.id;
            questionList.removeChild(
                event.target.parentElement.parentElement.parentElement
                );
                 // rest of data
                 let tempData = data.filter(function(item){
                    return item.id !== parseInt(id)
                })
                data = tempData
            
        }
        //for show answer optiom
        else if(event.target.classList.contains('show-answer')){
            event.target.nextElementSibling.classList.toggle('showItem')
        }
        //for edit
        else if(event.target.classList.contains('edit-flashcard')){
            //delete qtn from DoM
            let id = event.target.dataset.id;
            //delete qtn 
            questionList.removeChild(
                event.target.parentElement.parentElement.parentElement
                );
                //show the qtn card
                ui.showQuestion(questionCard)
                // look for specific qtn
                const tempQuestion = data.filter(function(item){
                    return item.id === parseInt(id)
                })
                // rest of data
                let tempData = data.filter(function(item){
                    return item.id !== parseInt(id)
                })
                
                data = tempData
                questionInput.value = tempQuestion[0].title
                answerInput.value = tempQuestion[0].answer
                
        }

    });

}
//constructor func for display(use capital for constructor func)
function UI(){

}

//creating the prototype property to show question card
UI.prototype.showQuestion = function(element){
    element.classList.add('showItem')
}
//creating the prototype property to hide question card
UI.prototype.hideQuestion = function(element){
    element.classList.remove('showItem')
}

//addQuestions to grab vaues to DOM
UI.prototype.addQuestion =function(element, question){
    //create a newDIV and insert all values from the DOM
    const div = document.createElement('div');
    //add class
    div.classList.add('col-md-4');
    div.innerHTML = `
    <div class="card card-body flashcard my-3">
    <h4 class="text-capitalize">${question.title}</h4>
    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
    <h5 class="answer mb-3">${question.answer}</h5>
    <div class="flashcard-btn d-flex justify-content-between">

     <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
     <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${question.id}">delete</a>
    </div>
   </div>
    `
    //call the appendCChild
    element.appendChild(div);
}
//clearfields prototype
UI.prototype.clearFields = function(question, answer){
    //pass the qtn
    question.value = '';
    answer.value = '';
}

//constructor for for qtn asked accepts 3 params id, title, answer
function Question(id, title, answer){
    this.id = id;
    this.title = title;
    this.answer = answer
}
//add func when DOM event is loaded
document.addEventListener('DOMContentLoaded', function(){
    eventListeners(); //call the eventListenr when the DOM is fully loaded  
})