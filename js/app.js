const display = () => {
  //create variable for drop down selection
  const ee = document.getElementById("resourceType");
  const dropdown = ee.options[ee.selectedIndex].value;
  //create variable for input
  const input = document.getElementById("resourceId").value;
  //create variables for elements in container
  const Name = document.getElementById("name");
  const One = document.getElementById("one");
  const Two = document.getElementById("two");
  const List = document.getElementById("list");
  function reset() {
    Name.innerText = "";
    One.innerText = "";
    Two.innerText = "";
    List.innerHTML = "";
  }

  const oReq = new XMLHttpRequest();

  function people() {
    reset();
    if (this.status !== 200) {
      Name.innerText = `Error: Fetching Resource at http://swapi.co/api/${dropdown}/${input}/ was not found`;
    } else {
      const data = JSON.parse(this.responseText);
      name = data.name;
      Name.innerText = name;
      One.innerText = capitalizeFirstLetter(data.gender);

      //Two will need to do a request
      const oReq2 = new XMLHttpRequest();

      function p2() {
        const species = JSON.parse(this.responseText).name;
        Two.innerText = species;
      }

      oReq2.addEventListener("load", p2);
      oReq2.open("GET", data.species);
      oReq2.send();
    }
  }

  function planets() {
    reset();
    if (this.status !== 200) {
      Name.innerText = `Error: Fetching Resource at http://swapi.co/api/${dropdown}/${input}/ was not found`;
    } else {
      const data = JSON.parse(this.responseText);
      name = data.name;
      Name.innerText = name;
      One.innerText = capitalizeFirstLetter(data.terrain);
      Two.innerText = data.population;

      data.films.forEach(e => {
        const Req2 = new XMLHttpRequest();

        function reqListener2() {
          let reqObj2 = JSON.parse(this.responseText);
          List.innerHTML += `<li>${reqObj2.title}</li>`;
        }

        Req2.addEventListener("load", reqListener2);
        Req2.open("GET", e);
        Req2.send();
      });
    }
  }

  function starships() {
    reset();
    if (this.status !== 200) {
      Name.innerText = `Error: Fetching Resource at http://swapi.co/api/${dropdown}/${input}/ was not found`;
    } else {
      const data = JSON.parse(this.responseText);
      console.log(data);
      Name.innerText = data.name;
      One.innerText = capitalizeFirstLetter(data.manufacturer);
      Two.innerText = data.starship_class;

      data.films.forEach(e => {
        const Req2 = new XMLHttpRequest();

        function reqListener2() {
          let reqObj2 = JSON.parse(this.responseText);
          List.innerHTML += `<li>${reqObj2.title}</li>`;
        }

        Req2.addEventListener("load", reqListener2);
        Req2.open("GET", e);
        Req2.send();
      });
    }
  }

  function noWork() {
    console.log("here i am");
  }

  if (dropdown === "people") {
    oReq.addEventListener("load", people);
  } else if (dropdown === "planets") {
    oReq.addEventListener("load", planets);
  } else if (dropdown === "starships") {
    oReq.addEventListener("load", starships);
  } else {
    oReq.addEventListener("error", noWork);
  }
  oReq.open("GET", `https://swapi.co/api/${dropdown}/${input}/`);
  oReq.upload.addEventListener("error", noWork);
  oReq.send();
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

//http://swapi.co/api/people/14/
