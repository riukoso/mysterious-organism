// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

// my code
const pAequorFactory = (specimenNum, dna) => ({
  specimenNum,
  dna,
  mutate() {
    let random = returnRandBase();
    return (this.dna = mockUpStrand().filter((e) => e !== random));
  },
  compareDNA(pAequor) {
    const comm = pAequor.dna.filter((e, i) => e === this.dna[i]);
    let percent = Math.floor((comm.length / this.dna.length) * 100);
    //console.log(`specimen #1 and specimen #2 have ${percent}% DNA in common`)
    return percent;
  },
  willLikelySurvive() {
    let basesCG = this.dna.filter((e) => e === "C" || e === "G");
    return basesCG.length >= (this.dna.length * 60) / 100;
  },
  complementStrand() {
    let compl = { A: "T", T: "A", C: "G", G: "C" };
    return this.dna.map((e) => compl[e]);
  },
});

// making instances
const makingInstances = (numInstances) => {
  const instances = [];
  let i = 0;
  while (instances.length < numInstances) {
    let instance = pAequorFactory(i, mockUpStrand());
    if (instance.willLikelySurvive()) {
      instances.push(instance);
      i++;
    }
  }
  return instances;
};

const pAequor = makingInstances(30); //pAequor contains 30 instances of pAequor that can survive

// find the two most related instances of pAequor
let per = 0;
let mostRelated = [];

for (let i = 0; i < pAequor.length; i++) {
  for (let j = i + 1; j < pAequor.length; j++) {
    if (pAequor[i].compareDNA(pAequor[j]) > per) {
      per = pAequor[i].compareDNA(pAequor[j]);
      mostRelated = [pAequor[i], pAequor[j]];
    }
  }
}
// console.log(mostRelated) //output one array with two objects (most related instances)
