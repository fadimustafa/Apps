
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
  const respon = await fetch('https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple');

  if(respon.status == 404){
    document.getElementsByClassName(".App").innerHTML.style.display = "none";

    
  }else{
    const questionElemant = document.getElementById("question");
    const awnserButtins = document.getElementById("answer-buttons");
    const nextBut = document.getElementById("next-but");
    let currentQuestionIndex = 0;
    let score = 0;

     //startPag();

    let data = await respon.json();
        console.log(data);
        
   // function startPag(){
        //nextBut.style.display = "block";
        //nextBut.innerHTML = "Start play!";
       // questionElemant.innerHTML = "Wellcom To The Trivia Game..";
       // awnserButtins.style.display = "none";
      //  nextBut.addEventListener("click" , startQuiz);
   // }

    console.log(data.results[currentQuestionIndex].question)
    console.log(data.results[currentQuestionIndex].correct_answer)

    function startQuiz(){
        currentQuestionIndex =0;
        score = 0;
        nextBut.innerHTML = "Next";
        //awnserButtins.style.display = "block";
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
        if(currentQuestionIndex < questions.length){
          handilNextQuestion();
        }else if(currentQuestionIndex > questions.length){
            showQuestion();
        }else{
            startQuiz();
        }
    });
    
  }
}

quiz();







