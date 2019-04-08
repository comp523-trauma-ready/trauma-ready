const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Declare static data 

const Hospital = mongoose.model('Hospital');
const HospitalData = [
  {
    id: 0,
    name: "UNC Health Care",
    rac: "Mid-Carolina",
    traumaLevel: "Adult, Pediatric",
    services: [],
    address: "101 Manning Drive, N.C. Neurosciences Hospital, Basement, Chapel Hill, NC 27514",
    latitude: 0,  // Computed once by API at time of entry via Maps Geocoding service
    longitude: 0,
    phoneDirectory: ["984-974-4721", "984-974-5602", "984-974-2024"],
    email: "tarheeltrauma@unchealth.unc.edu",
    notes: "GOAL: Door to Decision Time 15 Minutes..."
  }
];

const ActivationData = [
  {
    id: 0,
    name: "Adult Red",
    criteria: [
      "<b>Traumatic cardiac arrest</b> during transport to UNC",
      "<b>Airway Compromise / Intubation / Respiratory Distress</b> to include burns with known / suspected inhalation injuries",
      "<b>Shock</b> at any time prior to or after patient arrival",
      ">> Age 16-64: Systolic BP <90", // Note: subitems
      ">> Age 65 or older: Systolic BP <110", 
      "<b>Unresponsive:</b> GCS < 8 with traumatic MOI",
      "Transfer patient <b>receiving blood</b> en route to maintain VS",
      "<b>Penetrating wounds</b> to head, neck, chest, abdomen",
      "<b>Neuro deficits in limb</b> with traumatic MOI",
      "<b>Tourniquet use and/or vascular</b> compromise of extremity",
      "<b>Amputation</b> above wrist or ankle",
      "<b>Burn patients with known or suspected trauma</b> meeting red alert criteria",
      "<b>Multiple casualties:</b> >3 red or yellow alerts",
      "ED Physician or Trauma Surgeon discretion",
    ],
    notes: "Age 0 - 15" 
  },
  {
    id: 1,
    name: "Adult Yellow",
    criteria: [
      "Respiratory rate <10 or >30",
      "Pulse rate <60 or >110",
      "Flail chest or multiple rib fractures",
      "Pneumothorax  / hemothorax",
      "GCS<14 but >8  with MOI attributed to trauma",
      "Known head bleed on anticoagulants / antiplatelets other than Aspirin",
      "Open or depressed skull fractures",
      "Two or more long bone (humerus / femur) fractures or deformities",
      "Crush injury to chest or pelvis",
      "Open fracture of femur, humerus, radius, ulna, tibia, or fibula in setting of any additional known or suspected traumatic injuries",
      "Burns with known or suspected trauma meeting yellow criteria",
      "Known hip and/or knee dislocation",
      "All trauma transfers from outside hospitals age 65 or older (unless upgraded to Red Tag or deferred by EM discretion)",
      "ED Physician or Trauma Surgeon discretion",
    ],
    notes: "Age 0 - 15"
  }
];

const RACData = []

// Support methods 

function getHospitalById(id) {
  for (let elem of HospitalData) {
    if (elem.id === id) {
      return elem;
    }
  }
  return {};
}

function getActivationById(id) {
  for (let elem of ActivationData) {
    if (elem.id === id) {
      return elem;
    }
  }
  return {};
}

// Declare sandboxed demo routes 
router.get('/', (req, res) => {
  res.send('nice shit works\n');
});

router.get('/hospitals', (req, res) => {
  res.send(JSON.stringify(HospitalData));
});

router.get('/hospitals/:id', (req, res) => {
  let targetId = parseInt(req.params.id, 10);
  let target = getHospitalById(targetId);
  res.send(JSON.stringify(target));
});

router.get('/activations', (req, res) => {
  res.send(JSON.stringify(ActivationData));
})

router.get('/activations/:id', (req, res) => {
  let targetId = parseInt(req.params.id, 10);
  let target = getActivationById(targetId);
  res.send(JSON.stringify(target));
});

module.exports = router;