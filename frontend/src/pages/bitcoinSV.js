import React, { useEffect, useState } from 'react'
import Navbar from '../Components/NavBar'
import GraphSVG from '../Components/Graph'
import Footer from '../Components/Footer'

const BSV = () => {
    const [priceData,setPriceData] = useState([])
    const [sentimentData, setSentimentData] = useState([])

    //toggle used to fetch data every switch
    const [toggle, setToggle] = useState(false)

    //starts useeffect to recollect data
    const gatherData = () => {
        setInterval(setToggle(!toggle),1000 * 60 * 60)
    }

    //sets the state hooks to be used in the graph. preprocessing the sentiment data into a useable format
    function setData(data){
        var sentimentScore
        var sentimentDate
        var sentimentData = []
        for(var j = 0; j < data.length; j++){
          for (var i = 0; i < data[j].length; i++){
            sentimentScore = data[j][i].score
            sentimentDate = new Date(data[j][i].date)
            sentimentDate.setHours(data[j][i].hour)

            sentimentData.push({date: sentimentDate, score: (sentimentScore * 10)+10})
          }
        }
        setSentimentData(sentimentData)
    }

    //fetch request to get data
    useEffect(() =>{
        fetch("/getBSVSentiment")
        .then(res => res.json())
        .then(data => setData(data))

        fetch("/getBSVData")
        .then(res => res.json())
        .then(data => setPriceData(data))

    },[toggle])

    
    //setting time intervals to gather new data hourly.
    var time = new Date();
    if(time.getMinutes === 0){
        setToggle(!toggle)
      }
      else{
        time.setHours(time.getHours() + 1)
        time.setMinutes(0)
        time.setSeconds(0)
        setTimeout(gatherData,time - new Date())
      }

    return (
        <>
        <Navbar/>
        <GraphSVG 
        sentimentData={sentimentData}
        price={priceData}
        assetName={"Bitcoin SV"}
         />
         <Navbar/>
        <Footer/>
        </>
    )
}

export default BSV