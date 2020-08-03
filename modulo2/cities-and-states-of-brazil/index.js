import { promises as fs, stat } from "fs";

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
            "./estados/" + `${state.Sigla}.json`,
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
}

const main = new Main();

main
  .init()
  .then(() => main.createStatesFile())
  .catch((err) => console.log("!!! Erro Encontrado!", err));
