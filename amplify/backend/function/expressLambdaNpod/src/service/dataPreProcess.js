function dataPreProcess(data) {
  console.log("Data pre processing starts...");
  for (key in data) {
    var thisCase = data[key];
    aabGenerator(thisCase);
    timeDurationGenerator(thisCase);
    data[key] = thisCase;
  }
}

function aabGenerator(thisCase) {
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
}

function timeDurationGenerator(thisCase) {
  var terminal_hospital_duration = null;
  var ICU_time_days = null;
  var transit_time_minutes = null;
  var organ_transport_time = null;

  var admissionDayTime = dayTimeValidate(
    thisCase.admission_date,
    thisCase.admission_time,
    thisCase.case_id
  ); // string
  var deathDayTime = dayTimeValidate(
    thisCase.death_date,
    thisCase.death_time,
    thisCase.case_id
  ); // string
  var processDayTime = dayTimeValidate(
    thisCase.processing_start_date,
    thisCase.processing_start_time,
    thisCase.case_id
  ); // string
  var crossClampDayTime = dayTimeValidate(
    thisCase.cross_clamp_date,
    thisCase.cross_clamp_time,
    thisCase.case_id
  ); // string
  if (admissionDayTime && deathDayTime) {
    var start = new Date(admissionDayTime);
    var end = new Date(deathDayTime);
    var dur = end - start; // millisec
    ICU_time_days =
      ((dur * 1.0) / 1000 / 86400).toFixed(2).toString() + " days";
    terminal_hospital_duration =
      Math.floor((dur * 1.0) / 1000 / 86400).toString() +
      " days " +
      new Date((dur * 1.0) % (1000 * 86400)).toISOString().substr(11, 5);
  }
  if (processDayTime && crossClampDayTime) {
    var start = new Date(crossClampDayTime);
    var end = new Date(processDayTime);
    var dur = end - start; // millisec
    transit_time_minutes =
      ((dur * 1.0) / 1000 / 60).toFixed(2).toString() + " minutes";
    if (thisCase.case_id === "6005") {
      console.log("dur2 is " + dur);
    }
    var hr = Math.floor((dur * 1.0) / 1000 / 3600);
    var hrStr = hr === 0 ? "00" : hr.toString();
    var min = Math.floor(((dur * 1.0) % (1000 * 3600)) / 1000 / 60);
    var minStr = min === 0 ? "00" : min.toString();
    organ_transport_time = hrStr + ":" + minStr;
  }
  thisCase["terminal_hospital_duration"] = terminal_hospital_duration;
  thisCase["ICU_time_days"] = ICU_time_days;
  thisCase["transit_time_minutes"] = transit_time_minutes;
  thisCase["organ_transport_time"] = organ_transport_time;
}

// date and time vilidation
function dayTimeValidate(dAte, tIme) {
  var newDateTime = null;

  if (dAte) {
    try {
      dAte = dAte.toISOString();
    } catch {
      if (dAte === "0000-00-00") {
        return newDateTime;
      }
    }

    if (typeof tIme === "string" && tIme.match(/[0-9].\:[0-9].\:[0-9]/g)) {
      newDateTime = dAte.replace("00:00:00", tIme);
    } else {
      newDateTime = dAte;
    }
  }

  return newDateTime;
}

module.exports = {
  dataPreProcess: dataPreProcess,
};
