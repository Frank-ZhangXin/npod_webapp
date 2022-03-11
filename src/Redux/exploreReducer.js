const initialState = {
  // Age
  ageEnable: false,
  ageRange: [0, 95],
  ageMin: 0,
  ageMax: 95,

  // Age Onset: the start age having diabetes
  ageOnsetEnable: false,
  ageOnsetRange: [0, 95],
  ageOnsetMin: 0,
  ageOnsetMax: 95,

  // Autoantibody
  aaEnable: false,
  gadaP: true,
  gadaN: false,
  ia2aP: true,
  ia2aN: false,
  miaaP: true,
  miaaN: false,
  znt8aP: true,
  znt8aN: false,

  // Autoanibody positive number
  aaPositiveEnable: false,
  zeroChecked: true,
  oneChecked: true,
  twoChecked: true,
  threeChecked: true,
  fourChecked: true,

  // BMI
  bmiEnable: false,
  bmiRange: [5.0, 60.0],
  bmiMin: 5.0,
  bmiMax: 60.0,

  // Diabetes Duration (DD)
  DDEnable: false,
  DDRange: [0, 85],
  DDMin: 0,
  DDMax: 85,

  // Donor Type (object array)
  donorTypeEnable: false,
  selectedDonorType: [],

  // Gender
  genderEnable: false,
  maleChecked: true,
  femaleChecked: true,

  // HbA1c
  hEnable: false,
  hRange: [2.0, 20.0],
  hMin: 2.0,
  hMax: 20.0,

  // Insulitis
  insulitisEnable: false,
  insulitisPositiveChecked: true,
  insulitisNegativeChecked: true,

  // Race (object array)
  raceEnable: false,
  selectedRace: [],

  // C-Peptide
  cPeptideEnable: false,
  cPeptidePositive: true,
  cPeptideNegative: true,

  // Raw Data
  rawData: [],

  // Filtered Data
  filteredData: [],

  // Single case data
  currentCase: [],

  // Donor Types map
  donorTypesMap: null,

  // Cause of Death map
  causeOfDeathMap: null,

  // HLA
  hla: null,

  // HLA map
  hlaMap: null,

  // sample Types Map
  sampleTypesMap: null,

  // Case ID
  caseIDEnable: false,
  allCaseId: [],
  selectedCaseId: [],
};

const exploreReducer = (state = initialState, action) => {
  switch (action.type) {
    // Reset all state
    case "SET_RESET":
      console.log("reset triggered.");
      return {
        ...initialState,
        allCaseId: state.allCaseId,
        rawData: state.rawData,
        donorTypesMap: state.donorTypesMap,
        causeOfDeathMap: state.causeOfDeathMap,
        hlaMap: state.hlaMap,
      };

    // Age
    case "SET_AGE_ENABLE":
      return {
        ...state,
        ageEnable: action.value,
      };
    case "SET_AGE_RANGE":
      return {
        ...state,
        ageRange: action.value,
        ageMin: action.value[0],
        ageMax: action.value[1],
      };
    case "SET_AGE_MIN":
      return {
        ...state,
        ageRange: [action.value, state.ageRange[1]],
        ageMin: action.value,
      };
    case "SET_AGE_MAX":
      return {
        ...state,
        ageRange: [state.ageRange[0], action.value],
        ageMax: action.value,
      };

    // Age Onset: the start age having diabetes
    case "SET_AGE_ONSET_ENABLE":
      return {
        ...state,
        ageOnsetEnable: action.value,
      };
    case "SET_AGE_ONSET_RANGE":
      return {
        ...state,
        ageOnsetRange: action.value,
        ageOnsetMin: action.value[0],
        ageOnsetMax: action.value[1],
      };
    case "SET_AGE_ONSET_MIN":
      return {
        ...state,
        ageOnsetRange: [action.value, state.ageOnsetRange[1]],
        ageOnsetMin: action.value,
      };
    case "SET_AGE_ONSET_MAX":
      return {
        ...state,
        ageOnsetRange: [state.ageOnsetRange[0], action.value],
        ageOnsetMax: action.value,
      };

    // Autoantibody
    case "SET_AA_ENABLE":
      return {
        ...state,
        aaEnable: action.value,
      };
    case "SET_GADAP":
      return {
        ...state,
        gadaP: action.value,
      };
    case "SET_GADAN":
      return {
        ...state,
        gadaN: action.value,
      };
    case "SET_IA2AP":
      return {
        ...state,
        ia2aP: action.value,
      };
    case "SET_IA2AN":
      return {
        ...state,
        ia2aN: action.value,
      };
    case "SET_MIAAP":
      return {
        ...state,
        miaaP: action.value,
      };
    case "SET_MIAAN":
      return {
        ...state,
        miaaN: action.value,
      };
    case "SET_ZNT8AP":
      return {
        ...state,
        znt8aP: action.value,
      };
    case "SET_ZNT8AN":
      return {
        ...state,
        znt8aN: action.value,
      };

    // Autoantibody Positive number
    case "SET_AA_POSITIVE_ENABLE":
      return {
        ...state,
        aaPositiveEnable: action.value,
      };
    case "SET_ZERO_CHECKED":
      return {
        ...state,
        zeroChecked: action.value,
      };
    case "SET_ONE_CHECKED":
      return {
        ...state,
        oneChecked: action.value,
      };
    case "SET_TWO_CHECKED":
      return {
        ...state,
        twoChecked: action.value,
      };
    case "SET_THREE_CHECKED":
      return {
        ...state,
        threeChecked: action.value,
      };
    case "SET_FOUR_CHECKED":
      return {
        ...state,
        fourChecked: action.value,
      };

    // BMI
    case "SET_BMI_ENABLE":
      return {
        ...state,
        bmiEnable: action.value,
      };
    case "SET_BMI_RANGE":
      return {
        ...state,
        bmiRange: action.value,
        bmiMin: action.value[0],
        bmiMax: action.value[1],
      };
    case "SET_BMI_MIN":
      return {
        ...state,
        bmiRange: [action.value, state.bmiRange[1]],
        bmiMin: action.value,
      };
    case "SET_BMI_MAX":
      return {
        ...state,
        bmiRange: [state.bmiRange[0], action.value],
        bmiMax: action.value,
      };

    // Diabetes Duration
    case "SET_DD_ENABLE":
      return {
        ...state,
        DDEnable: action.value,
      };
    case "SET_DD_RANGE":
      return {
        ...state,
        DDRange: action.value,
        DDMin: action.value[0],
        DDMax: action.value[1],
      };
    case "SET_DD_MIN":
      return {
        ...state,
        DDRange: [action.value, state.DDRange[1]],
        DDMin: action.value,
      };
    case "SET_DD_MAX":
      return {
        ...state,
        DDRange: [state.DDRange[0], action.value],
        DDMax: action.value,
      };

    // Donor Type
    case "SET_DONOR_TYPE_ENABLE":
      return {
        ...state,
        donorTypeEnable: action.value,
      };
    case "SET_SELECTED_TYPE":
      return {
        ...state,
        selectedDonorType: action.value,
      };

    // Gender
    case "SET_GENDER_ENABLE":
      return {
        ...state,
        genderEnable: action.value,
      };
    case "SET_MALE_CHECKED":
      return {
        ...state,
        maleChecked: action.value,
      };
    case "SET_FEMALE_CHECKED":
      return {
        ...state,
        femaleChecked: action.value,
      };

    // HbA1c
    case "SET_H_ENABLE":
      return {
        ...state,
        hEnable: action.value,
      };
    case "SET_H_RANGE":
      return {
        ...state,
        hRange: action.value,
        hMin: action.value[0],
        hMax: action.value[1],
      };
    case "SET_H_MIN":
      return {
        ...state,
        hRange: [action.value, state.hRange[1]],
        hMin: action.value,
      };
    case "SET_H_MAX":
      return {
        ...state,
        hRange: [state.hRange[0], action.value],
        hMax: action.value,
      };

    // Insulitis
    case "SET_INSULITIS_ENABLE":
      return {
        ...state,
        insulitisEnable: action.value,
      };
    case "SET_INSULITIS_POSITIVE_CHECKED":
      return {
        ...state,
        insulitisPositiveChecked: action.value,
      };

    case "SET_INSULITIS_NEGATIVE_CHECKED":
      return {
        ...state,
        insulitisNegativeChecked: action.value,
      };

    // Race
    case "SET_RACE_ENABLE":
      return {
        ...state,
        raceEnable: action.value,
      };
    case "SET_SELECTED_RACE":
      return {
        ...state,
        selectedRace: action.value,
      };

    // C-Peptide
    case "SET_CPEPTIDE_ENABLE":
      return {
        ...state,
        cPeptideEnable: action.value,
      };
    case "SET_CPEPTIDE_POSITIVE":
      return {
        ...state,
        cPeptidePositive: action.value,
      };

    case "SET_CPEPTIDE_NEGATIVE":
      return {
        ...state,
        cPeptideNegative: action.value,
      };

    // Raw Data
    case "SET_RAW_DATA":
      return {
        ...state,
        rawData: action.value,
      };

    // Filtered Data
    case "SET_FILTERED_DATA":
      return {
        ...state,
        filteredData: action.value,
      };

    case "SET_CURRENT_CASE":
      return {
        ...state,
        currentCase: action.value,
      };

    // Donor Types
    case "SET_DONOR_TYPES_MAP":
      return {
        ...state,
        donorTypesMap: action.value,
      };

    // Cause Of Death
    case "SET_CAUSE_OF_DEATH_MAP":
      return {
        ...state,
        causeOfDeathMap: action.value,
      };

    // HLA
    case "SET_HLA":
      return {
        ...state,
        hla: action.value,
      };

    // HLA map
    case "SET_HLA_MAP":
      return {
        ...state,
        hlaMap: action.value,
      };

    // sample types map
    case "SET_SAMPLETYPES_MAP":
      return {
        ...state,
        sampleTypesMap: action.value,
      };

    // Case ID
    case "SET_CASE_ID_ENABLE":
      return {
        ...state,
        caseIDEnable: action.value,
      };
    case "SET_ALL_CASE_ID":
      return {
        ...state,
        allCaseId: action.value,
      };
    case "SET_SELECTED_CASE_ID":
      return {
        ...state,
        selectedCaseId: action.value,
      };

    default:
      return state;
  }
};

export default exploreReducer;
