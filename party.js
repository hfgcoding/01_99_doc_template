//Beschreibt ein Bier welches getrunken werden kann
class Beer {
    constructor(volAlc, amount) {
      this.volAlc = volAlc;
      this.amount = amount;
    }
  }

  //Beschreibt eine Person auf der Party
  class Person {
    constructor(name) {
        this.name = name
      this.tolerance = Math.random()*150; //wieviel Alkohol in ml die Person verträgt
      this.alc = 0;
    }

    drinkBeer(beer) {
        this.alc += beer.amount / 100 * beer.volAlc;
    }

    get isDrunk() {
      return this.alc > this.tolerance;
    }
  }

  let person1 = new Person("Person 1")
  let person2 = new Person("Person 2")
  let person3 = new Person("Person 3")

  //Hauptfunktion, hält die Party am Laufen (Personen als Array, Interval in Millisekunden)
  function haveParty(persons, interval) {
      //Prüfe die Personenanzahl
      if(persons.length === 0) {
          console.error("Keine Leute, keine Party!");
          return;
      } else if(persons.length === 1) {
          console.warn("Alleine trinken ist doof!");
      }

      // Den Trinkprozess vorbereiten
      let drinkingRound = function(persons) {
          //Personen trinken ein Bier
          persons.forEach((person) => {
              person.drinkBeer(new Beer(4.9, 500));
              console.log(person.name + " hatte noch ein Bier (hat jetzt "+person.alc+", ist betrunken:"+person.isDrunk+")");
          })

          //Prüfe wieviele Personen schon betrunken sind
          let drunkPersons = persons.filter((person) => person.isDrunk === true).length;			

          //Intervall verlängern wenn jemand betrunken ist
          if(drunkPersons > 0) {
              interval = interval*1.3;
              console.log("Betrunkene Personen! Intervall jetzt "+interval)				
          }

          //Prüfen ob die Party schon zu lange geht (größer 1h)
          if(interval > 60*60*1000) {
              console.log("Party ist vorbei, niemand trinkt mehr schnell genug");
              return;
          }	

          //Bereite nächste Runde vor
          if(drunkPersons < persons.length) setTimeout(drinkingRound, interval, persons);
          else console.log("Party ist vorbei, alle sind betrunken");
      }

      // Erste Runde
      setTimeout(drinkingRound, interval, persons);
  }

  //Starte die Party
  haveParty([person1, person2, person3], 1000)