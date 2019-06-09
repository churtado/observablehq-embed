// URL: https://observablehq.com/@matthiasnielsen/auhack-example-dashboard-notebook
// Title: AUHack Example Dashboard Notebook
// Author: matthiasnielsen (@matthiasnielsen)
// Version: 710
// Runtime version: 1

const m0 = {
    id: "dfac38f3f344bdbd@710",
    variables: [
      {
        inputs: ["md"],
        value: (function(md){return(
  md`# AUHack Example Dashboard Notebook`
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`This notebook demonstrates how to use Observable to create an interactive and crossfiltering notebook of D3 visualizations.
  
  In this example we will use electricity production data for all wind turbines in Denmark. Included in this dataset is the yearly production data in kWh for all individual wind turbines (both historic and current), as well as metadata about the individual wind turbines such as manufacturer, location, height, etc. Check out the dataDimensions variable a little further down for a list of available data dimensions.
  
  In this example notebook dashboard, we will be using bar charts, map charts, and circle charts. But other types of visualizations can be adapted to work here as well (more on that later).
  
  The data is retrieved from the [Danish Energy Agency](https://ens.dk/service/statistik-data-noegletal-og-kort/data-oversigt-over-energisektoren).
  
  You can also download the [CSV file used in this example](https://matthias.rocks/auhack/wind-turbines-parsed-full.csv)
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`### Experiment Away!
  The core concept in using Observable is experimentation, which is also the meta-theme of this workshop.
  
  Everything you see in this example (and the examples it uses) is public and you are free to inspect, modify, and fork anything you want.
  
  Nothing you do will mess this up for others and reverting changes is just a page reload away, so play around all that you want!
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  ### "Hey, I'm too cool for tutorials!" ~some participant
  That's fine. In that case, you can go nuts on a fork of this notebook with most of the text removed: [https://beta.observablehq.com/@matthiasnielsen/auhack-example-dashboard-notebook-simplified](https://beta.observablehq.com/@matthiasnielsen/auhack-example-dashboard-notebook-simplified).
  
  Or you can take a look at the individual notebooks that are pieced together to make this notebook: [https://beta.observablehq.com/@matthiasnielsen/](https://beta.observablehq.com/@matthiasnielsen/)
  
  If not, then let's get started!
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  ### Setting up
  
  First we import a notebook which we use to setup the data structures for this dashboard notebook.
  `
  )})
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "helperVariables",
        remote: "helperVariables"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "getData",
        remote: "getData"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "dataStructure",
        remote: "dataStructure"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "createDataStructure",
        remote: "createDataStructure"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "filterData",
        remote: "filterData"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "filterState",
        remote: "filterState"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "sortByKeyAscending",
        remote: "sortByKeyAscending"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "sortByKeyDescending",
        remote: "sortByKeyDescending"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "sortByValueAscending",
        remote: "sortByValueAscending"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "sortByValueDescending",
        remote: "sortByValueDescending"
      },
      {
        from: "@matthiasnielsen/basic-auhack-notebook-setup",
        name: "randomVar",
        remote: "randomVar"
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Now let's check out what we have imported.
  
  First we have some data variables, which define a set of urls for determining what dataset to load.`
  )})
      },
      {
        name: "dataVariables",
        inputs: ["helperVariables"],
        value: (function(helperVariables){return(
  helperVariables
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`Then we create the data structure. This takes place in code imported from basic-auhack-notebook-setup - if you want, you can follow the link in the import statement above to check out how that works.`
  )})
      },
      {
        name: "setupDataStructure",
        inputs: ["createDataStructure","dataVariables"],
        value: (async function(createDataStructure,dataVariables)
  {
    await createDataStructure(dataVariables.dataUrls.slimmed, true)
    return 'Change this code to change the dataset'
  }
  )
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  When the data structure has been set up, the data variable will be populated with the datastructure. The datastructure is declared here to make it visible and enable inspection.
  
  Click the Object below to see the data structure available.
  E.g. check out the dimesionList Array - this contains a list of the dimensions we can use to retrieve data for visualizations.
  `
  )})
      },
      {
        name: "data",
        inputs: ["dataStructure"],
        value: (function(dataStructure){return(
  dataStructure
  )})
      },
      {
        name: "dimensionList",
        inputs: ["data"],
        value: (function(data){return(
  data.dimensionList
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  ### Creating Visualizations
  
  With the setup finished, we can start retrieving data and creating visualizations.
  
  Remember, you are free to inspect, modify, and fork any or all of this!
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  #### Bar Chart
  First we import a bar chart visualization.
  `
  )})
      },
      {
        from: "@matthiasnielsen/auhack-bar-chart/2",
        name: "generateBarChart",
        remote: "generateBarChart"
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  We declare a variable describing the data dimension we will be using. See the dimensionList Array in the data Object for data dimensions.
  `
  )})
      },
      {
        name: "yearDataDimension",
        value: (function(){return(
  'year'
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Then we use the data structure to retrieve electricity production per year. 
  
  To make the bar chart chronological we sort the data by its keys (sort functions are imported from basic-auhack-notebook-setup).`
  )})
      },
      {
        name: "yearData",
        inputs: ["getData","yearDataDimension","randomVar","sortByKeyAscending"],
        value: (function(getData,yearDataDimension,randomVar,sortByKeyAscending){return(
  getData(yearDataDimension, Infinity, randomVar).sort(sortByKeyAscending)
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`Then we use the generateBarChart function from the bar chart import to create a bar chart with the data we retrieved.`
  )})
      },
      {
        name: "yearBarChart",
        inputs: ["generateBarChart","yearData","yearDataDimension","filterState","filterData"],
        value: (function(generateBarChart,yearData,yearDataDimension,filterState,filterData){return(
  generateBarChart(
    yearData, 
    yearDataDimension, 
    yearDataDimension + 'Key', 
    filterState, 
    filterData)
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`There are many more data dimensions in the data structure, which we can use.`
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  We declare a variable describing the data dimension we will be using. See the dimensionList Array in the data Object for data dimensions.
  `
  )})
      },
      {
        name: "localAuthorityDataDimension",
        value: (function(){return(
  'Local_authority'
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Here we get the top 10 local authorities (municipalities) per electricity production.
  `
  )})
      },
      {
        name: "localAuthorityData",
        inputs: ["getData","localAuthorityDataDimension","randomVar"],
        value: (function(getData,localAuthorityDataDimension,randomVar){return(
  getData(localAuthorityDataDimension, 10, randomVar).filter((d) => { return d.value > 0})
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Like before, we use the local authority to create a bar chart. This bar chart shows electricity production in kWh per municipality.
  
  Two things to try out:
  * Change the above data retrival code, to retrieve more (or less) than 10 municipalities.
  * Check out what happens with the above year bar chart when you click one of these bars!`
  )})
      },
      {
        name: "localAuthorityBarChart",
        inputs: ["generateBarChart","localAuthorityData","localAuthorityDataDimension","filterState","filterData"],
        value: (function(generateBarChart,localAuthorityData,localAuthorityDataDimension,filterState,filterData){return(
  generateBarChart(
    localAuthorityData, 
    localAuthorityDataDimension, 
    localAuthorityDataDimension + 'Key', 
    filterState, 
    filterData)
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  #### Map Chart
  However, production data mapped to municipalities can also be visualized with a map. So let's do that!
  
  We import a map chart visualization.
  `
  )})
      },
      {
        from: "@matthiasnielsen/auhack-map-of-municipalities-in-denmark",
        name: "generateMapChart",
        remote: "generateMapChart"
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Then we use the imported generateMapChart function to generate a map chart using the same data.
  
  As with the bar charts, the map chart is interactive:
  * It filters the year bar chart.
  * It synchronizes with the (this is because they both use \'localAuthorityFilterKey\' as key for filtering)
  `
  )})
      },
      {
        name: "localAuthorityMapChart",
        inputs: ["generateMapChart","localAuthorityData","dataStructure","localAuthorityDataDimension","filterState","filterData"],
        value: (function(generateMapChart,localAuthorityData,dataStructure,localAuthorityDataDimension,filterState,filterData){return(
  generateMapChart(
    localAuthorityData, 
    dataStructure.municipalityCodeMap, 
    localAuthorityDataDimension, 
    localAuthorityDataDimension + 'Key', 
    filterState, 
    filterData)
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Perhaps using 10 municipalities for the map chart is insufficient.
  
  To create a different data extract for the map, we can create a new variable which retrieves Infinity entries instead of just 10:
  `
  )})
      },
      {
        name: "localAuthorityDataAll",
        inputs: ["getData","localAuthorityDataDimension","randomVar"],
        value: (function(getData,localAuthorityDataDimension,randomVar){return(
  getData(localAuthorityDataDimension, Infinity, randomVar).filter((d) => { return d.value > 0})
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Try changing the code in localAuthorityMapChart to use localAuthorityDataAll instead of localAuthorityData. 
  
  You can also change the number of entries retrieved in localAuthority if you would rather want to change the map and bar chart accordingly.
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  ### Pie Chart
  
  We can also retrieve data about how kWh production is distributed across the type of location (sea or land) of the wind turbine.
  
  The raw dataset uses Danish names for sea ("hav"). Land is spelled the same way in Danish and English.
  
  To visualize this data, we will use a pie chart.
  
  First we import the pie chart visualization.
  `
  )})
      },
      {
        from: "@matthiasnielsen/auhack-pie-chart",
        name: "generatePieChart",
        remote: "generatePieChart"
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  We declare a variable describing the data dimension we will be using. See the dimensionList Array in the data Object for data dimensions.
  `
  )})
      },
      {
        name: "locationTypeDataDimension",
        value: (function(){return(
  'Type_of_location'
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Then we retrieve similarly as in the previous examples.
  `
  )})
      },
      {
        name: "locationTypeData",
        inputs: ["getData","locationTypeDataDimension","randomVar"],
        value: (function(getData,locationTypeDataDimension,randomVar){return(
  getData(locationTypeDataDimension, Infinity, randomVar)
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  Likewise, we use the data to create a pie chart virtually similarly as with the bar charts.
  `
  )})
      },
      {
        name: "locationTypePieChart",
        inputs: ["generatePieChart","locationTypeData","locationTypeDataDimension","filterState","filterData"],
        value: (function(generatePieChart,locationTypeData,locationTypeDataDimension,filterState,filterData){return(
  generatePieChart(
    locationTypeData, 
    locationTypeDataDimension, 
    locationTypeDataDimension + 'Key', 
    filterState, 
    filterData)
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  The pie chart is also interactive.
  * Try selecting Hav to see in what municipalities electricity production from sea-based wind turbines is centered.
  * Some people dislike pie charts - try replacing the pie chart with a bar chart. If you don't know how, try comparing the generatePieChart function used above with the generateBarChart function used previously.
  
  To check out the interactions of the visualizations this notebook without most of the text, check out this fork: [https://beta.observablehq.com/@matthiasnielsen/auhack-example-dashboard-notebook-simplified](https://beta.observablehq.com/@matthiasnielsen/auhack-example-dashboard-notebook-simplified)
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  ### What to do Now?
  
  Well, it's up to you depending on your interests! 
  
  To get you started, here are some suggestions:
  1. Use this notebook ([or the simplified version](https://beta.observablehq.com/@matthiasnielsen/auhack-example-dashboard-notebook-simplified)) to analyze data - e.g. add more of the shown visualizations to show other dimensions in the data.
  * Focus on using Observable - e.g. recreate this notebook and/or create a different notebook using other visualizations and/or data.
  * Modify one the current visualizations - e.g. the color scheme is very simple, there are no legends, no tooltips, and the filtering is a simple single-select (could be brushing).
  * Create a new visualization - e.g. create a [line chart](https://bl.ocks.org/mbostock/3883245) of the yearly production data or a [bubble chart](https://bl.ocks.org/mbostock/4063269) of production per manufacturer.
  * Use a different dataset (ambitious) - e.g. a dataset that you would like to use in this hackathon.
  
  When getting to work you should, generally, fork the notebooks corresponding to what you want to work on. 
  1. If you want to analyze data, then fork this notebook and modify it.
  * If you want to focus on using Observable, create a new notebook, pick which visualizations you want in it (potentially adapting them along the way).
  * If you want to modify an existing visualization, then fork that visualization and modify away (they all work with sample data). When ready fork this notebook and change the relevant import to point to your visualization instead.
  * If you want to create a new visualization fork an existing visualization (check out the ones [already on Observable](https://beta.observablehq.com/collection/visualization), fork one, and modify it in a similar way the bar chart used here is modified from it's fork). When ready, fork this notebook and import your own visualization.
  * If you want to use your own dataset, start by looking at the basic-auhack-notebook-setup (and its imports). You probably need to fork and modify. As well as make sure your data is cleaned for use.
  
  These are but suggestions - feel free to do any other things you can think of!
  
  As said in the beginning: Experiment away - you will not ruin anything.
  
  If you want to check out more on how Observable works, this forum sticky is a good place to start: [https://talk.observablehq.com/t/welcome-to-the-observable-forum/8](https://talk.observablehq.com/t/welcome-to-the-observable-forum/8)
  `
  )})
      }
    ]
  };
  
  const m1 = {
    id: "@matthiasnielsen/basic-auhack-notebook-setup",
    variables: [
      {
        name: "helperVariables",
        inputs: ["dataVars"],
        value: (function(dataVars){return(
  dataVars
  )})
      },
      {
        name: "getData",
        inputs: ["dataStructure"],
        value: (function(dataStructure){return(
  (groupKey, count) => {
    if (!dataStructure) { return [] }
    return dataStructure.groups[groupKey].reduceSum((d) => { return d.production_kwh }).top(count ? count : Infinity)
  }
  )})
      },
      {
        inputs: ["mutable dataStructure"]
      },
      {
        name: "createDataStructure",
        inputs: ["mutable dataStructure","createCrossfilter","mutable filterState"],
        value: (function($0,createCrossfilter,$1){return(
  async (dataUrl, fullDimensionality) => {
    $0.value = await createCrossfilter(dataUrl, fullDimensionality)
    $1.value = {}
  }
  )})
      },
      {
        name: "filterData",
        inputs: ["dataStructure","filterState","updateRandomVar"],
        value: (function(dataStructure,filterState,updateRandomVar){return(
  (dimensionKey, filterVal, chartKey) => {
    dataStructure.dimensions[dimensionKey].filter(filterVal) // Crossfilter determines if this is a value, an array, a function, or undefined (which clears the filter).
    filterState[chartKey] = filterVal
    updateRandomVar()
  }
  )})
      },
      {
        inputs: ["mutable filterState"]
      },
      {
        name: "sortByKeyAscending",
        value: (function(){return(
  (a, b) => {
    if (a.key > b.key) { return 1 }
    if (a.key < b.key) { return -1 }
    return 0
  }
  )})
      },
      {
        name: "sortByKeyDescending",
        value: (function(){return(
  (a, b) => {
    if (a.key < b.key) { return 1 }
    if (a.key > b.key) { return -1 }
    return 0
  }
  )})
      },
      {
        name: "sortByValueAscending",
        value: (function(){return(
  (a, b) => {
    if (a.value > b.value) { return 1 }
    if (a.value < b.value) { return -1 }
    return 0
  }
  )})
      },
      {
        name: "sortByValueDescending",
        value: (function(){return(
  (a, b) => {
    if (a.value > b.value) { return 1 }
    if (a.value < b.value) { return -1 }
    return 0
  }
  )})
      },
      {
        inputs: ["mutable randomVar"]
      },
      {
        from: "@matthiasnielsen/crossfilter-observable",
        name: "dataVars",
        remote: "dataVars"
      },
      {
        name: "initial dataStructure",
        value: (function(){return(
  false
  )})
      },
      {
        name: "mutable dataStructure",
        inputs: ["Mutable","initial dataStructure"],
        value: (M, _) => new M(_)
      },
      {
        name: "dataStructure",
        inputs: ["mutable dataStructure"],
        value: _ => _.generator
      },
      {
        from: "@matthiasnielsen/crossfilter-observable",
        name: "createCrossfilter",
        remote: "createCrossfilter"
      },
      {
        name: "initial filterState",
        value: (function()
  {
    return {}
  }
  )
      },
      {
        name: "mutable filterState",
        inputs: ["Mutable","initial filterState"],
        value: (M, _) => new M(_)
      },
      {
        name: "filterState",
        inputs: ["mutable filterState"],
        value: _ => _.generator
      },
      {
        name: "updateRandomVar",
        inputs: ["mutable randomVar"],
        value: (function($0){return(
  () => {
    $0.value = Math.random()
  }
  )})
      },
      {
        name: "initial randomVar",
        value: (function(){return(
  Math.random()
  )})
      },
      {
        name: "mutable randomVar",
        inputs: ["Mutable","initial randomVar"],
        value: (M, _) => new M(_)
      },
      {
        name: "randomVar",
        inputs: ["mutable randomVar"],
        value: _ => _.generator
      }
    ]
  };
  
  const m2 = {
    id: "@matthiasnielsen/crossfilter-observable",
    variables: [
      {
        name: "dataVars",
        value: (function()
  {
    return {
      dataUrls: {
        slimmed: "https://matthias.rocks/auhack/wind-turbines-parsed-slimmed.csv",
        slimmed_partial: `https://matthias.rocks/auhack/wind-turbines-parsed-slimmed-partial.csv`,
        slimmed_inService: "https://matthias.rocks/auhack/wind-turbines-parsed-slimmed_in-service.csv",
        slimmed_decommisioned: "https://matthias.rocks/auhack/wind-turbines-parsed-slimmed_in-service.csv",
        slimmed_miniExtract: "https://matthias.rocks/auhack/wind-turbines-parsed-slimmed_mini-extract.csv",
        full: "https://matthias.rocks/auhack/wind-turbines-parsed-full.csv"
      }
    }
  }
  )
      },
      {
        name: "createCrossfilter",
        inputs: ["log","d3","moment","crossfilter"],
        value: (function(log,d3,moment,crossfilter){return(
  async (dataUrl, fullDimensions) => {
    log('Loading data.')
    const data = await d3.csv(dataUrl);
    const subsetDimensions = [
      'year', 
      'production_kwh', 
      'In_service', 
      'Local_authority', 
      'Type_of_location', 
      'Date_of_original_connection_to_grid',
      'Date_of_decommissioning',
      'Capacity_kW']
    
    const dimensionList = fullDimensions ? Object.keys(data[0]) : subsetDimensions
    
    const dateFormat = 'MM/DD/YYYY'
    
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
    })
    
    log('Data parsed, creating crossfilter.')
    const windTurbines = crossfilter(data)
    
    log('Crossfilter created, setting up dimensions and groups.')
    const dimensions = {}
    const groups = {}
    dimensionList.forEach((dimension) => {
      dimensions[dimension] = windTurbines.dimension((d) => { return d[dimension] } )
      groups[dimension] = dimensions[dimension].group()
    })
    
    log('Crossfilter and setup finished.')
    return {
      windTurbines: windTurbines,
      municipalityCodeMap: municipalityCodeMap,
      dimensions: dimensions,
      dimensionList: dimensionList,
      groups: groups
    }
  }
  )})
      },
      {
        name: "log",
        value: (function(){return(
  function log(args) {
    let message = args
    if (Array.isArray(args)) { message = args.join(', ') }
    console.log(new Date().toISOString(), message)  
  }
  )})
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require("https://d3js.org/d3.v5.min.js")
  )})
      },
      {
        name: "moment",
        inputs: ["require"],
        value: (function(require){return(
  require('https://bundle.run/moment-timezone@0.5.14')
  )})
      },
      {
        name: "crossfilter",
        inputs: ["require"],
        value: (function(require){return(
  require('https://bundle.run/crossfilter2@1.4.5')
  )})
      }
    ]
  };
  
  const m3 = {
    id: "@matthiasnielsen/auhack-bar-chart/2",
    variables: [
      {
        name: "generateBarChart",
        inputs: ["d3","DOM","width","height","margin"],
        value: (function(d3,DOM,width,height,margin){return(
  (data, dimensionKey, chartKey, filterState, filterData) => {
    const svg = d3.select(DOM.svg(width, height))
    const chartFilter = filterState ? filterState[chartKey] : false
    
    // Creating an invisible rect behind the bars for clearing filters.
    svg.append('g')
      .append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('opacity', 0)
        .on('click', () => {
          if (filterData) {
            filterData(dimensionKey, undefined, chartKey)
          }
        });
    
    const x = d3.scaleBand()
      .domain(data.map(d => d.key))
      .range([margin.left, width - margin.right])
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
    
    if (data.length > 10) {
      xAxisTexts
        .attr('transform', ' translate(-10, 0) rotate(-45)')
        .style('text-anchor', 'end')
    }
    
    svg.append("g")
        .call(yAxis);
    
    return svg.node();
  }
  )})
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require("https://d3js.org/d3.v5.min.js")
  )})
      },
      {
        name: "height",
        value: (function(){return(
  400
  )})
      },
      {
        name: "margin",
        value: (function(){return(
  {top: 20, right: 0, bottom: 50, left: 100}
  )})
      }
    ]
  };
  
  const m4 = {
    id: "@matthiasnielsen/auhack-map-of-municipalities-in-denmark",
    variables: [
      {
        name: "generateMapChart",
        inputs: ["d3","DOM","width","topojson","dkTopo","dkMunicipalitiesTopo"],
        value: (function(d3,DOM,width,topojson,dkTopo,dkMunicipalitiesTopo){return(
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
  )})
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require("https://d3js.org/d3.v5.min.js")
  )})
      },
      {
        name: "topojson",
        inputs: ["require"],
        value: (function(require){return(
  require("topojson-client@3")
  )})
      },
      {
        name: "dkTopo",
        inputs: ["d3"],
        value: (async function(d3){return(
  await d3.json('https://matthias.rocks/auhack/dk.json')
  )})
      },
      {
        name: "dkMunicipalitiesTopo",
        inputs: ["d3"],
        value: (async function(d3){return(
  await d3.json('https://matthias.rocks/auhack/dkMunicipalities.json')
  )})
      }
    ]
  };
  
  const m5 = {
    id: "@matthiasnielsen/auhack-pie-chart",
    variables: [
      {
        name: "generatePieChart",
        inputs: ["d3","DOM","width","height"],
        value: (function(d3,DOM,width,height){return(
  (data, dimensionKey, chartKey, filterState, filterData) => {
    const svg = d3.select(DOM.svg(width, height))
    const chartFilter = filterState ? filterState[chartKey] : false
    
    // Creating an invisible rect behind the bars for clearing filters.
    svg.append('g')
      .append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('opacity', 0)
        .on('click', () => {
          if (filterData) {
            filterData(dimensionKey, undefined, chartKey)
          }
        })
    
    const pieGroup = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
    
    const radius = Math.min(width, height) / 2
  
    const path = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0)
  
    const label = d3.arc()
      .outerRadius(radius - 40)
      .innerRadius(radius - 40)
    
    const pie = d3.pie()
      .sort(null)
      .value(function(d) { return d.value; });
    
    const arc = pieGroup.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
        .attr("class", "arc")
  
    arc.append("path")
        .attr("d", path)
        .style('fill', (d) => {
          if ((chartFilter && chartFilter === d.data.key) || filterState === undefined || chartFilter === undefined) { 
            return 'steelblue' 
          }
          return 'gray'
        })
        .style('stroke', 'white')
        .style('cursor', 'pointer')
        .on('click', (d) => {
          d3.event.preventDefault()
          // Check in place because this doesn't work in the sample version
          if (filterData) {
            filterData(dimensionKey, d.data.key, chartKey) 
          }
        });
  
    arc.append("text")
        .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
        .attr("dy", "0.35em")
        .style('text-anchor', 'middle') 
        .style('text-transform', 'capitalize')
        .text(function(d) { return d.data.key; });
    
    return svg.node();
  }
  )})
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require("https://d3js.org/d3.v5.min.js")
  )})
      },
      {
        name: "height",
        value: (function(){return(
  400
  )})
      }
    ]
  };
  
  const notebook = {
    id: "dfac38f3f344bdbd@710",
    modules: [m0,m1,m2,m3,m4,m5]
  };
  
  export default notebook;