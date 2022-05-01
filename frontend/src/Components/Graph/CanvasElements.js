import { color } from 'd3';
import styled from 'styled-components'

export const GraphContainer = styled.div`
    margin:auto;
    height: 858px;
    width: auto;
    border: solid 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;

    @media screen and (max-width: 3840px) {
        height: 1950px;
    }
    @media screen and (max-width: 2560px) {
        height: 1110px;
    }
    @media screen and (max-width: 1920px) {
        height: 750px;
    }
`;

export const Graph = styled.svg`
  background-color: black;
  cursor: crosshair;
  
`;

export const GraphContent = styled.g`
  background-color: black;
`;
 
export const GraphToolBar = styled.div`
  position: absolute;
  margin: auto;
  top: 120px;
  height: 30px;
  width: 100%;
  background-color: black;
  justify-content: center;
  display: flex;
  `;

export const TimerangeContainer = styled.div`
  height: 100%;
  width: 5%;
  justify-content: center;
  display: flex;
  border: 1px solid rgb(33, 33, 33);
  //background-color: grey;
`;

export const ButtonTitle = styled.button`
  height: 100%;
  width: 100%;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  background-color: rgb(33, 33, 33);
  color: white;
  overflow: hidden;
  cursor: pointer;

  &:hover {
        cursor: pointer;
        transition: all 0.2s unset;
        border-width: 1.5px;
        background-color: rgb(33, 33, 33);
        color: #d36135;
        font-size: 1.05rem;
    }
`;

export const ColorButtonTitle = styled.button`
  height: 100%;
  width: 100%;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  background-color: rgb(33, 33, 33);
  color: ${({toggle}) => (toggle ? '#d36135' : 'white')};
  overflow: hidden;
  cursor: pointer;

  &:hover {
        cursor: pointer;
        transition: all 0.2s unset;
        border-width: 1.5px;
        background-color: rgb(33, 33, 33);
        color: #d36135;
        font-size: 1.05rem;
    }
`;

export const LogScaleWrapper = styled.div`
  height: 100%;
  width: 5%;
  border: 1px solid rgb(33, 33, 33);
  background-color: rgb(33, 33, 33);
  display: flex;
  justify-content: center;
`;

export const TrendlineWrapper = styled.div`
  height: 100%;
  width: 5%;
  border: 1px solid rgb(33, 33, 33);
  background-color: rgb(33, 33, 33);
`;

export const CrosshairWrapper = styled.div`
  height: 100%;
  width: 5%;
  border: 1px solid rgb(33, 33, 33);
  background-color: rgb(33, 33, 33);
`;

export const TimerangeDropDown = styled.ul`
  background-color: rgb(33, 33, 33);
   position: absolute;
   top: 30px;
   width: 105px;
   height: 120px;
   border-style: double;
   border-color: white;
   border-width: thin;
   border-radius: 1%;
   padding: 1rem;
   overflow: hidden;

   &:hover {
        cursor: pointer;
        transition: all 0.2s unset;
        border-width: 1.5px;
        background-color: rgb(33, 33, 33);
    }
`;

export const TimerangeWrapper = styled.div`
    background-color: rgb(33, 33, 33);
    border-top: 0px solid rgb(33, 33, 33);
    border-left: 3px solid rgb(33, 33, 33);
    border-right: 3px solid rgb(33, 33, 33);
    border-style: solid;

    &:hover {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border-bottom: 3px solid #d36135;
        background-color: rgb(33, 33, 33);  
    }
`;

export const PriceWrapper = styled.div`
  height: 100%;
  width: 5%;
  border: 1px solid rgb(33, 33, 33);
  background-color: rgb(33, 33, 33);
`;

export const FibRetraceWrapper = styled.div`
  height: 100%;
  width: 8%;
  border: 1px solid rgb(33, 33, 33);
  background-color: rgb(33, 33, 33);
  display: flex;
  justify-content: center;
`;

export const TimerangeOptions = styled.li`
    display: inline-block;
    text-decoration: none;
    color: white;
    width: 100%;
    font-size: 1rem;
    //border-radius: 10%;
    align-self: center;
    filter: brightness(1);
`;

export const CheckBox = styled.input`
  background-color: grey;
`;

export const DrawContainer = styled.div`
  height: 100%;
  width: 5%;
  justify-content: center;
  display: flex;
  border: 1px solid rgb(33, 33, 33);
  //background-color: grey;
`;

export const DrawDropDown = styled.ul`
  background-color: rgb(33, 33, 33);
   position: absolute;
   top: 30px;
   width: 200px;
   height: 80px;
   border-style: double;
   border-color: white;
   border-width: thin;
   border-radius: 1%;
   padding: 1rem;
   overflow: hidden;
   display: flex;
   flex-direction: column;
   justify-content: center;

   &:hover {
        cursor: pointer;
        transition: all 0.2s unset;
        border-width: 1.5px;
        background-color: rgb(33, 33, 33);
    }
`;

export const FibDropDown = styled.div`
  background-color: rgb(33, 33, 33);
   position: absolute;
   top: 30px;
   width: 150px;
   height: 55px;
   border-style: double;
   border-color: white;
   border-width: thin;
   border-radius: 1%;
   padding: 1rem;
   overflow: hidden;
   display: flex;
   justify-content: center;

   &:hover {
        cursor: pointer;
        transition: all 0.2s unset;
        border-width: 1.5px;
        background-color: rgb(33, 33, 33);
    }
`;

export const ColorOptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
`;

export const ColorOptionWrapper = styled.div`
    background-color: rgb(33, 33, 33);
    border-top: 3px solid rgb(33, 33, 33);
    border-left: 3px solid rgb(33, 33, 33);
    border-right: 3px solid rgb(33, 33, 33);
    border-color: ${({borderToggle})=> borderToggle ? " #d36135" : "#212121"};
    border-style: solid;
    padding: 0%;
    margin: 0%;
    //border-radius: 50%;
    width: 100%;
    height: 100%;

    &:hover {
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        border-bottom: 3px solid #d36135;
        background-color: rgb(33, 33, 33);  
    }
`;

export const ColorOption = styled.li`
    display: inline-block;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: ${({Color}) => Color};
    color: ${({Color}) => Color};
    width: 100%;
    height: 100%;
    align-self: center;    
`;

export const FibUndoWrapper = styled.div`
    display: inline-block;
    border: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    align-self: center;
`;

export const Circle = styled.button`
    background-color: red;
    border: 0;
    width: 50px;

`;

export const Slider = styled.input`
    background-color: red;
    border: 0;
    width: 100%;
`;

export const UndoButton = styled.button`
  height: 100%;
  width: ${({width}) => width}%;
  border: 0;
  margin: 0;
  padding: 0;
  font-size: 1em;
  background-color: rgb(33, 33, 33);
  color: white;
  overflow: hidden;
  cursor: pointer;

  &:hover {
        cursor: pointer;
        transition: all 0.2s unset;
        border-width: 1.5px;
        background-color: rgb(33, 33, 33);
        color: #d36135;
        font-size: 1.05rem;
    }
`;

export const ColorPicker = styled.input`
  width: 100%;
`;