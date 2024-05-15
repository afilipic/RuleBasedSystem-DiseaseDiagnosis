export enum Symptoms {
    FATIGUE = "Umor",
    THIRST = "Žeđ",
    INSOMNIA = "Nesanica",
    DRY_SKIN = "Suva koža",
    HAND_SHAKING = "Tremor ruku",
    FEVER = "Groznica",
    HEADACHE = "Glavobolja",
    HAIR_LOSS = "Opadanje kose",
    RAPID_HEART_RATE = "Ubrzan rad srca",
    SKIN_RASH = "Osip na koži",
    FREQUENT_URINATION = "Učestalo mokrenje",
    IRREGULAR_PERIODS = "Neredovni ciklusi",
    NAUSEA_VOMITING = "Mučnina, povraćanje",
    VISION_DISTURBANCE = "Poremećaj vida",
    JOINT_PAIN = "Bolovi u zglobovima",
    JOINT_SWELLING = "Otekline zglobova",
    MOOD_CHANGES = "Promene raspoloženja",
    WEIGHT_GAIN = "Povećanje telesne težine",
    WEIGHT_LOSS = "Gubitak telesne težine",
    HEAT_SENSITIVITY = "Osetljivost na toplotu",
    ELEVATED_BODY_TEMPERATURE = "Povišena telesna temperatura",
  }

export interface BloodTestRequest {
    patient: string;
    symptoms: Symptoms[];
}

export interface SaveBloodTestRequest {
  patient: string;
  tests: BloodTestResponse[];
}

export enum AnalysisParameters {
  TSH = "TSH",
  T3 = "T3",
  T4 = "T4",
  ANTI_TPO = "Anti-TPO",
  ANTI_TG = "Anti-Tg",
  ANA = "ANA",
  ANTI_DSDNA = "Anti-dsDNA",
  ANTI_SM = "Anti-Sm",
  GLUCOSE = "Glukoza",
  HBA1C = "HbA1c",
  C_PEPTIDE = "C-peptid",
  INSULIN = "Insulin"
}


export interface BloodTestResponse {
  date: Date;
  id: number;
  status: string;
  type: AnalysisParameters;
  value: number;
}