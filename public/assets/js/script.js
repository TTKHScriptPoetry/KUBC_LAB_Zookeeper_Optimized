const $animalForm = document.querySelector('#animal-form');
const zookeeperForm = document.querySelector('#zookeeper-form');

const handleAnimalFormSubmit = event => {
  event.preventDefault();
  // get animal data and organize it
  const name = $animalForm.querySelector('[name="animal-name"]').value;
  const species = $animalForm.querySelector('[name="species"]').value;
  const dietRadioHTML = $animalForm.querySelectorAll('[name="diet"]');
  let diet;

  for (let i = 0; i < dietRadioHTML.length; i += 1) {
    if (dietRadioHTML[i].checked) {
      diet = dietRadioHTML[i].value;
    }
  }

  if (diet === undefined) {
    diet = '';
  }

  const selectedTraits = $animalForm.querySelector('[name="personality"').selectedOptions;
  const personalityTraits = [];
  for (let i = 0; i < selectedTraits.length; i += 1) {
    personalityTraits.push(selectedTraits[i].value);
  }
  const animalObject = { name, species, diet, personalityTraits };

  // newly added animal - fetch method implemented within the event handler handleAnimalFormSubmit
  fetch('/api/animals', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animalObject)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert('Error: ' + response.statusText);
    })
    .then(postResponse => {
      console.log(postResponse);
      alert('Thank you for adding an animal!');
    });

};

const handleZookeeperFormSubmit = event => {
  event.preventDefault();
  // get zookeeper data and organize it
  const name = zookeeperForm.querySelector('[name="zookeeper-name"]').value;
  const age = parseInt(zookeeperForm.querySelector('[name="age"]').value);
  const favoriteAnimal = zookeeperForm.querySelector('[name="favorite-animal"]').value;

  const zookeeperObj = { name, age, favoriteAnimal };
  console.log("+++ zookeeper Obj with no id +++");
  console.log(zookeeperObj);

  fetch('api/zookeepers', {  // fetch method implemented within the event handler handleAnimalFormSubmit
    method: 'POST', //initiate a POST action, will then be handled by the server route.post that figures the id before written to json file
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(zookeeperObj)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      alert('Error: ' + response.statusText);
    })
    .then(postResponse => {
      console.log("+++ zookeeper Obj with defined id +++");
      console.log(postResponse);
      alert('Thank you for adding a zookeeper!');
    });
};

$animalForm.addEventListener('submit', handleAnimalFormSubmit);
zookeeperForm.addEventListener('submit', handleZookeeperFormSubmit);
