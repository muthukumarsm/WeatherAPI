function ConvertEpochToDate(datevalue, timeValue) {
    var epochTime = datevalue;
    var dateToReturn = new Date(datevalue * 1000);
    var date = new Date();
    var day = dateToReturn.getDate();
    var month = dateToReturn.getMonth();
    var year = dateToReturn.getFullYear();
    if (timeValue == "") {
        var fullDate = day + "-" + (month + 1) + "-" + year;
        return fullDate;
    } else {
        var hour = dateToReturn.getHours();
        var min = String(dateToReturn.getMinutes()).padStart(2, "0");
        var sec = String(dateToReturn.getSeconds()).padStart(2, "0");
        var fullTime = day + "-" + (month+1) + "-" + year + " " +  hour + ":" + min + ":" + sec;
        return fullTime;

    }
}

function getCityAndState(csvstring_test,latvalue,longvalue) {
    
    var cityval = "",stateval = "";
    var csvobj1 = $.csv
    var data1 = csvobj1.toArrays(csvstring_test);
    var arraybounds = data1[0].length - 1;
    
    for (i=3;i<=arraybounds;i=i+4) {
        if (parseFloat(data1[0][i]).toFixed(2) == longvalue && parseFloat(data1[0][i-1]).toFixed(2) == latvalue) {
            cityval=data1[0][i-3];
            stateval=data1[0][i-2];
            break;
        }
     }
     return cityval + "," + stateval;
}


(function () {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function (schemaCallback) {

        var currentWeathercols = [{
            id: "id",
            alias: "id",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "city",
            alias: "city",
            dataType: tableau.dataTypeEnum.string
        },{
            id: "state",
            alias: "state",
            dataType: tableau.dataTypeEnum.string
        },
        {
            id: "lat",
            alias: "lat",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "lon",
            alias: "lon",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "timeZone",
            alias: "timeZone",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "timeZoneOffset",
            alias: "timeZoneOffset",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "weatherDate",
            alias: "weatherDate",
            dataType: tableau.dataTypeEnum.date
        }, {
            id: "sunrise",
            alias: "sunrise",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "sunset",
            alias: "sunset",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "temp",
            alias: "Temperature",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "feelslike",
            alias: "FeelsLike",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "pressure",
            alias: "pressure",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "humidity",
            alias: "Humidity",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "dewpoint",
            alias: "DewPoint (C)",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "clouds",
            alias: "clouds",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "visibility",
            alias: "visibility",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "windspeed",
            alias: "WindSpeed (m/s)",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "winddegree",
            alias: "WindDegree",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "weatherid",
            alias: "Weather ID",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "weathermain",
            alias: "WeatherMain",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "weatherdescription",
            alias: "WeatherDescription",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "rain1h",
            alias: "Rain 1 Hr (mm)",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "snow1h",
            alias: "Snow 1 Hr (mm)",
            dataType: tableau.dataTypeEnum.float
        }];

        var currenttableSchema = {
            id: "currentWeathercols",
            alias: "Current Weather",
            columns: currentWeathercols
        };

        schemaCallback([currenttableSchema]);
    };

    var data;
    var csvobj = $.csv;


 var csvstring_test = `Mumbai,Maharashtra,18.987807,72.836447,Delhi,Delhi,28.651952,77.231495,Kolkata,West Bengal,22.562627,88.363044,Chennai,TamilNadu,13.084622,80.248357,Bengaluru,Karnataka,12.977063,77.587106,Hyderabad,Andhra Pradesh,17.384052,78.456355,Ahmedabad,Gujarat,23.025793,72.587265,Haora,West Bengal,22.576882,88.318566,Pune,Maharashtra,18.513271,73.849852,Surat,Gujarat,21.195944,72.830232,Mardanpur,Uttar Pradesh,26.430066,80.267176,Rampura,Rajasthan,26.884682,75.789336,Lucknow,Uttar Pradesh,26.839281,80.923133,Nara,Maharashtra,21.203096,79.089284,Patna,Bihar,25.615379,85.101027,Indore,Madhya Pradesh,22.717736,75.85859,Vadodara,Gujarat,22.299405,73.208119,Bhopal,Madhya Pradesh,23.254688,77.402892,Coimbatore,TamilNadu,11.005547,76.966122,Ludhiana,Punjab,30.912042,75.853789,Agra,Uttar Pradesh,27.187935,78.003944,kalyan,Maharashtra,19.243703,73.135537,Vishakapatnam,Andhra Pradesh,17.704052,83.297663,Kochi,Kerala,9.947743,76.253802,Nasik,Maharashtra,19.999963,73.776887,Meerut,Uttar Pradesh,28.980018,77.706356,Faridabad,Haryana,28.411236,77.313162,Varanasi,Uttar Pradesh,25.31774,83.005811,Ghaziabad,Uttar Pradesh,28.665353,77.439148,Asansol,West Bengal,23.683333,86.983333,Jamshedpur,Jharkhand,22.802776,86.185448,Madurai,TamilNadu,9.917347,78.119622,Jabalpur,Madhya Pradesh,23.174495,79.935903,Rajkot,Gujarat,22.291606,70.793217,Dhanbad,Jharkhand,23.801988,86.443244,Amritsar,Punjab,31.622337,74.875335,Warangal,Andhra Pradesh,17.978423,79.600209,Allahabad,Uttar Pradesh,25.44478,81.843217,Srinagar,Jammu and Kashmir,34.085652,74.805553,Aurangabad,Maharashtra,19.880943,75.346739,Bhilai,Chattisgarh,21.209188,81.428497,Solapur,Maharashtra,17.671523,75.910437,Ranchi,Jharkhand,23.347768,85.338564,Jodhpur,Rajasthan,26.26841,73.005943,Guwahati,Assam,26.176076,91.762932,Chandigarh,Chandigarh,30.736292,76.788398,Gwalior,Madhya Pradesh,26.229825,78.173369,Thiruvananthapuram,Kerala,8.485498,76.949238,Trichy,TamilNadu,10.815499,78.696513,Hubli,Karnataka,15.349955,75.138619,Mysore,Karnataka,12.292664,76.638543,Raipur,Chattisgarh,21.233333,81.633333,Salem,TamilNadu,11.651165,78.158672,Bhubaneshwar,Odisha,20.272411,85.833853,Kota,Rajasthan,25.182544,75.839065,Jhansi,Uttar Pradesh,25.458872,78.579943,Bareilly,Uttar Pradesh,28.347023,79.421934,Aligarh,Uttar Pradesh,27.881453,78.07464,Bhiwandi,Maharashtra,19.300229,73.058813,Jammu,Jammu and Kashmir,32.735686,74.869112,Moradabad,Uttar Pradesh,28.838931,78.776838,Mangalore,Karnataka,12.865371,74.842432,Kolhapur,Maharashtra,16.695633,74.231669,Amravati,Maharashtra,20.933272,77.75152,Dehradun,Uttarakhand,30.324427,78.033922,Malegon camp,Maharashtra,20.569974,74.515415,Nellore,Andhra Pradesh,14.449918,79.986967,Gopalpur,Uttar Pradesh,26.735389,83.38064,Shimoga,Karnataka,13.932424,75.572555,TiruppÅ«r,TamilNadu,11.104096,77.346402,Raurkela,Odisha,22.224964,84.864143,Nanded,Maharashtra,19.160227,77.314971,Belgaum,Karnataka,15.862643,74.508534,Sangli,Maharashtra,16.856777,74.569196,Chaanda,Maharashtra,19.950758,79.295229,Ajmer,Rajasthan,26.452103,74.638667,Cuttack,Odisha,20.522922,85.78813,Bakaner,Rajasthan,28.017623,73.314955,Bhavnagar,Gujarat,21.774455,72.152496,Hisar,Haryana,29.153938,75.722944,Bilaspur,Chattisgarh,22.080046,82.155431,Tirunelveli,TamilNadu,8.725181,77.684519,Guntur,Andhra Pradesh,16.299737,80.457293,Shiliguri,West Bengal,26.710035,88.428512,Ujjain,Madhya Pradesh,23.182387,75.776433,Davangere,Karnataka,14.469237,75.92375,Akola,Maharashtra,20.709569,76.998103,Saharanpur,Uttar Pradesh,29.967896,77.545221,Gulbarga,Karnataka,17.335827,76.83757,Bhatpara,West Bengal,22.866431,88.401129,Dhalia,Maharashtra,20.901299,74.777373,Udaipur,Rajasthan,24.57951,73.690508,Bellary,Karnataka,15.142049,76.92398,Tuticorin,TamilNadu,8.805038,78.151884,Kurnool,Andhra Pradesh,15.828865,78.036021,Gaya,Bihar,24.796858,85.003852,Sakar,Rajasthan,27.614778,75.138671,Tumkur,Karnataka,13.341358,77.102203,Kollam,Kerala,8.881131,76.584694,Ahmadnagar,Maharashtra,19.094571,74.738432,Bhalwara,Rajasthan,25.347071,74.640812,Nizamabad,Andhra Pradesh,18.673151,78.10008,Parbhani,Maharashtra,19.268553,76.770807,Shillong,MeghÄlaya,25.573987,91.896807,Latar,Maharashtra,18.399487,76.584252,Rajapalyam,TamilNadu,9.451111,77.556121,Bhagalpur,Bihar,25.244462,86.971832,Muzaffarnagar,Uttar Pradesh,29.470914,77.703324,Muzaffarpur,Bihar,26.122593,85.390553,Mathura,Uttar Pradesh,27.503501,77.672145,Patiala,Punjab,30.336245,76.392199,Saugor,Madhya Pradesh,23.838766,78.738738,Brahmapur,Odisha,19.311514,84.792903,Shahbazpur,Uttar Pradesh,27.874116,79.879327,New Delhi,Delhi,28.6,77.2,Rohtak,Haryana,28.894473,76.589166,SamlaipÄdar,Odisha,21.478072,83.990505,Ratlam,Madhya Pradesh,23.330331,75.040315,Farozabad,Uttar Pradesh,27.150917,78.397808,Rajamundhry,Andhra Pradesh,17.005171,81.777839,Barddhaman,West Bengal,23.255716,87.856906,Badar,Karnataka,17.913309,77.530105,Bamanpura,Uttar Pradesh,28.804495,79.040305,Kakinada,Andhra Pradesh,16.960361,82.238086,Panapat,Haryana,29.387471,76.968246,Khammam,Andhra Pradesh,17.247672,80.143682,Bhuj,Gujarat,23.253972,69.669281,Karamnagar,Andhra Pradesh,18.436738,79.13222,Tirupati,Andhra Pradesh,13.635505,79.419888,Hospet,Karnataka,15.269537,76.387103,Chikka Mandya,Karnataka,12.545602,76.895078,Alwar,Rajasthan,27.566291,76.610202,Aizawl,Mizoram,23.736701,92.714596,Bijapur,Karnataka,16.827715,75.718988,Imphal,Manipur,24.808053,93.944203,Tharati Etawah,Uttar Pradesh,26.758236,79.014875,Raichur,Karnataka,16.205459,77.35567,Pathankot,Punjab,32.274842,75.652865,Charala,Andhra Pradesh,15.823849,80.352187,Sonapat,Haryana,28.994778,77.019375,Mirzapur,Uttar Pradesh,25.144902,82.565335,Hapur,Uttar Pradesh,28.729845,77.780681,Porbandar,Gujarat,21.641346,69.600868,Bharatpur,Rajasthan,27.215251,77.492786,Puducherry,Puducherry,11.933812,79.829792,Karnal,Haryana,29.691971,76.984483,Nagercoil,TamilNadu,8.177313,77.43437,Thanjavur,TamilNadu,10.785233,79.139093,Pali,Rajasthan,25.775125,73.320611,Agartala,Tripura,23.836049,91.279386,Ongole,Andhra Pradesh,15.503565,80.044541,Puri,Odisha,19.798254,85.824938,Dindigul,TamilNadu,10.362853,77.975827,Haldia,West Bengal,22.025278,88.058333,Bulandshahr,Uttar Pradesh,28.403922,77.857731,Purnea,Bihar,25.776703,87.473655,Proddatar,Andhra Pradesh,14.7502,78.548129,Gurgaon,Haryana,28.460105,77.026352,Khanapur,Maharashtra,21.273716,76.117376,Machilapatnam,Andhra Pradesh,16.187466,81.13888,Bhiwani,Haryana,28.793044,76.13968,Nandyal,Andhra Pradesh,15.477994,78.483605,Bhusaval,Maharashtra,21.043649,75.785058,Bharauri,Uttar Pradesh,27.598203,81.694709,Tonk,Rajasthan,26.168672,75.786111,Sirsa,Haryana,29.534893,75.028981,Vizianagaram,Andhra Pradesh,18.11329,83.397743,Vellore,TamilNadu,12.905769,79.137104,Alappuzha,Kerala,9.494647,76.331108,Shimla,Himachal Pradesh,31.104423,77.166623,Hindupur,Andhra Pradesh,13.828065,77.491425,Baramala,Jammu and KashmÄ«r,34.209004,74.342853,Bakshpur,Uttar Pradesh,25.894283,80.792104,Dibrugarh,Assam,27.479888,94.90837,Saidapur,Uttar Pradesh,27.598784,80.75089,Navsari,Gujarat,20.85,72.916667,Budaun,Uttar Pradesh,28.038114,79.126677,Cuddalore,TamilNadu,11.746289,79.764362,Harapur,Punjab,31.463218,75.986418,Krishnapuram,TamilNadu,12.869617,79.719469,Fyzabad,Uttar Pradesh,26.775486,82.150182,Silchar,Assam,24.827327,92.797868,Ambala,Haryana,30.360993,76.797819,Krishnanagar,West Bengal,23.405761,88.490733,Kolar,Karnataka,13.137679,78.129989,Kumbakonam,TamilNadu,10.959789,79.377472,Tiruvannamalai,TamilNadu,12.230204,79.072954,Palibhat,Uttar Pradesh,28.631245,79.804362,Abohar,Punjab,30.144533,74.19552,Port Blair,Andaman and Nicobar Islands,11.666667,92.75,Alapur Duar,West Bengal,26.4835,89.522855,Hatasa,Uttar Pradesh,27.592698,78.013843,Valparai,TamilNadu,10.325163,76.955299,Aurangabad,Bihar,24.752037,84.374202,Kohima,Nagaland,25.674673,94.110988,Gangtok,Sikkim,27.325739,88.612155,Karar,TamilNadu,10.960277,78.076753,Jorhat,Assam,26.757509,94.203055,Panaji,Goa,15.498289,73.824541,Saidpur,Jammu and Kashmir,34.318174,74.457093,Tezpur,Assam,26.633333,92.8,Itanagar,Arunachal Pradesh,27.102349,93.692047,Daman,Daman and Diu,20.414315,72.83236,Silvassa,Dadra and Nagar Haveli,20.273855,72.996728,Diu,Daman and Diu,20.715115,70.987952,Dispur,Assam,26.135638,91.800688,Kavaratti,Lakshadweep,10.566667,72.616667,Calicut,Kerala,11.248016,75.780402,Kagaznagar,Andhra Pradesh,19.331589,79.466051,Jaipur,Rajasthan,26.913312,75.787872,Ghandinagar,Gujarat,23.216667,72.683333,Panchkula,Haryana,30.691512,76.853736`;

 // var csvstring_test = `Mumbai,Maharashtra,18.987807,72.836447,Delhi,Delhi,28.651952,77.231495,Kolkata,West Bengal,22.562627,88.363044,Chennai,TamilNadu,13.084622,80.248357,Bengaluru,Karnataka,12.977063,77.587106,Hyderabad,Andhra Pradesh,17.384052,78.456355`;
    data = csvobj.toArrays(csvstring_test);
    var arrayIndexBounds = data[0].length - 1;

    var state = "",city = "",lat_coord = "", long_coord = "";
    var count = 0;
    myConnector.getData = function (table, doneCallback) {
        

         $.each(data, function (index, row) {

            $.each(row, function (index, colData) { 
            arrayIndexBounds = data[0].length - 1;
                
                
                if (index % 4 == 0) {
                    city = data[0][index];
                } else if (index % 4 == 1) {
                    state = data[0][index];    
                } else if (index % 4 == 2) {
                    lat_coord = data[0][index];
                } else {
                    long_coord = data[0][index];
                    var api_key = "70c9b940e85fd98ab73957d1b54aa1ad";

                    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat_coord + "&lon=" + long_coord + "&exclude=minutely,hourly,daily&appid=" + api_key;

                    var xhr = new XMLHttpRequest();
                    var json, feat;
                    xhr.open("POST", url, true);
                    // xhr.setRequestHeader("Content-Type", "application/json");
                    xhr.send();    
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            json = JSON.parse(xhr.responseText);
                            var tableData = [];    
                            feat = json["current"];
                            var rainObj = feat.rain;
                            var snowObj = feat.snow;
                            var rain = "", snow = "";


                            if (rainObj != null) {
                                rain = feat.rain["1h"];
                            }
                            if (snowObj != null) {
                                snow = feat.snow["1h"];
                            }
                            if (feat != null) {
                                var cityandstate = getCityAndState(csvstring_test,json.lat,json.lon);
                                tableData.push({
                                    "id": "Current Weather",
                                    "lat": json.lat,
                                    "lon": json.lon,
                                    "city":cityandstate.split(",")[0],
                                    "state":cityandstate.split(",")[1],
                                    "timeZone": json.timezone,
                                    "timeZoneOffset": json.timezone_offset,
                                    "weatherDate": ConvertEpochToDate(feat.dt, ""),
                                    "sunrise": ConvertEpochToDate(feat.sunrise, "time"),
                                    "sunset": ConvertEpochToDate(feat.sunset, "time"),
                                    "temp": (feat.temp - 273.15).toFixed(2),
                                    "feelslike": (feat.feels_like - 273.15).toFixed(2),
                                    "pressure": feat.pressure,
                                    "humidity": feat.humidity,
                                    "dewpoint": (feat.dew_point - 273.15).toFixed(2),
                                    "uvi": feat.uvi,
                                    "clouds": feat.clouds,
                                    "visibility": feat.visibility,
                                    "windspeed": feat.wind_speed,
                                    "winddegree": feat.wind_deg,
                                    "weatherid": feat.weather[0].id,
                                    "weathermain": feat.weather[0].main,
                                    "weatherdescription": feat.weather[0].description,
                                    "rain1h": rain,
                                    "snow1h": snow
                                });
                                table.appendRows(tableData);
                                
                                if (index == arrayIndexBounds) {
                                    setTimeout(function(){
                                    }, 40000);
                                    doneCallback(); 
                                } 
                            }
                        }
                    };                    
                    // var feat = resp.current;                   
                }            
            });
        });
        
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Weather API Current weather" // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
