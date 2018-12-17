import type {PersonID} from '../persons/PersonTypes';

export type Custodia = {
  primer: string,
  segon?: string
}

const familyID = (menorID: PersonID, sustentadors) => sustentadors.sort().join('');

export const elMenorTeDosCustodiantsConvivents = (menorID: PersonID, custodies) => typeof custodies[menorID] !== 'undefined'
    && typeof custodies[menorID].primer === 'string'
    && typeof custodies[menorID].segon === 'string';

const personesAmbCustodiaConvivents = (menorID: PersonID, custodies) => [custodies[menorID].primer, custodies[menorID].segon].filter((sustentadorID) => sustentadorID !== 'ningu_mes' && sustentadorID !== 'no_conviu').sort();

export const detectaFamiliesAPartirDeCustodies = (custodies: { [string]: Custodia }): Object =>
    Object.keys(custodies).reduce(
        (families: Object, menorID: string) => {
          const sustentadors = personesAmbCustodiaConvivents(menorID, custodies);
          if (sustentadors.length > 0) {
            const familiaID = familyID(menorID, sustentadors);
            if (typeof families[familiaID] !== 'undefined') {
              families[familiaID].menors.push(menorID);
            } else {
              families[familiaID] =
                  {
                    sustentadors_i_custodia: sustentadors,
                    menors: [menorID],
                    monoparental: sustentadors.length === 1,
                    tipus_custodia: custodies[menorID].segon === 'no_conviu' ? 'compartida' : 'total'
                  };
            }
          }

          return families;
        }, {});
