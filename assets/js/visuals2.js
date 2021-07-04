/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */				
let jobs = 	[
  [//kmapper
    {axis:"Design",value:0.80},
    {axis:"Management",value:1.0},
    {axis:"Data / Content",value:1.0},
    {axis:"Development",value:1.0}
  ],
  [//Roche
    {axis:"Design",value:0.90},
    {axis:"Management",value:0.1},
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
    let thePxPos = 2390;
    if (currentScroll >= fixmeExperience && currentScroll < thePxPos) {
        $("#experienceChart").css({
            position: "fixed",
            top: "0",
            left: "2%"
        });
        $(".experience").css({
        	float: "right"
        });
    } else if (currentScroll >= fixmeExperience && currentScroll > thePxPos) {
        $("#experienceChart").css({
            position: "absolute",
            top: `${thePxPos}px`,
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
