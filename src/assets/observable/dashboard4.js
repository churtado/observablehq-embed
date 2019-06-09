// URL: https://observablehq.com/@clairehq/finaldashboard
// Title: FinalDashboard
// Author: Claire Li (@clairehq)
// Version: 1014
// Runtime version: 1

const m0 = {
    id: "a5a17fe21050c8c7@1014",
    variables: [
      {
        inputs: ["md"],
        value: (function(md){return(
  md`# FinalDashboard`
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`## IAT355`
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`### Hanqiao Li`
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md` ---
  ## Overview
  This visualization dashboard is about helping the audience to predict whether a specific wine would be purchased. It allows them to explore wines with different countries, prices, rating scores, and consumption.`
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md` ## Audience
  The target audience for this visualization dashboard would be people who want to purchase wines and sell wines. When buying wines, it is useful to know details about the wines they are purchasing; such as where the wines come from, the price and the ratings. The visualizations helped users to compare different wines and choose the best one. For users who want to sell wines, it is important to know the consumption of wines in different countries, so that they can decide which countries to sell to.
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`## Analytic Questions
  My focus is on wine production and consumption. Here are some questions I aim to provide visualizations.
  1. Which country's wine has higher rating scores? What type of wine is that?
  1. Which country's wine is the most expensive? Does the more expensive the wine, the higher the rating score?
  3. Is the country with the most wine consumption the same as the country with the most production of wines?
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`---
  ## Dataset
  The data I used are about wine reviews and wine consumption. I joined the two data in Excel and uploaded to gist. The dimensions include num ratings(quantitative), positive_rating(quantitative), price(quantitative), wine_type(ordinal), country(ordinal), world(ordinal), grape(ordinal), regoin(ordinal), rating_score(quantitative) and wine_servings(quantitative).
  `
  )})
      },
      {
        name: "wines",
        inputs: ["d3"],
        value: (function(d3){return(
  d3.csv("https://gist.githubusercontent.com/clairehq/14710951aa0485c49800236fc63a0e46/raw/26527980895202b1fa67510a38d74dc4e460095a/newdata.csv")
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md` ---
  ## Visualizations`
  )})
      },
      {
        inputs: ["embed","wines"],
        value: (function(embed,wines){return(
  embed({
    "config": {"view": {"width": 400, "height": 300}},
    "hconcat": [
      {
        "data": {
          "values": wines
        },
        "mark": {"type": "circle", "size": 150},
        "encoding": {
          "color": {
            "condition": {
              "type": "nominal",
              "field": "country",
              "legend": null,
              "scale": {scheme: "yelloworangered"},
              "selection": "selector001"
            },
            "value": "lightgray"
          },
          "y": {"type": "nominal", "field": "country", "title": null}
        },
        "selection": {
          "selector001": {
            "type": "multi",
            "encodings": ["color"],
            "on": "click",
            "toggle": "event.shiftKey",
            "resolve": "global",
            "empty": "all"
          }
        },
      },
      {
        "vconcat": [
          {
            "data": {
              "values": wines
            },
            "mark": {"type": "bar"},
            "encoding": {
              "color": {"type": "nominal", "field": "country", "legend": null},
              "tooltip": [
                {"type": "quantitative", "aggregate":"count","field": "wine_type", "title":"Count of Records"},
                {"type": "nominal", "field": "wine_type", "title":"Wine Type"}
              ],
              "x": {"type": "nominal", "field": "wine_type", "title":"Wine Type"},
              "y": {"type": "quantitative", "aggregate":"count","field": "wine_type", "title": "Count of Records"}
            },
            "selection": {
              "selector001": {
                "type": "multi",
                "encodings": ["color"],
                "on": "click",
                "toggle": "event.shiftKey",
                "resolve": "global",
                "empty": "all"
              }
            },
            "title": "Wine Production for Each Type",
            "transform": [
              {"filter": {"selection": "selector002"}},
              {"filter": {"selection": "selector001"}}
            ],
            "width": 650
          },
          {
            "hconcat": [
          {
            "data": {
              "values": wines
            },
            "mark": {"type": "point"},
            "encoding": {
              "color": {"type": "nominal", "field": "country", "legend": null},
              "tooltip": [
                {"type": "quantitative", "field": "price","title": "Wine Price" },
                {"type": "nominal", "field": "wine_type", "title": "Wine Type"}
              ],
              "x": {"type": "nominal", "field": "wine_type","title":"Wine Type"},
              "y": {"type": "quantitative","field": "price","title":"Price"}
            },
            "selection": {
              "selector001": {
                "type": "multi",
                "encodings": ["color"],
                "on": "click",
                "toggle": "event.shiftKey",
                "resolve": "global",
                "empty": "all"
              }
            },
            "title": "Wine Price for Each Type",
            "transform": [
              {"filter": {"selection": "selector002"}},
              {"filter": {"selection": "selector001"}}
            ],
            "width": 300
          },
          {
            "data": {
              "values": wines
            },
            "mark": {"type": "point"},
            "encoding": {
              "color": {"type": "nominal", "field": "country", "legend": null},
              "tooltip": [
                {"type": "quantitative", "field": "rating_score","title": "Rating Score" },
                {"type": "quantitative", "field": "price", "title": "Price"},
              ],
              "x": {"type": "quantitative", "field": "price","title":"Price"},
              "y": {"type": "quantitative","field": "rating_score","title":"Rating Score"}
            },
            "selection": {
              "selector001": {
                "type": "multi",
                "encodings": ["color"],
                "on": "click",
                "toggle": "event.shiftKey",
                "resolve": "global",
                "empty": "all"
              }
            },
            "title": "Wine Price vs Rating Score",
            "transform": [
              {"filter": {"selection": "selector002"}},
              {"filter": {"selection": "selector001"}}
            ],
            "width": 300
          }
          ]
          },
          {
              "data": {
              "values": wines
            },
            "mark": {"type": "bar", "size": 10},
            "encoding": {
              "color": {"value": "lightgray"},
              "tooltip": [
                {"type": "quantitative", "aggregate": "count", "field": "wine_stype", "title": "Total Wine Production"}
              ],
              "x": {"type": "nominal", "field": "country", "title": "Country"},
              "y": {
                "type": "quantitative",
                "aggregate": "count",
                "field": "wine_type"
              }
            },
            "height": 120,
            "selection": {
              "selector002": {
                "type": "interval",
                "encodings": ["x"],
                "on": "[mousedown, window:mouseup] > window:mousemove!",
                "translate": "[mousedown, window:mouseup] > window:mousemove!",
                "zoom": "wheel!",
                "mark": {"fill": "#333", "fillOpacity": 0.125, "stroke": "white"},
                "resolve": "global"
              }
            },
            "title": "Wine Production",
            "width": 650
          },
        ]
      }
    ],
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json"
  })
  )})
      },
      {
        inputs: ["embed","wines"],
        value: (function(embed,wines){return(
  embed({
    "config": {"view": {"width": 400, "height": 300}},
    "hconcat": [
      {
        "data": {
          "values": wines
        },
        "mark": {"type": "circle", "size": 150},
        "encoding": {
          "color": {
            "condition": {
              "type": "nominal",
              "field": "country",
              "legend": null,
              "scale": {scheme: "yelloworangered"},
              "selection": "selector001"
            },
            "value": "lightgray"
          },
          "y": {"type": "nominal", "field": "country", "title": null}
        },
        "selection": {
          "selector001": {
            "type": "multi",
            "encodings": ["color"],
            "on": "click",
            "toggle": "event.shiftKey",
            "resolve": "global",
            "empty": "all"
          }
        },
      },
      {
        "vconcat": [
          {
            "data": {
              "values": wines
            },
            "mark": {"type": "bar"},
            "encoding": {
              "color": {"type": "nominal", "field": "country", "legend": null},
              "tooltip": [
                {"type": "quantitative", "aggregate":"sum","field": "wine_servings", "title":"Wine Consumption"},
                {"type": "nominal", "field": "country", "title":"Country"}
              ],
              "x": {"type": "nominal", "field": "country", "title":"Country"},
              "y": {"type": "quantitative", "aggregate":"sum","field": "wine_servings", "title": "Wine Consumption"}
            },
            "selection": {
              "selector001": {
                "type": "multi",
                "encodings": ["color"],
                "on": "click",
                "toggle": "event.shiftKey",
                "resolve": "global",
                "empty": "all"
              }
            },
            "title": "Wine Consumption for Each Country",
            "transform": [
              {"filter": {"selection": "selector002"}},
              {"filter": {"selection": "selector001"}}
            ],
            "width": 650
          },
          {
            "data": {
              "values": wines
            },
            "mark": {"type": "bar", "size": 10},
            "encoding": {
              "color": {"value": "lightgray"},
              "tooltip": [
                {"type": "quantitative", "aggregate": "sum", "field": "wine_servings", "title": "Total Wine Consumption"}
              ],
              "x": {"type": "nominal", "field": "country", "title":"Country"},
              "y": {
                "type": "quantitative",
                "aggregate": "sum",
                "field": "wine_servings",
                "title":"Wine Consumption"
              }
            },
            "height": 120,
            "selection": {
              "selector002": {
                "type": "interval",
                "encodings": ["x"],
                "on": "[mousedown, window:mouseup] > window:mousemove!",
                "translate": "[mousedown, window:mouseup] > window:mousemove!",
                "zoom": "wheel!",
                "mark": {"fill": "#333", "fillOpacity": 0.125, "stroke": "white"},
                "resolve": "global"
              }
            },
            "title": "Wine Consumption",
            "width": 650
          }
        ]
      }
    ],
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json"
  })
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md` ### How to Use
  The dimensions I used for the visualizations are country, wine_type, wine_servings, price, rating_score, and count of records. The legend on the left side is different countries. Users can click on the dot beside to see the charts related to that country. For example, if users selected Chile, they will see wine production, consumption, price and rating scores of wines made from Chile. Users can also do it by click on the bar charts and scatter plot. The grey bar chart has a brushing function that allows users to compare those dimensions between different countries.
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`### Design Choice
  This multiple views chart helped users to explore the analytic questions above. The idioms I used are the bar chart and the scatter plot. The bar chart can show a clear vision about which value has the most production and consumption and the scatter plot can show the distribution of circles, so users can see where circles gathered or separated and interpret the relation between the two dimensions. The color scheme I used is yellow, orange and red, it represented different countries. For interactions, the clicking allowed users to explore each country individually and helped them to predict different types of wines that each country produced. The brushing gave users freedom of choice to compare the values of different countries.
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  ### Feasibility Pilot
  I tested my dashboard with one of my friends by asking her to solve the analytic questions. One problem she found out was that the title for the visualizations was not clear. My previous visualizations only have one big title -- "Wine Production and Consumption for Each Country", but she thought it is better to name each view separately to avoid confusion. Based on her advice, I added titles to each view.
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md` ---
  ## Libraries and Modules`
  )})
      },
      {
        name: "embed",
        inputs: ["require"],
        value: (function(require){return(
  require("vega-embed@3")
  )})
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require("d3@5")
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md` ## References `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`
  - Wine dataset from: https://www.kaggle.com/kennethbollen/majestic-wine-data
  - Alcohol consumption dataset from: https://www.kaggle.com/fivethirtyeight/fivethirtyeight-alcohol-consumption-dataset
  - My gist: https://gist.githubusercontent.com/clairehq/14710951aa0485c49800236fc63a0e46/raw/26527980895202b1fa67510a38d74dc4e460095a/newdata.csv
  - Vega tutorials:
   https://observablehq.com/@manzt/flu-mcv`
  )})
      }
    ]
  };
  
  const notebook = {
    id: "a5a17fe21050c8c7@1014",
    modules: [m0]
  };
  
  export default notebook;