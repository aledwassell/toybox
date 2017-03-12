fetch('https://raw.githubusercontent.com/aledwassell/jason_data/master/sheep.json')
  .then((result) => {
    return result.json()
  }).then((data) => {
    createHTML(data);
  });

Handlebars.registerHelper('age', function(birthYear){
  let age = new Date().getFullYear() - birthYear;
  if (age <= 1 && age > 0){
    return "Less that a year old";
  } else if (age < 0) {
    return "Hasn't been born yet"
  } else {
    return age + ' years old';
  }
});



function createHTML(data) {
  let rawTemplate = document.getElementById('myDataTemplate').innerHTML;
  let compileTemplate = Handlebars.compile(rawTemplate);
  let ourGeneratedHTML = compileTemplate(data);

  let container = document.getElementById('target');
  container.innerHTML = ourGeneratedHTML;


  let midPoint = Math.floor(data.sheep.length / 2);
}
