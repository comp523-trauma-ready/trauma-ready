//const Hospital = mongoose.model('Hospital');
//const HospitalData = [
//    {
//	hid: 0,
//	name: "UNC Health Care",
//	rac: "Mid-Carolina",
//	traumaLevel: "Adult, Pediatric",
//	services: [],
//	address: "101 Manning Drive, N.C. Neurosciences Hospital, Basement, Chapel Hill, NC 27514",
//	latitude: 0,  // Computed once by API at time of entry via Maps Geocoding service
//	longitude: 0,
//	phoneDirectory: [
//		{
//			connection: "Patient Logistics Center-1",
//			number: "1-855-PLC-4-UNC"},
//		{
//			connection: "Emergency Department-Charge Nurse",
//			number: "984-974-5602"},
//		{
//			connection: "BAT PhONE",
//			number: "984-974-2024"}
//	 ],
//	email: "tarheeltrauma@unchealth.unc.edu",
//	notes: "GOAL: Door to Decision Time 15 Minutes..."
//    }
//];
//
//const ActivationData = [
//    {
//	aid: 0,
//	name: "Adult Red",
//	criteria: [
//	    "<b>Traumatic cardiac arrest</b> during transport to UNC",
//	    "<b>Airway Compromise / Intubation / Respiratory Distress</b> to include burns with known / suspected inhalation injuries",
//	    "<b>Shock</b> at any time prior to or after patient arrival",
//	    ">> Age 16-64: Systolic BP <90", // Note: subitems
//	    ">> Age 65 or older: Systolic BP <110", 
//	    "<b>Unresponsive:</b> GCS < 8 with traumatic MOI",
//	    "Transfer patient <b>receiving blood</b> en route to maintain VS",
//	    "<b>Penetrating wounds</b> to head, neck, chest, abdomen",
//	    "<b>Neuro deficits in limb</b> with traumatic MOI",
//	    "<b>Tourniquet use and/or vascular</b> compromise of extremity",
//	    "<b>Amputation</b> above wrist or ankle",
//	    "<b>Burn patients with known or suspected trauma</b> meeting red alert criteria",
//	    "<b>Multiple casualties:</b> >3 red or yellow alerts",
//	    "ED Physician or Trauma Surgeon discretion",
//	],
//	notes: "Age 0 - 15" 
//    },
//    {
//	aid: 1,
//	name: "Adult Yellow",
//	criteria: [
//	    "Respiratory rate <10 or >30",
//	    "Pulse rate <60 or >110",
//	    "Flail chest or multiple rib fractures",
//	    "Pneumothorax  / hemothorax",
//	    "GCS<14 but >8  with MOI attributed to trauma",
//	    "Known head bleed on anticoagulants / antiplatelets other than Aspirin",
//	    "Open or depressed skull fractures",
//	    "Two or more long bone (humerus / femur) fractures or deformities",
//	    "Crush injury to chest or pelvis",
//	    "Open fracture of femur, humerus, radius, ulna, tibia, or fibula in setting of any additional known or suspected traumatic injuries",
//	    "Burns with known or suspected trauma meeting yellow criteria",
//	    "Known hip and/or knee dislocation",
//	    "All trauma transfers from outside hospitals age 65 or older (unless upgraded to Red Tag or deferred by EM discretion)",
//	    "ED Physician or Trauma Surgeon discretion",
//	],
//	notes: "Age 0 - 15"
//    }
//];
