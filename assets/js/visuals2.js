/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */				
let jobs = 	[
  [//Roche
    {axis:"Design",value:0.90},
    {axis:"Management",value:0.1},
    {axis:"Data / Content",value:1.0},
    {axis:"Development",value:1.0}
  ],
  [//kmapper
    {axis:"Design",value:0.80},
    {axis:"Management",value:1.0},
    {axis:"Data / Content",value:1.0},
    {axis:"Development",value:1.0}
  ],
  [//Tool Coordinator and Developer
  	{axis:"Design",value:0.40},
  	{axis:"Management",value:0.15},
  	{axis:"Data / Content",value:1.0},
  	{axis:"Development",value:1.0}
  ],
  [//Co-Initiator
  	{axis:"Design",value:0.50},
  	{axis:"Management",value:0.8},
  	{axis:"Data / Content",value:1.0},
  	{axis:"Development",value:0.9}
  ],
  [//Strategic Competence Lead
  	{axis:"Design",value:0.00},
  	{axis:"Management",value:0.70},
  	{axis:"Data / Content",value:0.90},
  	{axis:"Development",value:0.50}
  ],
  [//Head of Marketing Online & Databases
  	{axis:"Design",value:0.00},
  	{axis:"Management",value:0.80},
  	{axis:"Data / Content",value:0.90},
  	{axis:"Development",value:0.40}
  ],
  [//eContent & ePartner
  	{axis:"Design",value:0.00},
  	{axis:"Management",value:0.10},
  	{axis:"Data / Content",value:0.90},
  	{axis:"Development",value:0.50}
  ],
  [//Scientific proofreader
  	{axis:"Design",value:0.00},
  	{axis:"Management",value:0.10},
  	{axis:"Data / Content",value:0.90},
  	{axis:"Development",value:0.0}
  ],
  [//Project associate
  	{axis:"Design",value:0.60},
  	{axis:"Management",value:0.00},
  	{axis:"Data / Content",value:0.40},
  	{axis:"Development",value:0.10}
  ],
  [//Scientific associate
  	{axis:"Design",value:0.00},
  	{axis:"Management",value:0.00},
  	{axis:"Data / Content",value:0.85},
  	{axis:"Development",value:0.15}		
  ]
];

let projects = [
  [//spicker
    {axis:"Design",value:0.20},
    {axis:"Management",value:0.3},
    {axis:"Data / Content",value:1.0},
    {axis:"Development",value:1.0}
  ],
  [//e-editiones
    {axis:"Design",value:0.50},
    {axis:"Management",value:0.1},
    {axis:"Data / Content",value:1.0},
    {axis:"Development",value:1.0}
  ],
  [//Machine Reasoning
    {axis:"Design",value:0.60},
    {axis:"Management",value:0.1},
    {axis:"Data / Content",value:0.1},
    {axis:"Development",value:1.0}
  ],
  [//Python
    {axis:"Design",value:0.0},
    {axis:"Management",value:0.1},
    {axis:"Data / Content",value:0.1},
    {axis:"Development",value:1.0}
  ],
  [//Visualization
    {axis:"Design",value:0.8},
    {axis:"Management",value:0.1},
    {axis:"Data / Content",value:0.8},
    {axis:"Development",value:1.0}
  ],
  [//kmapper
    {axis:"Design",value:1.0},
    {axis:"Management",value:1.0},
    {axis:"Data / Content",value:1.0},
    {axis:"Development",value:1.0}
  ],
  [//SVM
    {axis:"Design",value:0.1},
    {axis:"Management",value:0.8},
    {axis:"Data / Content",value:1.0},
    {axis:"Development",value:1.0}
  ]
];

let schools = 	[
  	[//Master
  		{axis:"Science",value:1.0},
  		{axis:"Social Sciences",value:0.75},
  		{axis:"Economics",value:0.65}
  	],
  	[//Bachelor
  		{axis:"Science",value:1.0},
  		{axis:"Social Sciences",value:0.30},
  		{axis:"Economics",value:0.10}
  	]
];

////////////////////////////////////////////////////////////// 
//////////////////// Draw the Charts /////////////////////////
////////////////////////////////////////////////////////////// 

let margin = {top: 100, right: 100, bottom: 100, left: 100},
	width = 450,
	height = 450;

let jobColor = d3.scale.ordinal()
	.range(["#263A2F","#283e32","#324d3e","#3c5d4b","#476c57","#517b64","#5b8b70"]);

let schoolColor = d3.scale.ordinal()
	.range(["#658601","#A9CA00"]);

let jobChartOptions = {
	w: width,
  	h: height,
  	margin: margin,
  	maxValue: 1.0,
  	levels: 4,
  	roundStrokes: true,
  	color: jobColor,
  	case: "job",
  	caseColor: "#E9EBEA"
};

let projectChartOptions = {
	w: width,
  	h: height,
  	margin: margin,
  	maxValue: 1.0,
  	levels: 4,
  	roundStrokes: true,
  	color: jobColor,
  	case: "prj",
  	caseColor: "#E9EBEA"
};

let schoolChartOptions = {
	w: width,
  	h: height,
  	margin: margin,
  	maxValue: 1.0,
  	levels: 4,
  	roundStrokes: true,
  	color: schoolColor,
  	case: "scl",
  	caseColor: "#EFF3E5"
};

// Call functions to draw the radar charts
radarChart("#experienceChart", jobs, jobChartOptions);
radarChart("#projectChart", projects, projectChartOptions);
radarChart("#educationChart", schools, schoolChartOptions);

// Call mouse events
mouseJobs();
mouseProjects();
mouseSchools();

// Initial job selection
d3.selectAll(".jobArea").style("fill-opacity", "0.1");
d3.select("#jobArea_0").style("fill-opacity", "0.9");
d3.select("#job_0").style("background-color", "#E9EBEA");

// Fix the experience chart when scrolling
let fixmeExperience = $("#experienceChart").offset().top;
$(window).scroll(function() {
    let currentScroll = $(window).scrollTop();
    if (currentScroll >= fixmeExperience && currentScroll < 1650) {
        $("#experienceChart").css({
            position: "fixed",
            top: "0",
            // left: "50px"
            left: "2%"
        });
        $(".experience").css({
        	float: "right"
        });
    } else if (currentScroll >= fixmeExperience && currentScroll > 1650) {
        $("#experienceChart").css({
            position: "absolute",
            // top: "1651px",
            top: "1725px",
            // left: "50px"
            left: "2%"
        });
        $(".experience").css({
        	float: "right"
        });
    } else if (currentScroll < fixmeExperience) {
        $("#experienceChart").css({
            position: "static"
        });
       	$(".experience").css({
        	float: "left"
        });
    }
});

// Fix the projects chart when scrolling
let fixmeProjects = $("#projectChart").offset().top;
$(window).scroll(function() {
    let currentScroll = $(window).scrollTop();
    if (currentScroll >= fixmeProjects && currentScroll < 3370) {
        $("#projectChart").css({
            position: "fixed",
            top: "0",
            // left: "50px"
            left: "2%"
        });
        $(".projects").css({
          float: "right"
        });
    } else if (currentScroll >= fixmeProjects && currentScroll > 3370) {
        $("#projectChart").css({
            position: "absolute",
            // top: "3370px",
            top: "3390px",
            // left: "50px"
            left: "2%"
        });
        $(".projects").css({
          float: "right"
        });
    } else if (currentScroll < fixmeProjects) {
        $("#projectChart").css({
            position: "static"
        });
        $(".projects").css({
          float: "left"
        });
    }
});