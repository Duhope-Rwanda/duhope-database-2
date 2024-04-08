import React, {
    useState
} from 'react';
import { PageTitle } from '../../../../_duhope/layout/core';
import "bootstrap-select/dist/css/bootstrap-select.min.css";
import "bootstrap-select/dist/js/bootstrap-select.min";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Select from 'react-select';
import { MdOutlineCancel } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";

interface Skill {
    value: string;
    label: string;
}

interface Child {
    name?: string;
    gender?: string;
    age?: string;
    inschool?: string;
    schooltype?: string;
    childillness?: string;
    childmedicalcondition?: string;
    childdisability?: string;
}

interface Contributor {
    namee?: string;
    relationship?: string;
    primarypro?: string;
    moneyfood?: string;
}

interface medicalhistori {
    hospitillness?: string;
    medication?: string;
    hospital?: string;
}

const AddWomen = () => {

    type ValueType<OptionType> =
        | OptionType
        | ReadonlyArray<OptionType>
        | null
        | undefined;

    //  --------------    tabs initialization ------------------------

    const [key, setKey] = useState('Demographics');

    // -------------- End tabs initialization ------------------------ 

    // ----------------  Usestate of input fields ---------------------------------------------------------

    const [formData, setFormData] = useState({
        image: null,
        names: "",
        phoneNumber: '',
        dateOfBirth: '',
        emergencynames: '',
        emergencyphoneNumber: '',
        emergencyrelation: '',
        maritalStatus: '',
        ableToReadAndWrite: '',
        returnToSchool: '',
        highestEducationLevel: '',
        skills: [] as string[],
        otherSkill: '',
        bankAccount: '',
        savingsCooperative: '',
        housingSituation: '',
        children: [] as Child[],
        reasonToJoinProgram: '',
        contributors: [] as Contributor[],
        participantPrimaryProvider: '',
        participantsAlternativeMeansOfIncome: '',
        howPaySchooLFees: '',
        otherSourceOfIncome: '',
        howLongInSexWork: '',
        howOftenWork: '',
        previousEmployement: '',
        generalHealth: '',
        hivTesting: '',
        result: '',
        medication: '',
        medicalhistories: [] as medicalhistori[],
        participantDisability: '',
        participantAddiction: '',
        participantInsurance: '',
        bornAndRaised: '',
        childHoodDescription: '',
        mentaIllnessHistory: '',
        commentsOnMentalHistory: '',
        emotionalHealth: '',
        otherMemberThatAssist: '',
        relationShipWithCommunity: '',
        commentsOnRelationShipWithCommunity: '',
        haveFriends: '',
        commentsOnHaveFriends: '',
        practiceReligion: '',
        specifyReligion: '',
        involvementWithReligious: '',

    });

    const handleInputChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData, "data");
    };

    // ---------------- End  Usestate of input fields ---------------------------------------------------------

    // --------------- Skills ---------------------------------------------------------------------------------

    const [selectedSkills, setSelectedSkills] = useState<ValueType<Skill>>([]);
    const [otherSkill, setOtherSkill] = useState<string>('');

    const skills: Skill[] = [
        { value: 'Tailoring', label: 'Tailoring' },
        { value: 'Sewing', label: 'Sewing' },
        { value: 'Beautician', label: 'Beautician' },
        { value: 'Jewelry', label: 'Jewelry' },
        { value: 'Cooking', label: 'Cooking' },
        { value: 'Computer', label: 'Computer' },
        { value: 'Others', label: 'Others' },
    ];

    const handleSkillChange = (selectedOptions: ValueType<Skill>) => {
        setSelectedSkills(selectedOptions);
        const selectedSkillsValues = Array.isArray(selectedOptions) ? selectedOptions.map(skill => skill.value) : [];
        setFormData({ ...formData, skills: selectedSkillsValues });
        const otherOptionSelected = selectedOptions && Array.isArray(selectedOptions) && selectedOptions.some(option => option.value === 'Others');
        if (!otherOptionSelected) {
            setOtherSkill('');
        }
    }

    const handleOtherSkillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOtherSkill(event.target.value);
        setFormData({ ...formData, otherSkill: event.target.value });
    }

    // ----------------- Skills End -------------------------------------------------------------------------

    // --------------- Add Child Row --------------------------------------------------------------------------

    const [children, setChildren] = useState([{ id: 1 }]);

    const addAnotherChild = () => {
        const newId = children.length + 1;
        setChildren([...children, { id: newId }]);
        setFormData({ ...formData, children: [...formData.children, {} as Child] });
    };

    const removeChild = (indexToRemove) => {
        setChildren(children.filter((_, index) => index !== indexToRemove));
        setFormData({ ...formData, children: formData.children.filter((_, index) => index !== indexToRemove) });
    };

    const handleChildInputChange = (e, index, fieldName) => {
        const newChildren = [...formData.children];
        if (!newChildren[index]) {
            newChildren[index] = {};
        }
        newChildren[index][fieldName] = e.target.value;
        setFormData({ ...formData, children: newChildren });
    };

    // --------------- End Add Child Row ---------------------------------

    // --------------- Add People who contribute to the household Row -------------------------------------

    const [householdContributor, setHouseHoldContributor] = useState([{ id: 1 }]);

    const addAnotherContributor = () => {
        const newHouseHoldId = householdContributor.length + 1;
        setHouseHoldContributor([...householdContributor, { id: newHouseHoldId }]);
        setFormData({ ...formData, contributors: [...formData.contributors, {} as Contributor] })
    };

    const removeHousehold = (householdIdToRemove) => {
        setHouseHoldContributor(householdContributor.filter((_, index) => index !== householdIdToRemove));
        setFormData({ ...formData, contributors: formData.contributors.filter((_, index) => index !== householdIdToRemove) });
    };

    const handleHouseholdInputChange = (e, index, fieldName) => {
        const newHouseholdContributor = [...formData.contributors];
        if (!newHouseholdContributor[index]) {
            newHouseholdContributor[index] = {};
        }
        newHouseholdContributor[index][fieldName] = e.target.value;
        setFormData({ ...formData, contributors: newHouseholdContributor });
    };

    // --------------- End Add People who contribute to the household Row ---------------------------------

    // --------------- Add Medical history Row ---------------------------------------------------------

    const [medicalHistory, setMedicalHistory] = useState([{ id: 1 }]);

    const addAnotherMedicalHistory = () => {
        const newMedicalId = medicalHistory.length + 1;
        setMedicalHistory([...medicalHistory, { id: newMedicalId }]);
        setFormData({ ...formData, medicalhistories: [...formData.medicalhistories, {} as medicalhistori] })
    };

    const removeMedical = (medicalIdToRemove) => {
        setMedicalHistory(medicalHistory.filter((_, index) => index !== medicalIdToRemove));
        setFormData({ ...formData, medicalhistories: formData.medicalhistories.filter((_, index) => index !== medicalIdToRemove) });
    };

    const handleMedicalHistoryInputChange = (e, index, fieldName) => {
        const newMedicalHistories = [...formData.medicalhistories];
        if (!newMedicalHistories[index]) {
            newMedicalHistories[index] = {};
        }
        newMedicalHistories[index][fieldName] = e.target.value;
        setFormData({ ...formData, medicalhistories: newMedicalHistories });
    };

    // --------------- End Add Medical history Row -----------------------------------------------------


    return (

        <>
            <PageTitle>Add Woman</PageTitle>
            <div className=" card mb-5 mb-xl-10 p-10 ">
                <section className="panel panel-default">
                    <div className="panel-body">
                        <form
                            id="kt_modal_add_user_form"
                            className="form"
                        >
                            <Tabs
                                activeKey={key}
                                onSelect={(k) => setKey(k as string)}
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >

                                {/* begin::demographics tab */}
                                <Tab eventKey="Demographics" title="Demographics" className='pt-5'>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="formFile" className="mb-3">
                                            <Form.Label>Woman Image</Form.Label>
                                            <Form.Control required type="file" name="image" onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>Names</Form.Label>
                                            <Form.Control required type='text' name="names" placeholder="Full Names" value={formData.names} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control required type='tel' placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Date of birth</Form.Label>
                                            <Form.Control required type="date" name="dateOfBirth" placeholder="Date Of Birth" value={formData.dateOfBirth} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <h4>Emergency Contact</h4>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Names</Form.Label>
                                            <Form.Control required type='text' placeholder="Emergency Contact Names" name="emergencynames" value={formData.emergencynames} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control required type='tel' placeholder="Emergency Contact Phone" name="emergencyphoneNumber" value={formData.emergencyphoneNumber} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Relation</Form.Label>
                                            <Form.Control required type='text' placeholder="Emergency Contact Relation" name="emergencyrelation" value={formData.emergencyrelation} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <h4>Details</h4>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Marital Status</Form.Label>
                                            <Form.Select required name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="single">Single</option>
                                                <option value="legally">Legally Married</option>
                                                <option value="unoficially">Unoficially Married</option>
                                                <option value="separated">Separated/Divorced</option>
                                                <option value="widowed">Widowed</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>Is the Participant able to read and write ?</Form.Label>
                                            <Form.Select required name="ableToReadAndWrite" value={formData.ableToReadAndWrite} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label>Does she want to return to school ?</Form.Label>
                                            <Form.Select required name="returnToSchool" value={formData.returnToSchool} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Highest Level Of Education</Form.Label>
                                            <Form.Control required type='text' placeholder="Highest Education Level" name="highestEducationLevel" value={formData.highestEducationLevel} onChange={handleInputChange} />
                                        </Form.Group>
                                        <div>
                                            <Form.Group as={Col} >
                                                <Form.Label>Skills</Form.Label>
                                                <Select
                                                    required
                                                    className='mt-1'
                                                    options={skills}
                                                    isSearchable={true}
                                                    isClearable={true}
                                                    isMulti
                                                    value={selectedSkills}
                                                    onChange={handleSkillChange}
                                                    placeholder="Select Skill"
                                                />
                                            </Form.Group>
                                            {Array.isArray(selectedSkills) && selectedSkills.some((skill: Skill) => skill.value === 'Others') &&
                                                <Form.Group as={Col}>
                                                    <Form.Label>Other Skill</Form.Label>
                                                    <Form.Control
                                                        type='text'
                                                        value={otherSkill}
                                                        onChange={handleOtherSkillChange}
                                                        placeholder="Specify Other Skill"
                                                    />
                                                </Form.Group>
                                            }
                                        </div>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Does She have Bank Account ?</Form.Label>
                                            <Form.Select required name="bankAccount" value={formData.bankAccount} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label>She belong to a savings cooperative ?</Form.Label>
                                            <Form.Select required name="savingsCooperative" value={formData.savingsCooperative} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Label> Participants'housing situation</Form.Label>
                                            <Form.Select required name="housingSituation" value={formData.housingSituation} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="rent">Rent</option>
                                                <option value="own">Own</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <h4>Children</h4>
                                    <div className='d-flex flex-column justify-content-center align-content-center mb-5'>
                                        {children.map((_, index) => (
                                            <div key={index}>
                                                <h6>Child {index + 1}</h6>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type='text'
                                                            placeholder="Full Names"
                                                            value={formData.children[index]?.name || ''}
                                                            onChange={(e) => handleChildInputChange(e, index, 'name')}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Gender</Form.Label>
                                                        <Form.Select required
                                                            value={formData.children[index]?.gender || ''}
                                                            onChange={(e) => handleChildInputChange(e, index, 'gender')}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                        <Form.Label>Age</Form.Label>
                                                        <Form.Control
                                                            required
                                                            type='text'
                                                            placeholder="age"
                                                            value={formData.children[index]?.age || ''}
                                                            onChange={(e) => handleChildInputChange(e, index, 'age')}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                        <Form.Label>in School ?</Form.Label>
                                                        <Form.Select required
                                                            value={formData.children[index]?.inschool || ''}
                                                            onChange={(e) => handleChildInputChange(e, index, 'inschool')}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="yes">Yes</option>
                                                            <option value="no">No</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                        <Form.Label>School Type</Form.Label>
                                                        <Form.Select required
                                                            value={formData.children[index]?.schooltype || ''}
                                                            onChange={(e) => handleChildInputChange(e, index, 'schooltype')}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="private">Private</option>
                                                            <option value="public">Public</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Col>
                                                        <MdOutlineCancel onClick={() => removeChild(index)} style={{ fontSize: "20px", cursor: "pointer", fontWeight: "300" }} />
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))}
                                        <IoAddCircle onClick={addAnotherChild} style={{ fontSize: "20px", cursor: "pointer", fontWeight: "300", color: "#27CFC8" }} />
                                    </div>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Why Does She want to Join the program ?</Form.Label>
                                            <Form.Control required as="textarea" placeholder="Why the participant want to join the program" name="reasonToJoinProgram" value={formData.reasonToJoinProgram} onChange={handleInputChange} style={{ height: '100px' }} />
                                        </Form.Group>
                                    </Row>
                                </Tab>
                                {/* end::demographics tab */}

                                {/* begin::financial tab */}
                                <Tab eventKey="Financial" title="Financial" className='pt-5'>
                                    <h5>People who contribute to the household</h5>
                                    <div className='d-flex flex-column justify-content-center align-content-center mb-5'>
                                        {householdContributor.map((_, index) => (
                                            <div key={index}>
                                                <h6>Contributor {index + 1}</h6>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Name</Form.Label>
                                                        <Form.Control required type='text' placeholder="Full Names"
                                                            value={formData.contributors[index]?.namee || ''}
                                                            onChange={(e) => handleHouseholdInputChange(e, index, 'namee')}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col}>
                                                        <Form.Label>Relationship</Form.Label>
                                                        <Form.Control required type='text' placeholder="Relationship"
                                                            value={formData.contributors[index]?.relationship || ''}
                                                            onChange={(e) => handleHouseholdInputChange(e, index, 'relationship')}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} controlId="formGridPassword">
                                                        <Form.Label>Primary Provider ?</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.contributors[index]?.primarypro || ''}
                                                            onChange={(e) => handleHouseholdInputChange(e, index, 'primarypro')}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="yes">Yes</option>
                                                            <option value="no">NO</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group as={Col} >
                                                        <Form.Label>Money/Food ?</Form.Label>
                                                        <Form.Select
                                                            required
                                                            value={formData.contributors[index]?.moneyfood || ''}
                                                            onChange={(e) => handleHouseholdInputChange(e, index, 'moneyfood')}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="yes">Yes</option>
                                                            <option value="no">No</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group as={Col}  >
                                                        <MdOutlineCancel onClick={() => removeHousehold(index)} style={{ fontSize: "20px", cursor: "pointer", fontWeight: "300" }} />
                                                    </Form.Group>
                                                </Row>
                                            </div>
                                        ))}
                                        <IoAddCircle onClick={addAnotherContributor} style={{ fontSize: "20px", cursor: "pointer", fontWeight: "300", color: "#27CFC8" }} />
                                    </div>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> Is the participant the primary provider for the household ?  </Form.Label>
                                            <Form.Select required name="participantPrimaryProvider" value={formData.participantPrimaryProvider} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">NO</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Does the participant have alternative means of income ?  </Form.Label>
                                            <Form.Select required name="participantsAlternativeMeansOfIncome" value={formData.participantsAlternativeMeansOfIncome} onChange={handleInputChange}>
                                                <option>Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">NO</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> How does the participant pay for school fees ?  </Form.Label>
                                            <Form.Control required as="textarea" placeholder="means of paying school fees " name="howPaySchooLFees" value={formData.howPaySchooLFees} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Specify other sources of income  </Form.Label>
                                            <Form.Control required as="textarea" placeholder="other source of income" name="otherSourceOfIncome" value={formData.otherSourceOfIncome} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> How long has the participant been working in sex work ?   </Form.Label>
                                            <Form.Control required type="text" placeholder="how long in sex work" name="howLongInSexWork" value={formData.howLongInSexWork} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> How often does the participant work ?  </Form.Label>
                                            <Form.Control required type="text" placeholder="how often work" name="howOftenWork" value={formData.howOftenWork} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> Previous employment/work  </Form.Label>
                                            <Form.Control required as="textarea" placeholder="Employement History" name="previousEmployement" value={formData.previousEmployement} onChange={handleInputChange} style={{ height: '100px' }} />
                                        </Form.Group>
                                    </Row>
                                </Tab>
                                {/* end::financial tab */}

                                {/* begin::physical tab */}
                                <Tab eventKey="Physical" title="Physical" className='pt-5'>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> General Health </Form.Label>
                                            <Form.Control required as="textarea" placeholder="General Health" name="generalHealth" value={formData.generalHealth} onChange={handleInputChange} style={{ height: '50px' }} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> HIV Testing ? </Form.Label>
                                            <Form.Select required name="hivTesting" value={formData.hivTesting} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">NO</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Result </Form.Label>
                                            <Form.Control required type="text" placeholder="results" name="result" value={formData.result} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Medication </Form.Label>
                                            <Form.Control required type="text" placeholder="medication" />
                                        </Form.Group>
                                    </Row>
                                    <h5>Medical History</h5>
                                    <div className='d-flex flex-column justify-content-center align-content-center mb-5'>
                                        {medicalHistory.map((_, index) => (
                                            <div key={index}>
                                                <Row className="mb-3">
                                                    <Form.Group as={Col} >
                                                        <Form.Label>hospitalization Illness</Form.Label>
                                                        <Form.Control required type="text" placeholder="illness"
                                                            value={formData.medicalhistories[index]?.hospitillness || ''}
                                                            onChange={(e) => handleMedicalHistoryInputChange(e, index, 'hospitillness')}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} >
                                                        <Form.Label> Medication/treatment </Form.Label>
                                                        <Form.Control required type="text" placeholder="treatement"
                                                            value={formData.medicalhistories[index]?.medication || ''}
                                                            onChange={(e) => handleMedicalHistoryInputChange(e, index, 'medication')}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} >
                                                        <Form.Label> Hospital/ clinic </Form.Label>
                                                        <Form.Control required type="text" placeholder="Hospital"
                                                            value={formData.medicalhistories[index]?.hospital || ''}
                                                            onChange={(e) => handleMedicalHistoryInputChange(e, index, 'hospital')}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group as={Col} >
                                                        <MdOutlineCancel onClick={() => removeMedical(index)} style={{ fontSize: "20px", cursor: "pointer", fontWeight: "300" }} />
                                                    </Form.Group>
                                                </Row>
                                            </div>
                                        ))}
                                        <IoAddCircle onClick={addAnotherMedicalHistory} style={{ fontSize: "20px", cursor: "pointer", fontWeight: "300", color: "#27CFC8" }} />
                                    </div>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> Disabilities </Form.Label>
                                            <Form.Control required type="text" placeholder="disabilities" name="participantDisability" value={formData.participantDisability} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Addictions </Form.Label>
                                            <Form.Control type="text" placeholder="addiction" name="participantAddiction" value={formData.participantAddiction} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Medical Insurance </Form.Label>
                                            <Form.Control required type="text" placeholder="medical insurance" name="participantInsurance" value={formData.participantInsurance} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <h5>Children's Health</h5>
                                    {formData.children.map((child, index) => (
                                        <Row className="mb-3" key={index}>
                                            <Form.Group as={Col}>
                                                <Form.Label>Name</Form.Label>
                                                <h2 className='mb-4'>{child.name}</h2>
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label>Illness</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="illness"
                                                    value={formData.children[index]?.childillness}
                                                    onChange={(e) => handleChildInputChange(e, index, 'child illness')}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label> Medical condition </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="medical condition"
                                                    value={formData.children[index]?.childmedicalcondition}
                                                    onChange={(e) => handleChildInputChange(e, index, 'child medical condition')}
                                                />
                                            </Form.Group>
                                            <Form.Group as={Col} >
                                                <Form.Label> Disability </Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    placeholder="disability"
                                                    value={formData.children[index]?.childdisability}
                                                    onChange={(e) => handleChildInputChange(e, index, 'child disbility')}
                                                />
                                            </Form.Group>
                                        </Row>
                                    ))}
                                </Tab>
                                {/* end::physical tab */}

                                {/* begin::emotional tab */}
                                <Tab eventKey="Emotional" title="Emotional" className='pt-5'>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label>Where was the participant born and raised ?</Form.Label>
                                            <Form.Control required type="text" placeholder="birth/born place" name="bornAndRaised" value={formData.bornAndRaised} onChange={handleInputChange} />
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> How does the participant describe her childhood ? </Form.Label>
                                            <Form.Control required type="text" placeholder="childhood description" name="childHoodDescription" value={formData.childHoodDescription} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> Does the participant have any history of mental illness ?</Form.Label>
                                            <Form.Select required name="mentaIllnessHistory" value={formData.mentaIllnessHistory} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">NO</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Comments </Form.Label>
                                            <Form.Control required type="text" placeholder="comments on mental illness" name="commentsOnMentalHistory" value={formData.commentsOnMentalHistory} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> How does the participant describe her current emotions/emotional health ? </Form.Label>
                                            <Form.Control required as="textarea" placeholder="current emotions/emotional health" name="emotionalHealth" value={formData.emotionalHealth} onChange={handleInputChange} style={{ height: "80px" }} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> Does the participant have other family members that assist the family ?  </Form.Label>
                                            <Form.Select required name='otherMemberThatAssist' value={formData.otherMemberThatAssist} onChange={handleInputChange}>
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">NO</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> Relationship with community</Form.Label>
                                            <Form.Select required name="relationShipWithCommunity" value={formData.relationShipWithCommunity} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="good">Good</option>
                                                <option value="fair">Fair</option>
                                                <option value="poor">Poor</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Comments </Form.Label>
                                            <Form.Control required type="text" placeholder="comments on relation with community" name="commentsOnRelationShipWithCommunity" value={formData.commentsOnRelationShipWithCommunity} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> Does she have Friends ?</Form.Label>
                                            <Form.Select required name="haveFriends" value={formData.haveFriends} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> Comments </Form.Label>
                                            <Form.Control required type="text" placeholder="comments her friends" name="commentsOnHaveFriends" value={formData.commentsOnHaveFriends} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                </Tab>
                                {/* end::emotional tab */}

                                {/* begin::spiritual tab */}
                                <Tab eventKey="Spiritual" title="Spiritual" className='pt-5'>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> Does the participant practice a religion?  </Form.Label>
                                            <Form.Select required name='practiceReligion' value={formData.practiceReligion} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group as={Col} >
                                            <Form.Label> if Yes , please Specify </Form.Label>
                                            <Form.Control required type="text" placeholder="religious specifications" name="specifyReligion" value={formData.specifyReligion} onChange={handleInputChange} />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} >
                                            <Form.Label> What is her/his involvement with this religious community ?  </Form.Label>
                                            <Form.Select required name="involvementWithReligious" value={formData.involvementWithReligious} onChange={handleInputChange} >
                                                <option value="">Select</option>
                                                <option value="active">Active</option>
                                                <option value="nominal">Nominak</option>
                                                <option value="nonactive">Non-active</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                </Tab>
                                {/* end::spiritual tab */}

                            </Tabs>
                            {/* begin::Actions */}
                            <div className="text-center pt-15">
                                <button
                                    type="reset"
                                    className="btn btn-light me-3"
                                    data-kt-users-modal-action="cancel"
                                >
                                    Discard
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    type="submit"
                                    className="btn btn-primary"
                                    data-kt-users-modal-action="submit"
                                >
                                    <span className="indicator-label">
                                        Submit
                                    </span>
                                </button>
                            </div>
                            {/* end::Actions */}
                        </form>
                    </div>
                </section >
            </div >
        </>
    )
}

export default AddWomen
