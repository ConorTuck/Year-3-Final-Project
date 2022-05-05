import React,{useRef, useEffect, useState, useCallback} from 'react';
import * as d3 from 'd3';
import {Graph, 
  GraphContainer, 
  GraphToolBar, 
  TimerangeContainer,
  ButtonTitle, 
  CrosshairWrapper, 
  TrendlineWrapper, 
  LogScaleWrapper,
  TimerangeDropDown,
  TimerangeWrapper,
  TimerangeOptions,
  ColorButtonTitle,
  PriceWrapper,
  DrawContainer,
  DrawDropDown,
  ColorOptionContainer,
  ColorOptionWrapper,
  Slider,
  UndoButton,
  FibRetraceWrapper,
  FibDropDown,
  FibUndoWrapper,
  ColorPicker
 } from './CanvasElements.js';
 
const GraphSVG = ({sentimentData,price,assetName}) => {
  //allow d3 to use the DOM
  const graphRef = useRef();
  const containerRef = useRef();

  //graph data/preprocessing
  const [hourSentiment, setHourSentiment] = useState([])
  const [fourHourSentiment, setFourHourSentiment] = useState([])
  const [dailySentiment, setDailySentiment] = useState([])
  const [data,setData] = useState([])
  
  const [hourPrice, setHourPrice] = useState([])
  const [fourHourPrice, setFourHourPrice] = useState([])
  const [dailyPrice, setDailyPrice] = useState([])
  const [priceData,setPriceData] = useState([])

  //Calculating 4 hour and Daily sent/price data.
  function preProcessing(){
    var tempSentArray = [];
    var tempDailySentArray = [];
    var tempPriceArray = [];
    var tempDailyPriceArray = [];
    
    for(var i = 0; i < hourPrice.length; i++){
      if(i < hourSentiment.length){
        if(hourSentiment[i].date.getHours() % 4 === 0){
          tempSentArray.push(hourSentiment[i])
        }
        if(hourSentiment[i].date.getHours() % 24 === 0){
          tempDailySentArray.push(hourSentiment[i])
        }
      }
      var tempDate = new Date(hourPrice[i][0])
      if(tempDate.getHours() % 4 === 0){
        tempPriceArray.push(hourPrice[i])
      }
      if(tempDate.getHours() % 24 === 0){
        tempDailyPriceArray.push(hourPrice[i])
      }
    }
    setFourHourSentiment(tempSentArray)
    setFourHourPrice(tempPriceArray)
    setDailySentiment(tempDailySentArray)
    setDailyPrice(tempDailyPriceArray)
  }
  const [zoomState, setZoomState] = useState();

  //drawing states
  const [thickness, setThickness] = useState(5)
  const [lineColor, setLineColor] = useState()
  const [drawing, setDrawing] = useState(false)
  const [hover, setHover] = useState(false)
  const [currentLine, setCurrentLine] = useState({ thickness,lineColor, points:[]})
  const [lines, addLines]  = useState([])
  const [trendlines, addTrendlines] = useState([])
  const [crosshairPos, setCrosshairPos] = useState({points: []})
  const [fibRetracements, addFibRetracements] = useState([])
  const [fibLevels] = useState([
    {level: 1, color: "grey", weight: 10},
    {level: 0.786, color: "lightblue", weight: 35},
    {level: 0.618, color: "darkgreen", weight: 35},
    {level: 0.5, color: "green", weight: 20},
    {level: 0.382, color: "lightgreen", weight: 35},
    {level: 0.236, color: "brown", weight: 35},
    {level: 0, color: "grey", weight: 10}
  ])

  //drawing methods
  const mouseMove = useCallback(
    function (event) {
      const [x, y] = d3.pointer(event);
      if (drawing) {
        setCurrentLine((line) => ({
          ...line,
          points: [...line.points, { x, y }]
        }));
      }
    },[drawing]);

    const mouseMoveCrosshair = useCallback(function (event){
      if(crosshairToggle){          
        const [x, y] = d3.pointer(event);
        setCrosshairPos({points: {x,y}})
      } 
    },[hover]);

    function enableDrawing() {
      setCurrentLine({ thickness,lineColor, points: [] });
      setDrawing(true);
    }

    function disableDrawing() {
      setDrawing(false);
      if(trendlineToggle){
        addTrendlines((trendlines) => [...trendlines, currentLine])
      }
      else if (fibRetracementToggle){
        addFibRetracements((fibRetracements) => [...fibRetracements, currentLine])
      }
      else{
        addLines((lines) => [...lines, currentLine]);
      }
}

  function allowHover(){
    setHover(true)
  }

  function denyHover(){
    setHover(false)
  }

  //toolbar states/methods
  const [timeRangeToggle, setTimeRangeToggle] = useState(false)
  const [crosshairToggle, setCrosshairToggle] = useState(false)
  const [trendlineToggle, setTrendlineToggle] = useState(false)
  const [logToggle, setLogToggle] = useState(false)
  const [priceToggle, setPriceToggle] = useState(false)
  const [drawToggle, setDrawToggle] = useState(false)
  const [fibRetracementToggle, setFibRetracementToggle] = useState(false)

  function removeAllLines(){
    addLines([])
    addTrendlines([])
    addFibRetracements([])
    setCurrentLine({ thickness,lineColor, points:[]})
  }

  //sets the states when the props mount
  useEffect(()=>{
    setHourSentiment(sentimentData)
    setHourPrice(price)
  },[sentimentData,price])

  useEffect(()=>{
     // console.log("we here")
      setData(hourSentiment)
      setPriceData(hourPrice)
      preProcessing()
    
  },[hourSentiment, hourPrice])

  //draw graph when data mounted/updated. rendering/rerendering.
  useEffect(() => {

    const graphHeight = containerRef.current.clientHeight/1.5;
    const graphWidth = containerRef.current.clientWidth/1.3;

    const graph = d3.select(graphRef.current)
    .attr('height', graphHeight)
    .attr('width', graphWidth)
    .style('background', 'black')
    .style('overflow', 'visible')

    if(drawing){
      graph.on("mousemove", mouseMove);
    }

    if(crosshairToggle){
      graph.on("mousemove", mouseMoveCrosshair);
    }
    //scales 
    const xScale = d3.scaleTime()
    .domain(d3.extent(data, function(i) { return i.date; }))
    .range([0,graphWidth]);

    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, function(i) { return i.score; }))
    .range([graphHeight,0]);
  
    const xScalePrice = d3.scaleTime()
    .domain(d3.extent(priceData, function(i) { return i[0]}))
      .range([0,graphWidth]);

    const yScalePrice = d3.scaleLinear()
    .domain(d3.extent(priceData, function(i) { return i[2] }))
    .range([graphHeight,0]);

    const yLogScale = d3.scaleLog()
    .domain(d3.extent(data, function(i) { return i.score; }))
    .range([graphHeight,0]);

    const yLogScalePrice = d3.scaleLog()
    .domain(d3.extent(priceData, function(i) { return i[2] }))
    .range([graphHeight,0]);

    if (zoomState ){
      const updateXScalePrice = zoomState.rescaleX(xScalePrice)
      xScalePrice.domain(updateXScalePrice.domain())
      
      const updateXScale = zoomState.rescaleX(xScale)
      xScale.domain(updateXScale.domain())
    }

    //creates the line path from the data
    const scaleLine = d3.line()
    .x(function(i) {
      return xScale(i.date)})
    .y(function(i) {
      if(logToggle){return yLogScale(i.score)}
       return yScale(i.score)
    });

    const priceScaleLine = d3.line()
    .x(function(i) {
      return xScale(new Date(i[0]))})
    .y(function(i) {
      if(logToggle){ return yLogScalePrice(i[2])}
      return yScalePrice(i[2])
    });

    //ensures that all previous data has been removed so we can redraw the graph
    graph.selectAll("*").remove()

    //graph legend
    graph.append("circle")
    .attr("cx", graphWidth+70 )
    .attr("cy", 0)
    .attr("r", 6)
    .style("fill", "steelblue");

    graph.append("text")
    .attr("x", graphWidth+79)
    .attr("y", 0)
    .text("Sentiment")
    .style("font-size", "1rem")
    .style("fill", "steelblue")
    .attr("alignment-baseline","middle");

    if(priceToggle){
      graph.append("circle")
      .attr("cx", graphWidth+70)
      .attr("cy", 20)
      .attr("r", 6)
      .style("fill", "green");

      graph.append("text")
      .attr("x", graphWidth+79)
      .attr("y", 20)
      .text("Price/USD")
      .style("font-size", "1rem")
      .style("fill", "green")
      .attr("alignment-baseline","middle");
    }
    //graph title
    graph.append("text")
    .attr("x", 10)
    .attr("y", -20)
    .text(assetName)
    .style("font-size", "2rem")
    .style("fill", "White")
    .style("text-decoration", "underline")
    .style("opacity", "0.7");
    
    //clipapathing
    graph.append("defs").append("SVG:clipPath")
    .attr("id", "clip")
    .append("SVG:rect")
    .attr("width", graphWidth)
    .attr("height", graphHeight)
    .attr("x", 0)
    .attr("y", 0)

    //multi date and time formating for xaxis
    const formatMinute = d3.timeFormat("%I:%M")
    const formatHour = d3.timeFormat("%I %p")
    const formatDay = d3.timeFormat("%a %d")
    const formatWeek = d3.timeFormat("%b %d")
    const formatMonth = d3.timeFormat("%B")
    const formatYear = d3.timeFormat("%Y")

    //return appropriate format.
    function multiFormat(date) {
      return (d3.timeHour(date) < date ? formatMinute
          : d3.timeDay(date) < date ? formatHour
          : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
          : d3.timeYear(date) < date ? formatMonth
          : formatYear)(date);
    }

    //x axis
    const xAxis = d3.axisBottom(xScale)
    .ticks(5)
    .tickFormat(multiFormat)
    .tickSizeInner(5)
    .tickPadding(10)

    //y axis
    const yAxis = d3.axisLeft(yScale)
    .ticks(6)
    .tickSizeInner(5)
    .tickPadding(10);

    //price axis
    const priceYAxis = d3.axisRight(yScalePrice)
    .ticks(6)
    .tickSizeInner(5)
    .tickPadding(10);

    //gridlines
    const xGridLine = d3.axisBottom(xScale)
    .ticks(5)
    .tickFormat(multiFormat)
    .tickSizeInner(-graphHeight)
    .tickPadding(10);

    const yGridLine = d3.axisLeft(yScale)
    .ticks(6)
    .tickSizeInner(-graphWidth)
    .tickPadding(10);

    //axis titles
    //sent title
    graph.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)") 
    .attr("x", -graphHeight/2.5)
    .attr("y", 0 - 50)
    .text("SENTIMENT SCORE")
    .style("fill", "white")
    .style("opacity", 0.8)

    if(priceToggle){
      //price title
      graph.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(90)")
      .attr("x", graphHeight/1.8)
      .attr("y", -graphWidth - 50)
      .text("USD")
      .style("fill", "white")
      .style("opacity", 0.8)
    }

    var graphClip = graph.append('g').attr("clip-path", "url(#clip)")
    //draws the line on the graph
    graphClip.selectAll('.line')
    .data([data])
    .join('path')
    .attr('d', scaleLine)
    .attr('fill', 'none')
    .attr('stroke-width', '3px')
    .attr('stroke', 'steelblue');

    //draws the price line on the graph
    if(priceToggle){
      graphClip.selectAll('.line')
      .data([priceData])
      .join('path')
      .attr('d', priceScaleLine)
      .attr('fill', 'none')
      .attr('stroke-width', '3px')
      .attr('stroke', 'green');
    }      
    graph.append('g').call(xAxis)
    .attr('transform', 'translate(0, ' + graphHeight + ')')
    .attr("class", "axisColor")
    .attr('stroke', 'white');

    //sentiment axis
    graph.append('g').call(yAxis)
    .attr("class", "axisColor")
    .attr('size', '100')
    .attr('stroke', 'white');

    //price axis
    if(priceToggle){
      graph.append('g').call(priceYAxis)
      .attr('transform', 'translate('+ graphWidth +', 0)')
      .attr("class", "axisColor")
      .attr('size', '100')
      .attr('stroke', 'white');
    }
    //gridlines
    graph.append('g').call(xGridLine)
    .attr('transform', 'translate(0, ' + graphHeight + ')')
    .attr("class", "gridLine")
    .attr('stroke', 'white');

    graph.append('g').call(yGridLine)
    .attr("class", "gridLine")
    .attr('size', '100')
    .attr('stroke', 'white');

    //crosshair lines
    if(crosshairToggle){
      const formatXTime = d3.timeFormat("%Y-%m-%d %I %p")

      //X tool tip
      var xTip = graph.append("g")
       xTip.append("SVG:rect")
      .attr("width", 150)
      .attr("height", 20)
      .attr("x", crosshairPos.points.x - 75)
      .attr("y", graphHeight+ 10)
      .style("fill", "#212121")
      
      xTip.append("text")
      .attr("width", 100)
      .attr("height", 20)
      .attr("x", crosshairPos.points.x - 68)
      .attr("y", graphHeight + 25)
      .text(formatXTime(xScale.invert(crosshairPos.points.x)))
      .style('fill', 'white')
      .style('opacity', 0.9)
      .style("font-size", "1em")

      //sentiment tool tip
      var sentTip = graph.append("g")
      sentTip.append("SVG:rect")
     .attr("width", 45)
     .attr("height", 20)
     .attr("x", 0 - 50)
     .attr("y", crosshairPos.points.y-10)
     .style("fill", "#212121")

     sentTip.append("text")
     .attr("width", 50)
     .attr("height", 20)
     .attr("x", 0 - 46)
     .attr("y", crosshairPos.points.y + 5)
     .text(Number.parseFloat(yScale.invert(crosshairPos.points.y)).toFixed(2))
     .style('fill', 'white')
     .style('opacity', 0.9)
     .style("font-size", "1em")

     if(priceToggle){

      var priceTip = graph.append("g")
      priceTip.append("SVG:rect")
     .attr("width", 40)
     .attr("height", 20)
     .attr("x", graphWidth + 5)
     .attr("y", crosshairPos.points.y-10)
     .style("fill", "#212121")

     priceTip.append("text")
     .attr("width", 50)
     .attr("height", 20)
     .attr("x", graphWidth + 11)
     .attr("y", crosshairPos.points.y + 5)
     .text(Number.parseFloat(yScalePrice.invert(crosshairPos.points.y)).toFixed(2))
     .style('fill', 'white')
     .style('opacity', 0.9)
     .style("font-size", "1em")

     }
      
      //xLine
      graphClip.append('line')
      .style("stroke", "grey")
      .style('stroke-width',1)
      .style("stroke-dasharray", ("3,3"))
      .attr("x1", 0)//max across
      .attr("y1", crosshairPos.points.y)//max above
      .attr("x2", graphWidth)
      .attr("y2", crosshairPos.points.y);

      //yLine
      graphClip.append('line')
      .style("stroke", "grey")
      .style('stroke-width',1)
      .style("stroke-dasharray", ("3,3"))
      .attr("x1", crosshairPos.points.x)//max across
      .attr("y1", 0)//max above
      .attr("x2", crosshairPos.points.x)
      .attr("y2", graphHeight + 10);
    }

    //mouseDrawing
    const drawLine = d3.line()
    .x((d) =>  d.x)
    .y((d) => d.y)
    .curve(d3.curveBasisOpen);
    

    for(var i = 0; i < lines.length; i++){
      graphClip.selectAll('.line')
      .data([lines[i].points])
      .join('path')
      .attr('d',drawLine)
      .attr('fill', 'none')
      .attr('stroke-width', lines[i].thickness)
      .attr('stroke', `${lines[i].lineColor}`)
    }
    
    var currentThickness = currentLine.thickness
    if(drawToggle){
      graphClip.selectAll('.line')
      .data([currentLine.points])
      .join('path')
      .attr('d',drawLine)
      .attr('fill', 'none')
      .attr('stroke-width',currentThickness)
      .attr('stroke', `${currentLine.lineColor}`);
    }
  
    //trendline rendering
    try {
    for(var i = 0; i < trendlines.length; i++){
      graphClip.append('line')
      .style("stroke", `${trendlines[i].lineColor}`)
      .style('stroke-width',trendlines[i].thickness)
      .attr("x1", trendlines[i].points[0].x)
      .attr("y1", trendlines[i].points[0].y)
      .attr("x2", trendlines[i].points[trendlines[i].points.length-1].x)
      .attr("y2", trendlines[i].points[trendlines[i].points.length-1].y);
    }

    if(currentLine.points.length !== 0 && trendlineToggle){
      graphClip.append('line')
      .style("stroke", `${currentLine.lineColor}`)
      .style('stroke-width',currentThickness)
      .attr("x1", currentLine.points[0].x)
      .attr("y1", currentLine.points[0].y)
      .attr("x2", currentLine.points[currentLine.points.length-1].x)
      .attr("y2", currentLine.points[currentLine.points.length-1].y);
    }
    } catch (error) {
    console.log("trendline error")
    addTrendlines((trendlines)=> trendlines.filter((_, i) => i !== trendlines.length-1))
    }

    //fib retracement
    //drawing fib
    try {
      if(fibRetracementToggle && currentLine.points.length !== 0){
        var yUpperBound = currentLine.points[currentLine.points.length-1].y
        var yLowerBound = currentLine.points[0].y
        //fib level 1 - 0.236
        for(var i = 0;i < fibLevels.length -1; i++){
          graphClip.append('line')
          .style("stroke", `${fibLevels[i].color}`)
          .style('stroke-width',2)
          .attr("x1", currentLine.points[0].x)
          .attr("y1", ((yUpperBound - yLowerBound) * fibLevels[i].level) + yLowerBound)
          .attr("x2", currentLine.points[currentLine.points.length-1].x)
          .attr("y2", ((yUpperBound - yLowerBound) * fibLevels[i].level) + yLowerBound);
        
          graphClip.append("text")
          .attr("width", 50)
          .attr("height", 20)
          .attr("x", currentLine.points[0].x - fibLevels[i].weight)
          .attr("y", ((yUpperBound - yLowerBound) * fibLevels[i].level) + yLowerBound + 4.5)
          .text(`${fibLevels[i].level}`)
          .style('fill', `${fibLevels[i].color}`)
          .style('opacity', 0.9)
          .style("font-size", "0.8em")
        }
  
        //fib level 0
        graphClip.append('line')
        .style("stroke", "grey")
        .style('stroke-width',2)
        .attr("x1", currentLine.points[0].x)
        .attr("y1", currentLine.points[0].y)
        .attr("x2", currentLine.points[currentLine.points.length-1].x)
        .attr("y2", currentLine.points[0].y);
  
        graphClip.append("text")
        .attr("width", 50)
        .attr("height", 20)
        .attr("x", currentLine.points[0].x - 12)
        .attr("y", currentLine.points[0].y + 5)
        .text(`${fibLevels[fibLevels.length-1].level}`)
        .style('fill', 'grey')
        .style('opacity', 0.9)
        .style("font-size", "0.8em")
      }
      
        //fib level 1 - 0.236
        for(var j = 0; j < fibRetracements.length; j++){
          for(var i = 0;i < fibLevels.length -1; i++){
  
            var yUpperBound = fibRetracements[j].points[fibRetracements[j].points.length-1].y
            var yLowerBound = fibRetracements[j].points[0].y
  
            graphClip.append('line')
            .style("stroke", `${fibLevels[i].color}`)
            .style('stroke-width',2)
            .attr("x1", fibRetracements[j].points[0].x)
            .attr("y1", ((yUpperBound - yLowerBound) * fibLevels[i].level) + yLowerBound)
            .attr("x2", fibRetracements[j].points[fibRetracements[j].points.length-1].x)
            .attr("y2", ((yUpperBound - yLowerBound) * fibLevels[i].level) + yLowerBound);
          
            graphClip.append("text")
            .attr("width", 50)
            .attr("height", 20)
            .attr("x", fibRetracements[j].points[0].x - fibLevels[i].weight)
            .attr("y", ((yUpperBound - yLowerBound) * fibLevels[i].level) + yLowerBound + 4.5)
            .text(`${fibLevels[i].level}`)
            .style('fill', `${fibLevels[i].color}`)
            .style('opacity', 0.9)
            .style("font-size", "0.8em")
          }
          //fib level 0
          graphClip.append('line')
          .style("stroke", "grey")
          .style('stroke-width',2)
          .attr("x1", fibRetracements[j].points[0].x)
          .attr("y1", fibRetracements[j].points[0].y)
          .attr("x2", fibRetracements[j].points[fibRetracements[j].points.length-1].x)
          .attr("y2", fibRetracements[j].points[0].y);
  
          graphClip.append("text")
          .attr("width", 50)
          .attr("height", 20)
          .attr("x", fibRetracements[j].points[0].x - 12)
          .attr("y", fibRetracements[j].points[0].y + 5)
          .text(`${fibLevels[fibLevels.length-1].level}`)
          .style('fill', 'grey')
          .style('opacity', 0.9)
          .style("font-size", "0.8em")
      }
      
    } catch (error) {
      console.log("fib error")
      addFibRetracements((fibRetracements)=> fibRetracements.filter((_, i) => i !== fibRetracements.length-1))
    }
    
  
   //zoom and pan functionality
    const zoomBehaviour = d3.zoom()
    .scaleExtent([0.5,5])
    .translateExtent([[0,0],[graphWidth+10,graphHeight]])
    .on("zoom", ()=>{
      const state = d3.zoomTransform(graph.node())
      setZoomState(state)
    });

    if(drawToggle === false && trendlineToggle === false && fibRetracementToggle === false) graph.call(zoomBehaviour);
    else{graph.on(".zoom", null)}
      

    return () => graph.on("mousemove", null)
    
  }, [containerRef, data, priceData, zoomState, logToggle, priceToggle, mouseMove, mouseMoveCrosshair, currentLine, crosshairToggle, crosshairPos, fibRetracements]);

  return (
    <>
      <GraphToolBar data-testid='Graph-1'>
        <TimerangeContainer data-testid='Graph-2'>
          <ButtonTitle data-testid='Graph-3' onClick={() =>setTimeRangeToggle(!timeRangeToggle)}>TimeScale</ButtonTitle>
          {timeRangeToggle &&
          <TimerangeDropDown data-testid='Graph-4'>
            <TimerangeWrapper data-testid='Graph-5'>
              <TimerangeOptions data-testid='Graph-6' onClick={() =>{setTimeRangeToggle(!timeRangeToggle); setData(hourSentiment); setPriceData(hourPrice); removeAllLines()}}>1H</TimerangeOptions>
            </TimerangeWrapper>
            <TimerangeWrapper data-testid='Graph-7'>
              <TimerangeOptions data-testid='Graph-8' onClick={() =>{setTimeRangeToggle(!timeRangeToggle); setData(fourHourSentiment); setPriceData(fourHourPrice); removeAllLines()}}>4H</TimerangeOptions>
            </TimerangeWrapper>
            <TimerangeWrapper data-testid='Graph-9'>
              <TimerangeOptions data-testid='Graph-10' onClick={() =>{setTimeRangeToggle(!timeRangeToggle); setData(dailySentiment); setPriceData(dailyPrice); removeAllLines()}}>1D</TimerangeOptions>
            </TimerangeWrapper>
          </TimerangeDropDown>
          }
        </TimerangeContainer>
        <LogScaleWrapper data-testid='Graph-11'>
        <ColorButtonTitle  data-testid='Graph-12' onClick={() =>setLogToggle(!logToggle)} toggle={logToggle}>Log Scale</ColorButtonTitle>
        </LogScaleWrapper>
        <TrendlineWrapper data-testid='Graph-13'>
        <ColorButtonTitle data-testid='Graph-14' onClick={() =>{setTrendlineToggle(!trendlineToggle); setDrawToggle(false); setCrosshairToggle(false); setFibRetracementToggle(false)}} toggle={trendlineToggle}>TrendLine</ColorButtonTitle>
        {trendlineToggle && 
          <DrawDropDown data-testid='Graph-16'>
            <ColorOptionContainer data-testid='Graph-17'>
              <ColorOptionWrapper data-testid='Graph-18'>
              <ColorPicker data-testid='Graph-19' type={"Color"} value={lineColor} onChange={(e)=> setLineColor(e.target.value)}></ColorPicker>
              </ColorOptionWrapper>
              <UndoButton  data-testid='Graph-20'onClick={() => {addTrendlines((trendlines)=> trendlines.filter((_, i) => i !== trendlines.length-1)); setCurrentLine({ thickness,lineColor, points:[]})}} width={50}>⭯</UndoButton>
            </ColorOptionContainer>
            <Slider data-testid='Graph-21' type={'range'} value={thickness} min={1} max={20} onChange={(e)=> setThickness(e.target.value)}/>
          </DrawDropDown>
        }
        </TrendlineWrapper >
        <CrosshairWrapper data-testid='Graph-22'>
        <ColorButtonTitle  data-testid='Graph-23' onClick={() =>{setCrosshairToggle(!crosshairToggle); setTrendlineToggle(false); setDrawToggle(false); setFibRetracementToggle(false)}} toggle={crosshairToggle}>Crosshair</ColorButtonTitle>
        </CrosshairWrapper>
        <PriceWrapper data-testid='Graph-24'>
        <ColorButtonTitle data-testid='Graph-25' onClick={() =>setPriceToggle(!priceToggle)} toggle={priceToggle}>Price</ColorButtonTitle>
        </PriceWrapper>
        <DrawContainer data-testid='Graph-26'>
        <ColorButtonTitle data-testid='Graph-27' onClick={() =>{setDrawToggle(!drawToggle); setTrendlineToggle(false); setCrosshairToggle(false); setFibRetracementToggle(false)}} toggle={drawToggle}>Draw</ColorButtonTitle>
        {drawToggle && 
          <DrawDropDown data-testid='Graph-28'>
            <ColorOptionContainer data-testid='Graph-29'>
              <ColorOptionWrapper data-testid='Graph-30'>
                <ColorPicker data-testid='Graph-31' type={"Color"} value={lineColor} onChange={(e)=> setLineColor(e.target.value)}></ColorPicker>
              </ColorOptionWrapper >
              <UndoButton  data-testid='Graph-32' onClick={() => {addLines((lines)=> lines.filter((_, i) => i !== lines.length-1)); setCurrentLine({ thickness,lineColor, points:[]})}} width={50}>⭯</UndoButton>
            </ColorOptionContainer>
            <Slider  data-testid='Graph-33' type={'range'} value={thickness} min={1} max={20} onChange={(e)=> setThickness(e.target.value)}/>
          </DrawDropDown>
        }
        </DrawContainer>
        <FibRetraceWrapper data-testid='Graph-34'>
          <ColorButtonTitle  data-testid='Graph-35'onClick={() =>{setFibRetracementToggle(!fibRetracementToggle); setCrosshairToggle(false); setDrawToggle(false); setTrendlineToggle(false)}} toggle={fibRetracementToggle}>Fib Retracement</ColorButtonTitle>
          {fibRetracementToggle && 
            <FibDropDown data-testid='Graph-36'>
              <FibUndoWrapper data-testid='Graph-37'>
                <UndoButton data-testid='Graph-38' onClick={() => { addFibRetracements((fibRetracements)=> fibRetracements.filter((_, i) => i !== fibRetracements.length-1)); setCurrentLine({ thickness,lineColor, points:[]})}} width={100}>Undo</UndoButton>
              </FibUndoWrapper>
            </FibDropDown>
          }
        </FibRetraceWrapper>
      </GraphToolBar>
      <GraphContainer data-testid='Graph-39' ref={containerRef}>
        <Graph  data-testid='Graph-40' onMouseDown={enableDrawing} onMouseUp={disableDrawing} onMouseEnter={allowHover} onMouseLeave={denyHover} ref={graphRef}/>
      </GraphContainer>
    </>
  );
};

export default GraphSVG;