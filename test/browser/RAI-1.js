const waitForModalAnimationsToFinishIGuess = 400;

module.exports = {
  "@tags": ['Benefits'],
  "load index page": browser => {
    browser
    // Load the page at the launch URL
        .url(browser.launchUrl)
        // wait for page to load
        .waitForElementVisible(".CTA");
  },
  "load app": browser => {
    browser
        .click('a[href="/wizard/"]')
        .waitForElementVisible("#AddParentButton");
    browser.assert.urlContains("wizard");
  },
  "can add an parent": browser => {
    const persona = browser.page.AddPerson();
    browser
        .waitForElementVisible("#AddParentButton")
        .click("#AddParentButton")
        .waitForElementVisible('input[name="nom"]')
        .pause(waitForModalAnimationsToFinishIGuess);
    persona
        .deNom("Adulto 1 RAI-1")
        .ambDataDeNaixement("15011961")
        .ambDataDeUltimaIncripcioAlPadro("15011961")
        .esDona()
        .teDNI()
        .situacioLaboralDesocupat()
        .teUnPercentatgeDeMinusvaliaDel(34)
        .ingressosBruts(6000)
        .inscritComADemanadantDOcupacio()
        .esgotatPrestacioDesocupacio()
        .demandantDesocupacioDurant12Mesos()
        .haRealitzatAccionsDeRecercaActivaDeFeinaEnElMesAnterior()
        .waitForElementVisible('button[name="ButtonValidar"]')
        .click('button[name="ButtonValidar"]')
        .api.pause(waitForModalAnimationsToFinishIGuess)
        .waitForElementVisible('div.container-family')
  },
  "can set family settings": browser => {
    const utils = browser.page.UtilObject();
    utils.nextPage();
    utils.nextPage()
  },
  "rent settings": browser => {
    const utils = browser.page.UtilObject();
    utils.nextPage()
  },
  "results page": browser => {
    browser
        .waitForElementVisible(".ItemResult")
        .assert.containsText('#GE_051_01_mensual', "Renda activa d'inserció discapacitat 33%")
  },
  after: function (browser) {
    browser.end();
  }
};
