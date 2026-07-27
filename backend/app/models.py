# Import List and Literal for type hinting from the 'typing' module.
from typing import List, Literal
# Import BaseModel from Pydantic for creating data models.
from pydantic import BaseModel

# Define the BuildingDetails Pydantic model.
# This model will be used to structure data related to the building's general information.
class BuildingDetails(BaseModel):
    # Define 'building_type' with specific allowed string values (Literal).
    building_type: Literal[
        "Residential",
        "Commercial",
        "Industrial",
        "Mixed Use",
        "Institutional",
        "Not Detectable"
    ]

    # Define 'floors' as a string.
    floors: str

    # Define 'drawing_quality' with specific allowed string values.
    drawing_quality: Literal[
        "Excellent",
        "Good",
        "Fair",
        "Poor"
    ]



# Define the InspectionResult Pydantic model.
# This model will hold the overall outcome and scores of the blueprint inspection.
class InspectionResult(BaseModel):
    # Define 'status' with allowed values "Passed" or "Failed".
    status: Literal[
        "Passed",
        "Failed"
    ]

    # Define 'approval_status' with specific approval categories.
    approval_status: Literal[
        "Approved",
        "Conditionally Approved",
        "Not Approved"
    ]

    # Define 'compliance_score' as an integer.
    compliance_score: int

    # Define 'approval_probability' as a string.
    approval_probability: str

    # Define 'risk_level' with various risk categories.
    risk_level: Literal[
        "Low",
        "Moderate",
        "High",
        "Critical"
    ]



# Define the Summary Pydantic model.
# This model will summarize the key numerical findings of the inspection.
class Summary(BaseModel):
    # Define 'total_rooms' as an integer.
    total_rooms: int
    # Define 'rooms_checked' as an integer.
    rooms_checked: int
    # Define 'total_violations' as an integer.
    total_violations: int
    # Define 'high' for high-severity violations as an integer.
    high: int
    # Define 'medium' for medium-severity violations as an integer.
    medium: int
    # Define 'low' for low-severity violations as an integer.
    low: int


# Define the InspectionChecks Pydantic model.
# This model categorizes checks into passed, failed, or unable to verify.
class InspectionChecks(BaseModel):
    # List of checks that passed.
    passed_checks: List[str]
    # List of checks that failed.
    failed_checks: List[str]
    # List of checks that could not be verified.
    unable_to_verify: List[str]



# Define the Violation Pydantic model.
# This model structures the details of each individual building code violation.
class Violation(BaseModel):
    # Name of the room where the violation occurred.
    room: str

    # Severity of the violation (High, Medium, or Low).
    severity: Literal[
        "High",
        "Medium",
        "Low"
    ]

    # Confidence in the visual evidence for the violation (High, Medium, or Low).
    confidence: Literal[
        "High",
        "Medium",
        "Low"
    ]

    # Description of the issue.
    issue: str

    # Current value observed in the blueprint.
    current_value: str

    # Required value according to building codes.
    required_value: str

    # Suggestion to fix the violation.
    suggestion: str



# This is the main Pydantic model that aggregates all other models for a complete blueprint inspection report.

class BlueprintInspection(BaseModel):
    # Embed the BuildingDetails model.
    building_details: BuildingDetails

    # Embed the InspectionResult model.
    inspection_result: InspectionResult

    # Embed the Summary model.
    summary: Summary

    # Embed the InspectionChecks model.
    inspection_checks: InspectionChecks

    # A list of Violation models to capture multiple violations.
    violations: List[Violation]

    # A list of positive observations as strings.
    positive_observations: List[str]

    # A list of recommendations as strings.
    recommendations: List[str]

    # An overall recommendation as a single string.
    overall_recommendation: str