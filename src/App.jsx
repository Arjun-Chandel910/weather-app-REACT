import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import "./App.css";

function App() {
  let [inp, setInp] = useState("");
  let [content, setContent] = useState({
    name: "",
    temp: "",
    humidity: "",
  });

  let getCityWeather = async (city) => {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=27d1909b10a7fa41a5c018b998bac5e4`;
    let res = await fetch(URL);
    res = await res.json();
    return res.main;
  };

  // getCityWeather("mumbai");

  let handleInput = (e) => {
    setInp(e.target.value);
  };
  let handleForm = async (e) => {
    e.preventDefault();
    let data = await getCityWeather(inp);
    setContent((d) => {
      return {
        ...d,
        name: inp,
        temp: data.temp - 273,
        humidity: data.humidity,
      };
    });
    console.log(content);
  };

  return (
    <div className="searchBox">
      <h1>Weather-App</h1>

      <form action="" onSubmit={handleForm}>
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={inp}
          onChange={handleInput}
        />

        <br />
        <br />

        <Button variant="contained" type=" submit" color="success">
          Search
        </Button>
      </form>
      <br />
      <Card style={{ width: "100%" }} sx={{ maxWidth: 345 }}>
        <CardActionArea>
          {content.temp < 7 ? (
            <CardMedia
              component="img"
              height="140"
              image="https://images.unsplash.com/photo-1516035645781-9f126e774e9e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2ludGVyfGVufDB8fDB8fHww"
              alt="green iguana"
            />
          ) : content.temp > 7 && content.humidity > 49 ? (
            <CardMedia
              component="img"
              height="140"
              image="https://media.istockphoto.com/id/105934727/photo/rain.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z-21JImEjaPh55Ek00YRctuv1VNPwKJnlSDfySyonYw="
              alt="green iguana"
            />
          ) : (
            <CardMedia
              component="img"
              height="140"
              image="https://media.istockphoto.com/id/917178010/photo/road-panorama-on-sunny-spring-day.webp?a=1&b=1&s=612x612&w=0&k=20&c=xBrnKPYdoOQjECCUCtGyVfg1987s6lr1Ek7Spxk-rRU="
              alt="green iguana"
            />
          )}

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {content.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Temp: {content.temp}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Humiity: {content.humidity}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
export default App;
