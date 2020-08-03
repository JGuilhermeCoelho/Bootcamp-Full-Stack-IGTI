import { promises as fs, stat } from "fs";
import { kMaxLength } from "buffer";

class Main {
  constructor() {
    this.cities = [];
    this.states = [];
  }

  line() {
    console.log(
      "--------------------------------------------------------------------->>"
    );
  }

  onlyNumbers(sentence) {
    return sentence.replace(/\D+/g, "");
  }

  async init() {
    try {
      const readStates = JSON.parse(await fs.readFile("Estados.json"));
      const readCities = JSON.parse(await fs.readFile("Cidades.json"));

      this.states = [...readStates];
      this.cities = [...readCities];

      this.line();
      console.log(
        "=> Os arquivos 'Cidades.json' e 'Estados.json' foram lidos com SUCESSO!"
      );
    } catch (error) {
      console.log("!!! Erro ao ler os arquivos JSON!", error);
    }
  }

  async createStatesFile() {
    this.states.forEach((state) => {
      const stateData = [];

      this.cities.forEach((city) => {
        if (city.Estado === state.ID) {
          stateData.push(city.Nome);
          fs.writeFile(
            `./estados/${state.Sigla}.json`,
            JSON.stringify(stateData, null, 2)
          );
        }
      });
    });

    this.line();
    console.log(
      "=> Os arquivos dos estados foram criados e estão na pasta 'estados'"
    );
  }

  async countCitiesOf(uf = "pe") {
    const state = uf.toUpperCase();
    const cities = JSON.parse(await fs.readFile(`./estados/${state}.json`));

    this.line();
    console.log(`=> O ${state} tem ${cities.length} cidades`);
  }

  async minMaxCities() {
    const numberCities = [];

    this.states.forEach((state, index) => {
      const stateData = [];

      this.cities.filter((city) => {
        if (city.Estado === state.ID) {
          stateData.push(city.Nome);
          numberCities.splice(index, 1, `${state.Sigla}: ${stateData.length}`);
        }
      });
    });

    const topFive = numberCities
      .sort((a, b) => this.onlyNumbers(b) - this.onlyNumbers(a))
      .slice(0, 5);

    const buttonFive = numberCities
      .sort((a, b) => this.onlyNumbers(a) - this.onlyNumbers(b))
      .slice(0, 5);

    this.line();
    console.log("=> Os 5 estados com mais cidades são:", topFive);
    this.line();
    console.log("=> Os 5 estados com menos cidades são:", buttonFive);
  }

  async minMaxNamesCitiesByState() {
    const citiesOfState = [];

    this.states.forEach((state, index) => {
      const stateData = [];

      this.cities.filter((city) => {
        const cityNameSize = city.Nome.replace(/\s/g, "").length;

        if (city.Estado === state.ID)
          stateData.push(
            `${city.Nome} - ${state.Sigla}: (${cityNameSize}) letras`
          );
      });

      citiesOfState.splice(index, 1, stateData);
    });

    this.line();
    console.log("=> A cidade com mais letras de cada um dos Estados: ");

    for (let index in citiesOfState)
      console.log(
        citiesOfState[index].sort(
          (a, b) => this.onlyNumbers(a) - this.onlyNumbers(b)
        )[citiesOfState[index].length - 1]
      );

    this.line();
    console.log("=> A cidade com menos letras de cada um dos Estados: ");

    for (let index in citiesOfState)
      console.log(
        citiesOfState[index].sort(
          (a, b) => this.onlyNumbers(a) - this.onlyNumbers(b)
        )[0]
      );
  }

  async minMaxNamesCities() {
    const allCities = [];

    this.cities.forEach((city) => {
      const cityNameSize = city.Nome.replace(/\s/g, "").length;
      allCities.push(`${city.Nome}: (${cityNameSize}) letras`);
    });

    allCities.sort((a, b) => this.onlyNumbers(a) - this.onlyNumbers(b));

    const maxSize = this.onlyNumbers(allCities[allCities.length - 1]);
    const maxNameSize = [];

    const minSize = this.onlyNumbers(allCities[0]);
    const minNameSize = [];

    allCities.forEach((city) => {
      if (this.onlyNumbers(city) === maxSize) maxNameSize.push(city);
      if (this.onlyNumbers(city) === minSize) minNameSize.push(city);
    });

    this.line();
    console.log("A cidade com maior nome do Brasil é:");
    console.log(maxNameSize.sort()[maxNameSize.length - 1]);

    this.line();
    console.log("A cidade com menor nome do Brasil é:");
    console.log(minNameSize.sort()[0]);
  }
}

const main = new Main();

main
  .init()
  .then(() => main.createStatesFile())
  .then(() => main.countCitiesOf())
  .then(() => main.minMaxCities())
  .then(() => main.minMaxNamesCitiesByState())
  .then(() => main.minMaxNamesCities())
  .catch((err) => console.log("!!! Erro Encontrado!", err));
