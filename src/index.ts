import express from "express";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();

//type imports
import { Character } from "./types";
import { Episode } from "./types";
import { Location } from "./types";
import { Organization } from "./types";
import { Titan } from "./types";

//all methods needed for generating response
import { buildResponse } from "./dataMethods";
import { getResource } from "./dataMethods";
import { filterByID } from "./dataMethods";

const app = express();

app.use(cors())

// Import the fixAllUrls utility
import { fixAllUrls } from "./fixUrls";

// Determine the base URL from environment or request
const getBaseUrl = (req: express.Request): string => {
  // If DNS is set in environment, use it
  if (process.env.DNS) {
    const dns = process.env.DNS;
    return dns.endsWith('/') ? dns.slice(0, -1) : dns; // Remove trailing slash if present
  }
  
  // Otherwise construct from the request
  return `${req.protocol}://${req.get("host")}`;
};

// Try to fix URLs on startup if DNS is set
if (process.env.DNS) {
  console.log('Attempting to fix API URLs in data files...');
  try {
    fixAllUrls();
  } catch (error) {
    console.error('Error fixing URLs:', error);
  }
}

//default endpoints
app.get("/", (req, res) => {
  const baseUrl = getBaseUrl(req);
  res.json({
    characters: `${baseUrl}/characters`,
    episodes: `${baseUrl}/episodes`,
    locations: `${baseUrl}/locations`,
    organizations: `${baseUrl}/organizations`,
    titans: `${baseUrl}/titans`,
  });
});

//characters by id
app.get("/characters/:id", (req, res) => {
  let data = getResource("characters");
  data = filterByID(req, data);
  console.log(data)
  if (data.length == 1) {
    res.json(data[0]);
  } else {
    res.json(data);
  }
});

//characters by query
app.get("/characters", (req, res) => {
  let characters: Character[] = getResource("characters");

  if (req.query.name != undefined) {
    characters = characters.filter((character: Character) =>
      character.name
        .toLowerCase()
        .includes((<string>req.query.name).toLowerCase())
    );
  }
  if (req.query.gender != undefined) {
    characters = characters.filter((character: Character) => {
      if (character.gender != null) {
        return (
          character.gender.toLowerCase() ==
          (<string>req.query.gender).toLowerCase()
        );
      }
    });
  }
  if (req.query.status != undefined) {
    characters = characters.filter((character: Character) => {
      if (character.status != null) {
        return (
          character.status.toLowerCase() ==
          (<string>req.query.status).toLowerCase()
        );
      }
    });
  }
  if (req.query.occupation != undefined) {
    characters = characters.filter((character: Character) => {
      if (character.occupation != null) {
        return (
          character.occupation.toLowerCase() ==
          (<string>req.query.occupation).toLowerCase()
        );
      }
    });
  }

  const response = buildResponse(req, characters);

  res.json(response);
});

//episodes by id
app.get("/episodes/:id", (req, res) => {
  let data = getResource("episodes");
  data = filterByID(req, data);
  if (data.length == 1) {
    res.json(data[0]);
  } else {
    res.json(data);
  }
});

//episodes by query
app.get("/episodes", (req, res) => {
  let episodes: Episode[] = getResource("episodes");

  if (req.query.episode != undefined) {
    episodes = episodes.filter((episode: Episode) =>
      episode.episode
        .toLowerCase()
        .includes((<string>req.query.episode).toLowerCase())
    );
  }
  if (req.query.name != undefined) {
    episodes = episodes.filter((episode: Episode) =>
      episode.name
        .toLowerCase()
        .includes((<string>req.query.name).toLowerCase())
    );
  }

  const response = buildResponse(req, episodes);
  res.json(response);
});

//locations by id
app.get("/locations/:id", (req, res) => {
  let data = getResource("locations");
  data = filterByID(req, data);
  if (data.length == 1) {
    res.json(data[0]);
  } else {
    res.json(data);
  }
});

//locations by query
app.get("/locations", (req, res) => {
  let locations: Location[] = getResource("locations");

  if (req.query.name != undefined) {
    locations = locations.filter((location: Location) =>
      location.name
        .toLowerCase()
        .includes((<string>req.query.name).toLowerCase())
    );
  }
  if (req.query.territory != undefined) {
    locations = locations.filter((location: Location) => {
      if (location.territory != null) {
        return location.territory
          .toLowerCase()
          .includes((<string>req.query.territory).toLowerCase());
      }
    });
  }
  if (req.query.region != undefined) {
    locations = locations.filter((location: Location) => {
      if (location.region != null) {
        return location.region
          .toLowerCase()
          .includes((<string>req.query.region).toLowerCase());
      }
    });
  }

  const response = buildResponse(req, locations);

  res.json(response);
});

//organizations by id
app.get("/organizations/:id", (req, res) => {
  let data = getResource("organizations");
  data = filterByID(req, data);
  if (data.length == 1) {
    res.json(data[0]);
  } else {
    res.json(data);
  }
});

//organizations by query
app.get("/organizations", (req, res) => {
  let organizations: Organization[] = getResource("organizations");

  if (req.query.name != undefined) {
    organizations = organizations.filter((organization: Organization) =>
      organization.name
        .toLowerCase()
        .includes((<string>req.query.name).toLowerCase())
    );
  }
  if (req.query.affiliation != undefined) {
    organizations = organizations.filter((organization: Organization) => {
      if (organization.affiliation != null) {
        return organization.affiliation
          .toLowerCase()
          .includes((<string>req.query.affiliation).toLowerCase());
      }
    });
  }

  const response = buildResponse(req, organizations);

  res.json(response);
});

//titans by id
app.get("/titans/:id", (req, res) => {
  let data = getResource("titans");
  data = filterByID(req, data);
  if (data.length == 1) {
    res.json(data[0]);
  } else {
    res.json(data);
  }
});

//titans by query
app.get("/titans", (req, res) => {
  let titans: Titan[] = getResource("titans");

  //only way to filter titans is by allegiance, we have to search through the allegiance array of every Titan object
  if (req.query.name != undefined) {
    titans = titans.filter((titan: Titan) => {
      return titan.name.toLowerCase().includes((<string>req.query.name).toLowerCase())
    })
  }

  if (req.query.allegiance != undefined) {
    titans = titans.filter((titan: Titan) => {
      return titan.allegiance.toLowerCase() == (<string>req.query.allegiance).toLowerCase()
    })
  }

  const response = buildResponse(req, titans);

  res.json(response);
});

app.listen(process.env.PORT, () => {
  console.log(`App running on port ${process.env.PORT}`);
});
