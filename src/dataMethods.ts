import * as fs from "node:fs";

//all of our types
import { DataResponse } from "./types";
import { Character } from "./types";
import { Episode } from "./types";
import { Location } from "./types";
import { Organization } from "./types";
import { Titan } from "./types";
import { Request } from "express";

const dataPerPage = parseInt(process.env.DATA_PER_PAGE || "")
const dns = process.env.DNS

//returns the array of objects for the specified file
export const getResource = (file: string) => {
  const data = fs.readFileSync(`data/${file}.json`, "utf-8");
  return JSON.parse(data);
};

//method for getting resource by id param
export const filterByID = (
  req: Request,
  resourceData: Character[] | Episode[] | Location[] | Organization[] | Titan[]
): Character[] | Episode[] | Location[] | Organization[] | Titan[] => {
  //loops through each array and adds to the filtered array only if the ids match
  const filteredResourceArr: any = [];

  //if users want multiple characters they split the ids by commas and we split this into an array
  const idArr = req.params.id.split(",");
  for (let i = 0; i < resourceData.length; i++) {
    for (let j = 0; j < idArr.length; j++) {
      if (resourceData[i].id == parseInt(idArr[j])) {
        filteredResourceArr.push(resourceData[i]);
      }
    }
  }

  return filteredResourceArr;
};

//creates the response object
export const buildResponse = (
  //takes in the query and the resource array
  req: Request,
  content: Character[] | Episode[] | Location[] | Organization[] | Titan[]
): DataResponse => {
  const regex = /([&?])page=\d+/gi;
  //formats a url string for the next and prev page properties
  let queriesString = req.originalUrl.replace(regex, "").replace(req.path, "");
  // Ensure queriesString starts with & if it's not empty
  if (queriesString.length > 0 && !queriesString.startsWith('&')) {
    queriesString = `&${queriesString}`;
  }

  const pagesArr: any[] = []; // Explicitly type as any[] or define a proper type

  //the object that is returned default values are 0, 0, null, and null, and an empty array
  const response: DataResponse = {
    info: {
      count: content.length, // Set count directly
      pages: 0, // Will be calculated
      next_page: null,
      prev_page: null,
    },
    results: [], // Initialize as empty
  };

  // Return early if content is empty
  if (content.length === 0) {
    return response;
  }

  //splits the resource array into an array of sub arrays with a max length of specified number
  for (let i = 0; i < content.length; i += dataPerPage) {
    const subArr = content.slice(i, i + dataPerPage);
    pagesArr.push(subArr);
  }

  response.info.pages = pagesArr.length;

  let pageNum = 1; // Default to page 1
  if (req.query.page !== undefined) {
    const parsedPage = parseInt(<string>req.query.page);
    // Validate page number
    if (!isNaN(parsedPage) && parsedPage > 0 && parsedPage <= pagesArr.length) {
      pageNum = parsedPage;
    }
  }

  const pageIndex = pageNum - 1;
  response.results = pagesArr[pageIndex] || []; // Assign the correct page, default to empty array if index is invalid

  // Set next_page URL if applicable
  if (pageNum < pagesArr.length) {
    response.info.next_page = `${dns}${req.path}?page=${pageNum + 1}${queriesString}`;
  }

  // Set prev_page URL if applicable
  if (pageNum > 1) {
    response.info.prev_page = `${dns}${req.path}?page=${pageNum - 1}${queriesString}`;
  }

  return response;
};
