export const getAllAsteroids = async () => {
    const today = new Date();
    const startDate = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;
    
    const apiKey = "QFWO0ntza2gMkZ0URcOFjhh7evKVTSOSEhltUBfD"

    const res = await fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&api_key=${apiKey}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const json = await res.json();
    const result = json.near_earth_objects;
    let total = [];
    for (let key in result) {
      total.push(result[key]);
    }
    const flattened = total.flatMap((array) => array);
    let mapped = [];
    flattened.forEach((i) => {
      let data = {};
      data.id = i.id;
      data.date = i.close_approach_data[0].close_approach_date;
      data.name = i.name.match(/\((.*?)\)/g)[0].slice(1, -1);
      data.hazard = i.is_potentially_hazardous_asteroid;
      data.diameter = Math.ceil(
        (i.estimated_diameter.meters.estimated_diameter_max + i.estimated_diameter.meters.estimated_diameter_min) / 2
      );
      data.distanceInKilometers = Math.floor(
        i.close_approach_data[0].miss_distance.kilometers
      );
      data.distanceInLunar = Math.floor(
        i.close_approach_data[0].miss_distance.lunar
      );
  
      mapped.push(data);
    });
    mapped.sort((a, b) => (a.date > b.date ? 1 : -1));
  
    return mapped;
  }

  export const getAsteroidApproach = async (id) => {
    const apiKey = "QFWO0ntza2gMkZ0URcOFjhh7evKVTSOSEhltUBfD"
    const responce = await fetch(`https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=${apiKey}`,
    {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const asteroid = await responce.json()
    return asteroid
  }