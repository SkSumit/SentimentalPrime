const form = document.querySelector("form");
const input = document.querySelector("input");
const inputdata = document.querySelector("#inputdata");
const inputdata11 = document.querySelector("#inputdata11");
const button = document.querySelector("#robtn");

let e = "<hr/>";
let b = "<hr/>";
let totalScore = 0;
let conclusion = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  button.style.display='block'
  inputdata11.textContent = " ";
  totalScore = 0;
  fetch("/tsp?search=" + input.value).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        inputdata.innerHTML = "Something Went Wrong. Try again!";
      }

      const fetchedData = data.data1;
      const fetchedDataTweet = data.data1.tweet;
      const fetchedDataScore = data.data1.score;
      

      fetchedDataTweet.forEach((element, index) => {
        totalScore = totalScore + fetchedDataScore[index];

        b += `  <h6> Tweet ${
          index + 1
        } </h6> <h6 style="font-weight: lighter;">${element}</h6>
        <h6>Score : ${fetchedDataScore[index]}</h6>
        <hr/>`;
      });

      
      if (totalScore > 0) {
        conclusion = "Positive!";
      } else if (totalScore == 0) {
        conclusion = "Neutral";
      } else {
        conclusion = "Negative";
      }

      inputdata.innerHTML = `<h3 style="text-align:center">Total Score is ${totalScore}</h3>
      <h6>${input.value}'s tweets are mainly ${conclusion}</h6>`;
      inputdata11.innerHTML = b;

      robtn.scrollIntoView({block: "end"});

      b = "";
    });
  });
});
