
// const questions = [
//     {
//         question:"What is the smallest country in the world?",
//         awnsers:[
//             {Text:"Vatican City" ,correct: true},
//             {Text:"Tokyo", correct:false},
//             {Text:"london", correct:false}
//         ]
//     },
//     {
//         question:"What is the name of the biggest technology company in South Korea?",
//         awnsers:[
//             {Text:"Nokia", correct:false},
//             {Text:"Samsung", correct:true},
//             {Text:"LG", correct:false}
//         ]
//     },
//     {
//         question:"Havana is the capital of what country?",
//         awnsers:[
//             {Text:"Chely", correct:false},
//             {Text:"Canada", correct:false},
//             {Text:"Cuba", correct:true}
//         ]
//     }
// ];
//this was a fixed test questoins ^^

async function quiz(){
  const respon = await fetch('https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple');

  if(respon.status == 404){
    document.getElementsByClassName(".App").innerHTML.style.display = "none";

    
  }else{
    const questionElemant = document.getElementById("question");
    const awnserButtins = document.getElementById("answer-buttons");
    const nextBut = document.getElementById("next-but");
    const scoreSt = document.getElementById("score-st");
    let currentQuestionIndex = 0;
    let score = 0;

     

    let data = await respon.json();
        console.log(data);
        
    function startPag(){
        nextBut.style.display = "block";
        nextBut.innerHTML = "Start play!";
        questionElemant.innerHTML = "Wellcom To The Trivia Game..";
        awnserButtins.style.display = "none";
        
    }

    console.log(data.results[currentQuestionIndex].question);
    console.log(data.results[currentQuestionIndex].correct_answer);
    
    function startQuiz(){
        currentQuestionIndex =0;
        score = 0;
        nextBut.innerHTML = "Next";
        awnserButtins.style.display = "block";
        scoreSt.style.display = "none";
        showQuestion();
    }
    
    function resetState(){
        nextBut.style.display = "none";
        while(awnserButtins.firstChild){
            awnserButtins.removeChild(awnserButtins.firstChild);
        }
    }

    var questions = [];//the main array diffain
    function showQuestion(){
        resetState();

        //diffain answers..
        var correctAnswer = [data.results[currentQuestionIndex].correct_answer];
        console.log(correctAnswer);
        var incorrectAnswers = data.results[currentQuestionIndex].incorrect_answers;

        //shuffling 
        var shuffleAwnsers = [
        {Object:correctAnswer[0], correct: true},
        {Object:incorrectAnswers[0], correct:false},
        {Object:incorrectAnswers[1], correct:false},
        {Object:incorrectAnswers[2], correct:false},];
        shuffleAwnsers.sort((a, b) => 0.5 - Math.random());
          
            //her the big problem fixed ..
            //makeing all alemant in array the same..
            questions = Array.from({length:10},()=>{
                return{
                    question:data.results[currentQuestionIndex].question,
                    awnsers:shuffleAwnsers
                }
            });

        let corrintQuestion = questions[currentQuestionIndex];
        console.log(currentQuestionIndex);
        let questuinNo = currentQuestionIndex + 1;
        questionElemant.innerHTML = questuinNo + ". " + corrintQuestion.question;
    
        corrintQuestion.awnsers.forEach(awnser =>{
            let buttin = document.createElement("button");
            buttin.innerHTML = awnser.Object;
            buttin.classList.add("btu");
            awnserButtins.appendChild(buttin);
            if(awnser.correct){
                buttin.dataset.correct = awnser.correct;
            }
            buttin.addEventListener("click", SelectAnswor);
        }); 
    }
     
    function SelectAnswor(e){
        const SelectAnswor = e.target;
        const isCorrect = SelectAnswor.dataset.correct === "true";
        if(isCorrect){
            SelectAnswor.classList.add("correct");
            score++;
            
        }else{
            SelectAnswor.classList.add("incorrect");
        }
        
        scoreSt.style.display = "block";
            if(currentQuestionIndex == 0 && score == 1){
                scoreSt.innerHTML = "good start";
            }else if(currentQuestionIndex == 0 && score == 0){
                scoreSt.innerHTML = "okay lets see";
            }
            else if(currentQuestionIndex == 1 && score == 0){
                scoreSt.innerHTML = "come on man you can do it!!";
            }
            else if(currentQuestionIndex == 2 && (score == 0 || score == 1)){
                scoreSt.innerHTML = "mm i dont thing you can any more";
            }else if(currentQuestionIndex == 3 && score == 0){
                scoreSt.innerHTML = "what are you stupid ?";
            }else if(currentQuestionIndex == 5 && score == 0){
                scoreSt.innerHTML = "just give up!";
            }else if((currentQuestionIndex == 6) && (score == 0 || score == 1)){
                scoreSt.innerHTML = "I hope you die";
            }else if((currentQuestionIndex == 8) && (score == 0 || score == 1 || score == 3 || score == 2)){
                scoreSt.innerHTML = "I'm just gnna go you dom dom keep going";
            }else if((currentQuestionIndex == 3) && (score == 3 || score == 2)){
                scoreSt.innerHTML = "mm you may be good ?!";
            }else if((currentQuestionIndex == 4) && (score == 3 || score == 2)){
                scoreSt.innerHTML = "never maind";
            }
            else if((currentQuestionIndex == 5) && (score == 3 || score == 2)){
                scoreSt.innerHTML = "too late you stupid face";
            }else if((currentQuestionIndex == 6) && (score == 3 || score == 4)){
                scoreSt.innerHTML = "stell not good just keep going";
            }else if((currentQuestionIndex == 9) && (score == 3 || score == 2 || score == 1)){
                scoreSt.innerHTML = "Stupid";
            }
            else if((currentQuestionIndex == 2) && (score == 3 )){
                scoreSt.innerHTML = "O right i thing we have a genus!";
            }else if((currentQuestionIndex == 3) && (score == 4 )){
                scoreSt.innerHTML = "Okay we got it you good";
            }else if((currentQuestionIndex == 4) && (score == 5 )){
                scoreSt.innerHTML = "I'm an IT engineer you now";
            }else if((currentQuestionIndex == 5) && (score == 6 )){
                scoreSt.innerHTML = "come on what are you ?";
            }else if((currentQuestionIndex == 6) && (score == 7 || score == 6)){
                scoreSt.innerHTML = "fuck you!";
            }else if((currentQuestionIndex == 7) && (score == 8 || score == 7 )){
                scoreSt.innerHTML = "you thing you batter than me ?!!";
            }else if((currentQuestionIndex == 8) && (score == 9 || score == 8)){
                scoreSt.innerHTML = "do you wanna get married";
            }else if((currentQuestionIndex == 9) && (score == 10 || score == 9)){
                scoreSt.innerHTML = "You genis sone of a bich!";
            }

        Array.from(awnserButtins.children).forEach(buttin =>{
            if(buttin.dataset.correct === "true"){
                buttin.classList.add("correct")
            }
            buttin.disabled = true;
        });
        nextBut.style.display = "block";
    }
    
    function showScore(){
        resetState();
        questionElemant.innerHTML =`Your Score is ${score} out of ${questions.length} !!`;
        
        scoreSt.style.display = "block";
        if(score == questions.length){
            scoreSt.innerHTML = "Waaaw how that happened!!.. cheater";
        }else if(score >= questions.length - 3){
            scoreSt.innerHTML = "You allright!.. you have somthing";
        }else if(scoreSt >= questions.length - 5){
            scoreSt.innerHTML = "Your fine not good.. just fine";
        }else{
            scoreSt.innerHTML = "sorry for calling you stupid. mmm I'm not sorry dom dom";
        }

        nextBut.innerHTML = "Play Agin!";
        nextBut.style.display = "block"; 
    }
    
    function handilNextQuestion(){
        currentQuestionIndex++;

        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }
    }
    nextBut.addEventListener("click", ()=>{
        if(nextBut == "Start play!"){
            startQuiz();
        }else{
            if(currentQuestionIndex < questions.length){
          handilNextQuestion();
        }else if(currentQuestionIndex > questions.length){
            showQuestion();
        }else{
            startQuiz();
        }
        }
        
    });
    startPag();
  }
}

quiz();







