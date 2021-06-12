function translateAABresult(data) {
  console.log("translate function was called.");
  for (key in data) {
    var thisCase = data[key];
    // set default AAB result
    thisCase["GADA_Result"] = "Negative";
    thisCase["GADA_tally"] = 0;
    thisCase["IA_2A_Result"] = "Not tested";
    thisCase["IA_2A_tally"] = 0;
    thisCase["mIAA_Result"] = "Not tested";
    thisCase["mIAA_tally"] = 0;
    thisCase["ZnT8A_Result"] = "Negative";
    thisCase["ZnT8Atally"] = 0;
    // numeric regex
    var allNumber = /^[0-9]+$/;
    // GADA result
    if (thisCase.GADA !== null) {
      // numeric case id
      if (thisCase.case_id.match(allNumber)) {
        if (thisCase.GADA >= 20 || thisCase.case_id === "6170") {
          thisCase["GADA_Result"] = "Positive";
          thisCase["GADA_tally"] = 1;
        } else {
          thisCase["GADA_Result"] = "Negative";
          thisCase["GADA_tally"] = 0;
        }
        // Alphanumeric case id
      } else {
        if (thisCase.GADA >= 20) {
          thisCase["GADA_Result"] = "Positive";
          thisCase["GADA_tally"] = 1;
        } else {
          thisCase["GADA_Result"] = "Negative";
          thisCase["GADA_tally"] = 0;
        }
      }
    } else {
      thisCase["GADA_Result"] = "Not tested";
      thisCase["GADA_tally"] = 0;
    }
    // IA_2A result
    if (thisCase.IA_2A !== null) {
      if (thisCase.IA_2A >= 5) {
        thisCase["IA_2A_Result"] = "Positive";
        thisCase["IA_2A_tally"] = 1;
      } else {
        thisCase["IA_2A_Result"] = "Negative";
        thisCase["IA_2A_tally"] = 0;
      }
    } else {
      thisCase["IA_2A_Result"] = "Not tested";
      thisCase["IA_2A_tally"] = 0;
    }
    // mIAA result
    if (thisCase.mIAA !== null) {
      if (thisCase.mIAA >= 0.01) {
        thisCase["mIAA_Result"] = "Positive";
        thisCase["mIAA_tally"] = 1;
      } else {
        thisCase["mIAA_Result"] = "Negative";
        thisCase["mIAA_tally"] = 0;
      }
    } else {
      thisCase["mIAA_Result"] = "Not tested";
      thisCase["mIAA_tally"] = 0;
    }
    // ZnT8A
    if (thisCase.ZnT8A !== null) {
      // numeric case id
      if (thisCase.case_id.match(allNumber)) {
        if (thisCase.ZnT8A > 0.02 && Number(thisCase.case_id) >= 6115) {
          thisCase["ZnT8A_Result"] = "Positive";
          thisCase["ZnT8Atally"] = 1;
        } else {
          thisCase["ZnT8A_Result"] = "Negative";
          thisCase["ZnT8Atally"] = 0;
        }
        // Alphanumeric case id
      } else {
        if (thisCase.ZnT8A >= 0.02) {
          thisCase["ZnT8A_Result"] = "Positive";
          thisCase["ZnT8Atally"] = 1;
        } else {
          thisCase["ZnT8A_Result"] = "Negative";
          thisCase["ZnT8Atally"] = 0;
        }
      }
    } else {
      thisCase["ZnT8A_Result"] = "Not tested";
      thisCase["ZnT8Atally"] = 0;
    }

    thisCase["AABtally"] =
      thisCase.GADA_tally +
      thisCase.IA_2A_tally +
      thisCase.mIAA_tally +
      thisCase.ZnT8Atally;
    data[key] = thisCase;
  }
}

module.exports = {
  translateAABresult: translateAABresult,
};
