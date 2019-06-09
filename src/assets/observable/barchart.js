// https://observablehq.com/@churtado/wind-turbines-denmark@162
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Wind turbines Denmark`
)});
  main.variable(observer("dataVars")).define("dataVars", function()
{
  return {
      slimmed: "https://matthias.rocks/auhack/wind-turbines-parsed-slimmed.csv",
      slimmed2: "assets/data/turbines.csv",
      /*slimmed_partial: `https://matthias.rocks/auhack/wind-turbines-parsed-slimmed-partial.csv`,
      slimmed_inService: "https://matthias.rocks/auhack/wind-turbines-parsed-slimmed_in-service.csv",
      slimmed_decommisioned: "https://matthias.rocks/auhack/wind-turbines-parsed-slimmed_in-service.csv",
      slimmed_miniExtract: "https://matthias.rocks/auhack/wind-turbines-parsed-slimmed_mini-extract.csv",
      full: "https://matthias.rocks/auhack/wind-turbines-parsed-full.csv"  */
  }
}
);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("https://d3js.org/d3.v5.min.js")
)});
  main.variable(observer("crossfilter")).define("crossfilter", ["require"], function(require){return(
require('https://bundle.run/crossfilter2@1.4.5')
)});
  main.variable(observer("moment")).define("moment", ["require"], function(require){return(
require('https://bundle.run/moment-timezone@0.5.14')
)});
  main.variable(observer("log")).define("log", function(){return(
function log(args) {
  let message = args
  if (Array.isArray(args)) { message = args.join(', ') }
  console.log(new Date().toISOString(), message)  
}
)});
  main.variable(observer("createCrossfilter")).define("createCrossfilter", ["log","d3","moment","crossfilter"], function(log,d3,moment,crossfilter){return(
async (dataUrl, fullDimensions) => {
  log('Loading data.');
  const data = await d3.csv(dataUrl);
  const subsetDimensions = [
    'year', 
    'production_kwh', 
    'In_service', 
    'Local_authority', 
    'Type_of_location', 
    'Date_of_original_connection_to_grid',
    'Date_of_decommissioning',
    'Capacity_kW'];
  
  const dimensionList = fullDimensions ? Object.keys(data[0]) : subsetDimensions;
  
  const dateFormat = 'MM/DD/YYYY';
  
  const municipalityCodeMap = {}
  log('Data retrieved, parsing data')
  data.forEach((d) => {
    municipalityCodeMap[d.Local_authority] = d.Local_authority_no
    d['Date_of_original_connection_to_grid'] = moment.tz(
      d['Date_of_original_connection_to_grid'], dateFormat, 'Europe/Copenhagen')
    d['Date_of_decommissioning'] = 
      d['Date_of_decommissioning'] === '' ? 
        moment().add(1, 'years') : 
        moment.tz(d['Date_of_decommissioning'], dateFormat, 'Europe/Copenhagen')
  });
  
  log('Data parsed, creating crossfilter');
  const windTurbines = crossfilter(data);
  
  log('Crossfilter c reated, setting up dimensions and groups.');
  const dimensions = {}
  const groups = {}
  dimensionList.forEach((dimension) => {
    dimensions[dimension] = windTurbines.dimension((d) => { return d[dimension] });
    groups[dimension] = dimensions[dimension].group();
  });
  
  log('Crossfilter and setup finished.');
  
  return {
    windTurbines: windTurbines,
    municipalityCodeMap: municipalityCodeMap,
    dimensions: dimensions,
    dimensionList: dimensionList,
    groups: groups
  };
}
)});
  main.define("initial dataStructure", function(){return(
false
)});
  main.variable(observer("mutable dataStructure")).define("mutable dataStructure", ["Mutable", "initial dataStructure"], (M, _) => new M(_));
  main.variable(observer("dataStructure")).define("dataStructure", ["mutable dataStructure"], _ => _.generator);
  main.define("initial filterState", function()
{
  return {}
}
);
  main.variable(observer("mutable filterState")).define("mutable filterState", ["Mutable", "initial filterState"], (M, _) => new M(_));
  main.variable(observer("filterState")).define("filterState", ["mutable filterState"], _ => _.generator);
  main.variable(observer("createDataStructure")).define("createDataStructure", ["mutable dataStructure","createCrossfilter","mutable filterState"], function($0,createCrossfilter,$1){return(
async (dataUrl, fullDimensionality) => {
  $0.value = await createCrossfilter(dataUrl, fullDimensionality)
  $1.value = {};
}
)});
  main.variable(observer("getData")).define("getData", ["dataStructure"], function(dataStructure){return(
(groupKey, count) => {
  if(!dataStructure) { return [] }
  return dataStructure.groups[groupKey].reduceSum((d) => {return d.production_kwh }).top(count ? count : Infinity)
}
)});
  main.variable(observer("sortByKeyAscending")).define("sortByKeyAscending", function(){return(
(a, b) => {
  if (a.key > b.key) { return 1 }
  if (a.key < b.key) { return -1 }
  return 0
}
)});
  main.variable(observer("sortByKeyDescending")).define("sortByKeyDescending", function(){return(
(a, b) => {
  if (a.key < b.key) { return 1 }
  if (a.key > b.key) { return -1 }
  return 0
}
)});
  main.variable(observer("sortByValueAscending")).define("sortByValueAscending", function(){return(
(a, b) => {
  if (a.value > b.value) { return 1 }
  if (a.value < b.value) { return -1 }
  return 0
}
)});
  main.variable(observer("sortByValueDescending")).define("sortByValueDescending", function(){return(
(a, b) => {
  if (a.value > b.value) { return 1 }
  if (a.value < b.value) { return -1 }
  return 0
}
)});
  main.define("initial randomVar", function(){return(
Math.random()
)});
  main.variable(observer("mutable randomVar")).define("mutable randomVar", ["Mutable", "initial randomVar"], (M, _) => new M(_));
  main.variable(observer("randomVar")).define("randomVar", ["mutable randomVar"], _ => _.generator);
  main.variable(observer("updateRandomVar")).define("updateRandomVar", ["mutable randomVar"], function($0){return(
() => {
  $0.value = Math.random()
}
)});
  main.variable(observer("setupDataStructure")).define("setupDataStructure", ["createDataStructure","dataVars"], async function(createDataStructure,dataVars)
{
  await createDataStructure(dataVars.slimmed, false)
  return 'data has been loaded'
}
);
  main.variable(observer("data")).define("data", ["dataStructure"], function(dataStructure){return(
dataStructure
)});
  main.variable(observer("filterData")).define("filterData", ["dataStructure","filterState","updateRandomVar"], function(dataStructure,filterState,updateRandomVar){return(
(dimensionKey, filterVal, chartKey) => {
  dataStructure.dimensions[dimensionKey].filter(filterVal) // Crossfilter determines if this is a value, an array, a function, or undefined (which clears the filter).
  filterState[chartKey] = filterVal
  updateRandomVar()
}
)});
  main.variable(observer("dataDimensions")).define("dataDimensions", ["data"], function(data){return(
data.dimensionList
)});
  main.variable(observer("height")).define("height", function(){return(
400
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 0, bottom: 50, left: 100}
)});
  main.variable(observer("generateBarChart")).define("generateBarChart", ["d3","DOM","height","margin"], function(d3,DOM,height,margin){return(
(data, dimensionKey, chartKey, filterState, filterData) => {
  const realWidth = 700;
  
  const svg = d3.select(DOM.svg(realWidth, height))
  //const svg = d3.select("body").selectAll("svg");
  
  const chartFilter = filterState ? filterState[chartKey] : false
  
  // Creating an invisible rect behind the bars for clearing filters.
  svg.append('g')
    .append('rect')
      .attr('width', realWidth)
      .attr('height', height)
      .style('opacity', 0)
      .on('click', () => {
        if (filterData) {
          filterData(dimensionKey, undefined, chartKey)
        }
      });
  
  const x = d3.scaleBand()
    .domain(data.map(d => d.key))
    .range([margin.left, realWidth - margin.right])
    .padding(0.1)
  
  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)]).nice()
    .range([height - margin.bottom, margin.top])
  
  const xAxis = g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x)
        .tickSizeOuter(0))
  
  const yAxis = g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
  
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect").data(data).enter().append("rect")
      .attr("x", d => x(d.key))
      .attr("y", d => y(d.value))
      .attr("height", d => y(0) - y(d.value))
      .attr("width", x.bandwidth())
      .style('fill', (d) => {
        if ((chartFilter && chartFilter === d.key) || chartFilter === undefined || filterState === undefined) { 
          return 'steelblue' 
        }
        return 'gray'
      })
      .style('cursor', 'pointer')
      .on('click', (d) => {
        d3.event.preventDefault()
        // Check in place because this doesn't work in the sample version
        if (filterData) {
          filterData(dimensionKey, d.key, chartKey) 
        }
      })
  
  const xAxisGroup = svg.append("g")
      .call(xAxis);
  
  const xAxisTexts = xAxisGroup.selectAll('text')
    .style('text-transform', 'capitalize')
  
  if (data.length > 5) {
    xAxisTexts
      .attr('transform', ' translate(-10, 0) rotate(-45)')
      .style('text-anchor', 'end')
  }
  
  svg.append("g")
      .call(yAxis);
  
  return svg.node();
}
)});
  main.variable(observer("yearDataDimension")).define("yearDataDimension", function(){return(
'year'
)});
  main.variable(observer("yearData")).define("yearData", ["getData","yearDataDimension","randomVar","sortByKeyAscending"], function(getData,yearDataDimension,randomVar,sortByKeyAscending){return(
getData(yearDataDimension, Infinity, randomVar).sort(sortByKeyAscending)
)});
  main.variable(observer("yearBarChart")).define("yearBarChart", ["generateBarChart","yearData","yearDataDimension","filterState","filterData"], function(generateBarChart,yearData,yearDataDimension,filterState,filterData){return(
generateBarChart(
  yearData, 
  yearDataDimension, 
  yearDataDimension + 'Key', 
  filterState, 
  filterData)
)});
  main.variable(observer("localAuthorityDataDimension")).define("localAuthorityDataDimension", function(){return(
'Local_authority'
)});
  main.variable(observer("localAuthorityData")).define("localAuthorityData", ["getData","localAuthorityDataDimension","randomVar"], function(getData,localAuthorityDataDimension,randomVar){return(
getData(localAuthorityDataDimension, 10, randomVar).filter((d) => { return d.value > 0})
)});
  main.variable(observer("localAuthorityBarChart")).define("localAuthorityBarChart", ["generateBarChart","localAuthorityData","localAuthorityDataDimension","filterState","filterData"], function(generateBarChart,localAuthorityData,localAuthorityDataDimension,filterState,filterData){return(
generateBarChart(
  localAuthorityData, 
  localAuthorityDataDimension, 
  localAuthorityDataDimension + 'Key', 
  filterState, 
  filterData)
)});
  main.variable(observer("dkTopo")).define("dkTopo", ["d3"], async function(d3){return(
await d3.json('https://matthias.rocks/auhack/dk.json')
)});
  main.variable(observer("dkMunicipalitiesTopo")).define("dkMunicipalitiesTopo", ["d3"], async function(d3){return(
await d3.json('https://matthias.rocks/auhack/dkMunicipalities.json')
)});
  main.variable(observer("generateMapChart")).define("generateMapChart", ["d3","DOM","width","topojson","dkTopo","dkMunicipalitiesTopo"], function(d3,DOM,width,topojson,dkTopo,dkMunicipalitiesTopo){return(
(municipalityData, municipalityNameToIdMap, dimensionKey, chartKey, filterState, filterData) => {
  const height = 600
  const svg = d3.select(DOM.svg(width, height))
  const chartFilter = filterState ? filterState[chartKey] : false
  
  // Creating an invisible rect behind the bars for clearing filters.
  svg.append('g')
    .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('opacity', 0)
      .on('click', () => {
        // Check in place because this doesn't work in the sample version
        if (filterData) {
          filterData(dimensionKey, undefined, chartKey)
        }
      });
  
  const mapG = svg.append('g')
  
  const dataMap = {}
  const minMax = [Infinity, -Infinity]
  municipalityData.forEach((d) => {
    minMax[0] = minMax[0] < d.value ? minMax[0] : d.value
    minMax[1] = minMax[1] > d.value ? minMax[1] : d.value
    dataMap['0' + municipalityNameToIdMap[d.key]] = d
  })
  
  const opacityScale = d3.scaleLinear()
    .domain(minMax)
    .range([0.1, 1])
  
  const projection = d3.geoMercator()
    .center([7, 56.5])
    .rotate([-5, 0])
    .scale(1200 * 5)

  const path = d3.geoPath()
    .projection(projection)

  mapG.selectAll("path")
      .data(topojson.feature(dkTopo, dkMunicipalitiesTopo).features)
      .enter().append('path')
      .attr("d", path)
      .style("fill", (d) => {
        return dataMap[d.properties.municipalityID] ? 'steelblue' : 'lightgray'
      })
      .style("stroke", (d) => {
        if (chartFilter 
            && dataMap[d.properties.municipalityID] 
            && chartFilter === dataMap[d.properties.municipalityID].key) 
        {
          return 'darkred'
        }
        return 'white'
      })
      .style('stroke-width', (d) => {
        if (chartFilter 
            && dataMap[d.properties.municipalityID] 
            && chartFilter === dataMap[d.properties.municipalityID].key) 
        {
          return 3
        }
        return 1
      })
      .style('fill-opacity', (d) => {
        return dataMap[d.properties.municipalityID] ? opacityScale(dataMap[d.properties.municipalityID].value) : 1
      })
      .style('cursor', 'pointer')
      .on('click', function (d) {
        d3.event.preventDefault()
        this.parentNode.appendChild(this)
        // Check in place because this doesn't work in the sample version
        if (filterData && dataMap[d.properties.municipalityID]) {
          filterData(dimensionKey, dataMap[d.properties.municipalityID].key, chartKey) 
        }
      })
  
  return svg.node()
}
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("localAuthorityMapChart")).define("localAuthorityMapChart", ["generateMapChart","localAuthorityData","dataStructure","localAuthorityDataDimension","filterState","filterData"], function(generateMapChart,localAuthorityData,dataStructure,localAuthorityDataDimension,filterState,filterData){return(
generateMapChart(
  localAuthorityData, 
  dataStructure.municipalityCodeMap, 
  localAuthorityDataDimension, 
  localAuthorityDataDimension + 'Key', 
  filterState, 
  filterData)
)});
  return main;
}