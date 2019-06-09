// URL: https://observablehq.com/@mbostock/dashboard
// Title: Dashboard
// Author: Mike Bostock (@mbostock)
// Version: 190
// Runtime version: 1

const m0 = {
  id: "556e9d553a659d24@190",
  variables: [
    {
      inputs: ["md"],
      value: (function (md) {
        return (
          md`# Dashboard
  
   Sample dashboard with Observable.`
        )
      })
    },
    // {
    //   inputs: ["html"],
    //   value: (function (html) {
    //     const button = html`<button>Fullscreen`;
    //     button.onclick = () => button.parentElement.nextElementSibling.requestFullscreen();
    //     // return button;
    //   }
    //   )
    // },
    {
      name: "grid",
      inputs: ["html", "screen"],
      value: (function (html, screen) {
        return (
          html`<div style="
    background: #fff;
    display: grid;
    height: ${screen.height / screen.width * 100}vw;
    grid-template-areas: 
      'a b'
      'a b'
      'a b'
      'c c';
    grid-gap: 10px;
  ">
    <div name="a" style="grid-area:a;border:solid 1px #ccc;"></div>
    <div name="b" style="grid-area:b;border:solid 1px #ccc;"></div>
    <div name="c" style="grid-area:c;border:solid 1px #ccc;"></div>
  </div>`
        )
      })
    },
    {
      name: "Cell",
      inputs: ["resizer"],
      value: (function (resizer) {
        return (
          class Cell {
            constructor(element) {
              this.element = element;
            }
            get width() {
              return resizer(this.element, "clientWidth");
            }
            get height() {
              return resizer(this.element, "clientHeight");
            }
            embed(content) {
              content.style.position = "absolute";
              if (this.element.firstChild) this.element.replaceChild(content, this.element.firstChild);
              else this.element.appendChild(content);
            }
          }
        )
      })
    },
    {
      name: "resizer",
      inputs: ["Generators"],
      value: (function (Generators) {
        return (
          function resizer(element, dimension = "clientWidth") {
            return Generators.observe(notify => {
              let width = notify(element[dimension]);
              const resized = () => {
                let w = element[dimension];
                if (w !== width) notify(width = w);
              };
              window.addEventListener("resize", resized);
              return () => window.removeEventListener("resize", resized);
            });
          }
        )
      })
    },
    {
      name: "cellA",
      inputs: ["Cell", "grid"],
      value: (function (Cell, grid) {
        return (
          new Cell(grid.querySelector("[name=a]"))
        )
      })
    },
    {
      name: "cellB",
      inputs: ["Cell", "grid"],
      value: (function (Cell, grid) {
        return (
          new Cell(grid.querySelector("[name=b]"))
        )
      })
    },
    {
      name: "cellC",
      inputs: ["Cell", "grid"],
      value: (function (Cell, grid) {
        return (
          new Cell(grid.querySelector("[name=c]"))
        )
      })
    },
    {
      name: "widthA",
      inputs: ["cellA"],
      value: (function (cellA) {
        return (
          cellA.width
        )
      })
    },
    {
      name: "widthB",
      inputs: ["cellB"],
      value: (function (cellB) {
        return (
          cellB.width
        )
      })
    },
    {
      name: "widthC",
      inputs: ["cellC"],
      value: (function (cellC) {
        return (
          cellC.width
        )
      })
    },
    {
      name: "heightA",
      inputs: ["cellA"],
      value: (function (cellA) {
        return (
          cellA.height
        )
      })
    },
    {
      name: "heightB",
      inputs: ["cellB"],
      value: (function (cellB) {
        return (
          cellB.height
        )
      })
    },
    {
      name: "heightC",
      inputs: ["cellC"],
      value: (function (cellC) {
        return (
          cellC.height
        )
      })
    },
    {
      from: "556e9d553a659d24@190/14",
      name: "chartA",
      remote: "chart"
    },
    {
      from: "556e9d553a659d24@190/15",
      name: "chartB",
      remote: "chart"
    },
    {
      from: "556e9d553a659d24@190/16",
      name: "chartC",
      remote: "chart"
    },
    {
      inputs: ["cellA", "chartA"],
      value: (function (cellA, chartA) {
        return (
          cellA.embed(chartA)
        )
      })
    },
    {
      inputs: ["cellB", "chartB"],
      value: (function (cellB, chartB) {
        return (
          cellB.embed(chartB)
        )
      })
    },
    {
      inputs: ["cellC", "chartC"],
      value: (function (cellC, chartC) {
        return (
          cellC.embed(chartC)
        )
      })
    }
  ]
};

const m1 = {
  id: "556e9d553a659d24@190/14",
  variables: [
    {
      name: "chart",
      inputs: ["d3", "DOM", "width", "height", "data", "x", "y", "xAxis", "yAxis"],
      value: (function (d3, DOM, width, height, data, x, y, xAxis, yAxis) {
        const svg = d3.select(DOM.svg(width, height));

        svg.append("g")
          .attr("fill", "steelblue")
          .selectAll("rect")
          .data(data)
          .join("rect")
          .attr("x", d => x(d.name))
          .attr("y", d => y(d.value))
          .attr("height", d => y(0) - y(d.value))
          .attr("width", x.bandwidth());

        svg.append("g")
          .call(xAxis);

        svg.append("g")
          .call(yAxis);

        return svg.node();
      }
      )
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function (require) {
        return (
          require("d3@5")
        )
      })
    },
    {
      from: "556e9d553a659d24@190",
      name: "width",
      remote: "widthA"
    },
    {
      from: "556e9d553a659d24@190",
      name: "height",
      remote: "heightA"
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (async function (d3) {
        return (
          (await d3.csv("https://gist.githubusercontent.com/mbostock/81aa27912ad9b1ed577016797a780b2c/raw/3a807eb0cbb0f5904053ac2f9edf765e2f87a2f5/alphabet.csv", ({ letter, frequency }) => ({ name: letter, value: +frequency }))).sort((a, b) => b.value - a.value)
        )
      })
    },
    {
      name: "x",
      inputs: ["d3", "data", "margin", "width"],
      value: (function (d3, data, margin, width) {
        return (
          d3.scaleBand()
            .domain(data.map(d => d.name))
            .range([margin.left, width - margin.right])
            .padding(0.1)
        )
      })
    },
    {
      name: "y",
      inputs: ["d3", "data", "height", "margin"],
      value: (function (d3, data, height, margin) {
        return (
          d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)]).nice()
            .range([height - margin.bottom, margin.top])
        )
      })
    },
    {
      name: "xAxis",
      inputs: ["height", "margin", "d3", "x"],
      value: (function (height, margin, d3, x) {
        return (
          g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0))
        )
      })
    },
    {
      name: "yAxis",
      inputs: ["margin", "d3", "y"],
      value: (function (margin, d3, y) {
        return (
          g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
        )
      })
    },
    {
      name: "margin",
      value: (function () {
        return (
          { top: 20, right: 0, bottom: 30, left: 40 }
        )
      })
    }
  ]
};

const m2 = {
  id: "556e9d553a659d24@190/15",
  variables: [
    {
      name: "chart",
      inputs: ["data", "d3", "width", "height", "DOM", "color", "drag", "invalidation"],
      value: (function (data, d3, width, height, DOM, color, drag, invalidation) {
        const links = data.links.map(d => Object.create(d));
        const nodes = data.nodes.map(d => Object.create(d));

        const simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2));

        const svg = d3.select(DOM.svg(width, height));

        const link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
          .selectAll("line")
          .data(links)
          .join("line")
          .attr("stroke-width", d => Math.sqrt(d.value));

        const node = svg.append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1.5)
          .selectAll("circle")
          .data(nodes)
          .join("circle")
          .attr("r", 5)
          .attr("fill", color)
          .call(drag(simulation));

        node.append("title")
          .text(d => d.id);

        simulation.on("tick", () => {
          link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

          node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
        });

        invalidation.then(() => simulation.stop());

        return svg.node();
      }
      )
    },
    {
      name: "data",
      inputs: ["d3"],
      value: (function (d3) {
        return (
          d3.json("https://gist.githubusercontent.com/mbostock/4062045/raw/5916d145c8c048a6e3086915a6be464467391c62/miserables.json")
        )
      })
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function (require) {
        return (
          require("d3@5")
        )
      })
    },
    {
      from: "556e9d553a659d24@190",
      name: "width",
      remote: "widthB"
    },
    {
      from: "556e9d553a659d24@190",
      name: "height",
      remote: "heightB"
    },
    {
      name: "color",
      inputs: ["d3"],
      value: (function (d3) {
        const scale = d3.scaleOrdinal(d3.schemeCategory10);
        return d => scale(d.group);
      }
      )
    },
    {
      name: "drag",
      inputs: ["d3"],
      value: (function (d3) {
        return (
          simulation => {

            function dragstarted(d) {
              if (!d3.event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }

            function dragged(d) {
              d.fx = d3.event.x;
              d.fy = d3.event.y;
            }

            function dragended(d) {
              if (!d3.event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }

            return d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended);
          }
        )
      })
    }
  ]
};

const m3 = {
  id: "556e9d553a659d24@190/16",
  variables: [
    {
      name: "chart",
      inputs: ["d3", "DOM", "width", "height", "data", "area", "xAxis", "yAxis"],
      value: (function (d3, DOM, width, height, data, area, xAxis, yAxis) {
        const svg = d3.select(DOM.svg(width, height));

        svg.append("path")
          .datum(data)
          .attr("fill", "steelblue")
          .attr("d", area);

        svg.append("g")
          .call(xAxis);

        svg.append("g")
          .call(yAxis);

        return svg.node();
      }
      )
    },
    {
      name: "d3",
      inputs: ["require"],
      value: (function (require) {
        return (
          require("d3@5")
        )
      })
    },
    {
      from: "556e9d553a659d24@190",
      name: "width",
      remote: "widthC"
    },
    {
      from: "556e9d553a659d24@190",
      name: "height",
      remote: "heightC"
    },
    {
      name: "data",
      inputs: ["d3", "parseDate"],
      value: (async function (d3, parseDate) {
        return (
          Object.assign(await d3.tsv("https://gist.githubusercontent.com/mbostock/3884914/raw/428cb24a2922fd5c38a050e7466c18736f8b97ee/data.tsv", ({ date, high, low }) => ({ date: parseDate(date), high: +high, low: +low })), { y: "°F" })
        )
      })
    },
    {
      name: "area",
      inputs: ["d3", "x", "y"],
      value: (function (d3, x, y) {
        return (
          d3.area()
            .curve(d3.curveStep)
            .x(d => x(d.date))
            .y0(d => y(d.low))
            .y1(d => y(d.high))
        )
      })
    },
    {
      name: "xAxis",
      inputs: ["height", "margin", "d3", "x", "width"],
      value: (function (height, margin, d3, x, width) {
        return (
          g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0))
            .call(g => g.select(".domain").remove())
        )
      })
    },
    {
      name: "yAxis",
      inputs: ["margin", "d3", "y", "data"],
      value: (function (margin, d3, y, data) {
        return (
          g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
              .attr("x", 3)
              .attr("text-anchor", "start")
              .attr("font-weight", "bold")
              .text(data.y))
        )
      })
    },
    {
      name: "parseDate",
      inputs: ["d3"],
      value: (function (d3) {
        return (
          d3.timeParse("%Y%m%d")
        )
      })
    },
    {
      name: "x",
      inputs: ["d3", "data", "margin", "width"],
      value: (function (d3, data, margin, width) {
        return (
          d3.scaleTime()
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, width - margin.right])
        )
      })
    },
    {
      name: "y",
      inputs: ["d3", "data", "height", "margin"],
      value: (function (d3, data, height, margin) {
        return (
          d3.scaleLinear()
            .domain([d3.min(data, d => d.low), d3.max(data, d => d.high)]).nice(5)
            .range([height - margin.bottom, margin.top])
        )
      })
    },
    {
      name: "margin",
      value: (function () {
        return (
          { top: 20, right: 20, bottom: 30, left: 30 }
        )
      })
    }
  ]
};

const notebook = {
  id: "556e9d553a659d24@190",
  modules: [m0, m1, m2, m3]
};

export default notebook;