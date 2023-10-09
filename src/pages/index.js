import React, { useEffect, useState, useRef} from 'react';
import * as d3 from 'd3';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/index.css";
import "../styles/bubbles.css";
import Bubbles from "../components/Bubbles";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import logo from '../images/NACA.png';  
import condomIcon from '../images/condom.png';
import courseIcon from '../images/course.png';
import genderIcon from '../images/protest.png';
import matIcon from '../images/healthcare.png';
import needleIcon from '../images/injection.png';
import selftestIcon from '../images/selftest.png';
import mentalhealthIcon from '../images/mentalhealth.png';
import prepIcon from '../images/medicine.png';
import sbccIcon from '../images/chat.png';
import stiIcon from '../images/stitest.png';
import taIcon from '../images/collaborate.png';
import fschoolIcon from '../images/fschool.png';
import fnoschoolIcon from '../images/fnoschool.png';
import mschoolIcon from '../images/mschool.png';
import mnoschoolIcon from '../images/mnoschool.png';
import clhivIcon from '../images/children.png';
import genpopIcon from '../images/group.png';
import heiIcon from '../images/newborn.png';
import idpIcon from '../images/idp.png';
import fswIcon from '../images/pay.png';
import msmIcon from '../images/gay.png';
import pesIcon from '../images/prisoner.png';
import pwidIcon from '../images/inject.png';
import transIcon from '../images/transgender.png';
import ovcIcon from '../images/help.png';
import parentsIcon from '../images/parent.png';
import pldIcon from '../images/disability.png';
import plhivIcon from '../images/plhiv.png';
import sdIcon from '../images/holdinghands.png';
import teachersIcon from '../images/education.png';
import faithIcon from '../images/pray.png';
import fishermenIcon from '../images/fisherman.png';
import pastoralistsIcon from '../images/man.png';
import transportIcon from '../images/driver.png';
import communityIcon from '../images/village.png';
import facilityIcon from '../images/building.png';
import { navigate } from 'gatsby';
import { Link } from "gatsby";


const states = [
  "All States","Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", 
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", 
  "Federal Capital Territory", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", 
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", 
  "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const services = [
  "All Services",
  "Condom Distribtion",
  "Family Life and HIV/AIDS Education (FLHE)/Sexuality Education",
  "Gender and Human Rights (GHR)",
  "Harm Reduction: Medication-Assisted Treatment (MAT)",
  "Harm Reduction: Needle and Syringe Exchange",
  "HIV Self-Testing (HIVST)",
  "HIV Testing Services (HTS)",
  "Mental Health Services",
  "Pre-Exposure Prophylaxis (PrEP)",
  "Social and Behaviour Change Communication (SBCC)",
  "STI Screening and Treatment",
  "Technical Assistance (TA)"
];

const populations = [
  "All Populations",
  "Adolescent Girls and Young Women (AGYW) in school",
  "Adolescent Girls and Young Women (AGYW) out of school",
  "Adolescent Boys and Young Men (ABYM) in school",
  "Adolescent Boys and Young Men (ABYM) out of school",
  "Children living with HIV",
  "General population",
  "HIV-exposed infants",
  "Internally Displaced People (IDP)",
  "Key Populations - Female Sex Workers (FSW)",
  "Key Populations - Men who have Sex with Men (MSM)",
  "Key Populations - People in enclosed settings",
  "Key Populations - People Who Inject Drugs (PWID)",
  "Key Populations - Transgender",
  "Orphans and Vulnerable Children (OVC)",
  "Parents",
  "People living with disabilities",
  "People Living with HIV (PLHIV)",
  "Serodiscordant couples",
  "Teachers",
  "Faith Leaders",
  "Fishermen",
  "Pastoralists",
  "Transport Workers"
];


const locations = [
  "All Locations",
  "Community",
  "Facility"
];

const Header = () => (
  <div className="header-container">
    <div className="left-content">
      <img src={logo} alt="NACA Logo" className="logo"/>
      <span className="welcome-text">Mapping HIV Prevention Services, 2023</span>
    </div>
    <div>
       <Link to="/path-to-naca-home" className="naca-home-btn">Go to NACA Home</Link>
    </div>
  </div>
);

const Sidebar = ({
  selectedState, setSelectedState, 
  selectedService, setSelectedService, 
  selectedPopulation, setSelectedPopulation, 
  selectedLocation, setSelectedLocation
}) => {
  return (
      <div className="sidebar">
          <h5> Filter by: </h5>
          <Filters 
            selectedState={selectedState} 
            setSelectedState={setSelectedState}
            selectedService={selectedService} 
            setSelectedService={setSelectedService}
            selectedPopulation={selectedPopulation} 
            setSelectedPopulation={setSelectedPopulation}
            selectedLocation={selectedLocation} 
            setSelectedLocation={setSelectedLocation}
          />
      </div>
  );
}


const Filters = ({ 
  selectedState, setSelectedState, 
  selectedService, setSelectedService, 
  selectedPopulation, setSelectedPopulation, 
  selectedLocation, setSelectedLocation}) => (
  <div>
         <h3>State</h3>
          <DropdownButton id="dropdown-basic-button_filter_state" title={selectedState} className="scrollable-dropdown">
              {states.map(state => (
                  <Dropdown.Item 
                    key={state} 
                    onClick={() => {
                      setSelectedState(state);
                      navigate(`/state/${state.toLowerCase().replace(/\s+/g, '-')}`); // LGA page navigation
                    }}>
                      {state}
                  </Dropdown.Item>
              ))}
          </DropdownButton>
          <h3>Service</h3>

          <DropdownButton id="dropdown-basic-button_filter_service" title={selectedService} 
          className={`scrollable-dropdown ${selectedService !== services[0] ? 'non-default-service' : ''}`}>
            {services.map(service => (
              <Dropdown.Item className="dropdown-item"
                key={service} 
                onClick={() => {
                  setSelectedService(service); 
                  setSelectedPopulation(populations[0]); // Resetting Population dropdown
                  setSelectedLocation(locations[0]);     // Resetting Location dropdown
                }}>
                {service}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          
          <h3> Target Population</h3>
          <DropdownButton id="dropdown-basic-button_filter_population" title={selectedPopulation} 
              className={`scrollable-dropdown ${selectedPopulation !== populations[0] ? 'non-default-population' : ''}`}
              >
            {populations.map(population => (
              <Dropdown.Item 
                key={population} 
                onClick={() => {
                  setSelectedPopulation(population);
                  setSelectedService(services[0]);   // Resetting Service dropdown
                  setSelectedLocation(locations[0]); // Resetting Location dropdown
                }}>
                {population}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <h3> Location</h3>
          <DropdownButton id="dropdown-basic-button_filter_location" title={selectedLocation}    
              className={`scrollable-dropdown ${selectedLocation !== locations[0] ? 'non-default-location' : ''}`}
              >
            {locations.map(location => (
              <Dropdown.Item 
                key={location} 
                onClick={() => {
                  setSelectedLocation(location);
                  setSelectedService(services[0]);       // Resetting Service dropdown
                  setSelectedPopulation(populations[0]); // Resetting Population dropdown
                }}>
                {location}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          <div>
            <Link id="submission" className="link" to="/submissions"> View submission status</Link>
          </div>
  </div>
);


const NationalMap = ({ selectedService, selectedPopulation, selectedLocation, setCurrentHeading }) => {
    const svgRef = useRef(null);

    const [condomCount, setCondomCount] = useState(null);
    const [serviceCount, setServiceCount] = useState(null);
    const [flheCount, setFlheCount] = useState(null);
    const [matCount, setMatCount] = useState(null);
    const [needleCount, setNeedleCount] = useState(null);
    const [selftestCount, setSelftestCount] = useState(null);
    const [mentalhealthCount, setMentalhealthCount] = useState(null);
    const [prepCount, setPrepCount] = useState(null);
    const [sbccCount, setSbccCount] = useState(null);
    const [stiCount, setStiCount] = useState(null);
    const [taCount, setTaCount] = useState(null);

    const [fschoolCount, setFschoolCount] = useState(null);
    const [fnoschoolCount, setFnoschoolCount] = useState(null);
    const [mschoolCount, setMschoolCount] = useState(null);
    const [mnoschoolCount, setMnoschoolCount] = useState(null);
    const [clhivCount, setClhivCount] = useState(null);
    const [genpopCount, setGenpopCount] = useState(null);
    const [heiCount, setHeiCount] = useState(null);
    const [idpCount, setIdpCount] = useState(null);
    const [fswCount, setFswCount] = useState(null);
    const [msmCount, setMsmCount] = useState(null);
    const [pesCount, setPesCount] = useState(null);
    const [pwidCount, setPwidCount] = useState(null);
    const [transCount, setTransCount] = useState(null);
    const [ovcCount, setOvcCount] = useState(null);
    const [parentsCount, setParentsCount] = useState(null);
    const [pldCount, setPldCount] = useState(null);
    const [plhivCount, setPlhivCount] = useState(null);
    const [sdCount, setSdCount] = useState(null);
    const [teachersCount, setTeachersCount] = useState(null);
    const [faithCount, setFaithCount] = useState(null);
    const [fishermenCount, setFishermenCount] = useState(null);
    const [pastoralistsCount, setPastoralistsCount] = useState(null);
    const [transportCount, setTransportCount] = useState(null);


    const [communityCount, setCommunityCount] = useState(null);
    const [facilityCount, setFacilityCount] = useState(null);

    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [tooltipType, setTooltipType] = useState('map'); 
    const [tooltipContent, setTooltipContent] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

          const serviceToColumnMap = {
            "All Services": "serviceProviders",
            "Condom Distribtion": "CondomDistribution",
            "Family Life and HIV/AIDS Education (FLHE)/Sexuality Education": "FamilyLifeAndHivAidsEducationFlheSexualityEducation",
            "Gender and Human Rights (GHR)": "GenderAndHumanRightsGhr",
            "Harm Reduction: Medication-Assisted Treatment (MAT)": "HarmReductionMedicationAssistedTreatmentMat",
            "Harm Reduction: Needle and Syringe Exchange": "HarmReductionNeedleAndSyringeExchange",
            "HIV Self-Testing (HIVST)": "HivSelfTestingHivst",
            "HIV Testing Services (HTS)": "HivTestingServicesHts",
            "Mental Health Services": "MentalHealthServices",
            "Pre-Exposure Prophylaxis (PrEP)": "PreExposureProphylaxisPrep",
            "Social and Behaviour Change Communication (SBCC)": "SocialAndBehaviourChangeCommunicationSbcc",
            "STI Screening and Treatment": "StiScreeningAndTreatment",
            "Technical Assistance (TA)": "TechnicalAssistanceTa"
          };
          
          const populationToColumnMap = {
            "All Populations": "allPopulations",
            "Adolescent Girls and Young Women (AGYW) in school": "agywInSchool",
            "Adolescent Girls and Young Women (AGYW) out of school": "agywOutOfSchool",
            "Adolescent Boys and Young Men (ABYM) in school": "abymInSchool",
            "Adolescent Boys and Young Men (ABYM) out of school": "abymOutOfSchool",
            "Children living with HIV": "childrenLivingWithHIV",
            "General population": "generalPopulation",
            "HIV-exposed infants": "hivExposedInfants",
            "Internally Displaced People (IDP)": "idp",
            "Key Populations - Female Sex Workers (FSW)": "kpFsw",
            "Key Populations - Men who have Sex with Men (MSM)": "kpMsm",
            "Key Populations - People in enclosed settings": "kpPeopleInEnclosedSettings",
            "Key Populations - People Who Inject Drugs (PWID)": "kpPwid",
            "Key Populations - Transgender": "kpTransgender",
            "Orphans and Vulnerable Children (OVC)": "ovc",
            "Parents": "parents",
            "People living with disabilities": "peopleLivingWithDisabilities",
            "People Living with HIV (PLHIV)": "plhiv",
            "Serodiscordant couples": "serodiscordantCouples",
            "Teachers": "teachers",
            "Faith Leaders": "faithLeaders",
            "Fishermen": "fishermen",
            "Pastoralists": "pastoralists",
            "Transport Workers": "transportWorkers"
          };
          

           const locationToColumnMap = {
            "All Locations": "allLocations",
            "Community": "community",
            "Facility": "facility"
           }


    useEffect(() => {
        const svg = d3.select(svgRef.current);

        const projection = d3.geoMercator()
          .scale(3500)
          .center([8.6753, 9.0820])
          .translate([800 / 2, 800 / 2]);

        const path = d3.geoPath().projection(projection);

        const colorScale = d3.scaleThreshold()
        .domain([1, 6, 11, 21, 31]) 
        .range(["#76ff0d", "#a0d492", "#78b971", "#60a455", "#3e8d00", "#008000"]);
      
    // Add #D3D3D3 (light grey) for the value 0    

          // Then, in your updateVisualization function:
          function updateVisualization() {
            let currentFilter = 'serviceProviders';
          
            if (selectedService !== services[0]) {
              currentFilter = serviceToColumnMap[selectedService] || selectedService;
            } else if (selectedPopulation !== populations[0]) {
              currentFilter = populationToColumnMap[selectedPopulation] || selectedPopulation; // Assuming you create a similar mapping for populations
            } else if (selectedLocation !== locations[0]) {
              currentFilter = locationToColumnMap[selectedLocation] || selectedLocation; // Assuming you create a similar mapping for locations
            }
          
        Promise.all([
            d3.json("./static/nigeria_geojson.geojson"),
            d3.csv("./static/stateData.csv")
        ]).then(([geoData, serviceData]) => {
          const nigeriaData = serviceData.find(row => row.state === "Nigeria");
    if (nigeriaData) {
      setCondomCount(nigeriaData.CondomDistribution);
      setServiceCount(nigeriaData.GenderAndHumanRightsGhr);
      setFlheCount(nigeriaData.FamilyLifeAndHivAidsEducationFlheSexualityEducation);
      setMatCount(nigeriaData.HarmReductionMedicationAssistedTreatmentMat);
      setNeedleCount(nigeriaData.HarmReductionNeedleAndSyringeExchange);
      setSelftestCount(nigeriaData.HivSelfTestingHivst);
      setMentalhealthCount(nigeriaData.MentalHealthServices);
      setPrepCount(nigeriaData.PreExposureProphylaxisPrep);
      setSbccCount(nigeriaData.SocialAndBehaviourChangeCommunicationSbcc);
      setStiCount(nigeriaData.StiScreeningAndTreatment);
      setTaCount(nigeriaData.TechnicalAssistanceTa);

      setFschoolCount(nigeriaData.agywInSchool);
      setFnoschoolCount(nigeriaData.agywOutOfSchool);
      setMschoolCount(nigeriaData.abymInSchool);
      setMnoschoolCount(nigeriaData.abymOutOfSchool);
      setClhivCount(nigeriaData.childrenLivingWithHIV);
      setGenpopCount(nigeriaData.generalPopulation);
      setHeiCount(nigeriaData.hivExposedInfants);
      setIdpCount(nigeriaData.idp);
      setFswCount(nigeriaData.kpFsw);
      setMsmCount(nigeriaData.kpMsm);
      setPesCount(nigeriaData.kpPeopleInEnclosedSettings);
      setPwidCount(nigeriaData.kpPwid);
      setTransCount(nigeriaData.kpTransgender);
      setOvcCount(nigeriaData.ovc);
      setParentsCount(nigeriaData.parents);
      setPldCount(nigeriaData.peopleLivingWithDisabilities);
      setPlhivCount(nigeriaData.plhiv);
      setSdCount(nigeriaData.serodiscordantCouples);
      setTeachersCount(nigeriaData.teachers);
      setFaithCount(nigeriaData.faithLeaders);
      setFishermenCount(nigeriaData.fishermen);
      setPastoralistsCount(nigeriaData.pastoralists);
      setTransportCount(nigeriaData.transportWorkers);
      setCommunityCount(nigeriaData.community);
      setFacilityCount(nigeriaData.facility);
    }
    
          geoData.features.forEach(geoFeature => {
            const serviceFeature = serviceData.find(s => s.state === geoFeature.properties.state);
            if (serviceFeature) {
              geoFeature.properties.currentValue = +serviceFeature[currentFilter];
            }
          });
    
          svg.selectAll("path").remove(); 
    
          svg.append("g")
            .selectAll("path")
            .data(geoData.features)
            .enter().append("path")
            .attr("d", path)
            .attr("fill", d => {
              const value = d.properties.currentValue;
              if (value === 0) {
                  return "#D3D3D3"; // return grey if the value is 0
              }
              return colorScale(value);
          })          
          
            .attr("stroke", "#FFFFFF")
            .on("mouseover", function(event, d) {
              d3.select(this).attr("fill", "#B11B10");
              setCurrentHeading(d.properties.state);
              setTooltipContent(`${d.properties.state}: ${d.properties.currentValue}`);
              setTooltipType('map');
              setTooltipVisible(true);
              setTooltipPosition({ x: event.pageX, y: event.pageY });

            })
            .on("mouseout", function(event, d) {
              const value = d.properties.currentValue;
              if (value === 0) {
                  d3.select(this).attr("fill", "#D3D3D3");
              } else {
                  d3.select(this).attr("fill", colorScale(value));
              }
              setCurrentHeading("NIGERIA");
              setTooltipVisible(false);
            })            
          
            .on("click", function(event, d) {
                const stateURL = `/state/${d.properties.state.toLowerCase().replace(/\s+/g, '-')}`;
                window.location.href = stateURL;
            });
            
      const legendWidth = 30;
      const legendHeight = 20;

      // Calculate translation for legend to be positioned bottom-right
      const translateX = 650;  // 800 - 100 (legend total width with some padding)
      const translateY = 500;  // 800 - 200 (considering 5 blocks of color and some padding)

      // Create a group for the legend
      const legend = svg.append("g")
        .attr("transform", `translate(${translateX},${translateY})`);

        let legendData = colorScale.domain().map(lowerBound => {
          return [lowerBound, colorScale.invertExtent(colorScale(lowerBound))[1]];
      });
      
      // Filter out duplicates, based on the first element of each tuple
      legendData = legendData.filter((value, index, self) => 
          self.findIndex(v => v[0] === value[0]) === index);
      
      // Add the "No data" category at the start
      if (!legendData.some(arr => arr[0] === 0)) {
          legendData.unshift([0, 0]);
      }
      

      const legendGroups = legend.selectAll("g")
        .data(legendData)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(0, ${i * legendHeight})`);

        legendGroups.append("rect")
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .attr("fill", d => {
          if (d[0] === 0) return "#D3D3D3";  // Explicitly return grey if the range is [0,0]
          return colorScale(d[0]);
        });    

        legendGroups.append("text")
        .attr("x", legendWidth + 5)
        .attr("y", legendHeight / 2)
        .attr("dy", "0.35em")
        .attr("font-size", "12px")
        .attr("font-family", "'Lato', sans-serif") 
        .text(d => {
          if (d[0] === 0) return `0`; 
          if (d[0] > 30) return 'Above 30';
          return `${d[0]} - ${d[1] - 1}`;
      });

      const App = () => {
        return (
            <div>s
                <h1>React Expandable Bubble</h1>
                <Bubbles />
            </div>
        );
    };
      
        })
        
        
        .catch(error => {
          console.log("Error loading file:", error);
        });
    }

    
    updateVisualization(); // or use multiple parameters if needed

  }, [selectedService, selectedPopulation, selectedLocation]);
;
return (
  <div>


  <div className="map-container">
    <svg ref={svgRef} width="800" height="800" />
    
    {tooltipVisible && (
      <div 
        className={tooltipType === 'map' ? "map-tooltip" : "bubble-tooltip info"} 
        style={{ 
          position: 'absolute', 
          top: tooltipPosition.y, 
          left: tooltipPosition.x 
        }}
      >
        {tooltipContent}
      </div>
    )}
</div>
<div className="bubbles-display">
      <h2>Services</h2>  
    <div className="bubbles">
      <div className="bubble-container">
        <img src={condomIcon} alt="FLHE" className="bubble" />
        <div className="label">Condom Distribtion</div>
        <div className="info">Condom distribution - {condomCount} service providers (Nigeria)</div>
      </div>
      <div className="bubble-container">
        <img src={courseIcon} alt="FLHE" className="bubble" />
        <div className="label">FLHE / sexuality education</div>
        <div className="info">Family life and HIV/AIDS education (FLHE) / sexuality education - {flheCount} service providers (Nigeria)</div>
      </div>
      <div className="bubble-container">
        <img src={genderIcon} alt="Gender" className="bubble" />
        <div className="label">GHR</div>
        <div className="info"> Gender and human rights (GHR) - {serviceCount} service providers (Nigeria)</div>
      </div>
      <div className="bubble-container">
        <img src={matIcon} alt="Harm Reduction: Medication-Assisted Treatment (MAT)" className="bubble" />
        <div className="label">MAT</div>
        <div className="info">Harm Reduction: Medication-Assisted Treatment (MAT) - {matCount} service providers (Nigeria)</div>
      </div>
      <div className="bubble-container">
        <img src={needleIcon} alt="Harm Reduction: Needle and Syringe Exchange" className="bubble" />
        <div className="label">Needle and Syringe Exchange</div>
        <div className="info">Harm Reduction: Needle and Syringe Exchange - {needleCount} service providers (Nigeria)</div>
      </div>
      <div className="bubble-container">
        <img src={selftestIcon} alt="HIV Self-Testing (HIVST)" className="bubble" />
        <div className="label">HIVST</div>
        <div className="info"> HIV Self-Testing (HIVST) - {selftestCount} service providers (Nigeria)</div>
      </div>
      <div className="bubble-container">
        <img src={mentalhealthIcon} alt="Mental Health Services" className="bubble" />
        <div className="label">Mental Health Services</div>
        <div className="info"> Mental Health Services - {mentalhealthCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={prepIcon} alt="Pre-Exposure Prophylaxis (PrEP)" className="bubble" />
        <div className="label">PrEP</div>
        <div className="info"> Pre-Exposure Prophylaxis (PrEP) - {prepCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={sbccIcon} alt="Social and Behaviour Change Communication (SBCC)" className="bubble" />
        <div className="label">SBCC</div>
        <div className="info"> Social and Behaviour Change Communication (SBCC) - {sbccCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={stiIcon} alt="STI Screening and Treatment" className="bubble" />
        <div className="label">STI Screening and Treatment</div>
        <div className="info"> STI Screening and Treatment - {stiCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={taIcon} alt="Technical Assistance (TA)" className="bubble" />
        <div className="label">TA</div>
        <div className="info"> Technical Assistance (TA) - {taCount} service providers (Nigeria)</div>
      </div> 
    </div>
 <h2>Target Population</h2>
 <div className="bubbles">
      <div className="bubble-container">
        <img src={fschoolIcon} alt="Adolescent Girls and Young Women (AGYW) in school" className="bubble" />
        <div className="label">AGYW in school</div>
        <div className="info"> Adolescent Girls and Young Women (AGYW) in school - {fschoolCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={fnoschoolIcon} alt="Adolescent Girls and Young Women (AGYW) out of school" className="bubble" />
        <div className="label">AGYW out of school</div>
        <div className="info"> Adolescent Girls and Young Women (AGYW) out of school - {fnoschoolCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={mschoolIcon} alt="Adolescent Boys and Young Men (ABYM) in school" className="bubble" />
        <div className="label">ABYM in school</div>
        <div className="info"> Adolescent Boys and Young Men (ABYM) in school - {mschoolCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={mnoschoolIcon} alt="Adolescent Boys and Young Men (ABYM) out of school" className="bubble" />
        <div className="label">ABYM out of school</div>
        <div className="info"> Adolescent Boys and Young Men (ABYM) out of school - {mnoschoolCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={clhivIcon} alt="Children living with HIV" className="bubble" />
        <div className="label">Children living with HIV</div>
        <div className="info"> Children living with HIV- {clhivCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={genpopIcon} alt="General Population" className="bubble" />
        <div className="label">General Population</div>
        <div className="info"> General Population - {genpopCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={heiIcon} alt="HIV-exposed infants" className="bubble" />
        <div className="label">HIV-exposed infants</div>
        <div className="info"> HIV-exposed infants - {heiCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={idpIcon} alt="Internally Displaced People (IDP)" className="bubble" />
        <div className="label">Internally Displaced People (IDP)</div>
        <div className="info"> Internally Displaced People (IDP) - {idpCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={fswIcon} alt="Key Populations - Female Sex Workers (FSW)" className="bubble" />
        <div className="label">FSW</div>
        <div className="info"> Key Populations - Female Sex Workers (FSW) - {fswCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={msmIcon} alt="Key Populations - Men who have Sex with Men (MSM)" className="bubble" />
        <div className="label">MSM</div>
        <div className="info"> Key Populations - Men who have Sex with Men (MSM) - {msmCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={pesIcon} alt="Key Populations - People in enclosed settings" className="bubble" />
        <div className="label">People in enclosed settings</div>
        <div className="info"> Key Populations - People in enclosed settings - {pesCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={pwidIcon} alt="Key Populations - People Who Inject Drugs (PWID)" className="bubble" />
        <div className="label">PWID</div>
        <div className="info"> Key Populations - People Who Inject Drugs (PWID) - {pwidCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={transIcon} alt="Transgender" className="bubble" />
        <div className="label">Transgender</div>
        <div className="info"> Transgender - {transCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={ovcIcon} alt="Orphans and Vulnerable Children (OVC)" className="bubble" />
        <div className="label">OVC</div>
        <div className="info"> Orphans and Vulnerable Children (OVC) - {ovcCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={parentsIcon} alt="Parents" className="bubble" />
        <div className="label">Parents</div>
        <div className="info"> Parents - {parentsCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={pldIcon} alt="People living with disabilities" className="bubble" />
        <div className="label">People living with disabilities</div>
        <div className="info"> People living with disabilities - {pldCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={plhivIcon} alt="People Living with HIV (PLHIV)" className="bubble" />
        <div className="label">People Living with HIV (PLHIV)</div>
        <div className="info"> People Living with HIV (PLHIV) - {plhivCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={sdIcon} alt="Serodiscordant couples" className="bubble" />
        <div className="label">Serodiscordant couples</div>
        <div className="info"> Serodiscordant couples - {sdCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={teachersIcon} alt="Teachers" className="bubble" />
        <div className="label">Teachers</div>
        <div className="info"> Teachers - {teachersCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={faithIcon} alt="Faith Leaders" className="bubble" />
        <div className="label">Faith Leaders</div>
        <div className="info"> Faith Leaders - {faithCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={fishermenIcon} alt="Fishermen" className="bubble" />
        <div className="label">Fishermen</div>
        <div className="info"> Fishermen - {fishermenCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={pastoralistsIcon} alt="Pastoralists" className="bubble" />
        <div className="label">Pastoralists</div>
        <div className="info"> Pastoralists - {pastoralistsCount} service providers (Nigeria)</div>
      </div> 
      <div className="bubble-container">
        <img src={transportIcon} alt="Transport Workers" className="bubble" />
        <div className="label">Transport Workers</div>
        <div className="info"> Transport Workers - {transportCount} service providers (Nigeria)</div>
      </div> 
    </div>
 <h2>Location</h2>
    <div className="bubbles">
      <div className="bubble-container">
        <img src={communityIcon} alt="Community" className="bubble" />
        <div className="label">Community</div>
        <div className="info">Community - {communityCount} service providers (Nigeria)</div>
      </div>
      <div className="bubble-container">
        <img src={facilityIcon} alt="FLHE" className="bubble" />
        <div className="label">Facility</div>
        <div className="info">Facility - {facilityCount} service providers (Nigeria)</div>
      </div>
    </div>

  </div>
</div>



)
};

const MainPage = () => {
  const [currentHeading, setCurrentHeading] = useState("NIGERIA");
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedPopulation, setSelectedPopulation] = useState(populations[0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedState, setSelectedState] = useState(states[0]);

    // Generate dynamic title based on the current filters
    const getTitle = () => {
      if (selectedService !== services[0]) {
        return `Number of Providers for ${selectedService}`;
      }
      if (selectedPopulation !== populations[0]) {
        return `Number of Providers for ${selectedPopulation}`;
      }
      if (selectedLocation !== locations[0]) {
        return `Number of Providers at ${selectedLocation}`;
      }
      return 'Number of HIV Prevention Service Providers';
    }

    return (
      <div className='holder'>
            <Sidebar 
              selectedState={selectedState}
              setSelectedState={setSelectedState}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              selectedPopulation={selectedPopulation}
              setSelectedPopulation={setSelectedPopulation}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
      <div className="map-header-container">
        <div id='current-heading-container'>
            <Header currentHeading={currentHeading}/>
        </div>
        <div className="current-heading">{currentHeading}</div>
        <h4 className="map-title"> {getTitle()} </h4>
            <NationalMap 
              setCurrentHeading={setCurrentHeading}
              selectedService={selectedService} 
              selectedPopulation={selectedPopulation} 
              selectedLocation={selectedLocation}
            />
      </div>
      </div>
    );
};

export default function LayoutPage() {
  return (
    <div className="holder">
      <MainPage />
    </div>
  );
}