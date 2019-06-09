// URL: https://observablehq.com/@tmcw/responsive-notebook-design-protips
// Title: Responsive notebook design
// Author: Tom MacWright (@tmcw)
// Version: 249
// Runtime version: 1

const m0 = {
    id: "e59dba0ac1d1eb2d@249",
    variables: [
      {
        inputs: ["md"],
        value: (function(md){return(
  md`# Responsive notebook design
  
  <img src='https://c1.staticflickr.com/5/4713/26381096588_876a332e84_b.jpg' style='width:100%;max-width:640px;' />
  
  Let’s review a few best practices for making your notebooks work great on all sorts of media not just desktops. Thankfully, Observable has some conveniences that make cross-platform usability a bit easier, and there are a few other hot tips to follow.
  
  The gist is:
  
  1. For images, set \`width:100%;max-width:640px\` (or your desired width) as a style attribute.
  2. Use the magical width variable when you can for other visualizations.
  3. If you need to set a fixed width for a Canvas or SVG element, add max-width and height rules to it.
  
  I’ve also included some bonus tips for responsive images and responsive charts at the end!
  
  ## 1. Good image size defaults
  
  See the header above for an example: its code is:
  
  \`\`\`html
  <img
    src='https://c1.staticflickr.com/5/4713/26381096588_876a332e84_b.jpg'
    style='width:100%;max-width:640px;' />
  \`\`\`
  
  This lets it squeeze down to a smaller size on tiny devices, but occupy a nice slice of screen real estate on big monitors.
  
  ## 2. Using width
  
  The [Observable standard library](https://beta.observablehq.com/@mbostock/standard-library) includes an incredibly useful variable: width. It’s not just a shortcut for _window_.innerWidth: it’s a reactive variable that updates as the page resizes! Using it is highly recommended if you have a notebook with some variable-width element. For instance, here’s a nice sine wave that adjusts to fit the width of the page. Because it relies on width, it resizes nicely and automatically.`
  )})
      },
      {
        inputs: ["DOM","width"],
        value: (function*(DOM,width)
  {
    const ctx = DOM.context2d(width, 100);
    ctx.strokeStyle = '#459';
    while (true) {
      ctx.clearRect(0, 0, width, 100);
      ctx.beginPath();
      for (let i = 0; i < width; i += 2) {
        ctx[i ? 'lineTo' : 'moveTo'](i, 50 + Math.sin((Date.now() / 2000) + i / 20) * 20);
      }
      ctx.stroke();
      yield ctx.canvas;
    }
  }
  )
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`If you don’t want something to be full-width, but instead want some _known_ width that has a maximum, use Math.min with width and whatever minimum you want to enforce.`
  )})
      },
      {
        inputs: ["width","DOM"],
        value: (function*(width,DOM)
  {
    const myWidth = Math.min(640, width);
    const ctx = DOM.context2d(myWidth, 100);
    ctx.strokeStyle = '#959';
    while (true) {
      ctx.clearRect(0, 0, myWidth, 100);
      ctx.beginPath();
      for (let i = 0; i < myWidth; i += 2) {
        ctx[i ? 'lineTo' : 'moveTo'](i, 50 +
          Math.cos((Date.now() / 2000) - i / 5) *
          Math.cos((Date.now() / 2000) - i / 20) * 20);
      }
      ctx.stroke();
      yield ctx.canvas;
    }
  }
  )
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`## 3. Handling elements with fixed widths
  
  Let’s say you want your element to be some specific fixed width. A lot of times that’s super convenient — that way you can guarantee that it some some property, like it’s a power-of-2 width, or it's the same size as an image you want to draw into it with drawImage. Even in this case, you can make your notebook responsive-by-default by using a suitable style property.
  
  Because the DOM.svg library method sets the SVG’s [viewBox](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox), elements inside of an SVG scale smoothly.
  
  The key lines below are these: setting the max-width & height of the SVG element.
  
  \`\`\`js
  .style('max-width', '100%')
  .style('height', 'auto');
  \`\`\`
  `
  )})
      },
      {
        inputs: ["d3","DOM"],
        value: (function(d3,DOM)
  {
    const height = 500;
    const svg = d3.select(DOM.svg(1024, height))
      .style('max-width', '100%')
      .style('height', 'auto');
    svg.append('rect')
      .attr('fill', '#E93223')
      .attr('transform', 'translate(50, 50)')
      .attr('width', 1024 - 100)
      .attr('height', height - 100);
    svg.append('text')
      .attr('transform', 'translate(100, 315)')
      .style('font-family', 'Futura')
      .style('font-style', 'italic')
      .style('letter-spacing', '-10px')
      .style('font-size', '200px')
      .attr('fill', '#ffffff')
      .text('Supreme');
    return svg.node();
  }
  )
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`---
  
  _Bonus tips_
  
  ## Responsive images
  
  If you really want to go all-out with a responsive notebook, you can make your images responsive, with the [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) attribute, or the picture element. This lets you define multiple sources for an image, depending on screen width and screen pixel density - so, retina images for retina screens, non-retina for old-fashined screens. If you want multiple resolutions of the same image, use srcset - otherwise, use picture.
  
  Here’s an example of using a picture element: this will be my drawing of a pink spaceship on big monitors, and an image of a yellow spaceship on monitors less than 640 pixels wide.
  
  \`\`\`html
  <picture>
    <source media='(min-width: 640px)'
      srcset='https://c2.staticflickr.com/8/7282/27676751282_f38638d482_b.jpg'>
    <img style='width:100%;max-width:640px;'
      src='https://c2.staticflickr.com/8/7442/27166332174_16feb79b0c_b.jpg'>
  </picture>
  \`\`\`
  
  <picture>
    <source media='(min-width: 640px)' srcset='https://c2.staticflickr.com/8/7282/27676751282_f38638d482_b.jpg'>
    <img style='width:100%;max-width:640px;' src='https://c2.staticflickr.com/8/7442/27166332174_16feb79b0c_b.jpg'>
  </picture>
  
  And here's an example of a srcset: this image will use a large source image on a retina screen, and a smaller one on a non-retina screen:
  
  \`\`\`html
  <img style='width:100%;max-width:640px;'
    srcset='https://c1.staticflickr.com/5/4288/35457442490_2987c9c3a6_h.jpg 2x'
    src='https://c2.staticflickr.com/8/7442/27166332174_16feb79b0c_b.jpg'>
  \`\`\`
  
  
  <img style='width:100%;max-width:640px;'
    srcset='https://c1.staticflickr.com/5/4288/35457442490_2987c9c3a6_h.jpg 2x'
    src='https://c2.staticflickr.com/8/7442/27166332174_16feb79b0c_b.jpg'>
  `
  )})
      },
      {
        inputs: ["md"],
        value: (function(md){return(
  md`## Responsive ticks for d3 charts
  
  If you're using d3, which a lot of us are, another way to embrace little screens is by making the number of ticks in your scale responsive: this way they don’t crowd together. When you resize the scale below, the number of ticks follows the width of the page, because of the code:
  
  \`\`\`js
  .ticks(width / 80)
  \`\`\`
  `
  )})
      },
      {
        inputs: ["d3","width","DOM"],
        value: (function(d3,width,DOM)
  {
    const xAxis = g => g
      .attr("transform", `translate(0,50)`)
      .call(d3.axisBottom(d3.scaleLinear().domain([0, 100]).range([50, width - 50]))
          .ticks(width / 80)
          .tickSizeOuter(0));
    
    const svg = d3.select(DOM.svg(width, 100));
  
    svg.append("g").call(xAxis);
    
    return svg.node();
  }
  )
      },
      {
        name: "d3",
        inputs: ["require"],
        value: (function(require){return(
  require('d3-selection', 'd3-scale', 'd3-axis')
  )})
      }
    ]
  };
  
  const notebook = {
    id: "e59dba0ac1d1eb2d@249",
    modules: [m0]
  };
  
  export default notebook;