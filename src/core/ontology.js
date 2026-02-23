/**
 * Full Ontology Registry — Three Reference Planes
 * Subject, Process, and Object plane entity definitions
 * for Traffic/AV, Privacy, and Financial compliance domains
 */

import { createEntity } from './schema.js';

// ─── Traffic / AV Ontology ─────────────────────────────────────────────────────

export const DriverRoles = {
    HumanDriver: createEntity('HumanDriver', 'DepartmentRole', 'Human Driver', { subtype: 'Driver' }),
    LearnerDriver: createEntity('LearnerDriver', 'DepartmentRole', 'Learner Driver', { subtype: 'Driver' }),
    NoviceDriver: createEntity('NoviceDriver', 'DepartmentRole', 'Novice Driver', { subtype: 'Driver' }),
    G1Driver: createEntity('G1Driver', 'DepartmentRole', 'G1 License Driver (Ontario)', { subtype: 'Driver', jurisdiction: 'CA-ON' }),
    G2Driver: createEntity('G2Driver', 'DepartmentRole', 'G2 License Driver (Ontario)', { subtype: 'Driver', jurisdiction: 'CA-ON' }),
    FullLicenseDriver: createEntity('FullLicenseDriver', 'DepartmentRole', 'Fully Licensed Driver', { subtype: 'Driver' }),
    Class5Driver: createEntity('Class5Driver', 'DepartmentRole', 'Class 5 Driver (BC/AB)', { subtype: 'Driver', jurisdiction: 'CA-BC' }),
    Class7Driver: createEntity('Class7Driver', 'DepartmentRole', 'Class 7 Driver (BC/AB)', { subtype: 'Driver', jurisdiction: 'CA-AB' }),
    SafetyDriver: createEntity('SafetyDriver', 'DepartmentRole', 'Safety Driver', { subtype: 'AV Safety' }),
    RemoteOperator: createEntity('RemoteOperator', 'DepartmentRole', 'Remote Operator', { subtype: 'AV Operations' }),
    TechnicalSupervisor: createEntity('TechnicalSupervisor', 'DepartmentRole', 'Technical Supervisor (German model)', { subtype: 'AV Operations', description: 'Monitors but does not teledrive' }),
    Teledriver: createEntity('Teledriver', 'DepartmentRole', 'Teledriver (Japan model)', { subtype: 'AV Operations', description: 'Remote human driver with valid license' }),
    FleetDispatcher: createEntity('FleetDispatcher', 'DepartmentRole', 'Fleet Dispatcher', { subtype: 'Fleet Operations' }),
    Passenger: createEntity('Passenger', 'User', 'Passenger', { subtype: 'Rider' }),
    LawEnforcementOfficer: createEntity('LawEnforcementOfficer', 'DepartmentRole', 'Law Enforcement Officer', { subtype: 'Authority' }),
    TrafficEngineer: createEntity('TrafficEngineer', 'DepartmentRole', 'Traffic Engineer', { subtype: 'Authority' }),
    ASDE: createEntity('ASDE', 'DepartmentRole', 'Authorised Self-Driving Entity (UK)', { subtype: 'AV Legal Entity', jurisdiction: 'UK', description: 'Manufacturer/ADS developer' }),
    UserInCharge: createEntity('UserInCharge', 'DepartmentRole', 'User-in-Charge (UK L3)', { subtype: 'AV Occupant', jurisdiction: 'UK', description: 'Enjoys statutory immunity' }),
    NUiC_Operator: createEntity('NUiC_Operator', 'DepartmentRole', 'NUiC Operator (UK L4/L5)', { subtype: 'AV Operator', jurisdiction: 'UK', description: 'Licensed operator for no-UiC vehicles' }),
};

export const VehicleClasses = {
    PassengerVehicle: createEntity('PassengerVehicle', 'Vehicle', 'Passenger Vehicle'),
    CommercialTransit: createEntity('CommercialTransit', 'Vehicle', 'Commercial Transit Vehicle'),
    HeavyDutyVehicle: createEntity('HeavyDutyVehicle', 'Vehicle', 'Heavy-Duty Vehicle (>10,000 lbs)', { description: 'Subject to special AV testing requirements' }),
    AutonomousVehicle: createEntity('AutonomousVehicle', 'Vehicle', 'Autonomous Vehicle (SAE L3/4/5)'),
    RoboTaxi: createEntity('RoboTaxi', 'Vehicle', 'RoboTaxi (Commercial AV for hire)'),
    EmergencyVehicle: createEntity('EmergencyVehicle', 'Vehicle', 'Emergency Vehicle'),
    SchoolBus: createEntity('SchoolBus', 'Vehicle', 'School Bus'),
    Bicycle: createEntity('Bicycle', 'Vehicle', 'Bicycle'),
    Motorcycle: createEntity('Motorcycle', 'Vehicle', 'Motorcycle'),
    ElectricScooter: createEntity('ElectricScooter', 'Vehicle', 'Electric Scooter'),
    AutonomousBus: createEntity('AutonomousBus', 'Vehicle', 'Autonomous Bus'),
    AutonomousTruck: createEntity('AutonomousTruck', 'Vehicle', 'Autonomous Truck'),
};

export const InfrastructureZones = {
    Intersection: createEntity('Intersection', 'InfrastructureZone', 'Intersection'),
    Crosswalk: createEntity('Crosswalk', 'InfrastructureZone', 'Crosswalk'),
    HOV_Lane: createEntity('HOV_Lane', 'InfrastructureZone', 'HOV Lane'),
    SchoolZone: createEntity('SchoolZone', 'InfrastructureZone', 'School Zone'),
    CommunitySafetyZone: createEntity('CommunitySafetyZone', 'InfrastructureZone', 'Community Safety Zone (Ontario)', { jurisdiction: 'CA-ON', description: 'Near parks, retirement homes, hospitals; doubles fines' }),
    ConstructionZone: createEntity('ConstructionZone', 'InfrastructureZone', 'Construction Zone'),
    RailwayCrossing: createEntity('RailwayCrossing', 'InfrastructureZone', 'Railway Crossing'),
    Roundabout: createEntity('Roundabout', 'InfrastructureZone', 'Roundabout'),
    HighwayOnRamp: createEntity('HighwayOnRamp', 'InfrastructureZone', 'Highway On-Ramp'),
    HighwayOffRamp: createEntity('HighwayOffRamp', 'InfrastructureZone', 'Highway Off-Ramp'),
    BicycleLane: createEntity('BicycleLane', 'InfrastructureZone', 'Bicycle Lane'),
    PedestrianZone: createEntity('PedestrianZone', 'InfrastructureZone', 'Pedestrian Zone'),
    GeoFencedZone: createEntity('GeoFencedZone', 'InfrastructureZone', 'Geo-Fenced Zone'),
    AirportPickupZone: createEntity('AirportPickupZone', 'InfrastructureZone', 'Airport Pickup Zone'),
    SensitiveLocation: createEntity('SensitiveLocation', 'InfrastructureZone', 'Sensitive Location'),
    AutomatedDrivingCorridor: createEntity('AutomatedDrivingCorridor', 'InfrastructureZone', 'Automated Driving Corridor (EU)', { jurisdiction: 'EU' }),
    DesignatedTrialArea: createEntity('DesignatedTrialArea', 'InfrastructureZone', 'Designated Trial Area (Singapore)', { jurisdiction: 'SG' }),
};

export const Constraints = {
    SpeedLimit45mph: createEntity('SpeedLimit45mph', 'Constraint', 'Speed ≤ 45 mph', { subtype: 'Speed' }),
    SpeedLimit50mph_HD: createEntity('SpeedLimit50mph_HD', 'Constraint', 'Speed ≤ 50 mph for heavy-duty AV', { subtype: 'Speed' }),
    SpeedLimit80kmh_JP: createEntity('SpeedLimit80kmh_JP', 'Constraint', '≤ 80 km/h for teledriving (Japan)', { subtype: 'Speed', jurisdiction: 'JP' }),
    DaylightOnly: createEntity('DaylightOnly', 'Constraint', 'Daylight hours only', { subtype: 'Temporal' }),
    WinterTireMandate: createEntity('WinterTireMandate', 'Constraint', 'Dec 1 – Mar 15 winter tire mandate (Quebec)', { subtype: 'Temporal', jurisdiction: 'CA-QC' }),
    NoHeavyRain: createEntity('NoHeavyRain', 'Constraint', 'No heavy rain', { subtype: 'Weather' }),
    NoIceSnow: createEntity('NoIceSnow', 'Constraint', 'No ice/snow accumulation', { subtype: 'Weather' }),
    SensorViability: createEntity('SensorViability', 'Constraint', 'Sensor viability threshold', { subtype: 'Weather' }),
    WithinGeoFence: createEntity('WithinGeoFence', 'Constraint', 'Within approved GeoFencedZone', { subtype: 'Geographic' }),
    FrontageRoads_HD: createEntity('FrontageRoads_HD', 'Constraint', 'Frontage access roads only for heavy-duty AV', { subtype: 'Geographic' }),
    PrefecturalPSC_JP: createEntity('PrefecturalPSC_JP', 'Constraint', 'Prefectural Public Safety Commission approved area (Japan)', { subtype: 'Geographic', jurisdiction: 'JP' }),
    TestMiles500K: createEntity('TestMiles500K', 'Constraint', '500,000 miles test (CA heavy-duty)', { subtype: 'Mileage', jurisdiction: 'US-CA' }),
    TestMiles100K_ODD: createEntity('TestMiles100K_ODD', 'Constraint', '100,000 miles within ODD', { subtype: 'Mileage' }),
    EnergyLimit_CN: createEntity('EnergyLimit_CN', 'Constraint', '≤ 15.1 kWh/100km (China GB 36980.1-2025)', { subtype: 'Energy', jurisdiction: 'CN' }),
    Insurance5M_CA: createEntity('Insurance5M_CA', 'Constraint', '$5M liability insurance (CA/AZ)', { subtype: 'Insurance' }),
    Insurance1_5M_SG: createEntity('Insurance1_5M_SG', 'Constraint', '$1.5M deposit (Singapore LTA)', { subtype: 'Insurance', jurisdiction: 'SG' }),
    DataResidency_CN: createEntity('DataResidency_CN', 'Constraint', 'HD mapping data on domestic servers (China)', { subtype: 'DataResidency', jurisdiction: 'CN' }),
    ForensicRetention_AZ: createEntity('ForensicRetention_AZ', 'Constraint', '30s pre/post event, 12-month retention (AZ SB 1417)', { subtype: 'ForensicData', jurisdiction: 'US-AZ' }),
};

export const TrafficActivities = {
    ExecuteStop: createEntity('ExecuteStop', 'Activity', 'Execute Stop'),
    ExecuteCompleteStop: createEntity('ExecuteCompleteStop', 'Activity', 'Execute Complete Stop'),
    YieldRightOfWay: createEntity('YieldRightOfWay', 'Activity', 'Yield Right of Way'),
    DynamicDrivingTask: createEntity('DynamicDrivingTask', 'Activity', 'Dynamic Driving Task (DDT)'),
    FallbackIntervention: createEntity('FallbackIntervention', 'Activity', 'Fallback Intervention'),
    ExecuteMRC: createEntity('ExecuteMRC', 'Activity', 'Execute Minimal Risk Condition (MRC)'),
    DispatchTrip: createEntity('DispatchTrip', 'Activity', 'Dispatch Trip'),
    CollectFare: createEntity('CollectFare', 'Activity', 'Collect Fare'),
    DetectPedestrian: createEntity('DetectPedestrian', 'Activity', 'Detect Pedestrian'),
    DetectODDExit: createEntity('DetectODDExit', 'Activity', 'Detect ODD Exit'),
    DetectBusMergeSignal: createEntity('DetectBusMergeSignal', 'Activity', 'Detect Bus Merge Signal'),
    DetectStopSign: createEntity('DetectStopSign', 'Activity', 'Detect Stop Sign'),
    RespondToEmergencyVehicle: createEntity('RespondToEmergencyVehicle', 'Activity', 'Respond to Emergency Vehicle'),
    ReportCollision: createEntity('ReportCollision', 'Activity', 'Report Collision'),
    ReportDisengagement: createEntity('ReportDisengagement', 'Activity', 'Report Disengagement'),
    ReportSensorMalfunction: createEntity('ReportSensorMalfunction', 'Activity', 'Report Sensor Malfunction'),
    ReportNearMiss: createEntity('ReportNearMiss', 'Activity', 'Report Near Miss'),
    IssueCitation: createEntity('IssueCitation', 'Activity', 'Issue Citation'),
    PerformSafetyCaseReview: createEntity('PerformSafetyCaseReview', 'Activity', 'Perform Safety Case Review'),
    ConductM1Test: createEntity('ConductM1Test', 'Activity', 'Conduct M1 Test (Singapore closed-circuit)', { jurisdiction: 'SG' }),
    ConductM2Test: createEntity('ConductM2Test', 'Activity', 'Conduct M2 Test (Singapore public road)', { jurisdiction: 'SG' }),
    SubmitPassengerSafetyPlan: createEntity('SubmitPassengerSafetyPlan', 'Activity', 'Submit Passenger Safety Plan'),
    EquipWinterTires: createEntity('EquipWinterTires', 'Activity', 'Equip Winter Tires'),
    LaneSplit: createEntity('LaneSplit', 'Activity', 'Lane Split (CA motorcycle)', { jurisdiction: 'US-CA' }),
    TurnRightOnRed: createEntity('TurnRightOnRed', 'Activity', 'Turn Right on Red'),
    ReduceSpeedLimit: createEntity('ReduceSpeedLimit', 'Activity', 'Reduce Speed Limit'),
    DeactivateVehicle: createEntity('DeactivateVehicle', 'Activity', 'Deactivate Vehicle (Technical Supervisor override)'),
    RecordForensicTelemetry: createEntity('RecordForensicTelemetry', 'Activity', 'Record Forensic Telemetry'),
    ValidateVRUDetection: createEntity('ValidateVRUDetection', 'Activity', 'Validate Vulnerable Road User Detection (AZ)', { jurisdiction: 'US-AZ' }),
};

export const LegalInstruments = {
    AV_TestingPermit_WithDriver: createEntity('AV_TestingPermit_WithDriver', 'LegalInstrument', 'AV Testing Permit (With Driver)'),
    AV_DriverlessTestingPermit: createEntity('AV_DriverlessTestingPermit', 'LegalInstrument', 'AV Driverless Testing Permit'),
    AV_DeploymentPermit: createEntity('AV_DeploymentPermit', 'LegalInstrument', 'AV Deployment Permit'),
    CPUC_DriveredPilotPermit: createEntity('CPUC_DriveredPilotPermit', 'LegalInstrument', 'CPUC Drivered Pilot Permit', { jurisdiction: 'US-CA' }),
    CPUC_DriverlessPilotPermit: createEntity('CPUC_DriverlessPilotPermit', 'LegalInstrument', 'CPUC Driverless Pilot Permit', { jurisdiction: 'US-CA' }),
    CPUC_Phase1DriverlessDeployment: createEntity('CPUC_Phase1DriverlessDeployment', 'LegalInstrument', 'CPUC Phase I Driverless Deployment', { jurisdiction: 'US-CA' }),
    TCP_Permit: createEntity('TCP_Permit', 'LegalInstrument', 'TCP Permit'),
    AirportAuthorityPermit: createEntity('AirportAuthorityPermit', 'LegalInstrument', 'Airport Authority Permit'),
    MunicipalByLaw: createEntity('MunicipalByLaw', 'LegalInstrument', 'Municipal By-Law'),
    StateDriversLicense: createEntity('StateDriversLicense', 'LegalInstrument', 'State Drivers License'),
    VehicleRegistration: createEntity('VehicleRegistration', 'LegalInstrument', 'Vehicle Registration'),
    InsuranceCertificate_AV: createEntity('InsuranceCertificate_AV', 'LegalInstrument', 'Insurance Certificate (AV)'),
    SafetyCaseDocument: createEntity('SafetyCaseDocument', 'LegalInstrument', 'Safety Case Document'),
    PassengerSafetyPlan: createEntity('PassengerSafetyPlan', 'LegalInstrument', 'Passenger Safety Plan'),
    UNECE_ADS_TypeApproval: createEntity('UNECE_ADS_TypeApproval', 'LegalInstrument', 'UNECE ADS Type Approval', { jurisdiction: 'UNECE' }),
    EU_SmallSeries: createEntity('EU_SmallSeries', 'LegalInstrument', 'EU 2022/1426 Small Series', { jurisdiction: 'EU' }),
    UK_AV_Act_Auth: createEntity('UK_AV_Act_Auth', 'LegalInstrument', 'UK AV Act 2024 Authorization', { jurisdiction: 'UK' }),
    Germany_StVG_License: createEntity('Germany_StVG_License', 'LegalInstrument', 'Germany StVG Operating License', { jurisdiction: 'DE' }),
    Japan_PrefecturalPSC: createEntity('Japan_PrefecturalPSC', 'LegalInstrument', 'Japan Prefectural PSC Permit', { jurisdiction: 'JP' }),
    Singapore_LTA_AVPermit: createEntity('Singapore_LTA_AVPermit', 'LegalInstrument', 'Singapore LTA AV Permit', { jurisdiction: 'SG' }),
    UAE_ITC_NOC: createEntity('UAE_ITC_NOC', 'LegalInstrument', 'UAE ITC NOC', { jurisdiction: 'AE' }),
    AZ_SB1417_Bond: createEntity('AZ_SB1417_Bond', 'LegalInstrument', 'AZ SB 1417 Insurance Bond', { jurisdiction: 'US-AZ' }),
    NOC: createEntity('NOC', 'LegalInstrument', 'No Objection Certificate'),
};

// ─── Privacy Ontology ──────────────────────────────────────────────────────────

export const PrivacyRoles = {
    DataSubject: createEntity('DataSubject', 'User', 'Data Subject'),
    DataController: createEntity('DataController', 'DepartmentRole', 'Data Controller'),
    DataProcessor: createEntity('DataProcessor', 'DepartmentRole', 'Data Processor'),
    ChiefPrivacyOfficer: createEntity('ChiefPrivacyOfficer', 'DepartmentRole', 'Chief Privacy Officer', { subtype: 'Officer' }),
    DataProtectionOfficer: createEntity('DataProtectionOfficer', 'DepartmentRole', 'Data Protection Officer', { subtype: 'Officer' }),
    PrivacyOffice: createEntity('PrivacyOffice', 'DepartmentRole', 'Privacy Office', { subtype: 'Department' }),
    OPC: createEntity('OPC', 'LegalEntity', 'Office of the Privacy Commissioner (Canada)', { jurisdiction: 'CA' }),
    CAI_Quebec: createEntity('CAI_Quebec', 'LegalEntity', 'Commission d\'accès à l\'information (Quebec)', { jurisdiction: 'CA-QC' }),
    IPC_Ontario: createEntity('IPC_Ontario', 'LegalEntity', 'Information and Privacy Commissioner (Ontario)', { jurisdiction: 'CA-ON' }),
    FTC: createEntity('FTC', 'LegalEntity', 'Federal Trade Commission (US)', { jurisdiction: 'US' }),
    CPPA_CA: createEntity('CPPA_CA', 'LegalEntity', 'California Privacy Protection Agency', { jurisdiction: 'US-CA' }),
};

export const PrivacyDataObjects = {
    PersonalInformation: createEntity('PersonalInformation', 'DataObject', 'Personal Information'),
    SensitivePI: createEntity('SensitivePI', 'DataObject', 'Sensitive Personal Information'),
    NeuralData: createEntity('NeuralData', 'DataObject', 'Neural Data'),
    HealthInformation: createEntity('HealthInformation', 'DataObject', 'Personal Health Information'),
    FinancialData: createEntity('FinancialData', 'DataObject', 'Financial Data'),
    BiometricData: createEntity('BiometricData', 'DataObject', 'Biometric Data'),
    GeolocationData: createEntity('GeolocationData', 'DataObject', 'Geolocation Data'),
    ChildData: createEntity('ChildData', 'DataObject', 'Child/Minor Data'),
    DeIdentifiedData: createEntity('DeIdentifiedData', 'DataObject', 'De-Identified Data'),
    TelemetryData: createEntity('TelemetryData', 'DataObject', 'Telemetry Data', { description: 'AV sensor/operational data' }),
    HDMappingData: createEntity('HDMappingData', 'DataObject', 'HD Mapping Data'),
};

export const PrivacyActivities = {
    ObtainConsent: createEntity('ObtainConsent', 'Activity', 'Obtain Consent'),
    WithdrawConsent: createEntity('WithdrawConsent', 'Activity', 'Withdraw Consent'),
    CollectData: createEntity('CollectData', 'Activity', 'Collect Data'),
    ProcessData: createEntity('ProcessData', 'Activity', 'Process Data'),
    IdentifyPurpose: createEntity('IdentifyPurpose', 'Activity', 'Identify Purpose'),
    ConductPIA: createEntity('ConductPIA', 'Activity', 'Conduct Privacy Impact Assessment'),
    ReportBreach: createEntity('ReportBreach', 'Activity', 'Report Breach'),
    NotifyIndividual: createEntity('NotifyIndividual', 'Activity', 'Notify Individual'),
    RespondAccessRequest: createEntity('RespondAccessRequest', 'Activity', 'Respond to Access Request'),
    DeleteData: createEntity('DeleteData', 'Activity', 'Delete/Dispose Data'),
    AuditAccuracy: createEntity('AuditAccuracy', 'Activity', 'Audit Accuracy'),
    ConductYouthRiskAssessment: createEntity('ConductYouthRiskAssessment', 'Activity', 'Conduct Youth Risk Assessment'),
};

export const PrivacyProcesses = {
    DataIntakeProcess: createEntity('DataIntakeProcess', 'Process', 'Data Intake Process'),
    BreachResponseProcess: createEntity('BreachResponseProcess', 'Process', 'Breach Response Process'),
    PrivacyImpactAssessment: createEntity('PrivacyImpactAssessment', 'Process', 'Privacy Impact Assessment'),
    AccessRequestProcess: createEntity('AccessRequestProcess', 'Process', 'Access Request Process'),
    DataRetentionProcess: createEntity('DataRetentionProcess', 'Process', 'Data Retention and Disposal Process'),
    ConsentManagement: createEntity('ConsentManagement', 'Process', 'Consent Management Process'),
};

// ─── Financial Compliance Ontology ─────────────────────────────────────────────

export const FinancialRoles = {
    CEO: createEntity('CEO', 'DepartmentRole', 'Chief Executive Officer', { subtype: 'Officer' }),
    CFO: createEntity('CFO', 'DepartmentRole', 'Chief Financial Officer', { subtype: 'Officer' }),
    InternalAuditor: createEntity('InternalAuditor', 'DepartmentRole', 'Internal Auditor', { subtype: 'Auditor' }),
    ExternalAuditor: createEntity('ExternalAuditor', 'DepartmentRole', 'External Auditor', { subtype: 'Auditor' }),
    AuditCommittee: createEntity('AuditCommittee', 'DepartmentRole', 'Audit Committee', { subtype: 'Committee' }),
    RequisitionClerk: createEntity('RequisitionClerk', 'DepartmentRole', 'Requisition Clerk', { subtype: 'Staff' }),
    SEC: createEntity('SEC', 'LegalEntity', 'Securities and Exchange Commission', { jurisdiction: 'US' }),
    PCAOB: createEntity('PCAOB', 'LegalEntity', 'Public Company Accounting Oversight Board', { jurisdiction: 'US' }),
    CSA: createEntity('CSA', 'LegalEntity', 'Canadian Securities Administrators', { jurisdiction: 'CA' }),
};

export const FinancialActivities = {
    EvaluateICFR: createEntity('EvaluateICFR', 'Activity', 'Evaluate ICFR'),
    CertifyDCP: createEntity('CertifyDCP', 'Activity', 'Certify DC&P'),
    SignStockCertificate: createEntity('SignStockCertificate', 'Activity', 'Sign Stock Certificate'),
    DiscloseInMDA: createEntity('DiscloseInMDA', 'Activity', 'Disclose in MD&A'),
    ExecutiveCertification: createEntity('ExecutiveCertification', 'Activity', 'Executive Certification (SOX 302)'),
    ExternalAttestation: createEntity('ExternalAttestation', 'Activity', 'External Attestation (SOX 404b)'),
};

export const FinancialProcesses = {
    ICFR_Assessment: createEntity('ICFR_Assessment', 'Process', 'ICFR Assessment Cycle'),
    AnnualFilingProcess: createEntity('AnnualFilingProcess', 'Process', 'Annual Filing Process'),
    RequestProcess: createEntity('RequestProcess', 'Process', 'Requisition/Request Process'),
    ProcurementProcess: createEntity('ProcurementProcess', 'Process', 'Procurement Process'),
    InternalFinanceProcess: createEntity('InternalFinanceProcess', 'Process', 'Internal Finance Process'),
    ExternalAttestationProcess: createEntity('ExternalAttestationProcess', 'Process', 'External Attestation Process'),
};

export const FinancialDataObjects = {
    FinancialStatement: createEntity('FinancialStatement', 'DataObject', 'Financial Statement'),
    TelemetryBlackBox: createEntity('TelemetryBlackBox', 'DataObject', 'Telemetry Black Box'),
};

// ─── Teleological Values ────────────────────────────────────────────────────────

export const Values = {
    PublicSafety: createEntity('PublicSafety', 'Value', 'Public Safety'),
    TrafficEfficiency: createEntity('TrafficEfficiency', 'Value', 'Traffic Efficiency'),
    InvestorProtection: createEntity('InvestorProtection', 'Value', 'Investor Protection'),
    ConsumerPrivacy: createEntity('ConsumerPrivacy', 'Value', 'Consumer Privacy'),
    DataMinimization: createEntity('DataMinimization', 'Value', 'Data Minimization'),
    Transparency: createEntity('Transparency', 'Value', 'Transparency'),
    ChildProtection: createEntity('ChildProtection', 'Value', 'Child Protection'),
    FinancialIntegrity: createEntity('FinancialIntegrity', 'Value', 'Financial Integrity'),
    AuditorIndependence: createEntity('AuditorIndependence', 'Value', 'Auditor Independence'),
    FreedomOfExpression: createEntity('FreedomOfExpression', 'Value', 'Freedom of Expression'),
    InnovationPromotion: createEntity('InnovationPromotion', 'Value', 'Innovation Promotion'),
    DataSovereignty: createEntity('DataSovereignty', 'Value', 'Data Sovereignty'),
    EconomicDiversification: createEntity('EconomicDiversification', 'Value', 'Economic Diversification'),
    DemographicNecessity: createEntity('DemographicNecessity', 'Value', 'Demographic Necessity (Japan)'),
    SingleMarketPreservation: createEntity('SingleMarketPreservation', 'Value', 'Single Market Preservation (EU)'),
};

// ─── Regulatory Bodies ──────────────────────────────────────────────────────────

export const RegulatoryBodies = {
    DMV_CA: createEntity('DMV_CA', 'LegalEntity', 'California DMV', { jurisdiction: 'US-CA' }),
    CPUC: createEntity('CPUC', 'LegalEntity', 'California Public Utilities Commission', { jurisdiction: 'US-CA' }),
    NHTSA: createEntity('NHTSA', 'LegalEntity', 'National Highway Traffic Safety Administration', { jurisdiction: 'US' }),
    KBA: createEntity('KBA', 'LegalEntity', 'Federal Motor Transport Authority (Germany)', { jurisdiction: 'DE' }),
    LTA_SG: createEntity('LTA_SG', 'LegalEntity', 'Land Transport Authority (Singapore)', { jurisdiction: 'SG' }),
    ITC_AbuDhabi: createEntity('ITC_AbuDhabi', 'LegalEntity', 'Abu Dhabi ITC', { jurisdiction: 'AE' }),
    RTA_Dubai: createEntity('RTA_Dubai', 'LegalEntity', 'Dubai RTA', { jurisdiction: 'AE' }),
    RAKTA: createEntity('RAKTA', 'LegalEntity', 'Ras Al Khaimah Transport Authority', { jurisdiction: 'AE' }),
    MIIT_CN: createEntity('MIIT_CN', 'LegalEntity', 'Ministry of Industry and Information Technology (China)', { jurisdiction: 'CN' }),
    PIPC_KR: createEntity('PIPC_KR', 'LegalEntity', 'Personal Information Protection Commission (Korea)', { jurisdiction: 'KR' }),
    WP29: createEntity('WP29', 'LegalEntity', 'UNECE WP.29', { jurisdiction: 'UNECE' }),
    GRVA: createEntity('GRVA', 'LegalEntity', 'UNECE GRVA Working Party', { jurisdiction: 'UNECE' }),
};

// ─── Collect All Entities ───────────────────────────────────────────────────────

export function getAllEntities() {
    return [
        ...Object.values(DriverRoles),
        ...Object.values(VehicleClasses),
        ...Object.values(InfrastructureZones),
        ...Object.values(Constraints),
        ...Object.values(TrafficActivities),
        ...Object.values(LegalInstruments),
        ...Object.values(PrivacyRoles),
        ...Object.values(PrivacyDataObjects),
        ...Object.values(PrivacyActivities),
        ...Object.values(PrivacyProcesses),
        ...Object.values(FinancialRoles),
        ...Object.values(FinancialActivities),
        ...Object.values(FinancialProcesses),
        ...Object.values(FinancialDataObjects),
        ...Object.values(Values),
        ...Object.values(RegulatoryBodies),
    ];
}

export function getEntityById(id) {
    const all = getAllEntities();
    return all.find(e => e.id === id) || null;
}

export function getEntitiesByType(type) {
    return getAllEntities().filter(e => e.type === type);
}

export function getEntitiesByJurisdiction(jurisdiction) {
    return getAllEntities().filter(e => e.jurisdiction === jurisdiction);
}

export function getOntologyStats() {
    const all = getAllEntities();
    const byType = {};
    for (const e of all) {
        byType[e.type] = (byType[e.type] || 0) + 1;
    }
    return { total: all.length, byType };
}
