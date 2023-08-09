import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { GiPositionMarker } from "react-icons/gi";
const Home = () => {
  const [input, setInput] = useState("London");
  const [beginSearch, setBeginSearch] = useState(false);
  const [temperatureUnit, setTemperatureUnit] = useState("Celsius");
  const [dataWeatherList, setDataWeatherList] = useState(null);
  const convertToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "70053b7a76de23bdc7582dddcbe10757",
  };
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const ICON_URL = "https://api.openweathermap.org/img/w/";
  useEffect(() => {
    const fetchWeatherDataList = async () => {
      try {
        const response = await axios.get(`${api.url}/forecast`, {
          params: {
            q: input,
            appid: api.key,
            units: "metric",
            //cnt: 6, // 5 days + current day
          },
        });
        setDataWeatherList(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherDataList();
  }, [input, api.url, api.key]);
  const handleButton = () => {
    setBeginSearch(true);
  };
  const handleUnitChange = () => {
    setTemperatureUnit((prevUnit) =>
      prevUnit === "Celsius" ? "Fahrenheit" : "Celsius"
    );
  };
  const handleSearch = () => {
    setBeginSearch(false);
  };
  if (!dataWeatherList) {
    return (
      <div className="bg-slate-800 flex justify-center items-center h-screen w-screen text-9xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full md:flex-row  bg-slate-800 ">
      {beginSearch ? (
        <div className="md:w-[32%] md:h-[100%]  bg-slate-800 flex flex-col w-[100%] h-[50%] ">
          <div className="my-20 mx-11 flex flex-row justify-around">
            <input
              type="text"
              placeholder="Search city..."
              value={input}
              className="w-[268px] h-12 border border-gray-200 bg-transparent text-white"
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="w-[86px] h-12 bg-indigo-600"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
      ) : (
        <div className="md:w-[32%] md:h-[100%]  bg-slate-800 flex flex-col w-[100%] h-[50%] justify-items-stretch ">
          <div className="w-[80%] h-10 bg-zinc-500 shadow mt-11 ml-11">
            <div
              className="text-gray-200 text-base font-medium text-center px-4"
              onClick={handleButton}
            >
              Search for places
            </div>
          </div>
          <div className="flex flex-col items-center">
            {dataWeatherList?.list[0]?.weather[0] && (
              <>
                <img
                  className="w-[202px] h-[234px]"
                  src={
                    ICON_URL +
                    dataWeatherList?.list[0]?.weather[0].icon +
                    ".png"
                  }
                  alt={dataWeatherList?.list[0]?.weather[0].main}
                />
              </>
            )}
            {temperatureUnit === "Fahrenheit" ? (
              <div>
                <span className="text-gray-200 text-[144px] font-medium">
                  {convertToFahrenheit(
                    Math.round(dataWeatherList?.list[0]?.main.temp)
                  )}
                </span>
                <span className="text-gray-400 text-5xl font-medium">°F</span>
              </div>
            ) : (
              <div>
                <span className="text-gray-200 text-[144px] font-medium">
                  {Math.round(dataWeatherList?.list[0]?.main.temp)}
                </span>
                <span className="text-gray-400 text-5xl font-medium">℃</span>
              </div>
            )}

            <div className="text-center text-gray-400 text-4xl font-semibold">
              {dataWeatherList?.list[0]?.weather[0].main}
            </div>
            <div className="flex flex-row my-7 justify-around">
              <div className="text-zinc-400 text-lg font-medium">{`Today • ${
                dayNames[new Date(dataWeatherList?.list[0].dt * 1000).getDay()]
              }   ${new Date(
                dataWeatherList?.list[0].dt * 1000
              ).getDate()} `}</div>
            </div>
            <div className="text-zinc-400 text-lg font-semibold my-7 flex flex-row justify-around">
              <GiPositionMarker />
              {dataWeatherList?.city.name}
            </div>
          </div>
        </div>
      )}
      <div className="md:w-[68%] md:h-full bg-neutral-900  w-[100%]">
        <div className="flex flex-row mt-11 w-[80%] justify-end">
          <div
            className={
              temperatureUnit === "Celsius"
                ? `w-10 h-10  bg-gray-200 rounded-[50px] mr-3 p-2`
                : `w-10 h-10  bg- bg-slate-600 rounded-[50px] mr-3 p-2`
            }
            onClick={handleUnitChange}
          >
            <div className="w-[18.10px] h-5 text-slate-900 text-lg font-bold">
              ℃
            </div>
          </div>
          <div
            className={
              temperatureUnit === "Fahrenheit"
                ? `w-10 h-10  bg-gray-200 rounded-[50px] mr-3 p-2`
                : `w-10 h-10   bg-slate-600 rounded-[50px] mr-3 p-2`
            }
            onClick={handleUnitChange}
          >
            <div className="w-[16.19px] h-5 text-center text-slate-900 text-lg font-bold">
              ℉
            </div>
          </div>
        </div>
        <div className="flex  mt-36 mb-[72px] mx-36 md:flex-row  flex-wrap">
          {dataWeatherList?.list
            ?.filter((_, index) => index % 7 === 0 && index !== 0)
            .map((forecast, index) => (
              <div
                className="w-[120px] h-[177px] bg-slate-800 mx-6 my-6 flex flex-col items-center py-10"
                key={index}
              >
                <div className="text-gray-200 text-base font-medium">
                  {" "}
                  {`${new Date(forecast.dt * 1000).getDate()} ${
                    dayNames[new Date(forecast.dt * 1000).getDay()]
                  }  `}{" "}
                </div>
                {forecast?.weather && (
                  <img
                    className="w-[56.44px] h-[62px]"
                    src={ICON_URL + forecast.weather[0].icon + ".png"}
                    alt={forecast.weather[0].main}
                  />
                )}
                {temperatureUnit === "Fahrenheit" ? (
                  <div className="flex flex-row justify-evenly">
                    <div className="text-gray-200 text-base font-medium mx-2">
                      {convertToFahrenheit(Math.round(forecast.main.temp_max))}
                      °F
                    </div>
                    <div className="text-gray-400 text-base font-medium">
                      {convertToFahrenheit(Math.round(forecast.main.temp_min))}
                      °F
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row justify-evenly">
                    <div className="text-gray-200 text-base font-medium mx-2">
                      {Math.round(forecast.main.temp_max)}°C
                    </div>
                    <div className="text-gray-400 text-base font-medium">
                      {Math.round(forecast.main.temp_min)}°C
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="text-gray-200 text-2xl font-bold mb-8 mx-36">
          Today’s Hightlights{" "}
        </div>
        <div className=" mx-36 flex flex-col content-evenly ">
          <div className="flex md:flex-row  flex-col  md:justify-around  ">
            <div className="w-[328px] h-[204px] bg-slate-800  max-md:my-8 flex flex-col items-center pt-5">
              <div className="text-center text-gray-200 text-base font-medium">
                Wind status
              </div>
              <div className="text-center">
                <span className="text-gray-200 text-[64px] font-bold">
                  {dataWeatherList?.list[0].wind.speed}
                </span>
                <span className="text-gray-200 text-4xl font-medium">mph</span>
              </div>
              <div className="text-gray-200 text-sm font-medium">WSW</div>
            </div>
            <div className="w-[328px] h-[204px] bg-slate-800 flex flex-col items-center pt-5">
              <div className="text-center text-gray-200 text-base font-medium">
                Humidity
              </div>
              <div className="text-center">
                <span className="text-gray-200 text-[64px] font-bold">
                  {dataWeatherList?.list[0].main.humidity}
                </span>
                <span className="text-gray-200 text-4xl font-normal">%</span>
                <span className="text-gray-200 text-[64px] font-bold"> </span>
              </div>
              <div className="w-[229px] h-2 bg-gray-200 rounded-[80px]">
                <div
                  className={`h-2 bg-yellow-300 rounded-[80px]`}
                  style={{
                    width: `${dataWeatherList?.list[0].main.humidity}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="md:my-4 "></div>
          <div className="flex md:flex-row flex-col md:justify-around ">
            <div className="w-[328px] h-[159px] bg-slate-800 max-md:my-8 pt-5">
              <div className="text-center text-gray-200 text-base font-medium">
                Visibility
              </div>
              <div className="text-center">
                <span className="text-gray-200 text-[64px] font-bold">
                  {dataWeatherList?.list[0].visibility / 1000}
                </span>
                <span className="text-gray-200 text-4xl font-medium"> Km</span>
              </div>
            </div>
            <div className="w-[328px] h-[159px] bg-slate-800 pt-5">
              <div className="text-center text-gray-200 text-base font-medium">
                Air Pressure
              </div>
              <div className="text-center">
                <span className="text-gray-200 text-[64px] font-bold">
                  {dataWeatherList?.list[0].main.pressure}
                </span>
                <span className="text-gray-200 text-4xl font-medium">mb</span>
                <span className="text-gray-200 text-[64px] font-bold"> </span>
              </div>
            </div>
          </div>
          <div className="text-center mt-28 mb-6">
            <span className="text-gray-400 text-sm font-medium">
              created by
            </span>
            <span className="text-gray-400 text-sm font-semibold"> </span>
            <span className="text-gray-400 text-sm font-bold underline">
              Arthaz1245
            </span>
            <span className="text-gray-400 text-sm font-bold"> </span>
            <span className="text-gray-400 text-sm font-medium">
              - devChallenges.io
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
